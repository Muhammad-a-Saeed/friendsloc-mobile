import {View, StyleSheet, Pressable} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import AppText from '../text';
import {FONTS} from '../../utils/theme';
import {ChevronCircledIcon} from '../../assets/icons';

const Header = ({
  title,
  RightIcon,
  LeftIcon,
  titleTextStyle,
  onPressLeftIcon,
  onPressRightIcon,
  leftIconStyle,
  rightIconStyle,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Pressable
          onPress={onPressLeftIcon ? onPressLeftIcon : () => (navigation.canGoBack() ? navigation.goBack() : null)}
          style={[styles.leftContainer, {flex: undefined}, leftIconStyle]}>
          {LeftIcon ? LeftIcon : <ChevronCircledIcon width={30} height={30} />}
        </Pressable>

        <AppText numberOfLines={1} style={[styles.titleText, titleTextStyle]}>
          {title}
        </AppText>
      </View>

      <Pressable onPress={onPressRightIcon} style={[styles.rightContainer, rightIconStyle]}>
        {RightIcon ? RightIcon : null}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    marginHorizontal: '5%',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  rightContainer: {
    // position: 'absolute',
    // alignSelf: 'flex-end',
  },
  titleText: {fontFamily: FONTS.semiBold, fontSize: 16, maxWidth: '80%'},
});

export default Header;
