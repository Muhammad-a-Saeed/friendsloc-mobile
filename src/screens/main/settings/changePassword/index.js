import {View} from 'react-native';
import React, {useState} from 'react';
import {AppButton, AppScrollView, AppTextInput, Header, Loader, Screen, ShowMessage} from '../../../../components';
import {Strings} from '../../../../utils/locales';
import {mainCommonStyles} from '../../styles';
import globalStyles from '../../../../../globalStyles';
import {changePasswordValidations} from '../../../../utils/validations';
import {API_METHODS, callApi} from '../../../../network/NetworkManger';
import {API} from '../../../../network/Environment';
import {getDeviceIdAndFCM, onAPIError} from '../../../../helpers';
import {useDispatch} from 'react-redux';
import {authActions} from '../../../../redux/slices/authSlice';
import {ROUTES} from '../../../../utils/constants';

const ChangePassword = ({navigation}) => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    const data = {oldPassword, newPassword, confirmPassword};
    const isValidate = changePasswordValidations(data);
    if (!isValidate) return;

    const onSuccess = response => {
      if (response.success) {
        ShowMessage('Password changed successfully. Please log in again!');
        dispatch(authActions.setUser(null));
        dispatch(authActions.setRefreshToken(null));
        dispatch(authActions.setAccessToken(null));
        navigation.replace(ROUTES.Auth);
      }
    };

    const apiBody = {password: newPassword, currentPassword: oldPassword, device: await getDeviceIdAndFCM()};
    callApi(API_METHODS.PATCH, API.updateMyPassword, apiBody, onSuccess, onAPIError, setIsLoading);
  };

  return (
    <Screen>
      <Header title={Strings['Change password']} />
      <Loader isLoading={isLoading} />
      <AppScrollView>
        <View style={[mainCommonStyles.flex1, globalStyles.inputsGap]}>
          <AppTextInput placeholder="*****" label={Strings['Old Password']} onChangeText={setOldPassword} />
          <AppTextInput placeholder="*****" label={Strings['New Password']} onChangeText={setNewPassword} />
          <AppTextInput placeholder="*****" label={Strings['Confirm Password']} onChangeText={setConfirmPassword} />
        </View>

        <View style={globalStyles.screenPaddingBottom10}>
          <AppButton title={Strings['Save Changes']} onPress={handleSaveChanges} />
        </View>
      </AppScrollView>
    </Screen>
  );
};

export default ChangePassword;
