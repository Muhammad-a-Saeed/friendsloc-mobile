import {View} from 'react-native';
import React, {useState} from 'react';
import {
  AppButton,
  AppScrollView,
  AppText,
  AppTextInput,
  Header,
  Loader,
  Screen,
  StarRating,
  SuccessModal,
} from '../../../components';
import {Strings} from '../../../utils/locales';
import {reviewStyles} from '../styles';
import globalStyles from '../../../../globalStyles';
import {ROUTES} from '../../../utils/constants';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {API} from '../../../network/Environment';
import {onAPIError} from '../../../helpers';

const AddReview = ({navigation, route}) => {
  const [reviewText, setReviewText] = useState('');
  const {locationId} = route.params || {};
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const handleAddReview = () => {
    const onSuccess = response => {
      if (response.success) {
        setSuccessModalVisible(true);

        setTimeout(() => {
          setSuccessModalVisible(false);
          navigation.goBack();
        }, 3000);
      }
    };

    const data = {review: reviewText, rating: rating};
    const apiEndpoint = `${API.reviews}create/${locationId}`;
    callApi(API_METHODS.POST, apiEndpoint, data, onSuccess, onAPIError, setIsLoading);
  };

  return (
    <Screen>
      <Header title={Strings['Add Review']} />
      <Loader isLoading={isLoading} />

      <AppScrollView>
        <View>
          <AppText style={reviewStyles.yourReviewText}>{Strings['Your Review']}</AppText>
          <StarRating
            ratingContainerStyle={reviewStyles.ratingContainer}
            starContainerStyle={reviewStyles.starContainer}
            isDisabled={false}
            size={30}
            defaultRating={0}
            onFinishRating={setRating}
          />
          <View style={{marginTop: 40}}>
            <AppText style={reviewStyles.feedbackText}>{Strings.Feedback}</AppText>
            <AppTextInput
              containerStyle={reviewStyles.feedbackInputContainer}
              textInputStyle={reviewStyles.feedbackInput}
              placeholder={Strings['Add your Feedback']}
              multiline={true}
              onChangeText={setReviewText}
              maxLength={120}
            />
            <AppText greyText style={reviewStyles.count}>
              {reviewText.length}/120
            </AppText>
          </View>
        </View>
      </AppScrollView>

      <View style={[globalStyles.screenPadding, reviewStyles.reviewButton]}>
        <AppButton title={Strings['Add Review']} onPress={handleAddReview} />
      </View>

      <SuccessModal
        visible={successModalVisible}
        setVisible={setSuccessModalVisible}
        title={Strings['Review Added']}
        description={''}
      />
    </Screen>
  );
};

export default AddReview;
