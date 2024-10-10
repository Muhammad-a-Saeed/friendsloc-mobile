import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {inboxStyles} from '../../styles';
import {AppText} from '../../../../components';
import {SendCirclePrimaryIcon} from '../../../../assets/icons';
import {COLORS} from '../../../../utils/theme';
import {Strings} from '../../../../utils/locales';
import dayjs from 'dayjs';

const Message = ({item, isIam, isAlertShow, onPressMessage}) => {
  const message = item?.message;
  const messageType = item.type;
  const timestamp = `${dayjs(item?.createdAt).format('DD MMM, hh:mm a')}`;
  const post = item.type === 'post' ? item?.post : null;

  if (messageType === 'text') {
    return isIam ? (
      <View style={inboxStyles.myMessageMainContainer}>
        <AppText isGreyText style={inboxStyles.messageTime}>
          {timestamp}
        </AppText>
        <View style={inboxStyles.myMessageContainer}>
          <AppText style={inboxStyles.myMessageText}>{message}</AppText>
        </View>
      </View>
    ) : (
      <View style={inboxStyles.otherMessageMainContainer}>
        <View style={inboxStyles.otherMessageContainer}>
          <AppText style={inboxStyles.otherMessageText}>{message}</AppText>
        </View>
        <AppText isGreyText style={inboxStyles.messageTime}>
          {timestamp}
        </AppText>
      </View>
    );
  } else if (messageType === 'photo') {
    return isIam ? (
      <View style={inboxStyles.myMessageMainContainer}>
        <AppText isGreyText style={inboxStyles.messageTime}>
          {timestamp}
        </AppText>
        <Pressable onPress={() => onPressMessage(message, messageType)}>
          <Image source={{uri: message}} style={inboxStyles.messageImage} />
        </Pressable>
      </View>
    ) : (
      <View style={inboxStyles.otherMessageMainContainer}>
        <Pressable onPress={() => onPressMessage(message, messageType)}>
          <Image source={{uri: message}} style={inboxStyles.messageImage} />
        </Pressable>
        <AppText isGreyText style={inboxStyles.messageTime}>
          {timestamp}
        </AppText>
      </View>
    );
  } else if (messageType === 'alert' && isAlertShow) {
    return (
      <View style={{alignSelf: 'center'}}>
        <Text style={[inboxStyles.alertMsg, {fontSize: 12}]}>{message}</Text>
      </View>
    );
  } else if (messageType === 'post') {
    return isIam ? (
      <View style={inboxStyles.myMessageMainContainer}>
        <AppText isGreyText style={inboxStyles.messageTime}>
          {timestamp}
        </AppText>
        <Pressable style={inboxStyles.mySharePostContainer} onPress={() => onPressMessage(post, messageType)}>
          <SendCirclePrimaryIcon width={30} height={30} />
          <View style={inboxStyles.padEnd5}>
            <AppText style={[inboxStyles.postText, {color: COLORS.white}]}>
              {post ? Strings['Share a Location'] : Strings['Location Unavailable']}
            </AppText>
            {post ? (
              <AppText style={[inboxStyles.postOpenText, {color: COLORS.white}]}>{Strings['Click to open']}</AppText>
            ) : null}
          </View>
        </Pressable>
      </View>
    ) : (
      <View style={inboxStyles.otherMessageMainContainer}>
        <Pressable style={inboxStyles.otherSharePostContainer} onPress={() => onPressMessage(post, messageType)}>
          <SendCirclePrimaryIcon width={30} height={30} />
          <View style={inboxStyles.padEnd5}>
            <AppText style={[inboxStyles.postText, {color: COLORS.black}]}>
              {post ? Strings['Share a Location'] : Strings['Location Unavailable']}
            </AppText>
            {post ? (
              <AppText style={[inboxStyles.postOpenText, {color: COLORS.black}]}>{Strings['Click to open']}</AppText>
            ) : null}
          </View>
        </Pressable>
        <AppText isGreyText style={inboxStyles.messageTime}>
          {timestamp}
        </AppText>
      </View>
    );
  } else {
    return null;
  }
};

export default Message;
