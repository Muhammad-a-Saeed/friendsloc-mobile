import {View, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Wrapper} from '../common';
import globalStyles from '../../../../globalStyles';
import {profileStyles, signInStyles} from '../styles';
import {Strings} from '../../../utils/locales';
import {AppButton, AppText, AppTextInput, Loader} from '../../../components';
import {CameraCirclePrimaryIcon, LogoIcon} from '../../../assets/icons';
import {getDeviceIdAndFCM, imagePickerFromGallery, onAPIError, uploadImageToS3} from '../../../helpers';
import {ROUTES} from '../../../utils/constants';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {API} from '../../../network/Environment';
import useLocation from '../../../hooks/useLocation';
import {useDispatch, useSelector} from 'react-redux';
import {userSelector} from '../../../redux/selectors';
import commonAPI from '../../../network/commonAPI';
import {authActions} from '../../../redux/slices/authSlice';

const CompleteProfile = ({navigation, route}) => {
  const {screenType} = route.params || {};
  const isEditScreen = screenType === 'EDIT';
  const user = useSelector(userSelector) || {};
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [location, getMyLocation] = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditScreen) {
      getUserDetail();
    }

    getMyLocation();
  }, []);

  const getUserDetail = async () => {
    setIsLoading(true);
    const response = await commonAPI.getUserDetail();
    setIsLoading(false);
    if (response.success) {
      const responseUser = response?.user;

      setFirstName(responseUser?.firstName);
      setLastName(responseUser?.lastName);
      setImage({uri: responseUser?.image});
      setUsername(responseUser?.username);
    }
  };

  const updateUserAPI = async apiBody => {
    setIsLoading(true);
    const response = await commonAPI.updateMe(apiBody);
    setIsLoading(false);

    if (response.success) {
      const user = response?.data?.user;
      if (user) dispatch(authActions.setUser(user));
      navigation.popToTop();
    }
  };

  const handleSelectImage = async () => {
    const assets = await imagePickerFromGallery();

    if (assets.length > 0) setImage(assets[0]);
  };

  const handleContinue = async () => {
    let imageURI = user?.image || null;

    if (image && image?.uri !== user?.image) {
      const file = {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
      };

      setIsLoading(true);
      imageURI = await uploadImageToS3(file);
    }

    const data = {
      firstName,
      lastName,
      device: await getDeviceIdAndFCM(),
    };

    if (imageURI) data.image = imageURI;
    if (user?.username !== username) data.username = username;

    if (location) {
      data.location = {
        type: 'Point',
        coordinates: [location?.longitude, location?.latitude],
        address: location?.name,
        description: '',
      };
    }

    if (isEditScreen) return updateUserAPI(data);

    const onSuccess = response => {
      if (response.success) {
        // navigation['navigate'](ROUTES.ImportContacts);

        const {refreshToken, token, user} = response.data || {};

        if (refreshToken) dispatch(authActions.setRefreshToken(refreshToken));
        if (token) dispatch(authActions.setAccessToken(token));
        if (user) dispatch(authActions.setUser(user));

        navigation.navigate(ROUTES.SuccessfullCreated, {title: Strings['Profile Created'], description: ''});
      }
    };

    callApi(API_METHODS.POST, API.accountSetup, data, onSuccess, onAPIError, setIsLoading);
  };

  return (
    <Wrapper showLogo={!isEditScreen} showHeader={isEditScreen} headerTitle={Strings['Edit Profile']}>
      <Loader isLoading={isLoading} />
      <View style={globalStyles.flex1}>
        {!isEditScreen && (
          <AppText primary style={signInStyles.signInText}>
            {Strings['Complete Profile']}
          </AppText>
        )}

        <Pressable onPress={handleSelectImage} style={profileStyles.avatarContainer}>
          {image ? (
            <Image source={{uri: image?.uri}} style={profileStyles.image} />
          ) : (
            <View style={profileStyles.logoAvatar}>
              <LogoIcon width={80} height={80} opacity={0.5} />
            </View>
          )}
          <CameraCirclePrimaryIcon width={25} height={25} style={profileStyles.cameraIcon} />
        </Pressable>

        <View style={[signInStyles.inputContainer, globalStyles.inputsGap]}>
          <AppTextInput
            placeholder="Jhon"
            label={Strings['First Name']}
            onChangeText={setFirstName}
            value={firstName}
            maxLength={20}
          />
          <AppTextInput
            placeholder="Doe"
            label={Strings['Last Name']}
            onChangeText={setLastName}
            value={lastName}
            maxLength={20}
          />
          <AppTextInput
            placeholder="jhon"
            label={Strings['Username']}
            onChangeText={text => {
              const formattedText = text
                .toLowerCase()
                .replace(/[^a-z0-9_]/g, '')
                .replace(/\s/g, '');
              setUsername(formattedText);
            }}
            value={username}
            maxLength={20}
          />
        </View>
      </View>

      <AppButton
        title={isEditScreen ? Strings['Save Changes'] : Strings['Continue']}
        style={{marginTop: 10}}
        onPress={handleContinue}
        disabled={!firstName || !lastName || !username}
      />
    </Wrapper>
  );
};

export default CompleteProfile;
