import {View, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppText, AppTextInput, Header, HeartAndBellIcon, Loader, Screen} from '../../../components';
import {Strings} from '../../../utils/locales';
import {RefreshCircleIcon, SearchIcon} from '../../../assets/icons';
import globalStyles from '../../../../globalStyles';
import {friendRequestStyles} from '../styles';
import {ROUTES} from '../../../utils/constants';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {bottomTabHeight, onAPIError} from '../../../helpers';
import {API} from '../../../network/Environment';
import {useSelector} from 'react-redux';
import {userSelector} from '../../../redux/selectors';
import {FriendRequestCard, SearchUserCard, SuggestionCard} from '../../../components/UI/card';
import useDebounce from '../../../hooks/useDebounce';

const FriendRequests = ({navigation}) => {
  const user = useSelector(userSelector);
  const [requests, setRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceText = useDebounce(searchQuery, 1000);

  useEffect(() => {
    if (debounceText) {
      getUsers();
    }
  }, [debounceText]);

  useEffect(() => {
    getFriendRequests();
    getSuggestions();
  }, []);

  const getUsers = () => {
    const onSuccess = response => {
      // console.log('Search Result > ', JSON.stringify(response));
      setUsers(response?.data?.data);
    };

    const formatedText = debounceText.replace('#', '%23');
    const apiEndPoint = `${API.userSearch}?search=${formatedText}&limit=100&page=1`;
    callApi(API_METHODS.GET, apiEndPoint, null, onSuccess, onAPIError, setIsLoading);
  };

  const getFriendRequests = () => {
    const onSuccess = response => {
      if (response.success) {
        setRequests(response.data.data);
      }
    };

    const apiEndpoint = `${API.friend}/?friend=${user._id}&status=pending`;
    callApi(API_METHODS.GET, apiEndpoint, null, onSuccess, onAPIError, setIsLoading);
  };

  const getSuggestions = () => {
    const onSuccess = response => {
      if (response.success) {
        setSuggestions(response?.data?.data);
      }
    };

    const apiEndpoint = `${API.friend}/suggestions`;
    callApi(API_METHODS.GET, apiEndpoint, null, onSuccess, onAPIError, setIsLoading);
  };

  const handleDeleteFriendRequest = friend => {
    const friendId = friend?.creator?._id;
    setRequests(requests.filter(s => s?.creator?._id !== friendId));

    const onSuccess = response => {
      if (response.success) {
        console.log('Request Deleted');
      }
    };

    const apiEndpoint = `${API.friend}/${friendId}`;
    callApi(API_METHODS.DELETE, apiEndpoint, null, onSuccess, onAPIError);
  };

  const handleAcceptRequest = user => {
    const userId = user?._id;
    setRequests(requests.filter(s => s._id !== userId));

    const onSuccess = response => {
      if (response.success) {
        console.log('Friend Request Accepted');
      }
    };

    const apiEndpoint = `${API.friend}/${userId}`;
    callApi(API_METHODS.PATCH, apiEndpoint, {status: 'friend'}, onSuccess, onAPIError);
  };

  const handleNotInterested = friend => {
    const friendId = friend?._id;
    setSuggestions(suggestions.filter(s => s._id !== friendId));

    const onSuccess = response => {
      if (response.success) {
        console.log('Not Interested');
      }
    };

    const apiEndpoint = `${API.createNotInterested}/${friendId}`;
    callApi(API_METHODS.POST, apiEndpoint, null, onSuccess, onAPIError);
  };

  const handleAddFriend = user => {
    const userId = user?._id;
    setSuggestions(suggestions.filter(s => s?._id !== userId));

    const onSuccess = response => {
      if (response.success) {
        console.log('Friend Request Accepted');
      }
    };

    const apiEndpoint = `${API.createFriend}/${userId}`;
    callApi(API_METHODS.POST, apiEndpoint, {}, onSuccess, onAPIError);
  };

  const handleUserPress = item => {
    navigation.navigate(ROUTES.UserProfile, {prevScreen: 'FRIEND_REQUEST', friendId: item?._id});
  };

  const handleFriendRequestPress = item => {
    navigation.navigate(ROUTES.UserProfile, {prevScreen: 'FRIEND_REQUEST', friendId: item?.creator?._id});
  };

  const handleSuggestionPress = item => {
    navigation.navigate(ROUTES.UserProfile, {prevScreen: 'SUGGESTION', friendId: item?._id});
  };

  const refreshRequestsAndSuggestions = () => {
    getFriendRequests();
    getSuggestions();
  };

  const renderSearchUserCard = ({item}) => <SearchUserCard onPress={() => handleUserPress(item)} item={item} />;

  const renderFriendRequestCard = ({item}) => (
    <FriendRequestCard
      onPress={() => handleFriendRequestPress(item)}
      item={item}
      onPressCross={handleDeleteFriendRequest}
      onPressTick={handleAcceptRequest}
    />
  );

  const renderSuggestionCard = ({item}) => (
    <SuggestionCard
      onPress={() => handleSuggestionPress(item)}
      item={item}
      onPressCross={handleNotInterested}
      onPressUserAdd={handleAddFriend}
    />
  );

  const renderSearchResults = () => (
    <View style={[globalStyles.screenPadding, {marginTop: 20, flex: 1}]}>
      <AppText style={friendRequestStyles.sectionTitle}>{Strings['Search Results']}</AppText>
      <FlatList
        data={users}
        style={{marginTop: 10}}
        keyExtractor={item => item?._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[globalStyles.flexGrow1, globalStyles.gap15, {paddingBottom: bottomTabHeight}]}
        ItemSeparatorComponent={() => <View style={friendRequestStyles.marginBottom10} />}
        renderItem={renderSearchUserCard}
      />
    </View>
  );

  const renderFriendRequests = () => (
    <View style={[globalStyles.screenPadding, {marginTop: 20, flex: suggestions.length == 0 ? 1 : undefined}]}>
      <AppText style={friendRequestStyles.sectionTitle}>{Strings['Friend Requests']}</AppText>
      <FlatList
        data={requests}
        style={{marginTop: 10}}
        keyExtractor={item => item?.creator?._id.toString()}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshRequestsAndSuggestions}
        refreshing={false}
        contentContainerStyle={[
          globalStyles.flexGrow1,
          globalStyles.gap15,
          {paddingBottom: suggestions.length > 0 ? 0 : bottomTabHeight},
        ]}
        ItemSeparatorComponent={() => <View style={friendRequestStyles.marginBottom10} />}
        renderItem={renderFriendRequestCard}
      />
    </View>
  );

  const renderSuggestions = () => (
    <View style={[globalStyles.screenPadding, {flex: 1, marginTop: 20}]}>
      <AppText style={friendRequestStyles.sectionTitle}>{Strings.Suggestions}</AppText>
      <FlatList
        data={suggestions}
        style={{marginTop: 10}}
        keyExtractor={item => item?._id.toString()}
        onRefresh={refreshRequestsAndSuggestions}
        refreshing={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[globalStyles.flexGrow1, globalStyles.gap15, {paddingBottom: bottomTabHeight}]}
        ItemSeparatorComponent={() => <View style={friendRequestStyles.marginBottom10} />}
        renderItem={renderSuggestionCard}
      />
    </View>
  );

  return (
    <Screen>
      <Header title={Strings['Friend Requests']} RightIcon={HeartAndBellIcon} LeftIcon={() => null} />
      <Loader isLoading={isLoading} />

      <AppTextInput
        LeftIcon={SearchIcon}
        onChangeText={text => {
          setUsers([]);
          setSearchQuery(text);
        }}
        placeholder={Strings.Search}
        containerStyle={globalStyles.screenMargin}
      />

      {users?.length > 0 ? (
        renderSearchResults()
      ) : requests?.length > 0 || suggestions.length > 0 ? (
        <View style={globalStyles.flex1}>
          {requests?.length > 0 && renderFriendRequests()}
          {suggestions.length > 0 && renderSuggestions()}
        </View>
      ) : (
        !isLoading && (
          <View style={friendRequestStyles.startType}>
            <AppText>{Strings['Start typing to search for a user']}...</AppText>
            <Pressable style={friendRequestStyles.refreshIcon} onPress={refreshRequestsAndSuggestions}>
              <RefreshCircleIcon width={24} height={24} />
            </Pressable>
          </View>
        )
      )}
    </Screen>
  );
};

export default FriendRequests;
