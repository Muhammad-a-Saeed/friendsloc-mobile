import {View, StyleSheet, Image, Pressable} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS, FONTS} from '../../utils/theme';
import globalStyles from '../../../globalStyles';
import AppText from '../text';
import {HeartIcon, LocationGreyIcon, MenuDotIcon, RedHeartIcon} from '../../assets/icons';
import StarRating from '../starRating';
import {Strings} from '../../utils/locales';
import {getRandomItemFromArray} from '../../helpers';

const LocationCard = ({containerStyle, type, item, onPress, onPressHeart, isHeartVisible = true, onDelete}) => {
  const [isMenuDropdownShow, setIsMenuDropdownShow] = useState(false);
  const images = item?.images;
  const locationText = item?.location?.address;
  return (
    <Pressable style={[styles.container, containerStyle]} onPress={() => onPress(item._id)}>
      {images?.length > 0 && (
        <Image source={{uri: useCallback(getRandomItemFromArray(images), [])}} style={styles.image} />
      )}

      <View style={styles.contentContainer}>
        <AppText style={styles.locationName} numberOfLines={2}>
          {item?.title}
        </AppText>
        <View style={styles.ratingContainer}>
          <StarRating
            size={12}
            defaultRating={item?.ratingsAverage}
            isDisabled
            ratingContainerStyle={{alignSelf: 'flex-start', marginEnd: 5}}
          />
          <AppText style={styles.ratingText}>({item?.ratingsQuantity})</AppText>
        </View>
        <View style={styles.sublocationContainer}>
          <LocationGreyIcon width={15} height={15} style={styles.alignStart} />
          <AppText style={styles.ratingText}>{locationText}</AppText>
        </View>
      </View>

      {type === 'MY_CARD' ? (
        <Pressable style={styles.alignStart} onPress={() => setIsMenuDropdownShow(p => !p)}>
          <MenuDotIcon style={styles.alignStart} width={20} height={20} />
        </Pressable>
      ) : (
        isHeartVisible && (
          <Pressable style={styles.alignStart} onPress={() => onPressHeart(item)}>
            {item?.isFavourite ? <RedHeartIcon /> : <HeartIcon />}
          </Pressable>
        )
      )}

      {isMenuDropdownShow ? (
        <View style={styles.dropdown}>
          <AppText onPress={() => onDelete(item._id)}>{Strings.Delete}</AppText>
        </View>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 100,
    backgroundColor: COLORS.white,
    ...globalStyles.boxShadow1,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  image: {width: '25%', height: '100%', borderRadius: 15},
  contentContainer: {flex: 1, gap: 3},
  ratingContainer: {flexDirection: 'row', alignItems: 'center'},
  locationName: {fontFamily: FONTS.medium, fontSize: 16},
  sublocationContainer: {flexDirection: 'row', alignItems: 'center', gap: 3},
  ratingText: {fontSize: 12},
  ratingContainerStyle: {width: '45%'},
  alignStart: {alignSelf: 'flex-start'},
  dropdown: {position: 'absolute', right: '7%', ...globalStyles.boxShadow1, padding: 10, borderRadius: 10, top: 35},
});

export default LocationCard;
