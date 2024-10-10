import {DefaultTheme} from '@react-navigation/native';

export const COLORS = {
  primary: '#7C48C3',
  secondary: '#FC0F00',
  tertiary: 'rgba(29, 25, 28, 0.1)',
  lightBlack: '#090302',
  black: '#000000',
  white: '#ffffff',
  grey1: '#f3f6f4',
  grey2: '#eeeeee',
  grey3: '#bcbcbc',
  grey4: '#999999',
  grey5: '#FAFAFA',
  textGray: 'rgba(127, 127, 127, 1)',
  pink: 'rgba(232, 63, 111, 1)',
  yellow: 'rgba(255, 191, 0, 1)',
  green: '#259F46',
  red: '#FF0000',
  transparent: 'transparent',
};

export const FONTS = {
  black: 'Montserrat-Black',
  bold: 'Montserrat-Bold',
  extraBold: 'Montserrat-ExtraBold',
  extraLight: 'Montserrat-ExtraLight',
  light: 'Montserrat-Light',
  medium: 'Montserrat-Medium',
  regular: 'Montserrat-Regular',
  semiBold: 'Montserrat-SemiBold',
  thin: 'Montserrat-Thin',
  italic: 'Montserrat-Italic',
};

export const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    background: COLORS.white,
  },
};
