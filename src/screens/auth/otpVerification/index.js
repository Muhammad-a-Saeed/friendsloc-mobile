import {View} from 'react-native';
import React, {useState} from 'react';
import {Wrapper} from '../common';
import globalStyles from '../../../../globalStyles';
import {AppButton, AppText, Loader} from '../../../components';
import {Strings} from '../../../utils/locales';
import {otpVerifyStyles, signInStyles} from '../styles';
import OTPTextInput from 'react-native-otp-textinput';
import {COLORS} from '../../../utils/theme';
import {ROUTES} from '../../../utils/constants';
import commonAPI from '../../../network/commonAPI';
import {useDispatch} from 'react-redux';
import {authActions} from '../../../redux/slices/authSlice';
import {API} from '../../../network/Environment';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {onAPIError} from '../../../helpers';

const OTPVerification = ({navigation, route}) => {
  const {screenType, email, phone, signInWith} = route.params || {};
  const isPrevScreenForgotPassword = screenType === 'FORGOT_PASSWORD';
  const isPrevScreenDeleteAccount = screenType === 'DELETE_ACCOUNT';
  const isPrevScreenSignUp = screenType === 'SIGNUP';
  const isPrevScreenSignIn = screenType === 'SIGNIN';
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleVerify = async () => {
    if (isPrevScreenSignUp || isPrevScreenSignIn || isPrevScreenForgotPassword || isPrevScreenDeleteAccount) {
      const data = {otp};
      if (signInWith === 'PHONE') {
        data.number = phone;
      } else {
        data.email = email;
      }

      setIsLoading(true);
      const apiVerficationEndPoint = isPrevScreenForgotPassword ? API.verifyOTPResetPassword : API.verifyOTP;
      const response = await commonAPI.verifyOTP(data, apiVerficationEndPoint);
      setIsLoading(false);
      console.log('Verification OTP Response => ', response);

      if (response.success) {
        if (isPrevScreenForgotPassword) {
          navigation.navigate(ROUTES.CreateNewPassword, {email, phone, signInWith, otp});
        } else if (response.act === 'incomplete-profile') {
          dispatch(authActions.setRefreshToken(response?.data?.refreshToken));
          dispatch(authActions.setAccessToken(response?.data?.token));
          // dispatch(authActions.setUser(response?.data?.user));
          navigation.navigate(ROUTES.CompleteProfile);
        } else if (isPrevScreenDeleteAccount) {
          const onSuccess = response => {
            if (response.success) {
              dispatch(authActions.setUser(null));
              dispatch(authActions.setRefreshToken(null));
              dispatch(authActions.setAccessToken(null));
              navigation.replace(ROUTES.Auth);
            }
          };

          callApi(API_METHODS.DELETE, API.deleteMe, null, onSuccess, onAPIError, setIsLoading);
        }
      }
    } else {
      navigation.navigate(ROUTES.CompleteProfile);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    const OTPData = {};
    if (signInWith === 'EMAIL') OTPData.email = email;
    else OTPData.phone = phone;
    await commonAPI.sendOTP(OTPData);
    setIsLoading(false);
  };

  return (
    <Wrapper showHeader={isPrevScreenDeleteAccount} showLogo={!isPrevScreenDeleteAccount} headerTitle={Strings.OTP}>
      <Loader isLoading={isLoading} />
      <View style={globalStyles.flex1}>
        {!isPrevScreenDeleteAccount && (
          <AppText primary style={signInStyles.signInText}>
            {Strings['Enter OTP']}
          </AppText>
        )}

        <OTPTextInput
          autoFocus
          tintColor={COLORS.primary}
          textInputStyle={otpVerifyStyles.otpInput}
          handleTextChange={setOtp}
        />

        <AppText style={signInStyles.accountRelatedText} greyText>
          {Strings['Didn’t get code?']}{' '}
          <AppText primary style={signInStyles.underlineAndMediumText} onPress={handleResendCode}>
            {Strings['Resend code']}
          </AppText>
        </AppText>
      </View>

      <AppButton disabled={otp.length < 4} title={Strings['Verify']} style={{marginTop: 10}} onPress={handleVerify} />
    </Wrapper>
  );
};

export default OTPVerification;
