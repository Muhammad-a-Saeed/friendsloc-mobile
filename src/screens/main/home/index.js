import {View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import GoogleMap from '../../../components/googleMap';
import GooglePlacesInput from '../../../components/googlePlacesInput';
import {AppText, Header, HeartAndBellIcon, Loader, Screen} from '../../../components';
import {homeStyles} from '../styles';
import {Strings} from '../../../utils/locales';
import {LocationPlusPrimaryIcon, TriangleIcon} from '../../../assets/icons';
import {Marker} from 'react-native-maps';
import {ROUTES} from '../../../utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import {userSelector} from '../../../redux/selectors';
import {getUserFullName, onAPIError} from '../../../helpers';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {API} from '../../../network/Environment';
import useLocation from '../../../hooks/useLocation';
import {useIsFocused} from '@react-navigation/native';
import {locationActions} from '../../../redux/slices/locationSlice';
import {Svg} from 'react-native-svg';
import FastImage from 'react-native-fast-image';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [location, getMyLocation] = useLocation();
  const isScreenFocused = useIsFocused();
  const [region, setRegion] = useState({
    name: '',
    latitude: 48.85552283403529,
    longitude: 2.37035159021616,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });
  const [mapLocations, setMapLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTimeFocused, setIsFirstTimeFocused] = useState(true);
  const user = useSelector(userSelector) || {};

  const getMapLocationMarkers = region => {
    const onSuccess = response => {
      if (response.success) {
        setIsFirstTimeFocused(false);
        setMapLocations(response.data.data);
      }
    };

    const apiEndpoint = `${API.mapLocations}?location=${region.longitude},${region.latitude}&km=1000`;
    callApi(API_METHODS.GET, apiEndpoint, null, onSuccess, onAPIError, isFirstTimeFocused ? setIsLoading : () => {});
  };

  useEffect(() => {
    if (!location && isScreenFocused) {
      getMyLocation();
    }
  }, [location, isScreenFocused]);

  useEffect(() => {
    if (isScreenFocused) {
      getMapLocationMarkers(region);
    }
  }, [isScreenFocused, region]);

  useEffect(() => {
    if (location) {
      const formatedRegion = {...region, latitude: location?.latitude, longitude: location?.longitude};
      setRegion(formatedRegion);
    }
  }, [location]);

  const handleSearchLocation = (data, details) => {
    const formatedRegion = {
      ...region,
      name: data.description,
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };

    setRegion(formatedRegion);
    getMapLocationMarkers(formatedRegion);
  };

  const handlePressMapMarker = marker => {
    dispatch(locationActions.setSelectedLocation(marker));
    navigation.navigate(ROUTES.LocationSideDetail);
  };

  const renderUserPicAndName = () => {
    const image = user?.image;
    return (
      <View style={homeStyles.userContainer}>
        {image && <FastImage source={{uri: image, priority: FastImage.priority.high}} style={homeStyles.picture} />}
        <View style={homeStyles.gap3}>
          <AppText greyText style={homeStyles.welcomeText}>
            {Strings['Welcome Back!']}
          </AppText>
          <AppText style={homeStyles.username}>{getUserFullName(user?.firstName, user?.lastName)}</AppText>
        </View>
      </View>
    );
  };

  return (
    <Screen>
      <Loader isLoading={isLoading} />
      <View style={homeStyles.headerAndInputContainer}>
        <Header LeftIcon={renderUserPicAndName} RightIcon={HeartAndBellIcon} />
        <GooglePlacesInput
          containerStyle={homeStyles.searchInput}
          listViewStyle={homeStyles.searchListView}
          onSelect={handleSearchLocation}
        />
      </View>

      <GoogleMap region={region}>
        {mapLocations.map((mapLocation, index) => (
          <Marker
            key={index}
            draggable={false}
            tracksViewChanges={false}
            coordinate={{
              latitude: mapLocation?.location?.coordinates[1],
              longitude: mapLocation?.location?.coordinates[0],
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
            title={mapLocation.title}
            description={mapLocation.description}
            style={homeStyles.marker}
            onPress={() => handlePressMapMarker(mapLocation)}>
            <Svg width={55} height={55}>
              <Image source={{uri: mapLocation.images[0]}} style={homeStyles.mapMarkerImage} />
            </Svg>
            <TriangleIcon style={homeStyles.makerImageTriangle} />
          </Marker>
        ))}
      </GoogleMap>

      <LocationPlusPrimaryIcon
        style={homeStyles.addLocationIcon}
        width={50}
        height={50}
        onPress={() => navigation.navigate(ROUTES.SelectLocation)}
      />
    </Screen>
  );
};

export default Home;
