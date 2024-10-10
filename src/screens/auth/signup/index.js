import {Pressable, View} from 'react-native';
import React, {useState} from 'react';
import {Wrapper} from '../common';
import {AppButton, AppText, AppTextInput, Loader, PhoneInput} from '../../../components';
import {Strings} from '../../../utils/locales';
import {signInStyles} from '../styles';
import globalStyles from '../../../../globalStyles';
import {
  AppleIcon,
  CheckSquareIcon,
  EyeHideIcon,
  EyeShowIcon,
  FacebookIcon,
  GoogleIcon,
  UncheckSquareIcon,
} from '../../../assets/icons';
import {ROUTES} from '../../../utils/constants';
import {signUpValidations} from '../../../utils/validations';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {API} from '../../../network/Environment';
import {onAPIError, openPrivacyPolicy, openTOS} from '../../../helpers';
import commonAPI from '../../../network/commonAPI';
import {useDispatch} from 'react-redux';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [signInWith, setSignInWith] = useState('EMAIL'); // PHONE | EMAIL
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isAcceptTP, setIsAcceptTP] = useState(false);
  const formatedEmail = email.toLowerCase().trim();

  const handleSignUp = () => {
    const data = {
      email: formatedEmail,
      phone,
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
      isAcceptTP,
    };

    const isEmailLogin = signInWith === 'EMAIL';
    const isValidate = signUpValidations(data, isEmailLogin);
    if (!isValidate) return;

    const apiBody = {password: data.password};
    if (signInWith === 'EMAIL') apiBody.email = data.email;
    else if (signInWith === 'PHONE') apiBody.number = data.phone;
    signUpAPI(apiBody);
  };

  const signUpAPI = data => {
    const onSuccess = response => {
      console.log('Signup Response => ', response);
      if (response.success) {
        navigation.navigate(ROUTES.OTPVerification, {
          email: formatedEmail,
          phone,
          signInWith,
          screenType: 'SIGNUP',
        });
      }
    };

    callApi(API_METHODS.POST, API.signUp, data, onSuccess, onAPIError, setIsLoading);
  };

  return (
    <Wrapper>
      <Loader isLoading={isLoading} />
      <View style={globalStyles.flex1}>
        <AppText primary style={signInStyles.signInText}>
          {Strings['Sign Up']}
        </AppText>

        <View style={[signInStyles.inputContainer, globalStyles.inputsGap]}>
          {signInWith === 'EMAIL' && (
            <AppTextInput
              value={email}
              placeholder={Strings['Email']}
              label={Strings['Email']}
              onChangeText={setEmail}
            />
          )}
          {signInWith === 'PHONE' && <PhoneInput value={phone} onChangeFormattedText={setPhone} />}

          <AppTextInput
            placeholder="******"
            label={Strings['Password']}
            onChangeText={setPassword}
            RightIcon={passwordVisible ? EyeShowIcon : EyeHideIcon}
            secureTextEntry={!passwordVisible}
            onPressRightIcon={() => setPasswordVisible(p => !p)}
          />

          <AppTextInput
            placeholder="******"
            label={Strings['Confirm Password']}
            onChangeText={setConfirmPassword}
            RightIcon={confirmPasswordVisible ? EyeShowIcon : EyeHideIcon}
            secureTextEntry={!confirmPasswordVisible}
            onPressRightIcon={() => setConfirmPasswordVisible(p => !p)}
          />

          <View onPress={() => {}} style={[globalStyles.flexRowItemCenter, {gap: 5, maxWidth: '80%'}]}>
            <Pressable onPress={() => setIsAcceptTP(p => !p)}>
              {isAcceptTP ? <CheckSquareIcon /> : <UncheckSquareIcon />}
            </Pressable>
            <AppText style={signInStyles.rememberText}>
              {Strings['By accepting, you agree to the']}{' '}
              <AppText style={signInStyles.underlineText} onPress={openTOS}>
                {Strings['Terms of use']}
              </AppText>{' '}
              {Strings['and']}{' '}
              <AppText style={signInStyles.underlineText} onPress={openPrivacyPolicy}>
                {Strings['Privacy Policy']}
              </AppText>{' '}
              {Strings['of friendsloc']}
            </AppText>
          </View>
        </View>

        <AppButton title={Strings['Sign Up']} style={{marginTop: 10}} onPress={handleSignUp} />

        <AppText style={signInStyles.orText}>{Strings.OR}</AppText>

        <View style={[globalStyles.flexRowJustifyAndItemCenter, {gap: 25}]}>
          <AppleIcon onPress={() => commonAPI.appleLogin({dispatch, setIsLoading, navigation})} />
          {/* <GoogleIcon /> */}
          {/* <FacebookIcon /> */}
        </View>

        <AppText style={signInStyles.accountRelatedText}>
          {Strings['Don’t have an account?']}{' '}
          <AppText
            primary
            style={signInStyles.underlineAndMediumText}
            onPress={() => navigation.navigate(ROUTES.SignIn)}>
            {Strings['Sign In']}
          </AppText>
        </AppText>
      </View>

      {/* <AppText
        primary
        style={[signInStyles.underlineAndMediumText, signInStyles.textAlignCenter]}
        onPress={() => setSignInWith(signInWith === 'EMAIL' ? 'PHONE' : 'EMAIL')}>
        {signInWith === 'EMAIL' ? Strings['Sign Up with Phone Number Instead'] : Strings['Sign Up with Email Instead']}
      </AppText> */}
    </Wrapper>
  );
};

export default SignUp;
