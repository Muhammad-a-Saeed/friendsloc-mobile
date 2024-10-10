import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from '../../utils/constants';
import {AddReview, Chat, FriendRequests, Home, Reviews, Settings} from '../../screens/main';

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
};

// EACH TAB HAS INDIVIDUAL STACK

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.Home} screenOptions={screenOptions}>
      <Stack.Screen name={ROUTES.Home} component={Home} />
    </Stack.Navigator>
  );
};

export const FriendsStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={ROUTES.FriendRequests} component={FriendRequests} />
    </Stack.Navigator>
  );
};

export const InboxStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={ROUTES.Chat} component={Chat} />
    </Stack.Navigator>
  );
};

export const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={ROUTES.Settings} component={Settings} />
    </Stack.Navigator>
  );
};

// SOME OTHER STACK OTHER THAN BOTTOM TAB

export const ReviewStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={ROUTES.Reviews} component={Reviews} />
      <Stack.Screen name={ROUTES.AddReview} component={AddReview} />
    </Stack.Navigator>
  );
};
