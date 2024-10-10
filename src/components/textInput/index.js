import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../utils/theme';
import AppText from '../text';
import {Strings} from '../../utils/locales';

function AppTextInput({
  RightIcon,
  LeftIcon,
  width = '100%',
  onChangeText,
  containerStyle,
  placeholder = '',
  innerRef,
  onPressRightIcon,
  textInputStyle,
  secureTextEntry,
  label,
  multiline,
  value,
  isMendatoryField,
  ...otherProps
}) {
  return (
    <View>
      {label && (
        <AppText style={styles.label}>
          {label}{' '}
          {isMendatoryField && (
            <AppText greyText style={styles.optionalText}>
              *
            </AppText>
          )}
        </AppText>
      )}

      <View style={[styles.searchSection, containerStyle]}>
        {LeftIcon && <LeftIcon height={20} />}

        <TextInput
          ref={innerRef}
          style={[styles.input, textInputStyle]}
          selectionColor={COLORS.primary}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textGray}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          multiline={multiline}
          value={value}
          {...otherProps}
        />

        {RightIcon && <RightIcon height={20} width={20} onPress={onPressRightIcon} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: COLORS.grey5,
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    backgroundColor: COLORS.grey5,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.black,
    height: '100%',
    paddingHorizontal: 7,
  },
  label: {fontFamily: FONTS.medium, marginBottom: 7},
  optionalText: {fontSize: 14, color: COLORS.red},
});

export default AppTextInput;
