import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppButton, AppText, Header, Screen} from '../../../components';
import {ChevronCircledIcon, LocationSelectPrimaryIcon, MapPinIcon} from '../../../assets/icons';
import GooglePlacesInput from '../../../components/googlePlacesInput';
import {homeStyles, locationStyles} from '../styles';
import GoogleMap from '../../../components/googleMap';
import globalStyles from '../../../../globalStyles';
import {Strings} from '../../../utils/locales';
import {Callout, CalloutSubview, Marker} from 'react-native-maps';
import {ROUTES} from '../../../utils/constants';
import useLocation from '../../../hooks/useLocation';

const SelectLocationOnMap = ({navigation}) => {
  const [location, getMyLocation, , reverseGeoCoding] = useLocation();

  const [region, setRegion] = useState({
    name: '',
    latitude: 48.85552283403529,
    longitude: 2.37035159021616,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });

  useEffect(() => {
    if (location) {
      setRegion(r => ({...r, ...location}));
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
  };

  const renderHeader = () => {
    return (
      <View style={locationStyles.mapLocationHeaderContainer}>
        <ChevronCircledIcon width={30} height={30} />
        <GooglePlacesInput listViewStyle={[homeStyles.searchListView]} onSelect={handleSearchLocation} />
      </View>
    );
  };

  const handleDragEndOnMap = async e => {
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;
    let placeName = '';

    try {
      placeName = await reverseGeoCoding(lat, lng);
    } catch (error) {
      console.log(error);
    }

    setRegion(r => ({...r, latitude: lat, longitude: lng, name: placeName}));
  };

  const handleDone = () => {
    navigation.navigate(ROUTES.MarkLocation, {location: region});
  };

  return (
    <Screen>
      <Header LeftIcon={renderHeader} />

      <View style={[globalStyles.flex1, {zIndex: -1}]}>
        <GoogleMap region={region}>
          <Marker draggable={true} tracksViewChanges={false} coordinate={region} onDragEnd={handleDragEndOnMap}>
            <MapPinIcon width={80} height={80} />
            {region.name && (
              <Callout>
                <AppText>{region.name}</AppText>
              </Callout>
            )}
          </Marker>
        </GoogleMap>
        <LocationSelectPrimaryIcon style={locationStyles.currentLocation} onPress={getMyLocation} />
        <AppButton title={Strings.Done} style={locationStyles.doneBtn} onPress={handleDone} disabled={!region.name} />
      </View>
    </Screen>
  );
};

export default SelectLocationOnMap;
