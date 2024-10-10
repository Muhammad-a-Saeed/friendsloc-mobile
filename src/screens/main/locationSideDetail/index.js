import {View, Image, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {AppText, Header, LocationCard, Screen, SeperatorLine} from '../../../components';
import {ShareCircleIcon, TriangleIcon} from '../../../assets/icons';
import GoogleMap from '../../../components/googleMap';
import {Marker} from 'react-native-maps';
import {homeStyles} from '../styles';
import ReviewCard from '../../../components/UI/reviewCard';
import {Strings} from '../../../utils/locales';
import globalStyles from '../../../../globalStyles';
import {getUserFullName} from '../../../helpers';
import {ROUTES} from '../../../utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import {selectedLocationSelector, userSelector} from '../../../redux/selectors';
import commonAPI from '../../../network/commonAPI';
import {locationActions} from '../../../redux/slices/locationSlice';
import {Svg} from 'react-native-svg';

const LocationSideDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector) || {};
  const locationDetail = useSelector(selectedLocationSelector) || {};
  const friends = locationDetail?.friends?.filter?.(f => f?._id !== user?._id); // REMOVE MYSELF FROM THE FRIEND LIST

  const region = {
    name: locationDetail?.location?.address,
    latitude: locationDetail?.location?.coordinates?.[1],
    longitude: locationDetail?.location?.coordinates?.[0],
    latitudeDelta: 5,
    longitudeDelta: 5,
  };

  const handleLikeUnlikeLocation = item => {
    const locationId = item?._id;
    commonAPI.locationLikeUnLike(locationId);
    dispatch(locationActions.setLikeUnLikeToggle());
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
      <View style={homeStyles.headerAndInputContainer}>
        <Header
          title={locationDetail?.title}
          RightIcon={
            <ShareCircleIcon
              width={25}
              height={25}
              onPress={() => navigation.navigate(ROUTES.ShareLocation, {locationId: locationDetail?._id})}
            />
          }
        />
      </View>

      <GoogleMap region={region}>
        <Marker draggable={false} tracksViewChanges={false} coordinate={region} style={homeStyles.marker}>
          <Svg width={55} height={55}>
            <Image source={{uri: locationDetail.images[0]}} style={homeStyles.mapMarkerImage} />
          </Svg>
          <TriangleIcon style={homeStyles.makerImageTriangle} />
        </Marker>
      </GoogleMap>

      <View style={homeStyles.sideBarContainer}>
        <View style={{padding: 15, flex: 1}}>
          <AppText style={homeStyles.sideBarTitle}>{Strings.Friends}</AppText>
          <ScrollView
            style={[homeStyles.friendsContainer]}
            contentContainerStyle={[globalStyles.gap10, globalStyles.screenPaddingBottom10, globalStyles.flexGrow1]}
            showsVerticalScrollIndicator={false}>
            {friends?.length > 0 ? (
              friends.map((item, index) => (
                <Pressable onPress={() => handlePressOnFriend(item)} key={index} style={homeStyles.friend}>
                  <Image source={{uri: item.image}} style={homeStyles.friendImage} />
                  <AppText style={homeStyles.friendName}>{getUserFullName(item.firstName, item.lastName)}</AppText>
                </Pressable>
              ))
            ) : (
              <View style={homeStyles.noReviewContainer}>
                <AppText style={homeStyles.noFriendText}>{Strings['No Friend']}</AppText>
              </View>
            )}
          </ScrollView>
        </View>

        <SeperatorLine />

        <ScrollView
          style={homeStyles.reviewContainer}
          contentContainerStyle={[globalStyles.gap10, globalStyles.screenPaddingBottom10, globalStyles.flexGrow1]}
          showsVerticalScrollIndicator={false}>
          {locationDetail.reviews.length > 0 ? (
            locationDetail.reviews.map((item, index) => <ReviewCard key={index} item={item} />)
          ) : (
            <View style={homeStyles.noReviewContainer}>
              <AppText style={homeStyles.noFriendText}>{Strings['No Review']}</AppText>
            </View>
          )}
        </ScrollView>
      </View>

      <LocationCard
        containerStyle={homeStyles.locationCard}
        onPress={() =>
          navigation.navigate(ROUTES.LocationInfo, {locationId: locationDetail?._id, prevScreen: 'LocationSideDetail'})
        }
        item={locationDetail}
        onPressHeart={handleLikeUnlikeLocation}
      />
    </Screen>
  );
};

export default LocationSideDetail;
