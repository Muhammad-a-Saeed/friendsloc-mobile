import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppText, AppTextInput, Header, Loader, Screen, ShowMessage} from '../../../components';
import globalStyles from '../../../../globalStyles';
import {SearchIcon, SendWhiteCircleIcon} from '../../../assets/icons';
import {Strings} from '../../../utils/locales';
import {shareStyles} from '../styles';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {onAPIError} from '../../../helpers';
import {API} from '../../../network/Environment';
import {userSelector} from '../../../redux/selectors';
import {useSelector} from 'react-redux';
import useSocket from '../../../hooks/useSocket';
import {ROUTES} from '../../../utils/constants';
import {ShareCard} from '../../../components/UI/card';

const ShareLocation = ({route, navigation}) => {
  const socket = useSocket();
  const user = useSelector(userSelector) || {};
  const myId = user?._id || '';

  // State
  const [friendsList, setFriendsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const {locationId} = route?.params || {};

  // Fetch friends list on component mount
  useEffect(() => {
    getFriendsList();
  }, []);

  // Update filtered users when friends list or search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(friendsList);
    } else {
      const filtered = friendsList.filter(user => {
        if (!searchQuery) return true;

        const queryParts = searchQuery.toLowerCase().split(' ');

        return queryParts.every(part => {
          return user?.firstName.toLowerCase().includes(part) || user?.lastName.toLowerCase().includes(part);
        });
      });
      setFilteredUsers(filtered);
    }
  }, [searchQuery, friendsList]);

  const getFriendsList = () => {
    const onSuccess = response => {
      if (response.success) {
        // console.log('API: ', JSON.stringify(response, null, 2));
        const fetchedFriendsList = response?.friends;
        const formattedList = fetchedFriendsList?.map(i => {
          if (i?.creator?._id == myId) return i.friend;
          else return i?.creator;
        });
        setFriendsList(formattedList);
      }
    };

    const apiEndpoint = `${API.friend}/my`;
    callApi(API_METHODS.GET, apiEndpoint, null, onSuccess, onAPIError, setIsLoading);
  };

  const handlePressShare = item => {
    const inboxId = item?._id;
    if (!inboxId) return;

    try {
      const data = {
        userId: myId,
        to: inboxId,
        postId: locationId,
        messageType: 'post',
      };

      socket.emit('send-message', data);
      ShowMessage('Location Sent');
    } catch (error) {
      console.log(error);
    }
  };

  const handlePressOnFriend = item => {
    const friendId = item?._id;

    if (friendId) {
      navigation.navigate(ROUTES.UserProfile, {
        prevScreen: 'FRIEND_REQUEST',
        friendId,
      });
    }
  };

  return (
    <Screen>
      <Header title={Strings.Share} />
      <Loader isLoading={isLoading} />
      <AppTextInput
        LeftIcon={SearchIcon}
        placeholder={Strings.Search}
        containerStyle={{marginHorizontal: '5%'}}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredUsers}
        style={{marginTop: 15}}
        contentContainerStyle={[globalStyles.flexGrow1, globalStyles.screenPadding, {gap: 15}]}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <ShareCard item={item} isSelected={false} onPressShare={handlePressShare} onPress={handlePressOnFriend} />
        )}
      />
    </Screen>
  );
};

export default ShareLocation;
