import {useEffect, useState} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const usePushNotifications = () => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const authStatus = await messaging().requestPermission();
        setHasPermission(
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL,
        );
      }
    };

    requestPermission();
  }, []);

  return hasPermission;
};

export default usePushNotifications;
