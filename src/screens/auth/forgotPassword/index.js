import {View} from 'react-native';
import React, {useState} from 'react';
import {Wrapper} from '../common';
import globalStyles from '../../../../globalStyles';
import {signInStyles} from '../styles';
import {Strings} from '../../../utils/locales';
import {AppButton, AppText, AppTextInput, Loader, PhoneInput} from '../../../components';
import {ROUTES} from '../../../utils/constants';
import {forgotPasswordValidation} from '../../../utils/validations';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {API} from '../../../network/Environment';
import {onAPIError} from '../../../helpers';

const ForgotPassword = ({navigation}) => {
  const [signInWith, setSignInWith] = useState('EMAIL'); // PHONE | EMAIL
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formatedEmail = email.toLowerCase().trim();

  let continueButtonDisable = false;
  if (signInWith === 'EMAIL' && !email) continueButtonDisable = true;
  else if (signInWith === 'PHONE' && !phone) continueButtonDisable = true;

  const handleContinue = () => {
    const data = {email: formatedEmail, phone};
    const isEmailLogin = signInWith === 'EMAIL';
    const isValidate = forgotPasswordValidation(data, isEmailLogin);
    if (!isValidate) return;

    const apiBody = {};
    if (isEmailLogin) apiBody.email = formatedEmail;
    else apiBody.number = phone;

    const onSuccess = response => {
      if (response.success)
        navigation.navigate(ROUTES.OTPVerification, {
          screenType: 'FORGOT_PASSWORD',
          email: formatedEmail,
          phone: phone.trim(),
          signInWith,
        });
    };

    callApi(API_METHODS.POST, API.forgotPassword, apiBody, onSuccess, onAPIError, setIsLoading);
  };

  return (
    <Wrapper>
      <Loader isLoading={isLoading} />
      <View style={globalStyles.flex1}>
        <AppText primary style={signInStyles.signInText}>
          {Strings['Forgot Password']}
        </AppText>

        <View style={[signInStyles.inputContainer, globalStyles.inputsGap]}>
          {signInWith === 'EMAIL' && (
            <AppTextInput placeholder="Email" label={Strings['Email']} value={email} onChangeText={setEmail} />
          )}
          {signInWith === 'PHONE' && <PhoneInput value={phone} onChangeFormattedText={setPhone} />}
        </View>
      </View>

      <AppButton
        title={Strings['Continue']}
        disabled={continueButtonDisable}
        onPress={handleContinue}
        style={{marginTop: 10, marginBottom: 20}}
      />

      {/* <AppText
        primary
        style={[signInStyles.underlineAndMediumText, signInStyles.textAlignCenter]}
        onPress={() => setSignInWith(signInWith === 'EMAIL' ? 'PHONE' : 'EMAIL')}>
        {signInWith === 'EMAIL' ? Strings['Use Phone Number Instead'] : Strings['Use Email Instead']}
      </AppText> */}
    </Wrapper>
  );
};

export default ForgotPassword;
