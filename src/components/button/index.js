import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import AppText from '../text';
import {COLORS, FONTS} from '../../utils/theme';

const AppButton = ({title, style, textStyle, onPress, LeftIcon, RightIcon, primary = true, disabled, ...restProps}) => {
  let buttonStyle = styles.secondary;
  if (disabled) buttonStyle = {...styles.primary, ...styles.disabled};
  else if (primary) buttonStyle = styles.primary;

  let appTextStyle = styles.secondaryText;
  if (disabled) appTextStyle = styles.disabledText;
  else if (primary) appTextStyle = styles.primaryText;

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[buttonStyle, style]}
      onPress={onPress}
      activeOpacity={0.5}
      {...restProps}>
      {LeftIcon ? LeftIcon : null}
      <AppText style={[appTextStyle, textStyle]}>{title}</AppText>
      {RightIcon ? RightIcon : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primary: {
    width: '100%',
    height: 45,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
  },

  secondary: {
    width: '100%',
    height: 45,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.tertiary,
    flexDirection: 'row',
    gap: 10,
  },

  primaryText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.semiBold,
  },

  disabledText: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: FONTS.semiBold,
  },

  secondaryText: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: FONTS.semiBold,
  },

  disabled: {
    backgroundColor: COLORS.grey3,
  },
});

export default AppButton;
