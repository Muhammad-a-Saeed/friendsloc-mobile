import {StyleSheet} from 'react-native';
import {isIOS} from '../../helpers';
import {COLORS, FONTS} from '../../utils/theme';

export const authCommonStyles = StyleSheet.create({
  flex1: {flex: 1},
  flexGrow1: {flexGrow: 1},
  continueButtonVerticalMargin: {marginVertical: isIOS ? 10 : 30},
});

export const signInStyles = StyleSheet.create({
  flex1: {flex: 1},
  flexGrow1: {flexGrow: 1},
  inputContainer: {marginTop: 20, marginBottom: 15},
  signInText: {fontSize: 18, fontFamily: FONTS.semiBold},
  rememberContainer: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30},
  rememberText: {fontSize: 12},
  orText: {textAlign: 'center', marginVertical: 25, fontFamily: FONTS.medium, fontSize: 18},
  underlineAndMediumText: {fontFamily: FONTS.medium, textDecorationLine: 'underline'},
  textAlignCenter: {textAlign: 'center'},
  accountRelatedText: {textAlign: 'center', marginTop: 25, fontFamily: FONTS.medium},
  underlineText: {fontSize: 12, textDecorationLine: 'underline', color: COLORS.primary},
});

export const selectLanguageStyles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  logo: {alignSelf: 'center', marginTop: 20, marginBottom: 40},
  selectLangText: {fontFamily: FONTS.semiBold, fontSize: 16},
  langContainer: {flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start'},
  contentContainer: {gap: 10, flex: 1},
  checkIcons: {gap: 5},
  langText: {fontFamily: FONTS.medium},
});

export const otpVerifyStyles = StyleSheet.create({
  otpInput: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 100,
    height: 50,
    width: 50,
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    marginTop: 40,
    color: COLORS.primary,
  },
});

export const profileStyles = StyleSheet.create({
  cameraIcon: {position: 'absolute', bottom: 5, right: 5},
  avatarContainer: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: COLORS.primary,
  },
  image: {width: 120, height: 120, borderRadius: 100},
  profileCreatedTitle: {fontFamily: FONTS.semiBold, fontSize: 18, marginVertical: 20},
  profileCreatedDesc: {textAlign: 'center', width: '75%'},
  logoAvatar: {width: 120, height: 120, alignItems: 'center', justifyContent: 'center'},
});

export const contactStyles = StyleSheet.create({
  buttonGroup: {flexDirection: 'row', justifyContent: 'space-between'},
  halfWidth: {width: '48%'},
  buttonOutline: {borderWidth: 1, borderColor: COLORS.primary, backgroundColor: COLORS.transparent},
  outlinebuttonText: {color: COLORS.primary},
});
