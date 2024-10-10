import {View} from 'react-native';
import React, {useState} from 'react';
import {AppButton, AppScrollView, AppText, AppTextInput, Header, Loader, Screen} from '../../../components';
import {locationStyles} from '../styles';
import globalStyles from '../../../../globalStyles';
import {API_METHODS, callApi} from '../../../network/NetworkManger';
import {API} from '../../../network/Environment';
import {onAPIError} from '../../../helpers';
import {Strings} from '../../../utils/locales';

const ReportLocation = ({navigation, route}) => {
  const locationId = route.params?.locationId;
  const [reportText, setReportText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    const onSuccess = response => {
      if (response.success) {
        navigation.goBack();
      }
    };

    const data = {location: locationId, description: reportText};
    callApi(API_METHODS.POST, API.reportPost, data, onSuccess, onAPIError, setIsLoading);
  };

  return (
    <Screen>
      <Header title={Strings['Report Location']} />
      <Loader isLoading={isLoading} />

      <AppScrollView>
        <View style={globalStyles.flex1}>
          <AppText greyText style={locationStyles.font12}>
            {Strings['Please type a description explaining why you are reporting this location']}
          </AppText>
          <AppTextInput placeholder={Strings['Type here']} onChangeText={setReportText} />
        </View>

        <AppButton
          title={Strings['Continue']}
          style={{marginVertical: 10}}
          disabled={!reportText}
          onPress={handleContinue}
        />
      </AppScrollView>
    </Screen>
  );
};

export default ReportLocation;
