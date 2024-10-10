import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationTheme} from '../utils/theme';
import {ROUTES} from '../utils/constants';
import AuthStack from './stacks/auth';
import BottomTab from './bottomTab';
import {
  AboutApp,
  BlockList,
  ChangePassword,
  ChatRoom,
  DeleteAccount,
  FavoritesLocation,
  HelpCenter,
  LocationInfo,
  LocationSideDetail,
  MarkLocation,
  Notifications,
  PrivacyPolicy,
  ReportLocation,
  SelectLocation,
  SelectLocationOnMap,
  ShareLocation,
  TermOfUse,
  UserProfile,
} from '../screens/main';
import {ReviewStack} from './stacks/main';
import MyFriends from '../screens/main/myFriends';

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
};

const Routes = () => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <Stack.Navigator initialRouteName={ROUTES.Auth} screenOptions={screenOptions}>
        {/* AUTH SCREENS */}
        <Stack.Screen name={ROUTES.Auth} component={AuthStack} />

        {/* WITHOUT BOTTOM TAB SCREENS */}
        <Stack.Screen name={ROUTES.LocationSideDetail} component={LocationSideDetail} />
        <Stack.Screen name={ROUTES.LocationInfo} component={LocationInfo} />
        <Stack.Screen name={ROUTES.ShareLocation} component={ShareLocation} />
        <Stack.Screen name={ROUTES.ReviewStack} component={ReviewStack} />
        <Stack.Screen name={ROUTES.SelectLocation} component={SelectLocation} />
        <Stack.Screen name={ROUTES.SelectLocationOnMap} component={SelectLocationOnMap} />
        <Stack.Screen name={ROUTES.MarkLocation} component={MarkLocation} />
        <Stack.Screen name={ROUTES.FavoritesLocation} component={FavoritesLocation} />
        <Stack.Screen name={ROUTES.Notifications} component={Notifications} />
        <Stack.Screen name={ROUTES.UserProfile} component={UserProfile} />
        <Stack.Screen name={ROUTES.ChatRoom} component={ChatRoom} />

        {/* SETTINGS */}
        <Stack.Screen name={ROUTES.AboutApp} component={AboutApp} />
        <Stack.Screen name={ROUTES.ChangePassword} component={ChangePassword} />
        <Stack.Screen name={ROUTES.DeleteAccount} component={DeleteAccount} />
        <Stack.Screen name={ROUTES.HelpCenter} component={HelpCenter} />
        <Stack.Screen name={ROUTES.PrivacyPolicy} component={PrivacyPolicy} />
        <Stack.Screen name={ROUTES.TermOfUse} component={TermOfUse} />
        <Stack.Screen name={ROUTES.ReportLocation} component={ReportLocation} />
        <Stack.Screen name={ROUTES.MyFriends} component={MyFriends} />
        <Stack.Screen name={ROUTES.BlockList} component={BlockList} />

        {/* WITH BOTTOM TAB SCREENS PLEASE ADD IT IN BOTTOMTAB STACK */}
        <Stack.Screen name={ROUTES.Main} component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
