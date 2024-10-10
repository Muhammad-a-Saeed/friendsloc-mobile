import {View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../utils/constants';
import {homeStyles} from '../../screens/main/styles';
import {BellCircleIcon, HeartCircleIcon} from '../../assets/icons';

const HeartAndBellIcon = () => {
  const navigation = useNavigation();

  return (
    <View style={[homeStyles.userContainer, {gap: 10}]}>
      <HeartCircleIcon onPress={() => navigation.navigate(ROUTES.FavoritesLocation)} />
      {/* <BellCircleIcon onPress={() => navigation.navigate(ROUTES.Notifications)} /> */}
    </View>
  );
};

export default HeartAndBellIcon;
