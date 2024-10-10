import React from 'react';
import MapView, {PROVIDER_GOOGLE, PROVIDER_DEFAULT} from 'react-native-maps';
import {isIOS} from '../../helpers';
import {StyleSheet} from 'react-native';

const GoogleMap = ({
  children,
  region = {
    latitude: 48.85552283403529,
    longitude: 2.37035159021616,
    latitudeDelta: 5,
    longitudeDelta: 5,
  },
  ...otherProps
}) => {
  return (
    <MapView
      zoomControlEnabled={false}
      zoomEnabled={true}
      zoomTapEnabled={true}
      style={styles.map}
      provider={isIOS ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
      initialRegion={region}
      region={region}
      {...otherProps}>
      {children}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GoogleMap;
