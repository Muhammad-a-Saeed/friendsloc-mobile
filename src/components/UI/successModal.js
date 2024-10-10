import {View, StyleSheet} from 'react-native';
import React from 'react';
import AppModal from '../modal';
import {TickCirclePrimaryIcon} from '../../assets/icons';
import AppText from '../text';
import {COLORS, FONTS} from '../../utils/theme';

const SuccessModal = ({visible, setVisible, title, description}) => {
  return (
    <AppModal isVisible={visible} setIsVisible={setVisible}>
      <View style={styles.container}>
        <TickCirclePrimaryIcon width={100} height={100} />
        <AppText primary style={styles.title}>
          {title}
        </AppText>
        <AppText greyText style={styles.description}>
          {description}
        </AppText>
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  title: {fontSize: 18, fontFamily: FONTS.semiBold, marginTop: 20, marginBottom: 15, textAlign: 'center'},
  container: {
    backgroundColor: COLORS.white,
    width: '80%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  description: {textAlign: 'center'},
});

export default SuccessModal;
