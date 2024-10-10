import {View} from 'react-native';
import React from 'react';
import {Wrapper} from '../common';
import globalStyles from '../../../../globalStyles';
import {contactStyles, signInStyles} from '../styles';
import {AppButton, AppText} from '../../../components';
import {Strings} from '../../../utils/locales';
import {ContactIcon} from '../../../assets/icons';
import {ROUTES} from '../../../utils/constants';

const ImportContacts = ({navigation}) => {
  const navigateToProfileCreated = () => {
    navigation.navigate(ROUTES.SuccessfullCreated, {title: Strings['Profile Created'], description: ''});
  };

  return (
    <Wrapper>
      <View style={globalStyles.flex1}>
        <AppText primary style={signInStyles.signInText}>
          {Strings['Import Contacts']}
        </AppText>

        <AppText greyText style={{marginTop: 10}}>
          {Strings['Allow App To Sync Your Phone Contacts']}
        </AppText>

        <ContactIcon style={{marginTop: 40}} />
      </View>

      <View style={contactStyles.buttonGroup}>
        <AppButton title={'Decline'} textStyle={contactStyles.outlinebuttonText} style={[contactStyles.halfWidth, contactStyles.buttonOutline]} onPress={navigateToProfileCreated} />
        <AppButton title={'Allow'} style={contactStyles.halfWidth} onPress={navigateToProfileCreated} />
      </View>
    </Wrapper>
  );
};

export default ImportContacts;
