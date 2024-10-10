import {ShowMessage} from '../components';
import {AppleLogin, getDeviceIdAndFCM, isIOS, onAPIError, storeDataToStorage} from '../helpers';
import {authActions} from '../redux/slices/authSlice';
import {ROUTES} from '../utils/constants';
import {API} from './Environment';
import {API_METHODS, callApi} from './NetworkManger';

const sendOTP = async data => {
  let apiResponse = {};

  const onSuccess = response => {
    apiResponse = response;
  };

  const onError = error => {
    apiResponse = error;
  };

  await callApi(API_METHODS.POST, API.sendOTP, data, onSuccess, onError);

  if (apiResponse.message) ShowMessage(apiResponse.message);
  return apiResponse;
};

const verifyOTP = async (data, apiEndPoint = API.verifyOTP) => {
  let apiResponse = {};

  const onSuccess = response => {
    apiResponse = response;
  };

  const onError = error => {
    apiResponse = error;
  };

  const formatedData = {...data, device: await getDeviceIdAndFCM()};
  await callApi(API_METHODS.POST, apiEndPoint, formatedData, onSuccess, onError);

  if (apiResponse.message) ShowMessage(apiResponse.message);
  return apiResponse;
};

const forgotPassword = async email => {
  let apiResponse = {};

  const onSuccess = response => {
    apiResponse = response;
  };

  const onError = error => (apiResponse = error);

  await callApi(API_METHODS.POST, API.forgotPassword, {email}, onSuccess, onError);

  return apiResponse;
};

const getUserDetail = async () => {
  let apiResponse = {};

  const onSuccess = response => {
    apiResponse = response;
  };

  const onError = error => (apiResponse = error);

  await callApi(API_METHODS.GET, API.userMe, null, onSuccess, onError);

  return apiResponse;
};

const logout = async (dispatch, navigation, setIsLoading) => {
  const onSuccess = response => {
    if (response.success) {
      dispatch(authActions.setUser(null));
      dispatch(authActions.setRefreshToken(null));
      dispatch(authActions.setAccessToken(null));
      navigation.replace(ROUTES.Auth);
    }
  };

  callApi(API_METHODS.POST, API.logout, {device: await getDeviceIdAndFCM()}, onSuccess, onAPIError, setIsLoading);
};

const updateUserById = async (userId, apiBody) => {
  let apiResponse = {};
  const onSuccess = response => {
    apiResponse = response;
  };

  const onError = error => (apiResponse = error);

  await callApi(API_METHODS.PATCH, `${API.user}/${userId}`, apiBody, onSuccess, onError);

  return apiResponse;
};

const updateMe = async apiBody => {
  let apiResponse = {};
  const onSuccess = response => {
    apiResponse = response;
  };

  const onError = error => (apiResponse = error);

  await callApi(API_METHODS.PATCH, API.updateMe, apiBody, onSuccess, onError);

  return apiResponse;
};

const socialSignIn = ({endPoint, data, dispatch, setIsLoading, navigation}) => {
  const onSuccess = response => {
    if (response.success) {
      dispatch(authActions.setAccessToken(response.data.token));
      dispatch(authActions.setRefreshToken(response.data.refreshToken));

      if (response.act == 'login-granted') {
        dispatch(authActions.setUser(response.data.user));
        navigation.replace(ROUTES.Main);
      } else if (response.act == 'incomplete-profile') {
        navigation.navigate(ROUTES.CompleteProfile);
      }
    }
  };

  callApi(API_METHODS.POST, endPoint, data, onSuccess, onAPIError, setIsLoading);
};

const appleLogin = ({dispatch, setIsLoading, navigation}) => {
  AppleLogin()
    .then(async response => {
      const userData = {email: response.email, device: await getDeviceIdAndFCM()};

      if (response?.firstName) userData.firstName = response.firstName;
      if (response?.lastName) userData.lastName = response.lastName;
      userData.image = 'https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg';

      const data = {endPoint: API.socialLogin, data: userData, dispatch, setIsLoading, navigation};
      socialSignIn(data);
    })
    .catch(error => {
      console.log(error);
      setIsLoading(false);
    });
};

const locationLikeUnLike = async locationId => {
  let apiResponse = {};

  const onSuccess = response => {
    apiResponse = response;
  };

  const onError = error => (apiResponse = error);

  const apiEndpoint = `${API.favourite}/${locationId}`;
  await callApi(API_METHODS.POST, apiEndpoint, {}, onSuccess, onError);

  return apiResponse;
};

export default {
  sendOTP,
  verifyOTP,
  forgotPassword,
  logout,
  getUserDetail,
  updateUserById,
  appleLogin,
  locationLikeUnLike,
  updateMe,
};
