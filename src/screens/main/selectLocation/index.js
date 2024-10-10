import {View, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {AppText, Header, Screen, SeperatorLine} from '../../../components';
import {Strings} from '../../../utils/locales';
import globalStyles from '../../../../globalStyles';
import {homeStyles, locationStyles} from '../styles';
import GooglePlacesInput from '../../../components/googlePlacesInput';
import {LocationBlackIcon, LocationRedGreenIcon} from '../../../assets/icons';
import {FONTS} from '../../../utils/theme';
import {ROUTES} from '../../../utils/constants';
import useLocation from '../../../hooks/useLocation';

const SelectLocation = ({navigation}) => {
  const [location, getMyLocation] = useLocation();

  useEffect(() => {
    getMyLocation();
  }, []);

  const handleSearchLocation = (data, details) => {
    const location = {
      name: data.description,
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };

    handleNavigateToMarkLocationScreen(location);
  };

  const handleNavigateToMarkLocationScreen = location => {
    navigation.navigate(ROUTES.MarkLocation, {location});
  };

  return (
    <Screen>
      <Header title={Strings['Select Location']} />
      <View style={[globalStyles.flex1, globalStyles.screenPadding]}>
        <View>
          <GooglePlacesInput listViewStyle={homeStyles.searchListView} onSelect={handleSearchLocation} />
        </View>
        <View style={homeStyles.selecLocationContent}>
          {location && (
            <Pressable
              onPress={() => handleNavigateToMarkLocationScreen(location)}
              style={locationStyles.currentLocationContainer}>
              <View style={locationStyles.greyCircle}>
                <LocationBlackIcon />
              </View>

              <View style={globalStyles.flex1}>
                <AppText style={{fontFamily: FONTS.medium}}>Current Location</AppText>
                <AppText greyText style={{fontSize: 12}}>
                  {location?.name}
                </AppText>
              </View>
            </Pressable>
          )}

          {location && <SeperatorLine style={{marginVertical: 10}} />}

          <View style={[locationStyles.currentLocationContainer, {marginTop: undefined}]}>
            <View style={locationStyles.greyCircle}>
              <LocationRedGreenIcon />
            </View>
            <AppText
              onPress={() => navigation.navigate(ROUTES.SelectLocationOnMap)}
              style={locationStyles.selectionLocationMapText}>
              {Strings['Set Location on map']}
            </AppText>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default SelectLocation;
