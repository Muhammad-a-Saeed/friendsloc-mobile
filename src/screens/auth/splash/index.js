import React, {useEffect} from 'react';
import {Screen} from '../../../components';
import globalStyles from '../../../../globalStyles';
import {LogoIcon} from '../../../assets/icons';
import {ROUTES} from '../../../utils/constants';
import {languageSelector, userSelector} from '../../../redux/selectors';
import {Strings} from '../../../utils/locales';
import {useSelector} from 'react-redux';

const Splash = ({navigation}) => {
  const user = useSelector(userSelector);
  const language = useSelector(languageSelector);

  useEffect(() => {
    Strings.setLanguage(language);

    setTimeout(() => {
      navigation.replace(user ? ROUTES.Main : ROUTES.SelectLanguage);
    }, 3000);
  }, []);

  return (
    <Screen style={globalStyles.flex1JustifyAndItemCenter}>
      <LogoIcon />
    </Screen>
  );
};

export default Splash;
