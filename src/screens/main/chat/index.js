import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppTextInput, FlatListEmptyComponent, Header, HeartAndBellIcon, Loader, Screen} from '../../../components';
import {Strings} from '../../../utils/locales';
import {SearchIcon} from '../../../assets/icons';
import globalStyles from '../../../../globalStyles';
import {ROUTES} from '../../../utils/constants';
import {userSelector} from '../../../redux/selectors';
import {useIsFocused} from '@react-navigation/native';
import useSocket from '../../../hooks/useSocket';
import {useSelector} from 'react-redux';
import {bottomTabHeight, confirmationAlert, getUserFullName} from '../../../helpers';
import ChatHead from './components/chatHead';
import dayjs from 'dayjs';

const Chat = ({navigation}) => {
  const socket = useSocket();
  const isScreenFocused = useIsFocused();
  const user = useSelector(userSelector) || {};
  const [heads, setHeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    if (isScreenFocused) {
      socket.emit('get-inboxes', {userId: user._id}, error => console.log(error));

      socket.on('inboxes', response => {
        setIsLoading(false);
        // console.log('RES >>>> ', response);
        setHeads(response.inboxes);
      });

      socket.emit('get-online-users', {userId: user._id}, error => console.log(error));

      socket.on('online-users', response => {
        if (response.success) {
          setActiveUsers(response.data.users);
        }
      });
    }

    return () => {
      socket.removeAllListeners(['inboxes', 'online-users']);
    };
  }, [isScreenFocused]);

  const handlePressHead = head => {
    const inboxId = head?.users.find(u => u?._id !== user?._id);
    navigation.navigate(ROUTES.ChatRoom, {inboxId});
  };

  const handleLongPressHead = async item => {
    const isConfirm = await confirmationAlert('Do you want to delete this chat?', 'No', 'Yes');
    if (!isConfirm) return;

    const roomId = item?._id;
    const myId = user?._id;

    try {
      setHeads(heads.filter(h => h?._id !== roomId));
      socket.emit('delete-chat', {userId: myId, chatRoomId: roomId}, error => console.log(error));
    } catch (error) {
      console.log('delete-chat error:', error);
    }
  };

  const renderScreenData = () => {
    let data = [];

    if (searchText.length > 0) {
      const chats = heads.filter(head => head.chatType === 'single');

      data = chats.filter(head => {
        const receiverUser = head?.users.find(u => u?._id !== user?._id);

        const firstName = receiverUser.firstName;
        const lastName = receiverUser.lastName;

        const fullName = getUserFullName(firstName, lastName);

        const q1 = searchText.toLowerCase().split(' ')[0];
        const q2 = searchText.toLowerCase().split(' ')[1];

        return fullName.toLowerCase().includes(q1) && (!q2 || fullName.toLowerCase().includes(q2));
      });
    } else {
      data = heads.filter(head => head.chatType === 'single');
    }

    return data;
  };

  const handleChangeSearchText = text => {
    setSearchText(text);
  };

  const screenData = renderScreenData();
  return (
    <Screen>
      <Header title={Strings['Chat']} RightIcon={HeartAndBellIcon} LeftIcon={() => null} />
      <Loader isLoading={isLoading} />
      <AppTextInput
        LeftIcon={SearchIcon}
        placeholder={Strings.Search}
        containerStyle={globalStyles.screenMargin}
        onChangeText={handleChangeSearchText}
      />

      <FlatList
        data={screenData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[
          globalStyles.flexGrow1,
          globalStyles.screenPadding,
          globalStyles.gap15,
          globalStyles.screenPaddingBottom10,
          {paddingBottom: bottomTabHeight},
        ]}
        style={{marginTop: 20}}
        ItemSeparatorComponent={() => <View style={{marginVertical: 10}} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<FlatListEmptyComponent label={isLoading ? '' : Strings['No Chat']} />}
        renderItem={({item, index}) => {
          const receiverUser = item?.users.find(u => u?._id !== user?._id);
          let username = getUserFullName(receiverUser.firstName, receiverUser.lastName);
          let lastMessage = item.LastMessage;

          if (item.type === 'photo') {
            lastMessage = 'Image';
          } else if (item.type === 'audio') {
            lastMessage = 'Audio';
          }

          return (
            <ChatHead
              rightContentContainerStyle={{flexDirection: 'column'}}
              isActive={activeUsers.find(u => u?._id === receiverUser?._id)}
              timestamp={dayjs(item?.updatedAt).format('hh:mm a')}
              profilePic={{uri: receiverUser?.image}}
              name={username}
              lastMessage={lastMessage}
              count={item.newMessages}
              onPress={() => handlePressHead(item)}
              onLongPress={() => handleLongPressHead(item)}
            />
          );
        }}
      />
    </Screen>
  );
};

export default Chat;
