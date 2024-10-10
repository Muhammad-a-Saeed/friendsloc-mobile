import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatListEmptyComponent, Header, Loader, LocationCard, Screen} from '../../../components';
import {Strings} from '../../../utils/locales';
import globalStyles from '../../../../globalStyles';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {API} from '../../../network/Environment';
import {onAPIError} from '../../../helpers';
import {ROUTES} from '../../../utils/constants';
import commonAPI from '../../../network/commonAPI';

const FavoritesLocation = ({navigation}) => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMyFavoriteLocations();
  }, []);

  const getMyFavoriteLocations = () => {
    const onSuccess = response => {
      if (response.success) {
        setLocations(response.data.data);
      }
    };

    const endpoint = `${API.myFavoriteLocation}?limit=1000&page=1`;
    callApi(API_METHODS.GET, endpoint, null, onSuccess, onAPIError, setIsLoading);
  };

  const handleUnFavorite = item => {
    const locationId = item?._id;
    setLocations(p => p.filter(l => l._id !== locationId));
    commonAPI.locationLikeUnLike(locationId);
  };

  const handleLocationPress = itemId => {
    if (itemId) navigation.navigate(ROUTES.LocationInfo, {locationId: itemId});
  };

  return (
    <Screen>
      <Header title={Strings.Favorites} />
      <Loader isLoading={isLoading} />
      <FlatList
        contentContainerStyle={[
          globalStyles.flexGrow1,
          globalStyles.screenPadding,
          globalStyles.gap15,
          globalStyles.screenPaddingBottom10,
        ]}
        data={locations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <LocationCard
            item={{...item, isFavourite: true}}
            onPressHeart={handleUnFavorite}
            onPress={handleLocationPress}
          />
        )}
        ListEmptyComponent={() => <FlatListEmptyComponent label={isLoading ? '' : Strings['No Favorite']} />}
      />
    </Screen>
  );
};

export default FavoritesLocation;
