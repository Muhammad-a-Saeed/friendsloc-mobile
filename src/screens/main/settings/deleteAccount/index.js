import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {AppButton, AppText, AppTextInput, Header, Loader, Screen} from '../../../../components';
import {EyeShowIcon} from '../../../../assets/icons';
import {deleteAccountStyles, mainCommonStyles} from '../../styles';
import globalStyles from '../../../../../globalStyles';
import {ROUTES} from '../../../../utils/constants';
import {Strings} from '../../../../utils/locales';
import {userSelector} from '../../../../redux/selectors';
import {useSelector} from 'react-redux';
import commonAPI from '../../../../network/commonAPI';

const DeleteAccount = ({navigation}) => {
  const user = useSelector(userSelector) || {};
  const [isLoading, setIsLoading] = useState(false);
  const myEmail = user?.email;
  const myNumber = user?.number;
  const signInWith = myEmail ? 'EMAIL' : 'PHONE';

  const handleContinue = async () => {
    setIsLoading(true);
    const OTPData = {};
    if (signInWith === 'EMAIL') OTPData.email = myEmail;
    else OTPData.phone = myNumber;

    const response = await commonAPI.sendOTP(OTPData);
    setIsLoading(false);

    if (response.success) {
      navigation.navigate(ROUTES.Auth, {
        screen: ROUTES.OTPVerification,
        params: {screenType: 'DELETE_ACCOUNT', email: myEmail, phone: myNumber, signInWith},
      });
    }
  };

  return (
    <Screen>
      <Header title={Strings['Delete Account']} />
      <Loader isLoading={isLoading} />
      <ScrollView
        contentContainerStyle={[globalStyles.screenPadding, globalStyles.flexGrow1, globalStyles.screenPaddingBottom10]}
        showsVerticalScrollIndicator={false}>
        <View style={[globalStyles.flexRowItemCenter]}>
          <AppText style={deleteAccountStyles.deleteAccountText}>{Strings['Delete your account will']}:</AppText>
        </View>

        <View style={{marginTop: 20, ...globalStyles.flexGrow1}}>
          <AppText style={mainCommonStyles.paragraphText}>
            We're sorry to see you go. If you're sure you want to delete your Friendsloc App account, please be aware
            that this action is permanent and cannot be undone. All of your personal information, including your
            information and settings, will be permanently deleted.
          </AppText>

          <AppText style={[mainCommonStyles.paragraphText, {marginTop: 10}]}>
            If you're having trouble with your account or have concerns, please reach out to us at [contact email or
            support page] before proceeding with the account deletion. We'd love to help you resolve any issues and keep
            you as a valued Friendsloc App user.
          </AppText>

          {/* <AppText style={deleteAccountStyles.inputLabel}>{Strings.Password}</AppText>
          <AppTextInput placeholder="*******" RightIcon={EyeShowIcon} />

          <AppText style={[mainCommonStyles.paragraphText, {marginTop: 20}]} isGreyText>
            {
              Strings[
                'To delete your account, please enter your password in the field below and confirm your decision by clicking the "Delete My Account" button'
              ]
            }
          </AppText> */}
        </View>

        <View style={globalStyles.screenPaddingBottom10}>
          <AppButton title={Strings['Continue']} onPress={handleContinue} />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default DeleteAccount;
