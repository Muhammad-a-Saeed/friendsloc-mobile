import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppText, Header, Loader, Screen} from '../../../components';
import {Strings} from '../../../utils/locales';
import globalStyles from '../../../../globalStyles';
import {BellCirclePrimaryIcon} from '../../../assets/icons';
import {notifyStyles} from '../styles';
import {API} from '../../../network/Environment';
import {onAPIError} from '../../../helpers';
import {API_METHODS, callApi} from '../../../network/NetworkManger';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = () => {
    const onSuccess = response => {
      if (response.success) {
        console.log('Response > ', response);
        setNotifications([]);
      }
    };

    const endpoint = `${API.myNotifications}?limit=10&page=1`;
    callApi(API_METHODS.GET, endpoint, null, onSuccess, onAPIError, setIsLoading);
  };

  return (
    <Screen>
      <Header title={Strings.Notifications} />
      <Loader isLoading={isLoading} />
      <FlatList
        contentContainerStyle={[
          globalStyles.flexGrow1,
          globalStyles.screenPadding,
          globalStyles.gap15,
          globalStyles.screenPaddingBottom10,
        ]}
        data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => <Notification />}
      />
    </Screen>
  );
};

const Notification = () => {
  return (
    <View style={globalStyles.gap10}>
      <View style={notifyStyles.notificationIconAndTitleContainer}>
        <BellCirclePrimaryIcon width={40} height={40} />
        <View style={notifyStyles.gap5}>
          <AppText style={notifyStyles.title}>Reminder Notifications</AppText>
          <AppText greyText style={notifyStyles.timestamp}>
            6 day ago | 09:24 AM
          </AppText>
        </View>
      </View>
      <AppText greyText style={notifyStyles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore{' '}
      </AppText>
    </View>
  );
};

export default Notifications;
