import {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../utils/constants';
import {API} from '../network/Environment';
import {API_METHODS, callApi} from '../network/NetworkManger';
import {onAPIError} from '../helpers';

const useHandlePostOpen = () => {
  const navigation = useNavigation();
  const [postOpenLoading, setPostOpenLoading] = useState(false);

  const handlePostOpen = post => {
    if (!post || postOpenLoading[post._id]) return;

    const onSuccess = response => {
      const locationId = response?.data?._id;

      if (locationId) {
        navigation.navigate(ROUTES.LocationInfo, {
          locationId,
        });
      }
    };

    callApi(API_METHODS.GET, `${API.getOneLocationInfo}${post._id}`, null, onSuccess, onAPIError, setPostOpenLoading);
  };

  return {postOpenLoading, handlePostOpen};
};

export default useHandlePostOpen;
