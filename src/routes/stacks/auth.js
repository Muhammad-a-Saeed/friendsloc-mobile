import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from '../../utils/constants';
import {CompleteProfile, CreateNewPassword, ForgotPassword, ImportContacts, OTPVerification, SelectLanguage, SignIn, SignUp, Splash, SuccessfullCreated} from '../../screens/auth';

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.Splash} screenOptions={screenOptions}>
      <Stack.Screen name={ROUTES.Splash} component={Splash} />
      <Stack.Screen name={ROUTES.SelectLanguage} component={SelectLanguage} />
      <Stack.Screen name={ROUTES.SignIn} component={SignIn} />
      <Stack.Screen name={ROUTES.SignUp} component={SignUp} />
      <Stack.Screen name={ROUTES.OTPVerification} component={OTPVerification} />
      <Stack.Screen name={ROUTES.CompleteProfile} component={CompleteProfile} />
      <Stack.Screen name={ROUTES.ImportContacts} component={ImportContacts} />
      <Stack.Screen name={ROUTES.SuccessfullCreated} component={SuccessfullCreated} />
      <Stack.Screen name={ROUTES.ForgotPassword} component={ForgotPassword} />
      <Stack.Screen name={ROUTES.CreateNewPassword} component={CreateNewPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
