import {View, Image, Pressable} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  AppButton,
  AppScrollView,
  AppText,
  AppTextInput,
  Header,
  MediaTypePickerSheet,
  Screen,
  ShowMessage,
  StarRating,
  SuccessModal,
} from '../../../components';
import {Strings} from '../../../utils/locales';
import {locationStyles, reviewStyles} from '../styles';
import {LocationBlackIcon, PencilIcon, PlusBtnCircleIcon, SquareCrossPrimaryIcon} from '../../../assets/icons';
import {FONTS} from '../../../utils/theme';
import globalStyles from '../../../../globalStyles';
import {imagePickerFromGallery, onAPIError, uploadImageToS3} from '../../../helpers';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {API} from '../../../network/Environment';

const SELECT_IMAGE_LENGTH = 5;
const MarkLocation = ({navigation, route}) => {
  const {location} = route.params || {};
  const [reviewText, setReviewText] = useState('');
  const [title, setTitle] = useState('Untitled Location');
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const mediaPickerSheetRef = useRef(null);

  const handleFinishRating = rating => {
    setRating(rating);
  };

  const imagePicker = type => {
    mediaPickerSheetRef.current?.close();

    setTimeout(async () => {
      const selectionLimit = SELECT_IMAGE_LENGTH - images.length;
      const assets = await imagePickerFromGallery({selectionLimit, isCamera: type == 'Camera'});
      setImages(i => [...i, ...assets]);
    }, 300);
  };

  const handleRemoveImage = (image, index) => {
    const updatedImages = images.filter(i => i.uri != image.uri);
    setImages(updatedImages);
  };

  const formatedImages = async () => {
    const uploadPromises = images.map(async image => {
      const file = {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
      };

      const imageUri = await uploadImageToS3(file);
      return imageUri;
    });

    try {
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading images: ', error);
    }
  };

  const handlePublish = async () => {
    if (images.length == 0) return ShowMessage(Strings['Please select at least one image']);

    setSuccessModalVisible(true);

    setTimeout(() => {
      setSuccessModalVisible(false);
      ShowMessage('Location will be published soon');
      navigation.popToTop();
    }, 3000);

    const formatedImgs = await formatedImages();

    const data = {
      title,
      description: reviewText,
      rating,
      images: formatedImgs,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
        address: location.name,
        description: '',
      },
    };

    publishAPI(data);
  };

  const publishAPI = data => {
    const onSuccess = response => {
      if (response.success) {
        ShowMessage('Location is published successfully');
      }
    };

    callApi(API_METHODS.POST, API.createLocation, data, onSuccess, onAPIError);
  };

  return (
    <Screen>
      <Header title={Strings['Mark Location']} />

      <AppScrollView>
        <View style={[locationStyles.currentLocationContainer, {marginTop: 0}]}>
          <View style={locationStyles.greyCircle}>
            <LocationBlackIcon />
          </View>

          <View style={globalStyles.flex1}>
            <AppText style={{fontFamily: FONTS.medium}}>{Strings['Current Location']}</AppText>
            <AppText greyText style={{fontSize: 12}}>
              {location?.name}
            </AppText>
          </View>

          <PencilIcon onPress={() => navigation.goBack()} />
        </View>

        <View style={{marginVertical: 20}}>
          <AppTextInput
            label={Strings['Title']}
            placeholder={Strings['Add a title to your location']}
            onChangeText={setTitle}
          />
        </View>

        <View style={{marginTop: 25}}>
          <AppText style={reviewStyles.yourReviewText}>{Strings['Your Review']}</AppText>
          <StarRating
            ratingContainerStyle={[reviewStyles.ratingContainer, {marginTop: 15}]}
            starContainerStyle={reviewStyles.starContainer}
            isDisabled={false}
            size={30}
            defaultRating={0}
            onFinishRating={handleFinishRating}
          />
        </View>

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

        {images?.length > 0 && (
          <View style={{marginTop: 40, gap: 15}}>
            <AppText style={[reviewStyles.yourReviewText, {marginBottom: 15}]}>{Strings.Images}</AppText>
            {images.map((image, index) => (
              <Pressable key={index} style={locationStyles.selectedImageContainer}>
                <Image source={{uri: image.uri}} style={locationStyles.selectedImage} />
                <SquareCrossPrimaryIcon
                  width={35}
                  height={35}
                  style={locationStyles.imageCross}
                  onPress={() => handleRemoveImage(image, index)}
                />
              </Pressable>
            ))}
          </View>
        )}

        <View style={globalStyles.flex1} />

        <View style={locationStyles.cameraAndPublishBtnContainer}>
          <PlusBtnCircleIcon
            width={40}
            height={40}
            onPress={() => mediaPickerSheetRef.current?.open()}
            disabled={images.length == SELECT_IMAGE_LENGTH}
            opacity={images.length == SELECT_IMAGE_LENGTH ? 0.5 : 1}
          />

          <AppButton title={Strings['Publish Location']} style={{width: '70%'}} onPress={handlePublish} />
        </View>
      </AppScrollView>

      <SuccessModal
        visible={successModalVisible}
        setVisible={setSuccessModalVisible}
        title={Strings['Location Published']}
        description={''}
      />

      <MediaTypePickerSheet onSelect={imagePicker} ref={mediaPickerSheetRef} />
    </Screen>
  );
};

export default MarkLocation;
