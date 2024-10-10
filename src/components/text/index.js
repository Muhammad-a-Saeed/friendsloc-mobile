import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS, FONTS} from '../../utils/theme';

function AppText({children, style, greyText = false, primary = false, onPress, ...otherProps}) {
  let textColor = COLORS.black;
  if (primary) textColor = COLORS.primary;
  if (greyText) textColor = COLORS.textGray;

  return (
    <Text onPress={onPress} style={[styles.text, {color: textColor}, style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    includeFontPadding: false,
  },
});

export default AppText;
