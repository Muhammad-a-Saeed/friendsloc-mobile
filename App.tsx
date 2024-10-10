import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/redux/store';
import {persistStore} from 'redux-persist';
import Routes from './src/routes';
import {StatusBar} from 'react-native';
import io from 'socket.io-client';
import SocketContext from './src/context/socketContext';
import {SOCKET_BASE_URL} from './src/network/Environment';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import appleAuth from '@invertase/react-native-apple-authentication';
import {isIOS} from './src/helpers';
import usePushNotifications from './src/hooks/usePushNotifications';
import messaging from '@react-native-firebase/messaging';

const persistor = persistStore(store);
const socket = io(SOCKET_BASE_URL);

const App = () => {
  usePushNotifications();

  if (isIOS && appleAuth?.isSupported) {
    useEffect(() => {
      // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
      return appleAuth.onCredentialRevoked(async () => {
        console.warn('If this function executes, User Credentials have been Revoked');
      });
    }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <PersistGate loading={null} persistor={persistor}>
          <SocketContext.Provider value={socket}>
            <Routes />
          </SocketContext.Provider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
