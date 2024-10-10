import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {COLORS, FONTS} from '../../utils/theme';
import {SearchIcon} from '../../assets/icons';
import {StyleSheet} from 'react-native';
import {Strings} from '../../utils/locales';

const GooglePlacesInput = ({
  onSelect,
  region = {
    latitude: 48.85552283403529,
    longitude: 2.37035159021616,
    latitudeDelta: 5,
    longitudeDelta: 5,
  },
  textInputProps,
  TextInputComp,
  containerStyle,
  listViewStyle,
  ...otherProps
}) => {
  return (
    <GooglePlacesAutocomplete
      nearbyPlacesAPI="GooglePlacesSearch"
      renderLeftButton={() => <SearchIcon style={styles.searchIcon} height={20} width={20} />}
      renderDescription={row => row.description || row.formatted_address || row.name}
      keepResultsAfterBlur={false}
      listViewDisplayed={false}
      enablePoweredByContainer={false}
      isRowScrollable={true}
      debounce={300}
      // currentLocation={true}
      // currentLocationLabel="Current location"
      onFail={error => console.error(error)}
      placeholder={Strings['Search']}
      textInputProps={{
        style: styles.textInput,
        selectionColor: COLORS.primary,
        placeholderTextColor: COLORS.textGray,
        ...textInputProps,
      }}
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: 'distance',
      }}
      onPress={(data, details = null) => onSelect?.(data, details)}
      query={{
        key: '',
        location: `${region.latitude}, ${region.longitude}`,
      }}
      styles={{
        container: [styles.container, containerStyle],
        // textInput: styles.textInput,
        textInputContainer: styles.textInputContainer,
        listView: [styles.listView, listViewStyle],
        row: {},
        description: styles.listDescription,
      }}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  container: {zIndex: 1},
  listView: {
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    paddingRight: 10,
    shadowColor: COLORS.black,
    elevation: 1,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textInputContainer: {alignItems: 'center', height: 45},
  textInput: {
    width: '100%',
    paddingLeft: 38,
    backgroundColor: COLORS.grey5,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: COLORS.grey2,
    marginBottom: 0,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    height: 45,
  },
  searchIcon: {position: 'absolute', zIndex: 2, marginLeft: 10},
  listDescription: {color: COLORS.black, fontFamily: FONTS.regular},
});

export default GooglePlacesInput;
