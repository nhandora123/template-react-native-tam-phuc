import { BackgroundBigScreen } from '../../../src/components/backgroundScreen/backgroundBigScreen/BackgroundBigScreen.view';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  ToastAndroid,
  Modal,
  Picker,
  SafeAreaView
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import React, { useState, useEffect } from 'react';
import {
  BarCode,
  Box,
  Search,
  LOGOUTICON,
  Receiver,
  Cancel,
} from '../../assets/index';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextInput } from 'react-native-paper';
import { mainColors } from '../../constants';
import GoogleMapReact from 'google-map-react';
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Map = () => {
  const [selectedValue, setSelectedValue] = useState('Ngân Hàng');
  // const options = { closeBoxURL: '', enableEventPropagation: true };
  
  return <BackgroundBigScreen>
    
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {/* <div style={{ height: '100vh', width: '100%' }}> */}
        {/* <GoogleMapReact
          bootstrapURLKeys={{ key:  yourkey}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div> */}
      
    </SafeAreaView>
  </BackgroundBigScreen>;
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: hp(68),
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
export default Map;
