import {View, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {AppTextInput} from '../../../../components';
import {Strings} from '../../../../utils/locales';
import {inboxStyles} from '../../styles';
import {AttachmentIcon, CameraBlackIcon, SendWhiteCircleIcon} from '../../../../assets/icons';
import {COLORS, FONTS} from '../../../../utils/theme';
import globalStyles from '../../../../../globalStyles';

const SendMessageInput = ({onChangeText, value, onPressSendOrMic, onPressTextInputAction}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <AppTextInput
          placeholder={Strings['Type a message']}
          textInputStyle={inboxStyles.textInput}
          value={value}
          RightIcon={() => {
            return (
              <View style={styles.textInputIconsContainer}>
                <Pressable style={styles.textInputIconContainer} onPress={() => onPressTextInputAction('Attachment')}>
                  <AttachmentIcon />
                </Pressable>
                <Pressable style={styles.textInputIconContainer} onPress={() => onPressTextInputAction('Camera')}>
                  <CameraBlackIcon />
                </Pressable>
              </View>
            );
          }}
          onChangeText={onChangeText}
          containerStyle={{backgroundColor: COLORS.white, paddingEnd: 70}}
        />
      </View>

      <Pressable style={[styles.micIconContainer]} onPress={onPressSendOrMic} disabled={!value}>
        <SendWhiteCircleIcon width={50} height={60} opacity={value ? 1 : 0.5} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', width: '85%', alignItems: 'center', gap: 10, marginVertical: 15},
  textInputContainer: {
    width: '100%',
    minHeight: 50,
    maxHeight: 70,
    borderRadius: 10,
    ...globalStyles.boxShadow1,
  },
  textInputIcon: {width: '100%', height: '100%', resizeMode: 'contain'},
  textInput: {width: '75%', color: COLORS.black, fontFamily: FONTS.regular},
  textInputIconContainer: {width: 22, height: 22},
  textInputIconsContainer: {
    flexDirection: 'row',
    gap: 15,
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    right: 12,
  },
  micIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {width: 22, height: 22},
  audioContainer: {height: 50, marginVertical: 20},
});
export default SendMessageInput;
