import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNPhoneInput from 'react-native-phone-number-input';
import {COLORS, FONTS} from '../../utils/theme';
import AppText from '../text';
import {Strings} from '../../utils/locales';

const PhoneInput = ({onChangeText, onChangeFormattedText, value}) => {
  return (
    <View>
      <AppText style={styles.label}>{Strings['Phone Number']}</AppText>
      <RNPhoneInput
        placeholder="(604) 925-7595"
        containerStyle={styles.phoneInput}
        textInputStyle={styles.phoneInputTextInput}
        textContainerStyle={styles.phoneInputTextContainer}
        textInputProps={{placeholderTextColor: '#919191'}}
        codeTextStyle={styles.phoneInputCodeText}
        defaultCode="US"
        layout="second"
        onChangeText={onChangeText}
        onChangeFormattedText={onChangeFormattedText}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  phoneInput: {
    width: '100%',
    height: 45,
    backgroundColor: COLORS.grey5,
    borderRadius: 14,
    overflow: 'hidden',
  },
  phoneInputTextInput: {
    color: COLORS.black,
    fontFamily: FONTS.regular,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.grey5,
    includeFontPadding: false,
    textAlignVertical: 'center',
    fontSize: 15,
  },
  phoneInputTextContainer: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
  },
  phoneInputCodeText: {
    color: COLORS.black,
    fontFamily: FONTS.regular,
    includeFontPadding: false,
    textAlignVertical: 'center',
    fontSize: 15,
  },
  label: {fontFamily: FONTS.medium, marginBottom: 7},
});

export default PhoneInput;
