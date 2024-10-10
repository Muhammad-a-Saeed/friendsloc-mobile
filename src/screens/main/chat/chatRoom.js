import {View, Image, KeyboardAvoidingView, FlatList, Pressable} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AppText, BottomSheet, FlatListEmptyComponent, Header, Loader, Screen, ShowMessage} from '../../../components';
import {homeStyles, inboxStyles, chatRoomStyles, friendRequestStyles} from '../styles';
import {ChevronCircledIcon, SendWhiteCircleIcon} from '../../../assets/icons';
import globalStyles from '../../../../globalStyles';
import useSocket from '../../../hooks/useSocket';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {userSelector} from '../../../redux/selectors';
import {getUserFullName, imagePickerFromGallery, isIOS, uploadImageToS3} from '../../../helpers';
import SendMessageInput from './components/sendMessageInput';
import Message from './components/message';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageView from 'react-native-image-viewing';
import useHandlePostOpen from '../../../hooks/useHandlePostOpen';
import {ROUTES} from '../../../utils/constants';
import FastImage from 'react-native-fast-image';

const ChatRoom = ({navigation}) => {
  const socket = useSocket();
  const {params} = useRoute();
  const bottomSheetRef = useRef();
  const user = useSelector(userSelector);
  const {postOpenLoading, handlePostOpen} = useHandlePostOpen();
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({type: '', msg: ''});
  const [receiverUser, setReceiverUser] = useState(null);
  const [selectedPhotoUri, setSelectedPhotoUri] = useState(null);

  //  ID'S OF BOTH USER
  const myId = user?._id;
  const inboxId = params?.inboxId;

  // SOCKET EVENTS
  const roomJoinEvent = 'join-room';
  const messagesListener = 'messages';
  const leaveRoomEvent = 'leave-room';
  const sendMessageEvent = 'send-message';

  // LISTENERS
  useEffect(() => {
    socket.on('message-delete', response => {
      ShowMessage('Message Deleted');
    });

    socket.on(messagesListener, response => {
      setIsLoading(false);
      // console.log('MSGS:', JSON.stringify(response, null, 2));
      setMessages(response.messages);

      if (!receiverUser) setReceiverUser(response.receiver);
    });

    return () => {
      socket.removeAllListeners(['message-delete', messagesListener]);
    };
  }, []);

  // EMITTERS
  useEffect(() => {
    socket.emit(roomJoinEvent, {userId: myId, inbox: inboxId}, error => console.log(error));

    return () => {
      socket.emit(leaveRoomEvent, {userId: myId, inbox: inboxId}, error => console.log(error));
    };
  }, []);

  const handleSendMesssage = async () => {
    if (message.type === 'image') bottomSheetRef.current?.close();

    if (message.type === 'image') {
      try {
        const file = {
          uri: message?.msg?.uri,
          name: Date.now().toString(),
          type: message?.msg?.mime,
        };

        const messageObj = {
          type: 'photo',
          createdAt: new Date(),
          message: message?.msg?.uri,
          messageType: 'single',
          sender: {_id: myId},
        };

        setMessages(p => [messageObj, ...p]);

        const formatedMsg = await uploadImageToS3(file);

        messageEmitter('photo', formatedMsg);
        setMessage({type: '', msg: ''});
      } catch (error) {
        console.log(error);
      }
    } else {
      const formatedMsg = message.msg.trim();

      const messageObj = {
        type: 'text',
        createdAt: new Date(),
        message: formatedMsg,
        messageType: 'single',
        sender: {_id: myId},
      };

      setMessages(p => [messageObj, ...p]);

      messageEmitter('text', formatedMsg);
      setMessage({type: '', msg: ''});
    }
  };

  const messageEmitter = (messageType, messageText, audioDuration) => {
    let data = {
      userId: myId,
      to: inboxId,
      message: messageText,
      messageType,
    };

    if (audioDuration) data.audioLength = audioDuration;
    console.log('MESSAGE DATA >>>> ', data);
    socket.emit(sendMessageEvent, data, error => console.log(error));
  };

  const handleOnChangeMessageText = text => {
    setMessage({type: 'text', msg: text});
  };

  const handleTextInputActions = async type => {
    const image = await imagePickerFromGallery({isCamera: type === 'Camera'});
    if (image.length > 0) {
      setMessage({type: 'image', msg: image[0]});
      bottomSheetRef.current.open();
    }
  };

  const getIsIam = useCallback(
    item => {
      return item?.sender._id == myId;
    },
    [myId],
  );

  const handlePressMessage = (message, type) => {
    if (type === 'photo') setSelectedPhotoUri(message);
    else if (type === 'post') handlePostOpen(message);
  };

  const inputValue = message.type == 'text' ? message.msg : '';
  const receiverName = getUserFullName(receiverUser?.firstName, receiverUser?.lastName);
  const receiverImage = receiverUser?.image;
  const username = receiverUser?.username;

  const renderUserPicAndName = () => {
    return (
      <View style={homeStyles.userContainer}>
        <ChevronCircledIcon width={30} height={30} onPress={() => navigation.goBack()} />
        <Pressable
          style={inboxStyles.rowItem}
          onPress={() =>
            navigation.navigate(ROUTES.UserProfile, {
              prevScreen: '',
              friendId: receiverUser?._id,
            })
          }>
          {receiverImage && (
            <FastImage source={{uri: receiverImage, priority: FastImage.priority.normal}} style={inboxStyles.image} />
          )}
          <View style={homeStyles.gap3}>
            <AppText style={homeStyles.username}>{receiverName}</AppText>
            {username && <AppText style={friendRequestStyles.username}>{username}</AppText>}
          </View>
        </Pressable>
      </View>
    );
  };

  const Wrapper = isIOS ? View : Screen;

  return (
    <Wrapper style={[globalStyles.flex1]}>
      <View style={{paddingTop: isIOS ? 60 : 0}}>
        <Header LeftIcon={renderUserPicAndName} onPressLeftIcon={() => {}} />
      </View>
      <Loader isLoading={isLoading || postOpenLoading} />

      <KeyboardAvoidingView behavior={isIOS ? 'padding' : ''} style={chatRoomStyles.wrapper}>
        <FlatList
          data={messages}
          inverted={messages.length > 0}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={chatRoomStyles.seperator} />}
          style={chatRoomStyles.flatList}
          contentContainerStyle={chatRoomStyles.flatListContentContainer}
          ListEmptyComponent={() => <FlatListEmptyComponent label={isLoading ? '' : 'Write your first message'} />}
          renderItem={({item, index}) => (
            <Message item={item} isIam={getIsIam(item)} isAlertShow={false} onPressMessage={handlePressMessage} />
          )}
          showsVerticalScrollIndicator={false}
        />

        <SendMessageInput
          onChangeText={handleOnChangeMessageText}
          value={inputValue}
          onPressSendOrMic={handleSendMesssage}
          onPressTextInputAction={handleTextInputActions}
          isSendButtonDisabled={message.msg.length === 0}
          setMessage={setMessage}
        />
        <SafeAreaView edges={[]} />
      </KeyboardAvoidingView>

      {message.type === 'image' && message.msg?.uri ? (
        <BottomSheet ref={bottomSheetRef} height={350} onClose={() => setMessage({type: '', msg: ''})}>
          <Image source={{uri: message?.msg?.uri}} style={{width: '100%', height: '95%', alignSelf: 'center'}} />

          <Pressable style={chatRoomStyles.micIconContainer} onPress={handleSendMesssage}>
            <SendWhiteCircleIcon width={50} height={60} />
          </Pressable>
        </BottomSheet>
      ) : null}

      {selectedPhotoUri ? (
        <ImageView
          images={[{uri: selectedPhotoUri}]}
          presentationStyle="overFullScreen"
          imageIndex={0}
          backgroundColor="rgba(0,0,0,1)"
          visible={true}
          keyExtractor={(item, index) => index.toString()}
          onRequestClose={() => setSelectedPhotoUri(null)}
        />
      ) : null}
    </Wrapper>
  );
};

export default ChatRoom;
