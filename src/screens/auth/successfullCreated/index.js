import {View} from 'react-native';
import React, {useEffect} from 'react';
import globalStyles from '../../../../globalStyles';
import {TickCirclePrimaryIcon} from '../../../assets/icons';
import {AppText} from '../../../components';
import {profileStyles} from '../styles';
import {ROUTES} from '../../../utils/constants';
import {Strings} from '../../../utils/locales';

const SuccessfullCreated = ({route, navigation}) => {
  const {title, description} = route.params || {};

  useEffect(() => {
    setTimeout(() => {
      if (title === Strings['Password Created']) navigation.popToTop();
      else navigation.replace(ROUTES.Main);
    }, 3000);
  }, []);

  return (
    <View style={[globalStyles.flex1, globalStyles.justifyAndItemCenter]}>
      <TickCirclePrimaryIcon />
      <AppText primary style={profileStyles.profileCreatedTitle}>
        {title}
      </AppText>
      {/* <AppText style={profileStyles.profileCreatedDesc} greyText>
        Lorem ipsum dolor sit amet consectetur. Maecenas nisi vitae a mattis sed dignissim.
      </AppText> */}
    </View>
  );
};

export default SuccessfullCreated;
