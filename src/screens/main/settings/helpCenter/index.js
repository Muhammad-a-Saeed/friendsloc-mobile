import {View, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppScrollView, AppText, Header, Loader, Screen} from '../../../../components';
import {Strings} from '../../../../utils/locales';
import {helpCenterStyles} from '../../styles';
import {ChatSquareIcon, ChevronBlackIcon} from '../../../../assets/icons';
import globalStyles from '../../../../../globalStyles';
import {API_METHODS, callApi} from '../../../../network/NetworkManger';
import {API} from '../../../../network/Environment';
import {onAPIError} from '../../../../helpers';
import {useSelector} from 'react-redux';
import {languageSelector} from '../../../../redux/selectors';

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState('FAQ');
  const [isLoading, setIsLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const appLanguage = useSelector(languageSelector);

  useEffect(() => {
    getAllFAQs();
  }, []);

  const getAllFAQs = () => {
    const onSuccess = response => {
      if (response.success) {
        console.log('RES: ', response);
        setFaqs(response.data.data || []);
      }
    };

    callApi(
      API_METHODS.GET,
      `${API.faqGetAll}?language=${appLanguage === 'english' ? 'english' : 'russian'}`,
      null,
      onSuccess,
      onAPIError,
      setIsLoading,
    );
  };

  return (
    <Screen>
      <Header title={Strings['Help Center']} />
      <Loader isLoading={isLoading} />
      <AppScrollView>
        <View style={helpCenterStyles.tabContainer}>
          <Pressable
            style={activeTab === 'FAQ' ? helpCenterStyles.activeTab : helpCenterStyles.tab}
            onPress={() => setActiveTab('FAQ')}>
            <AppText style={activeTab === 'FAQ' ? helpCenterStyles.tabTextActive : helpCenterStyles.tabTextInActive}>
              {Strings.FAQ}
            </AppText>
          </Pressable>
          <Pressable
            style={activeTab === 'CONTACT_US' ? helpCenterStyles.activeTab : helpCenterStyles.tab}
            onPress={() => setActiveTab('CONTACT_US')}>
            <AppText
              style={activeTab === 'CONTACT_US' ? helpCenterStyles.tabTextActive : helpCenterStyles.tabTextInActive}>
              {Strings['Contact us']}
            </AppText>
          </Pressable>
        </View>

        {activeTab === 'FAQ' ? <FAQ faqs={faqs} /> : <ContactUs />}
      </AppScrollView>
    </Screen>
  );
};

const FAQ = ({faqs}) => {
  const [selected, setSelected] = useState(null);

  return (
    <View style={[globalStyles.gap15, {marginTop: 15}]}>
      {faqs.map((faq, index) => (
        <View key={index}>
          <Pressable style={helpCenterStyles.faq} onPress={() => setSelected(index)}>
            <AppText style={globalStyles.flex1}>{faq.question}</AppText>
            <ChevronBlackIcon />
          </Pressable>

          {selected === index ? <AppText style={helpCenterStyles.faqAns}>{faq.answer}</AppText> : null}
        </View>
      ))}
    </View>
  );
};

const ContactUs = () => {
  return (
    <View style={helpCenterStyles.contactUsContainer}>
      <ChatSquareIcon />
      <View>
        <AppText style={helpCenterStyles.chatTitle}>{Strings['Chat to us']}</AppText>
        <AppText style={helpCenterStyles.secondaryText}>{Strings['Our friendly team is here to help.']}</AppText>
        <AppText style={helpCenterStyles.mailText}>friendsloc.official@gmail.com</AppText>
      </View>
    </View>
  );
};

export default HelpCenter;
