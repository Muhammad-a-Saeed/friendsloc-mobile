import {View, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';
import AppText from '../text';
import {
  CrossPrimaryIcon,
  SendCirclePrimaryIcon,
  ShareOutlineIcon,
  TickPrimaryIcon,
  UserAddPrimaryCircleIcon,
} from '../../assets/icons';
import {COLORS, FONTS} from '../../utils/theme';
import {getUserFullName} from '../../helpers';
import AppButton from '../button';
import {Strings} from '../../utils/locales';
import {friendRequestStyles} from '../../screens/main/styles';
import FastImage from 'react-native-fast-image';

export const ShareCard = ({item, isSelected, onPressShare, onPress}) => {
  const username = item?.username;
  return (
    <Pressable style={styles.container} onPress={() => onPress?.(item)}>
      {item?.image && <FastImage source={{uri: item?.image, priority: FastImage.priority.high}} style={styles.image} />}
      <View style={styles.textContent}>
        <AppText style={styles.username}>{getUserFullName(item?.firstName, item?.lastName)}</AppText>
        {username && <AppText style={friendRequestStyles.username}>{username}</AppText>}
      </View>

      <Pressable onPress={() => onPressShare?.(item)}>
        {isSelected ? <SendCirclePrimaryIcon /> : <ShareOutlineIcon />}
      </Pressable>
    </Pressable>
  );
};

export const FriendCard = ({item, onPressBlock, onPress}) => {
  const username = item?.username;

  return (
    <Pressable style={styles.container} onPress={() => onPress?.(item)}>
      {item?.image && <FastImage source={{uri: item?.image, priority: FastImage.priority.high}} style={styles.image} />}
      <View style={styles.textContent}>
        <AppText style={styles.username}>{getUserFullName(item?.firstName, item?.lastName)}</AppText>
        {username && <AppText style={friendRequestStyles.username}>{username}</AppText>}
      </View>

      <AppButton
        title={Strings['Block']}
        style={styles.blockButton}
        textStyle={styles.blockButtonText}
        onPress={() => onPressBlock?.(item)}
      />
    </Pressable>
  );
};

export const BlockUserCard = ({item, onPressUnBlock, onPress}) => {
  const username = item?.blockedUser?.username;
  return (
    <Pressable style={styles.container} onPress={() => onPress?.(item)}>
      {item?.blockedUser?.image && (
        <FastImage source={{uri: item?.blockedUser?.image, priority: FastImage.priority.high}} style={styles.image} />
      )}
      <View style={styles.textContent}>
        <AppText style={styles.username}>
          {getUserFullName(item?.blockedUser?.firstName, item?.blockedUser?.lastName)}
        </AppText>
        {username && <AppText style={friendRequestStyles.username}>{username}</AppText>}
      </View>

      <AppButton
        title={Strings['Unblock']}
        style={styles.blockButton}
        textStyle={styles.blockButtonText}
        onPress={() => onPressUnBlock?.(item)}
      />
    </Pressable>
  );
};

export const FriendRequestCard = ({item, onPressTick, onPressCross, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {item?.creator?.image && (
        <FastImage source={{uri: item?.creator?.image, priority: FastImage.priority.high}} style={styles.image} />
      )}

      <View style={styles.flex1}>
        {/* {item?.name && <AppText style={styles.username}>{item.name}</AppText>} */}
        <AppText greyText style={{fontSize: 12}}>
          <AppText style={styles.username}>
            {getUserFullName(item?.creator?.firstName, item?.creator?.lastName)}
          </AppText>{' '}
          {Strings['want to add you friend']}
        </AppText>
      </View>

      <View style={[styles.container, {gap: 10}]}>
        <CrossPrimaryIcon onPress={() => onPressCross?.(item)} />
        <TickPrimaryIcon onPress={() => onPressTick?.(item)} />
      </View>
    </Pressable>
  );
};

export const SearchUserCard = ({item, onPress}) => {
  const username = item?.username;
  const image = item?.image;
  return (
    <Pressable style={styles.container} onPress={() => onPress(item)}>
      {image && <FastImage source={{uri: image, priority: FastImage.priority.high}} style={styles.image} />}

      <View style={styles.flex1}>
        <AppText style={styles.username}>{getUserFullName(item?.firstName, item?.lastName)}</AppText>
        {username && <AppText style={friendRequestStyles.username}>{username}</AppText>}
      </View>
    </Pressable>
  );
};

export const SuggestionCard = ({item, onPress, onPressUserAdd, onPressCross}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {item?.image && <FastImage source={{uri: item?.image, priority: FastImage.priority.high}} style={styles.image} />}

      <View style={styles.flex1}>
        {/* {item?.name && <AppText style={styles.username}>{item.name}</AppText>} */}
        <AppText greyText style={{fontSize: 12}}>
          <AppText style={styles.username}>{getUserFullName(item?.firstName, item?.lastName)}</AppText>
          {' you may know'}
        </AppText>
      </View>

      <View style={[styles.container, {gap: 10}]}>
        <CrossPrimaryIcon onPress={() => onPressCross?.(item)} />
        <UserAddPrimaryCircleIcon width={28} onPress={() => onPressUserAdd?.(item)} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  image: {width: 40, height: 40, borderRadius: 100, borderWidth: 1, borderColor: COLORS.primary},
  container: {flexDirection: 'row', alignItems: 'center', gap: 10},
  textContent: {gap: 10, flex: 1, gap: 3},

  maxWidth70: {maxWidth: '70%'},
  maxWidth80: {maxWidth: '80%'},
  counter: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: COLORS.white,
  },
  counterContainer: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timestamp: {fontSize: 12},
  greenDot: {position: 'absolute', right: 3},
  timestampContainer: {gap: 3, alignItems: 'flex-end'},
  username: {fontSize: 14, fontFamily: FONTS.medium},
  blockButton: {width: '22%', height: 30},
  blockButtonText: {fontSize: 12},
});
