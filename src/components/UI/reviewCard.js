import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import globalStyles from '../../../globalStyles';
import {SeaImage} from '../../assets/images';
import AppText from '../text';
import {FONTS} from '../../utils/theme';
import StarRating from '../starRating';
import {getTimeFromNow, getUserFullName} from '../../helpers';

const ReviewCard = ({item = {}}) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameAndImageContainer}>
        <Image source={SeaImage} style={styles.image} />
        <View style={styles.userNameContainer}>
          <AppText style={styles.username}>
            {getUserFullName(item?.creator?.[0]?.firstName, item?.creator?.[0]?.lastName)}
          </AppText>
          <AppText style={styles.timestamp} greyText>
            {getTimeFromNow(item?.createdAt)}
          </AppText>
        </View>
      </View>

      <StarRating size={10} defaultRating={item.rating} ratingContainerStyle={{alignSelf: 'flex-start'}} />

      <AppText greyText style={styles.reviewtext}>
        {item.review}
      </AppText>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {width: '100%', minHeight: 100, ...globalStyles.boxShadow1, borderRadius: 10, padding: 10, gap: 5},
  image: {width: 38, height: 38, borderRadius: 100},
  userNameContainer: {gap: 2},
  username: {fontFamily: FONTS.semiBold},
  nameAndImageContainer: {flexDirection: 'row', alignItems: 'center', gap: 10},
  timestamp: {fontSize: 12},
  reviewtext: {fontSize: 12},
});

export default ReviewCard;
