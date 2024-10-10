import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../utils/theme';

const FlatListEmptyComponent = ({label}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.black,
  },
});

export default FlatListEmptyComponent;
