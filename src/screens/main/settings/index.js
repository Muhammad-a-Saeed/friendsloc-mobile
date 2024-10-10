import {View, Text, Pressable, Switch} from 'react-native';
import React, {useState} from 'react';
import {AppScrollView, AppText, Header, HeartAndBellIcon, Loader, Screen} from '../../../components';
import {Strings} from '../../../utils/locales';
import {
  BellIcon,
  BlockUserIcon,
  ChevronCircleIcon,
  DocumentIcon,
  InfoIcon,
  LockSquareIcon,
  PersonIcon,
  QuestionMarkIcon,
  RedDeleteBasketIcon,
  RedLogoutIcon,
  SheildIcon,
  StarIcon,
  TranslatorIcon,
} from '../../../assets/icons';
import {settingsStyles} from '../styles';
import globalStyles from '../../../../globalStyles';
import ToggleSwitch from 'toggle-switch-react-native';
import {COLORS} from '../../../utils/theme';
import {ROUTES} from '../../../utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import {userSelector} from '../../../redux/selectors';
import {authActions} from '../../../redux/slices/authSlice';
import commonAPI from '../../../network/commonAPI';
import {bottomTabHeight, confirmationAlert, openPrivacyPolicy, openTOS} from '../../../helpers';

const Settings = ({navigation}) => {
  const user = useSelector(userSelector) || {};
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleNotificationToggler = async value => {
    dispatch(authActions.setUser({...user, isNotification: value}));

    const apiBody = {isNotification: value};
    await commonAPI.updateUserById(user._id, apiBody);
  };

  const handleLogout = async () => {
    const isConfirmed = await confirmationAlert('Are you sure to logout?');
    if (isConfirmed) {
      commonAPI.logout(dispatch, navigation, setIsLoading);
    }
  };

  return (
    <Screen>
      <Header title={Strings['Settings']} RightIcon={HeartAndBellIcon} LeftIcon={() => null} />
      <Loader isLoading={isLoading} />
      <AppScrollView contentContainerStyle={[globalStyles.gap15, {paddingBottom: bottomTabHeight}]}>
        <Option
          title={Strings['My Profile']}
          Icon={PersonIcon}
          onPress={() => navigation.navigate(ROUTES.UserProfile, {prevScreen: 'MY_PROFILE'})}
        />
        <Option
          title={Strings['Change password']}
          Icon={LockSquareIcon}
          onPress={() => navigation.navigate(ROUTES.ChangePassword)}
        />
        <Option
          title={Strings.Notifications}
          Icon={BellIcon}
          rightComponent={
            <View style={{height: 30}}>
              <ToggleSwitch
                isOn={user?.isNotification}
                disabled={false}
                onColor={COLORS.primary}
                offColor={COLORS.grey3}
                size="small"
                onToggle={handleNotificationToggler}
              />
            </View>
          }
        />

        <Option
          title={Strings['Block List']}
          Icon={BlockUserIcon}
          onPress={() => navigation.navigate(ROUTES.BlockList)}
        />

        <Option
          title={Strings['Language']}
          Icon={TranslatorIcon}
          onPress={() =>
            navigation.navigate(ROUTES.Auth, {screen: ROUTES.SelectLanguage, params: {screenType: 'EDIT'}})
          }
        />
        <Option
          title={Strings['Privacy Policy']}
          Icon={SheildIcon}
          // onPress={() => navigation.navigate(ROUTES.PrivacyPolicy)}
          onPress={openPrivacyPolicy}
        />
        <Option
          title={Strings['Terms of use']}
          Icon={DocumentIcon}
          // onPress={() => navigation.navigate(ROUTES.TermOfUse)}
          onPress={openTOS}
        />
        {/* <Option title={Strings['About App']} Icon={InfoIcon} onPress={() => navigation.navigate(ROUTES.AboutApp)} />
        <Option title={Strings['Rate App']} Icon={StarIcon} /> */}
        <Option
          title={Strings['Help Center']}
          Icon={QuestionMarkIcon}
          onPress={() => navigation.navigate(ROUTES.HelpCenter)}
        />
        <Option
          title={Strings['Log Out']}
          Icon={RedLogoutIcon}
          textStyle={settingsStyles.redText}
          onPress={handleLogout}
        />
        <Option
          title={Strings['Delete My Account']}
          Icon={RedDeleteBasketIcon}
          textStyle={settingsStyles.redText}
          onPress={() => navigation.navigate(ROUTES.DeleteAccount)}
        />
      </AppScrollView>
    </Screen>
  );
};

const Option = ({Icon, title, onPress, rightComponent, textStyle}) => {
  return (
    <Pressable onPress={onPress} style={settingsStyles.optionContainer}>
      <Icon width={25} height={25} />
      <AppText style={[globalStyles.flex1, textStyle]}>{title}</AppText>
      {rightComponent ? rightComponent : <ChevronCircleIcon />}
    </Pressable>
  );
};

export default Settings;
