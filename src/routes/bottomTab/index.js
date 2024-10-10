import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStack, InboxStack, FriendsStack, SettingsStack} from '../stacks/main';
import {ROUTES} from '../../utils/constants';
import {
  ChatIcon,
  ChatPrimaryIcon,
  SettingIcon,
  SettingPrimaryIcon,
  UserAddIcon,
  UserAddPrimaryIcon,
  WorldMapIcon,
  WorldPrimaryIcon,
} from '../../assets/icons';
import {bottomTabHeight, isIOS} from '../../helpers';
import useSocket from '../../hooks/useSocket';
import {useSelector} from 'react-redux';
import {userSelector} from '../../redux/selectors';
import {useEffect} from 'react';
import {COLORS} from '../../utils/theme';
import globalStyles from '../../../globalStyles';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const user = useSelector(userSelector) || {};
  const socket = useSocket();

  useEffect(() => {
    socket.connect();

    if (user?._id) {
      console.log('Socket Emit: User-Enter');
      socket.emit('user-enter', {userId: user?._id}, error => console.log(error));
    }

    return () => {
      console.log('Clean Up ALL Listner');

      socket.emit('user-leave', {userId: user?._id}, error => console.log(error));

      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: globalStyles.bottomTab,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => <TabIcon Icon={focused ? WorldPrimaryIcon : WorldMapIcon} />,
        }}
        name={ROUTES.HomeTab}
        component={HomeStack}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => <TabIcon Icon={focused ? UserAddPrimaryIcon : UserAddIcon} />,
        }}
        name={ROUTES.FriendsTab}
        component={FriendsStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => <TabIcon Icon={focused ? ChatPrimaryIcon : ChatIcon} />,
        }}
        name={ROUTES.InboxTab}
        component={InboxStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => <TabIcon Icon={focused ? SettingPrimaryIcon : SettingIcon} />,
        }}
        name={ROUTES.SettingsTab}
        component={SettingsStack}
      />
    </Tab.Navigator>
  );
};

const TabIcon = ({Icon}) => {
  return <Icon height={22} width={22} />;
};

export default BottomTab;
