import {View, Image, Pressable, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  AppScrollView,
  AppText,
  Header,
  Loader,
  LocationCard,
  Screen,
  SuccessModal,
} from '../../../components';

import {friendRequestStyles, locationStyles} from '../styles';
import {ChatSquarePrimaryIcon, LogoIcon, MenuDotIcon, MenuDotsIcon, SquareCrossIcon} from '../../../assets/icons';
import {Strings} from '../../../utils/locales';
import globalStyles from '../../../../globalStyles';
import {ROUTES} from '../../../utils/constants';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {getUserFullName, onAPIError} from '../../../helpers';
import {API} from '../../../network/Environment';
import {useSelector} from 'react-redux';
import {userSelector} from '../../../redux/selectors';
import commonAPI from '../../../network/commonAPI';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';

const UserProfile = ({route, navigation}) => {
  const user = useSelector(userSelector) || {};
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [selectedPhotoUri, setSelectedPhotoUri] = useState(null);

  const isMyProfile = route.params?.prevScreen === 'MY_PROFILE';
  const friendId = route.params?.friendId;

  const isSelf = profile?.user?.isSelf;
  const totalLocations = isLoading ? '--' : profile?.totalLocations;
  const totalFriends = isLoading ? '--' : profile?.friends;
  const firstName = profile?.user?.firstName;
  const lastName = profile?.user?.lastName;
  const profileImage = profile?.user?.image;
  const markedLocations = profile?.markedLocations || [];
  const isFriend = profile?.user?.isFriend;
  const isRequestPendingFromYou = profile?.user?.isFriendPendingFromYou;
  const isRequestPendingFromOther = profile?.user?.isFriendPendingFromOther;
  const profileObjectId = profile?.friendObj?.[0]?._id;
  const username = profile?.user?.username;

  // console.log('PROFILE: ', profile);

  useEffect(() => {
    getFriendDetail();
  }, []);

  const getFriendDetail = () => {
    const onSuccess = response => {
      if (response.success) {
        console.log('REs: ', response);
        setProfile(response.data);
      }
    };

    let userId = isMyProfile ? user?._id : friendId;
    const apiEndpoint = `${API.getUserProfile}${userId}`;
    callApi(API_METHODS.GET, apiEndpoint, null, onSuccess, onAPIError, setIsLoading);
  };

  const setTimeoutAndGoBack = () => {
    setTimeout(() => {
      setSuccessModalVisible(false);
      navigation.goBack();
    }, 3000);
  };

  const handleAcceptRequest = () => {
    const onSuccess = response => {
      if (response.success) {
        setSuccessModalVisible(true);
        setTimeoutAndGoBack();
      }
    };

    const apiEndpoint = `${API.friend}/${profileObjectId}`;
    callApi(API_METHODS.PATCH, apiEndpoint, {status: 'friend'}, onSuccess, onAPIError, setIsLoading);
  };

  const handleAddFriend = () => {
    const onSuccess = response => {
      if (response.success) {
        console.log('handleAddFriend: ', response);
        setSuccessModalVisible(true);
        setTimeoutAndGoBack();
      }
    };

    const userId = profile?.user._id;
    const apiEndpoint = `${API.createFriend}/${userId}`;
    callApi(API_METHODS.POST, apiEndpoint, {}, onSuccess, onAPIError, setIsLoading);
  };

  const handleUnFriend = () => {
    const onSuccess = response => {
      if (response.success) {
        console.log('handleUnFriend: ', response);
        navigation.goBack();
      }
    };

    const apiEndpoint = `${API.friend}/${profileObjectId}`;
    callApi(API_METHODS.DELETE, apiEndpoint, {}, onSuccess, onAPIError, setIsLoading);
  };

  const handleNotInterested = () => {
    const onSuccess = response => {
      if (response.success) {
        console.log('Not Interested');
      }
    };

    const apiEndpoint = `${API.createNotInterested}/${friendId}`;
    callApi(API_METHODS.POST, apiEndpoint, null, onSuccess, onAPIError);
  };

  const handleLocationPress = itemId => {
    if (itemId) navigation.navigate(ROUTES.LocationInfo, {locationId: itemId});
  };

  const handleStartChat = () => {
    navigation.navigate(ROUTES.ChatRoom, {inboxId: friendId});
  };

  const handleDeleteLocation = id => {
    setProfile(p => ({...p, markedLocations: p.markedLocations.filter(l => l._id !== id)}));

    const onSuccess = response => {
      if (response.success) {
        console.log('Location Deleted Successfully');
      }
    };

    const apiEndpoint = `${API.location}/${id}`;
    callApi(API_METHODS.DELETE, apiEndpoint, {}, onSuccess, onAPIError);
  };

  const handleLikeUnLikeLocation = ({_id}) => {
    commonAPI.locationLikeUnLike(_id);
    const locationIndex = markedLocations.findIndex(l => l._id == _id);
    markedLocations[locationIndex].isFavourite = !markedLocations?.[locationIndex]?.isFavourite;
    setProfile({...profile});
  };

  const handlePressFriends = () => {
    if (isMyProfile) navigation.navigate(ROUTES.MyFriends);
  };

  // Modal Title MSG
  let successModalTitle = Strings['Friend Request Accepted'];
  if (isFriend) successModalTitle = Strings.Unfriend;
  else if (!isFriend && !isRequestPendingFromYou && !isRequestPendingFromOther)
    successModalTitle = Strings['Friend Request Sent'];

  const renderButton = () => {
    if (isMyProfile || isSelf) {
      return (
        <AppButton
          title={Strings['Edit Profile']}
          style={friendRequestStyles.outlineButton}
          textStyle={friendRequestStyles.outlineButtonText}
          onPress={() =>
            navigation.navigate(ROUTES.Auth, {screen: ROUTES.CompleteProfile, params: {screenType: 'EDIT'}})
          }
        />
      );
    } else if (isFriend) {
      return (
        <>
          <AppButton
            title={Strings['Unfriend']}
            style={friendRequestStyles.outlineButton}
            textStyle={friendRequestStyles.outlineButtonText}
            onPress={handleUnFriend}
          />
          <ChatSquarePrimaryIcon width={40} height={40} onPress={handleStartChat} />
        </>
      );
    } else if (!isFriend && !isRequestPendingFromYou && !isRequestPendingFromOther) {
      return <AppButton title={Strings['Add Friend']} style={{width: '70%'}} onPress={handleAddFriend} />;
    } else if (!isFriend && isRequestPendingFromYou) {
      return (
        <>
          <SquareCrossIcon width={40} height={40} onPress={handleUnFriend} />
          <AppButton title={Strings['Accept Request']} style={{width: '70%'}} onPress={handleAcceptRequest} />
          <ChatSquarePrimaryIcon width={40} height={40} onPress={handleStartChat} />
        </>
      );
    } else if (!isFriend && isRequestPendingFromOther) {
      return (
        <>
          <SquareCrossIcon width={40} height={40} onPress={handleUnFriend} />
          <AppButton disabled={true} title={Strings['Request Pending']} style={{width: '70%'}} />
          <ChatSquarePrimaryIcon width={40} height={40} onPress={handleStartChat} />
        </>
      );
    }
  };

  return (
    <Screen>
      <Header title={isMyProfile ? Strings['My Profile'] : ''} />
      <Loader isLoading={isLoading} />
      <AppScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={getFriendDetail} />}>
        <View style={friendRequestStyles.profileContainer}>
          {profileImage ? (
            <Pressable onPress={() => setSelectedPhotoUri(profileImage)}>
              <FastImage
                source={{uri: profileImage, priority: FastImage.priority.normal}}
                style={friendRequestStyles.userImage}
              />
            </Pressable>
          ) : (
            <View style={friendRequestStyles.userImage}>
              <LogoIcon width={60} height={60} opacity={0.5} />
            </View>
          )}

          <View style={friendRequestStyles.namesContainer}>
            <AppText style={friendRequestStyles.fullname}>{getUserFullName(firstName, lastName)}</AppText>
            {username && <AppText style={friendRequestStyles.username}>{username}</AppText>}
          </View>
          <View style={friendRequestStyles.frndAndfollow}>
            <Pressable onPress={handlePressFriends} style={{alignItems: 'center'}}>
              <AppText>{totalFriends}</AppText>
              <AppText greyText style={{fontSize: 12}}>
                {Strings.Friends}
              </AppText>
            </Pressable>
            <View style={{alignItems: 'center'}}>
              <AppText>{totalLocations}</AppText>
              <AppText greyText style={{fontSize: 12}}>
                {Strings.Posts}
              </AppText>
            </View>
          </View>

          <View style={[locationStyles.cameraAndPublishBtnContainer, {marginBottom: 0, marginTop: 30}]}>
            {renderButton()}
          </View>
        </View>

        <View style={{marginTop: 30, flex: 1}}>
          <AppText style={friendRequestStyles.headTitle}>{Strings['Marked locations']}</AppText>

          {markedLocations && markedLocations.length > 0 ? (
            <View style={[globalStyles.gap15, {marginTop: 15}]}>
              {markedLocations.map((item, index) => (
                <LocationCard
                  key={index}
                  item={item}
                  type={isSelf ? 'MY_CARD' : ''}
                  isHeartVisible={!isSelf}
                  onPress={handleLocationPress}
                  onDelete={handleDeleteLocation}
                  onPressHeart={handleLikeUnLikeLocation}
                />
              ))}
            </View>
          ) : (
            !isLoading && (
              <View style={friendRequestStyles.noLocation}>
                <AppText>{Strings['No Location']}</AppText>
              </View>
            )
          )}
        </View>
      </AppScrollView>

      <SuccessModal
        visible={successModalVisible}
        setVisible={setSuccessModalVisible}
        title={successModalTitle}
        description={''}
      />

      {selectedPhotoUri ? (
        <ImageView
          images={[{uri: selectedPhotoUri}]}
          presentationStyle="overFullScreen"
          imageIndex={0}
          backgroundColor="rgba(0,0,0,1)"
          visible={true}
          keyExtractor={(item, index) => index.toString()}
          onRequestClose={() => setSelectedPhotoUri(null)}
        />
      ) : null}
    </Screen>
  );
};

export default UserProfile;
