import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatListEmptyComponent, Header, Loader, Screen} from '../../../../components';
import {Strings} from '../../../../utils/locales';
import {API_METHODS, callApi} from '../../../../network/NetworkManger';
import {API} from '../../../../network/Environment';
import {onAPIError} from '../../../../helpers';
import globalStyles from '../../../../../globalStyles';
import {BlockUserCard, FriendCard} from '../../../../components/UI/card';
import {ROUTES} from '../../../../utils/constants';

const BlockList = ({navigation}) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBlockList();
  }, []);

  const getBlockList = () => {
    const onSuccess = response => {
      setList(response?.blockedUsers);
    };
    callApi(API_METHODS.GET, API.getBlockUser, null, onSuccess, onAPIError, setIsLoading);
  };

  const handlePressBlockFriend = item => {
    const friendId = item?.blockedUser?._id;

    if (friendId) {
      navigation.push(ROUTES.UserProfile, {
        prevScreen: 'FRIEND_REQUEST',
        friendId,
      });
    }
  };

  const handleUnBlock = item => {
    const friendId = item?.blockedUser?._id;

    setList(list.filter(f => f?.blockedUser?._id != friendId));

    const onSuccess = response => {
      console.log('Res:', response);
    };

    callApi(API_METHODS.POST, `${API.blockUnBlock}/${friendId}`, {}, onSuccess, onAPIError);
  };

  return (
    <Screen>
      <Header title={Strings['Block List']} />

      <Loader isLoading={isLoading} />

      <FlatList
        data={list}
        contentContainerStyle={[globalStyles.flexGrow1, globalStyles.screenPadding, {gap: 15}]}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<FlatListEmptyComponent label={isLoading ? '' : Strings['There are no blocked users']} />}
        renderItem={({item}) => (
          <BlockUserCard item={item} onPress={handlePressBlockFriend} onPressUnBlock={handleUnBlock} />
        )}
      />
    </Screen>
  );
};

export default BlockList;
