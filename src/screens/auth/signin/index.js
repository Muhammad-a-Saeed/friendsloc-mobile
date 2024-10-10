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
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {API} from '../../../network/Environment';
import {GoogleSignIn, getDeviceIdAndFCM, onAPIError, onError} from '../../../helpers';
import {signInValidations} from '../../../utils/validations';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../../redux/slices/authSlice';
import {rememberMeSelector} from '../../../redux/selectors';
import commonAPI from '../../../network/commonAPI';

const SignIn = ({navigation}) => {
  const rememberMe = useSelector(rememberMeSelector);
  const [signInWith, setSignInWith] = useState(rememberMe.signInWith || 'EMAIL'); // PHONE | EMAIL
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState(rememberMe.signInWith === 'EMAIL' ? rememberMe.email : '');
  const [phone, setPhone] = useState(rememberMe.signInWith === 'PHONE' ? rememberMe.phone : '');
  const [password, setPassword] = useState(rememberMe.password || '');
  const formatedEmail = email?.toLowerCase().trim();
  const dispatch = useDispatch();

  const handleRememberMe = () => {
    dispatch(authActions.setRememberMe({enabled: !rememberMe.enabled}));
  };

  const handleSignIn = async () => {
    const data = {email: formatedEmail, password, phone};
    const isEmailLogin = signInWith === 'EMAIL';
    const isValidate = signInValidations(data, isEmailLogin);
    if (!isValidate) return;

    const apiBody = {password: password.trim(), device: await getDeviceIdAndFCM()};
    if (isEmailLogin) apiBody.email = formatedEmail;
    else apiBody.number = phone;

    const onAPIError = error => {
      console.log('HERE ERROR > ', error);
      if (error.errorType === 'email-not-verify' || error.errorType === 'number-not-verify') {
        navigation.navigate(ROUTES.OTPVerification, {screenType: 'SIGNIN', email: formatedEmail, phone, signInWith});
      }
    };

    const onSuccess = response => {
      if (response.success) {
        console.log('Sign In Response -> ', response);

        dispatch(authActions.setUser(response?.data?.user));
        dispatch(authActions.setRefreshToken(response?.data?.refreshToken));
        dispatch(authActions.setAccessToken(response?.data?.token));

        if (rememberMe?.enabled) {
          const rememberMeBody = {...rememberMe, password: apiBody.password, signInWith};
          if (isEmailLogin) rememberMeBody.email = formatedEmail;
          else rememberMeBody.phone = phone;

          dispatch(authActions.setRememberMe(rememberMeBody));
        }

        if (response.act === 'incomplete-profile') navigation.navigate(ROUTES.CompleteProfile);
        else navigation.replace(ROUTES.Main);
      }
    };

    callApi(API_METHODS.POST, API.signIn, apiBody, onSuccess, onAPIError, setIsLoading);
  };

  // const handleGoogleLogin = async () => {
  //   return;
  //   setIsLoading(true);

  //   GoogleSignIn()
  //     .then(async response => {
  //       const name = response.user.name;
  //       // signInAPI(API.socialLogin, {
  //       //   email: response.user.email,
  //       //   image: response.user.photo,
  //       //   firstName: name,
  //       //   lastName: '',
  //       //   username: generateUniqueUsername(name),
  //       //   device: await getDeviceIdAndFCM(),
  //       // });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setIsLoading(false);
  //     });
  // };

  return (
    <Wrapper>
      <Loader isLoading={isLoading} />
      <View style={globalStyles.flex1}>
        <AppText primary style={signInStyles.signInText}>
          {Strings['Sign In']}
        </AppText>

        <View style={[signInStyles.inputContainer, globalStyles.inputsGap]}>
          {signInWith === 'EMAIL' && (
            <AppTextInput placeholder={Strings.Email} label={Strings['Email']} value={email} onChangeText={setEmail} />
          )}
          {signInWith === 'PHONE' && <PhoneInput value={phone} onChangeFormattedText={setPhone} />}
          <AppTextInput
            placeholder="******"
            label={Strings['Password']}
            RightIcon={passwordVisible ? EyeShowIcon : EyeHideIcon}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
            value={password}
            onPressRightIcon={() => setPasswordVisible(p => !p)}
          />
        </View>

        <View style={signInStyles.rememberContainer}>
          <Pressable onPress={handleRememberMe} style={[globalStyles.flexRowItemCenter, {gap: 5}]}>
            {rememberMe?.enabled ? <CheckSquareIcon /> : <UncheckSquareIcon />}
            <AppText style={signInStyles.rememberText}>{Strings['Remember me']}</AppText>
          </Pressable>

          <AppText
            style={signInStyles.rememberText}
            greyText
            onPress={() => navigation.navigate(ROUTES.ForgotPassword)}>
            {Strings['Forgot password?']}
          </AppText>
        </View>

        <AppButton title={Strings['Sign In']} onPress={handleSignIn} />

        <AppText style={signInStyles.orText}>{Strings.OR}</AppText>

        <View style={[globalStyles.flexRowJustifyAndItemCenter, {gap: 25}]}>
          <AppleIcon onPress={() => commonAPI.appleLogin({dispatch, setIsLoading, navigation})} />
          {/* <GoogleIcon onPress={handleGoogleLogin} /> */}
          {/* <FacebookIcon /> */}
        </View>

        <AppText style={signInStyles.accountRelatedText}>
          {Strings['Don’t have an account?']}{' '}
          <AppText
            primary
            style={signInStyles.underlineAndMediumText}
            onPress={() => navigation.navigate(ROUTES.SignUp)}>
            {Strings['Sign Up']}
          </AppText>
        </AppText>
      </View>

      {/* <AppText
        primary
        style={[signInStyles.underlineAndMediumText, signInStyles.textAlignCenter]}
        onPress={() => setSignInWith(signInWith === 'EMAIL' ? 'PHONE' : 'EMAIL')}>
        {signInWith === 'EMAIL' ? Strings['Sign In with Phone Number Instead'] : Strings['Sign In with Email Instead']}
      </AppText> */}
    </Wrapper>
  );
};

export default SignIn;
