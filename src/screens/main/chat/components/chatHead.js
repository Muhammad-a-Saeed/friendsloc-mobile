import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../../../utils/theme';
import {isIOS, wp} from '../../../../helpers';
import {EnvelopIcon} from '../../../../assets/icons';

const ChatHead = ({
  onPress,
  nameStyle,
  name,
  lastMessage,
  count = 1,
  timestamp,
  rightContentContainerStyle,
  isActiveShow = true,
  isActive,
  subtitleStyle,
  renderRightComponent,
  isDisablePress,
  containerStyles,
  profilePic,
  onLongPress,
}) => {
  return (
    <TouchableOpacity onLongPress={onLongPress} onPress={onPress} disabled={isDisablePress} style={containerStyles}>
      <View style={styles.picAndProfileContainer}>
        <View>
          <Image source={profilePic} style={styles.profilePic} />
          {isActiveShow && (
            <View style={[styles.activeDot, {backgroundColor: isActive ? COLORS.green : COLORS.grey5}]} />
          )}
        </View>

        <View style={styles.nameAndLastMsgContainer}>
          <Text style={[styles.username, nameStyle]}>{name}</Text>
          {lastMessage && <Text style={[styles.lastMessage, subtitleStyle]}>{lastMessage}</Text>}
        </View>

        {renderRightComponent ? (
          renderRightComponent()
        ) : (
          <View style={[styles.countAndTimestamp, rightContentContainerStyle]}>
            {count > 0 && (
              <View>
                <EnvelopIcon width={30} height={30} />
                <View style={styles.countContainer}>
                  <Text style={styles.count}>{count}</Text>
                </View>
              </View>
            )}

            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: COLORS.grey3,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  picAndProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  username: {
    fontFamily: FONTS.medium,
    color: COLORS.black,
    maxWidth: wp(60),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  lastMessage: {
    fontFamily: FONTS.regular,
    color: COLORS.black,
    fontSize: 12,
    width: wp(55),
  },

  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    position: 'absolute',
    top: 2,
    right: 2,
  },

  nameAndLastMsgContainer: {
    flex: 1,
    width: '50%',
  },

  countAndTimestamp: {
    alignItems: 'flex-end',
  },

  countContainer: {
    width: 18,
    height: 18,
    borderRadius: 100,
    backgroundColor: COLORS.white,
    position: 'absolute',
    right: -5,
    top: -5,
  },

  count: {
    paddingTop: isIOS ? 2 : 0,
    fontSize: 11,

    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },

  timestamp: {
    fontFamily: FONTS.regular,
    color: COLORS.black,
    fontSize: 12,
  },
});

export default ChatHead;
