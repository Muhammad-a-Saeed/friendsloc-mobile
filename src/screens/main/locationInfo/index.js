import {View, FlatList, Image, Pressable} from 'react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import globalStyles from '../../../../globalStyles';
import {ResturantBarImage} from '../../../assets/images';
import {locationStyles} from '../styles';
import {
  ChevronCircledIcon,
  LocationPrimaryIcon,
  RedHeartCircleIcon,
  ShareCircleIcon,
  ShareWhiteCircleIcon,
  UserAddWhiteIcon,
  WhiteHeartCircleIcon,
} from '../../../assets/icons';
import {COLORS, FONTS} from '../../../utils/theme';
import {AppScrollView, AppText, Loader, MediaTypePickerSheet, Screen, StarRating} from '../../../components';
import {Strings} from '../../../utils/locales';
import ImageView from 'react-native-image-viewing';
import {ROUTES} from '../../../utils/constants';
import {getUserFullName, imagePickerFromGallery, isIOS, onAPIError, uploadImageToS3, wp} from '../../../helpers';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {API} from '../../../network/Environment';
import {useDispatch, useSelector} from 'react-redux';
import {userSelector} from '../../../redux/selectors';
import commonAPI from '../../../network/commonAPI';
import {locationActions} from '../../../redux/slices/locationSlice';
import FastImage from 'react-native-fast-image';

const LocationInfo = ({navigation, route}) => {
  const params = route?.params;
  const dispatch = useDispatch();
  const mediaPickerSheetRef = useRef(null);
  const user = useSelector(userSelector);
  const [locationDetail, setLocationDetail] = useState({});
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);
  const [isImageViewerShow, setIsImageViewerShow] = useState(false);
  const [isFavoriteLocation, setIsFavoriteLocation] = useState(false);
  const currentImageIndex = useRef(0);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);
  const locationId = params?.locationId;
  const prevScreen = params?.prevScreen;
  const isPrevScreenLocationSideDetail = prevScreen === 'LocationSideDetail';
  const description = locationDetail?.description;
  const images = locationDetail?.images;

  useEffect(() => {
    getLocationInfo(setIsLoading);
  }, []);

  const getLocationInfo = setIsLoading => {
    const onSuccess = response => {
      if (response.success) {
        setLocationDetail(response.data);
        setIsFavoriteLocation(response.data.isFavourite);
        setGallery(response.data.gallery);
      }
    };

    const apiEndpoint = `${API.getOneLocationInfo}${locationId}`;
    callApi(API_METHODS.GET, apiEndpoint, null, onSuccess, onAPIError, setIsLoading);
  };

  const handleMomentumScrollEnd = event => {
    const index = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) / Math.floor(event.nativeEvent.layoutMeasurement.width),
    );
    setActiveBoardIndex(index);
  };

  const handleAddFavoriteLocation = () => {
    setIsFavoriteLocation(prev => !prev);
    if (isPrevScreenLocationSideDetail) dispatch(locationActions.setLikeUnLikeToggle());
    commonAPI.locationLikeUnLike(locationId);
  };

  const handleLikePicture = () => {
    gallery[currentImageIndex.current].isLiked = !gallery[currentImageIndex.current].isLiked;
    setGallery([...gallery]);

    const onSuccess = response => {
      if (response.success) {
        console.log('Like/Unlike Photo Success');
      }
    };

    const apiEndpoint = `${API.likePicture}/${gallery[currentImageIndex.current]._id}`;
    callApi(API_METHODS.POST, apiEndpoint, {}, onSuccess, onAPIError);
  };

  const handleNavigateToReviews = () => {
    if (locationDetail?._id) navigation.navigate(ROUTES.ReviewStack, {screen: ROUTES.Reviews, params: {locationId}});
  };

  const handleAddPicture = type => {
    mediaPickerSheetRef.current?.close();

    setTimeout(async () => {
      const assets = await imagePickerFromGallery({isCamera: type === 'Camera'});
      if (assets.length == 0) return;

      const image = assets[0];
      const myId = user?._id;

      const imageObject = {
        content: image.uri,
        creator: {
          _id: myId,
          id: myId,
          firstName: user?.firstName,
          lastName: user?.lastName,
          image: user?.image,
        },
        location: locationId,
      };

      setGallery(g => [imageObject, ...g]);

      const onSuccess = response => {};

      const file = {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
      };

      const imageUri = await uploadImageToS3(file);

      const data = {content: imageUri};
      const apiEndpoint = `${API.createGallery}/${locationId}`;
      callApi(API_METHODS.POST, apiEndpoint, data, onSuccess, onAPIError);
    }, 300);
  };

  const handleAddFriend = () => {
    const userId = gallery?.[currentImageIndex?.current]?.creator?._id;

    const onSuccess = response => {
      if (response.success) {
        console.log('Friend Request sent');
      }
    };

    const apiEndpoint = `${API.createFriend}/${userId}`;
    callApi(API_METHODS.POST, apiEndpoint, {}, onSuccess, onAPIError);
  };

  if (isLoading) return <Loader isLoading={isLoading} />;

  const ImageViewerHeaderWrapper = isIOS ? Screen : Fragment;

  return (
    <View style={globalStyles.flex1}>
      <View>
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => {
            return <Image source={ResturantBarImage} style={{height: 250, width: wp(100)}} />;
          }}
          renderItem={({item, index}) => (
            <FastImage source={{uri: item, priority: FastImage.priority.high}} style={locationStyles.mainImage} />
          )}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={handleMomentumScrollEnd}
          ref={flatListRef}
        />
        <ChevronCircledIcon
          style={locationStyles.backButton}
          width={30}
          height={30}
          onPress={() => navigation.goBack()}
        />
        <Pressable onPress={handleAddFavoriteLocation}>
          {isFavoriteLocation ? (
            <RedHeartCircleIcon width={60} style={locationStyles.heartIcon} />
          ) : (
            <WhiteHeartCircleIcon width={60} style={locationStyles.heartIcon} />
          )}
        </Pressable>
      </View>

      <PaginateDots
        length={locationDetail?.images?.length}
        style={locationStyles.paginatedDots}
        activeIndex={activeBoardIndex}
      />

      <AppScrollView style={{marginTop: 20}}>
        <View style={locationStyles.rowItem}>
          <AppText style={locationStyles.locationName}>{locationDetail?.title}</AppText>
          <AppText
            style={locationStyles.reportText}
            onPress={() => navigation.navigate(ROUTES.ReportLocation, {locationId})}>
            {Strings['Report']}
          </AppText>
        </View>

        <View style={{marginTop: 20}}>
          <Pressable onPress={handleNavigateToReviews} style={locationStyles.reviewContainer}>
            <AppText style={locationStyles.reviewTitle}>
              {Strings.Reviews}
              <AppText greyText style={{fontSize: 12}}>
                {' '}
                ({locationDetail?.totalReviews})
              </AppText>
            </AppText>
            <View style={locationStyles.starContainer}>
              <StarRating size={15} defaultRating={locationDetail?.ratingsAverage} />
              <AppText greyText style={{fontSize: 12}}>
                ({locationDetail?.ratingsAverage})
              </AppText>
            </View>
          </Pressable>

          <View style={locationStyles.locationAndShare}>
            <View style={locationStyles.locationAndtext}>
              <LocationPrimaryIcon width={20} />
              <AppText greyText style={{fontFamily: FONTS.medium, maxWidth: '95%'}}>
                {locationDetail.location?.address}
              </AppText>
            </View>

            <ShareCircleIcon width={25} onPress={() => navigation.navigate(ROUTES.ShareLocation, {locationId})} />
          </View>
        </View>

        {description && (
          <View style={locationStyles.sectionMarginGap}>
            <AppText style={locationStyles.desctitle}>{Strings.Description}</AppText>
            <AppText style={{fontSize: 12}} greyText>
              {description}
            </AppText>
          </View>
        )}

        <View style={[locationStyles.sectionMarginGap, {flex: 1}]}>
          <View style={locationStyles.picturesTitle}>
            <AppText style={locationStyles.pictureTitle}>{Strings.Pictures}</AppText>

            <Pressable style={locationStyles.addPicButton} onPress={() => mediaPickerSheetRef.current?.open()}>
              <AppText primary style={{fontFamily: FONTS.medium}}>
                {Strings['Add Picture']}
              </AppText>
            </Pressable>
          </View>

          <View style={[locationStyles.imagesContainer, globalStyles.flex1]}>
            {gallery?.length > 0 ? (
              gallery?.map((item, index) => (
                <Pressable
                  key={index}
                  style={locationStyles.pictureContainer}
                  onPress={() => {
                    setIsImageViewerShow(true);
                    currentImageIndex.current = index;
                  }}>
                  <FastImage
                    source={{uri: item?.content, priority: FastImage.priority.normal}}
                    style={locationStyles.picture}
                  />
                </Pressable>
              ))
            ) : (
              <View style={locationStyles.noPicContainer}>
                <AppText>{Strings['No Pictures']}</AppText>
              </View>
            )}
          </View>
        </View>
      </AppScrollView>

      <ImageView
        images={gallery?.map(image => ({uri: image.content}))}
        presentationStyle="overFullScreen"
        imageIndex={currentImageIndex.current}
        backgroundColor="rgba(0,0,0,1)"
        visible={isImageViewerShow}
        keyExtractor={(item, index) => index.toString()}
        onImageIndexChange={index => (currentImageIndex.current = index)}
        onRequestClose={() => setIsImageViewerShow(false)}
        HeaderComponent={() => (
          <ImageViewerHeaderWrapper>
            <View style={locationStyles.imageViewHeaderContainer}>
              <ChevronCircledIcon width={30} height={30} onPress={() => setIsImageViewerShow(false)} />
              <ShareWhiteCircleIcon
                width={25}
                height={25}
                onPress={() => {
                  setIsImageViewerShow(false);
                  navigation.navigate(ROUTES.ShareLocation, {locationId});
                }}
              />
            </View>
          </ImageViewerHeaderWrapper>
        )}
        FooterComponent={() => {
          if (user?._id === gallery?.[currentImageIndex?.current]?.creator?._id) return null;

          return (
            <Screen>
              <View style={[locationStyles.imageViewHeaderContainer, locationStyles.sliderFooter]}>
                <Pressable onPress={handleAddFriend} style={locationStyles.slideradduser}>
                  <Image source={ResturantBarImage} style={locationStyles.slideruserImage} />
                  <AppText style={locationStyles.sliderusername}>
                    {getUserFullName(
                      gallery[currentImageIndex.current].creator.firstName,
                      gallery[currentImageIndex.current].creator.lastName,
                    )}
                  </AppText>
                  <UserAddWhiteIcon width={20} height={20} />
                </Pressable>

                {gallery[currentImageIndex.current]?.isLiked ? (
                  <RedHeartCircleIcon width={50} height={50} onPress={handleLikePicture} />
                ) : (
                  <WhiteHeartCircleIcon width={50} height={50} onPress={handleLikePicture} />
                )}
              </View>
            </Screen>
          );
        }}
      />

      <MediaTypePickerSheet onSelect={handleAddPicture} ref={mediaPickerSheetRef} />
    </View>
  );
};

export const PaginateDots = ({activeIndex, color1 = COLORS.primary, color2 = COLORS.grey2, style, length = 3}) => {
  return (
    <View style={[locationStyles.dotsContainer, style]}>
      {Array.from({length})?.map((i, index) => (
        <Dot key={index} isActive={index === activeIndex} color1={color1} color2={color2} />
      ))}
    </View>
  );
};

const Dot = ({isActive, color1, color2}) => {
  return (
    <View
      style={
        isActive
          ? [locationStyles.dotActive, {backgroundColor: color1}]
          : [locationStyles.dotInActive, {backgroundColor: color2}]
      }
    />
  );
};

export default LocationInfo;
