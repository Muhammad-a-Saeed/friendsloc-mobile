import React from 'react';
import {AppScrollView, AppText, Header, Screen} from '../../../../components';
import {Strings} from '../../../../utils/locales';

const AboutApp = () => {
  return (
    <Screen>
      <Header title={Strings['About App']} />

      <AppScrollView>
        <AppText style={{fontSize: 12}}>
          Lorem ipsum dolor sit amet consectetur. Lectus aenean amet aliquet amet ullamcorper. In vel integer quis
          lectus cras nunc. Aliquet integer eros cursus hac mauris morbi enim. Nec sollicitudin velit condimentum
          integer risus. Urna fermentum ac consequat a. Risus lobortis integer egestas quam rutrum. Massa pulvinar quam
          cursus aliquam sapien tortor leo aliquet ipsum. Sit tortor tincidunt quis etiam nam nulla. Tincidunt sed
          habitant turpis risus habitasse porttitor arcu non. Cursus consectetur risus arcu nulla tincidunt orci turpis.
          Et quis purus metus est. Velit praesent nam feugiat aliquet eget donec tempus. Posuere bibendum eu egestas
          eget. Ultricies tellus non eget massa dolor mi rhoncus nisl. Urna augue suscipit bibendum sollicitudin mattis
          vel aliquam aliquet. Mauris ipsum lacus tincidunt risus aenean sit iaculis suspendisse. Pulvinar placerat
          massa eu eget sagittis amet fringilla. Tellus porttitor egestas sed luctus tempor tristique felis nullam.
          Purus porttitor leo pharetra ipsum. Orci integer laoreet consequat id consectetur aliquet mattis odio
          lobortis. Vestibulum nunc molestie praesent quis ut nunc lectus. Tortor ac at non congue amet vitae aliquam.
          Morbi eu cursus et commodo in. Ornare a consectetur mi sagittis ac. Quis iaculis sit a vitae praesent leo
          euismod id phasellus. Fermentum viverra mattis nisl sapien pulvinar magnis quis. A facilisi in nisl mauris.
          Pellentesque volutpat molestie orci fermentum lacus id sem sed. Nec hac nullam ut adipiscing. Eleifend amet
          imperdiet tempus sed. Sed fames habitant non tellus luctus orci duis fermentum. Dolor tortor habitasse libero
          erat integer tempus fames malesuada justo. quam est. Viverra quis mollis malesuada lectus velit.
        </AppText>
      </AppScrollView>
    </Screen>
  );
};

export default AboutApp;
