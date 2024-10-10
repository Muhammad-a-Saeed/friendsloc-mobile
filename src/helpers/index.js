import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/messaging';
import {S3} from 'aws-sdk';
import {Alert, Dimensions, Linking, PermissionsAndroid, Platform} from 'react-native';
import {getDeviceId} from 'react-native-device-info';
var fs = require('react-native-fs');
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {decode} from 'base64-arraybuffer';
import {ShowMessage} from '../components';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const {width, height} = Dimensions.get('window');

export const wp = p => width * (p / 100);
export const hp = p => height * (p / 100);

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const imagePickerFromGallery = async ({selectionLimit = 1, mediaType = 'photo', isCamera} = {}) => {
  try {
    let response = {};

    if (isCamera) response = await launchCamera({selectionLimit});
    else response = await launchImageLibrary({selectionLimit, mediaType});

    let assets = [];

    if (response?.assets?.length > 0) {
      assets = response.assets;
    } else if (response.errorCode === 'camera_unavailable') {
      ShowMessage('Camera is not available');
    } else if (response.errorCode === 'permission') {
      ShowMessage('Storage and camera permission is required');
    }

    return assets;
  } catch (error) {
    console.log(error);
  }
};

export const getRandomItemFromArray = arr => {
  if (!arr) return;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const onAPIError = error => console.log('ERROR > ', error);

export const showConsole = (title, message) => console.log(title, message);

export const OSVersion = parseInt(Platform.Version, 10);

export const storeDataToStorage = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const removeDataFromStorage = async key => {
  await AsyncStorage.removeItem(key);
};

export const getDataFromStorage = async value => {
  let data = await AsyncStorage.getItem(value);
  let newData = JSON.parse(data);
  return newData;
};

export const uploadImageToS3 = async file => {
  const s3bucket = new S3({
    accessKeyId: '',
    secretAccessKey: '',
    Bucket: '',
    signatureVersion: '',
  });

  let contentType = file.type;
  let contentDeposition = 'inline;filename="' + file.name + '"';
  const base64 = await fs.readFile(file.uri, 'base64');
  const arrayBuffer = decode(base64);

  return new Promise((resolve, reject) => {
    s3bucket.createBucket(() => {
      const params = {
        Bucket: '',
        Key: file.name,
        Body: arrayBuffer,
        ContentDisposition: contentDeposition,
        ContentType: contentType,
      };

      s3bucket.upload(params, (err, resData) => {
        if (err) {
          reject(err);
          console.log('error in callback');
        } else {
          resolve(resData.Location);
          console.log('URL generate:', resData.Location);
        }
      });
    });
  });
};

export const getUserFullName = (first, last) => {
  if (!first || !last) return '--- ---';
  return `${first} ${last}`;
};

export const confirmationAlert = (message, cancelBtnText, okayBtnText) => {
  return new Promise((resolve, reject) => {
    Alert.alert('Confirm', message, [
      {text: cancelBtnText || 'Cancel', onPress: () => resolve(false)},
      {text: okayBtnText || 'Ok', onPress: () => resolve(true)},
    ]);
  });
};

export const commonAlert = (title, message) => {
  return new Promise((resolve, reject) => {
    Alert.alert(title, message, [{text: 'Ok', onPress: () => resolve(true)}]);
  });
};

export const FCM = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (!enabled) {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      console.log(error);
    }
  }

  const fcmToken = await firebase.messaging().getToken();

  console.log('FCM ---->>>> ', fcmToken);
  if (fcmToken) {
    return fcmToken;
  } else {
    console.warn('no token');
    return 'No FCM Found!';
  }
};

export const getDeviceIdAndFCM = async () => {
  return {id: getDeviceId(), deviceToken: await FCM()};
};

export const requestNotificationPermission = async () => {
  if (isIOS) {
    const authStatus = await firebase.messaging().requestPermission();
    const enabled =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  } else {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }
};

// INVOKE MULTIPLE REQUIRED PERMISSONS
export const requestPermissions = async permissions => {
  if (Platform.OS === 'android') {
    try {
      const permissionResults = await PermissionsAndroid.requestMultiple(
        permissions.map(permission => PermissionsAndroid.PERMISSIONS[permission]),
      );

      const allGranted = permissions.every(
        permission =>
          permissionResults[PermissionsAndroid.PERMISSIONS[permission]] === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (allGranted) {
        console.log('All required permissions granted');
        return true;
      } else {
        console.log('All required permissions not granted');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  // For platforms other than Android, assume permissions are granted
  return true;
};

export const openPrivacyPolicy = () => {
  Linking.openURL('');
};

export const openTOS = () => {
  Linking.openURL('');
};

export const GoogleSignIn = async () => {
  GoogleSignin.configure({
    // scopes: ['email'],
    webClientId: '',
    offlineAccess: true,
  });
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    if (userInfo !== '') {
      return userInfo;
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      alert('User cancelled the login flow !');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      alert('Signin in progress');
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      alert('Google play services not available or outdated !');
      // play services not available or outdated
    } else {
      console.log(error);
    }
  }
};

export const AppleLogin = () => {
  return new Promise(async (resolve, reject) => {
    if (!appleAuth.isSupported) {
      alert('Apple Login not supported on your device!');
      reject('Not Supported');
      return;
    }
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        nonceEnabled: true,
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      // CREATE A FIREBASE CREDENTIAL FROM THE RESPONSE
      const {identityToken, nonce, fullName, user: appleUser, email} = appleAuthRequestResponse;

      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      // SIGN THE USER IN WITH THE CREDENTIAL
      const {user} = await auth().signInWithCredential(appleCredential);
      resolve({email: user.email, firstName: fullName.givenName, lastName: fullName.familyName});
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const bottomTabHeight = isIOS ? 80 : 65;

export const getTimeFromNow = date => {
  if (!date) return '';
  return dayjs(date).fromNow();
};
