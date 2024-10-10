import {StyleSheet} from 'react-native';
import React from 'react';
import {AppScrollView, Header, Screen} from '../../../components';
import {LogoIcon} from '../../../assets/icons';
import {Strings} from '../../../utils/locales';

const Wrapper = ({children, showLogo = true, showHeader, headerTitle}) => {
  return (
    <Screen>
      {showHeader && <Header title={headerTitle} />}
      <AppScrollView contentContainerStyle={styles.content}>
        {showLogo && <LogoIcon width={130} height={130} style={styles.logo} />}
        {children}
      </AppScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  logo: {alignSelf: 'center', marginTop: 20, marginBottom: 40},
  content: {paddingBottom: 30},
});

export default Wrapper;
