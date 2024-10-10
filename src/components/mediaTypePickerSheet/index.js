import {View, Pressable, StyleSheet} from 'react-native';
import React, {forwardRef, useEffect, useRef} from 'react';
import BottomSheet from '../bottomSheet';
import {CameraBorderedPrimaryIcon, GalleryPrimaryIcon} from '../../assets/icons';
import AppText from '../text';
import {COLORS, FONTS} from '../../utils/theme';
import {Strings} from '../../utils/locales';

const MediaTypePickerSheet = forwardRef(({onSelect}, ref) => {
  return (
    <BottomSheet ref={ref} height={210}>
      <View style={styles.container}>
        <Pressable style={styles.itemContainer} onPress={() => onSelect?.('Camera')}>
          <CameraBorderedPrimaryIcon width={40} height={40} />
          <AppText style={styles.label}>{Strings['Camera']}</AppText>
        </Pressable>

        <Pressable style={styles.itemContainer} onPress={() => onSelect?.('Gallery')}>
          <GalleryPrimaryIcon width={40} height={40} />
          <AppText style={styles.label}>{Strings['Gallery']}</AppText>
        </Pressable>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
  },
  itemContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    gap: 5,
    borderColor: COLORS.primary,
  },
  label: {fontFamily: FONTS.medium},
});

export default MediaTypePickerSheet;
