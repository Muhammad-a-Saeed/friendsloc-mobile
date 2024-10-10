import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatListEmptyComponent, Header, Loader, Screen} from '../../../components';
import globalStyles from '../../../../globalStyles';
import {Strings} from '../../../utils/locales';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {onAPIError} from '../../../helpers';
import {API} from '../../../network/Environment';
import {userSelector} from '../../../redux/selectors';
import {useSelector} from 'react-redux';
import {ROUTES} from '../../../utils/constants';
import {FriendCard} from '../../../components/UI/card';

const MyFriends = ({route, navigation}) => {
  const user = useSelector(userSelector) || {};
  const myId = user?._id;
  const [friendsList, setFriendsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getFriendsList();
  }, []);

  const getFriendsList = () => {
    const onSuccess = response => {
      if (response.success) {
        const fetchedFriendsList = response?.friends;
        const formattedList = fetchedFriendsList?.map(i => {
          if (i?.creator?._id == myId) return i?.friend;
          return i?.creator;
        });

        setFriendsList(formattedList);
      }
    };

    const apiEndpoint = `${API.friend}/my`;
    callApi(API_METHODS.GET, apiEndpoint, null, onSuccess, onAPIError, setIsLoading);
  };

  const handlePressOnFriend = item => {
    const friendId = item?._id;

    if (friendId) {
      navigation.push(ROUTES.UserProfile, {
        prevScreen: 'FRIEND_REQUEST',
        friendId,
      });
    }
  };

  const handleBlock = item => {
    const friendId = item?._id;

    setFriendsList(friendsList.filter(f => f?._id != friendId));

    const onSuccess = response => {
      console.log('Res:', response);
    };

    callApi(API_METHODS.POST, `${API.blockUnBlock}/${friendId}`, {}, onSuccess, onAPIError);
  };

  return (
    <Screen>
      <Header title={Strings['My Friends']} />
      <Loader isLoading={isLoading} />

      <FlatList
        data={friendsList}
        contentContainerStyle={[globalStyles.flexGrow1, globalStyles.screenPadding, {gap: 15}]}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<FlatListEmptyComponent label={isLoading ? '' : Strings['No Friend']} />}
        renderItem={({item}) => <FriendCard item={item} onPress={handlePressOnFriend} onPressBlock={handleBlock} />}
      />
    </Screen>
  );
};

export default MyFriends;
