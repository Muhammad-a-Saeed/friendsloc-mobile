import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Wrapper} from '../common';
import globalStyles from '../../../../globalStyles';
import {signInStyles} from '../styles';
import {AppButton, AppText, AppTextInput, Loader} from '../../../components';
import {Strings} from '../../../utils/locales';
import {EyeShowIcon} from '../../../assets/icons';
import {newPasswordValidations} from '../../../utils/validations';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {API} from '../../../network/Environment';
import {getDeviceIdAndFCM, onAPIError} from '../../../helpers';
import {ROUTES} from '../../../utils/constants';

const CreateNewPassword = ({navigation, route}) => {
  const {email, phone, signInWith, otp} = route.params || {};
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleContinue = async () => {
    const data = {password: password.trim(), confirmPassword: confirmPassword.trim()};
    const isValidate = newPasswordValidations(data);
    if (!isValidate) return;

    const apiBody = {password: data.password, otp, device: await getDeviceIdAndFCM()};
    if (signInWith === 'EMAIL') apiBody.email = email;
    else if (signInWith === 'PHONE') apiBody.number = phone;

    const onSuccess = response => {
      if (response.success) {
        navigation.navigate(ROUTES.SuccessfullCreated, {title: Strings['Password Created'], description: ''});
      }
    };

    callApi(API_METHODS.PATCH, API.resetPassword, apiBody, onSuccess, onAPIError, setIsLoading);
  };

  return (
    <Wrapper>
      <Loader isLoading={isLoading} />
      <View style={globalStyles.flex1}>
        <AppText primary style={signInStyles.signInText}>
          {Strings['Create New Password']}
        </AppText>

        <View style={[signInStyles.inputContainer, globalStyles.inputsGap]}>
          <AppTextInput
            placeholder="******"
            label={Strings['Password']}
            secureTextEntry={false}
            RightIcon={EyeShowIcon}
            onChangeText={setPassword}
          />
          <AppTextInput
            placeholder="******"
            label={Strings['Confirm Password']}
            secureTextEntry={false}
            RightIcon={EyeShowIcon}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      <AppButton disabled={!password || !confirmPassword} title={Strings['Continue']} onPress={handleContinue} />
    </Wrapper>
  );
};

export default CreateNewPassword;
