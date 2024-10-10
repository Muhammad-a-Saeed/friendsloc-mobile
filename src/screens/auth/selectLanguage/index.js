import {View, Pressable} from 'react-native';
import React, {useState} from 'react';
import {AppButton, AppText} from '../../../components';
import {CheckCirclePrimaryIcon, UncheckCirclePrimaryIcon} from '../../../assets/icons';
import {selectLanguageStyles} from '../styles';
import {Wrapper} from '../common';
import {Strings} from '../../../utils/locales';
import {ROUTES} from '../../../utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../../redux/slices/authSlice';
import {languageSelector} from '../../../redux/selectors';

const SelectLanguage = ({navigation, route}) => {
  const language = useSelector(languageSelector);
  const {screenType} = route.params || {};
  const [selectedLanguage, setSelectedLanguage] = useState(language === 'english' ? 'English' : 'Russia');
  const isEditMode = screenType === 'EDIT';
  const dispatch = useDispatch();

  const handleLanguageSelect = language => {
    const loweredCaseLang = language.toLowerCase();
    dispatch(authActions.setLanguage(loweredCaseLang));
    Strings.setLanguage(loweredCaseLang);
    setSelectedLanguage(language);
  };

  return (
    <Wrapper showHeader={isEditMode} showLogo={!isEditMode} headerTitle={Strings.Language}>
      <View style={selectLanguageStyles.contentContainer}>
        {!isEditMode && (
          <AppText primary style={selectLanguageStyles.selectLangText}>
            {Strings['Select Language']}
          </AppText>
        )}

        <View style={selectLanguageStyles.checkIcons}>
          <Pressable style={selectLanguageStyles.langContainer} onPress={() => handleLanguageSelect('English')}>
            {selectedLanguage === 'English' ? (
              <CheckCirclePrimaryIcon width={20} />
            ) : (
              <UncheckCirclePrimaryIcon width={20} />
            )}
            <AppText style={selectLanguageStyles.langText}>English</AppText>
          </Pressable>

          <Pressable style={selectLanguageStyles.langContainer} onPress={() => handleLanguageSelect('Russia')}>
            {selectedLanguage === 'Russia' ? (
              <CheckCirclePrimaryIcon width={20} />
            ) : (
              <UncheckCirclePrimaryIcon width={20} />
            )}
            <AppText style={selectLanguageStyles.langText}>Russian</AppText>
          </Pressable>
        </View>
      </View>

      <AppButton
        title={Strings.Continue}
        onPress={() => {
          if (isEditMode) return navigation.replace(ROUTES.Main);
          navigation.navigate(ROUTES.SignIn);
        }}
      />
    </Wrapper>
  );
};

export default SelectLanguage;
