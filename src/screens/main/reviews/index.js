import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppButton, FlatListEmptyComponent, Header, Loader, Screen} from '../../../components';
import ReviewCard from '../../../components/UI/reviewCard';
import globalStyles from '../../../../globalStyles';
import {Strings} from '../../../utils/locales';
import {ROUTES} from '../../../utils/constants';
import {reviewStyles} from '../styles';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {API} from '../../../network/Environment';
import {onAPIError} from '../../../helpers';

const Reviews = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {locationId} = route.params || {};
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = () => {
    const onSuccess = response => {
      if (response.success) {
        setReviews(response.data.data);
      }
    };

    const apiEndpoint = `${API.reviews}?page=1&limit=1000&location=${locationId}`;
    callApi(API_METHODS.GET, apiEndpoint, null, onSuccess, onAPIError, setIsLoading);
  };

  return (
    <Screen>
      <Header title={Strings.Reviews} />
      <Loader isLoading={isLoading} />
      <FlatList
        data={reviews}
        contentContainerStyle={[
          globalStyles.screenPadding,
          globalStyles.flexGrow1,
          globalStyles.gap15,
          globalStyles.screenPaddingBottom10,
        ]}
        onRefresh={getReviews}
        refreshing={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <ReviewCard item={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <FlatListEmptyComponent label={isLoading ? '' : Strings['No Review']} />}
      />

      <View style={[globalStyles.screenPadding, reviewStyles.reviewButton]}>
        <AppButton title={Strings['Add Review']} onPress={() => navigation.navigate(ROUTES.AddReview, {locationId})} />
      </View>
    </Screen>
  );
};

export default Reviews;
