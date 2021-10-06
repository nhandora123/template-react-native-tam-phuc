import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  Modal
} from 'react-native';

import Ripple from 'react-native-material-ripple';
//import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BackgroundDetailScreen } from '../../../components/backgroundScreen/backgroundDetailScreen/BackgroundDetailScreen.view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TextInput, Button, Card, Searchbar, IconButton } from 'react-native-paper';
import { BarCode, Box, Search, LOGOUTICON, Receiver } from '../../../assets/index';
import { Fonts, mainColors } from '../../../constants/index';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { ItemsCustom } from '../../../components/items/ItemCustom';
import { IconCustom } from '../../../components/iconsCustom/IconCustom';
import { GetSaleInvoiceNotPrint } from './GetSaleInvoiceNotPrint';
import { ModalBottomCustom } from '../../../components/modal/ModalBottomCustom';
import { title } from 'process';
import { actionMain } from '../../../utils/mainActions';
import lodash from 'lodash';
import { DialogError } from '../../../components/modal/DialogError';
import { getSaleInvoiceNotPrintBycode } from '../detailEnvoice/GetSaleInvoiceNotPrintByCode';
import Toast from 'react-native-toast-message';
const WaitingUnprinted = (props: any) => {
  const { GetDataCodeNotPrint, dataSaleInvoiceNotPrintCode, dataSaleInvoiceDetailNotPrintCode, setdataSaleInvoiceNotPrintCode } =
  getSaleInvoiceNotPrintBycode(props);
  const { data, onPressSearch, setsearchString, setData } =
    GetSaleInvoiceNotPrint(props);
  const [VisbleDialogError, setVisbleDialogError] = useState(false);

  const getdata = async () => {
    await onPressSearch();
  };
  const search = (value: any) => {
    if (value == '') {
      setsearchString('');
    } else {
      setsearchString(value);
    }
  };
 
  const onScanBarCode = () => {
    props.navigation.navigate("CameraScreenDetail", { type: 2 })

  }

  useEffect(() => {
    setsearchString('');
    props.navigation.addListener('focus', () => {
      getdata();
    });
    return () => {};
  }, []);
  return (
    <View style={styles.tabview}>
      <HeaderSearchCustom
        onScanSuccess={() => {}}
        onPressBarCode={() => {
          onScanBarCode();
        }}
        onPressSearch={() => onPressSearch()}
        _onChangeText={search}></HeaderSearchCustom>
      <View style={{ flex: 1}}>
        {lodash.isEmpty(data) == false ? (
          <View style={{ width: '100%', height: '100%' }}>
            <FlatList
              keyExtractor={(item, index) => 'key' + index}
              data={data}
              renderItem={({ item, index }) => (
                <View>
                  {index % 2 == 0 ? (
                    <ItemsCustom
                      addressCustomer={item.ShipAddress}
                      codeOrder={index + 1 + '. ' + item.Code}
                      dateTime={item.DeliveryDate}
                      invoiceWeight={item.TotalQuantity.toString()}
                      nameCustomer={item.CustomerName}
                      onPressItem={() => {}}
                      typeItem={false}
                      noteOder={item.Notes}
                      sourceIcon={Receiver}
                      customerCode={item.CustomerCode}
                      Option={'2'}
                      type={'2'}
                      navigation={props.navigation}
                      SaleVoiceID={item.SaleInvoiceID}
                      PhoneNumBer={item.CustomerPhone}
                    ></ItemsCustom>
                  ) : (
                    <ItemsCustom
                      styleItem={{ backgroundColor: '#c7ecee' }}
                      addressCustomer={item.ShipAddress}
                      codeOrder={index + 1 + '. ' + item.Code}
                      dateTime={item.DeliveryDate}
                      invoiceWeight={item.TotalQuantity.toString()}
                      nameCustomer={item.CustomerName}
                      onPressItem={() => {}}
                      typeItem={false}
                      noteOder={item.Notes}
                      sourceIcon={Receiver}
                      customerCode={item.CustomerCode}
                      Option={'2'}
                      type={'2'}
                      navigation={props.navigation}
                      SaleVoiceID={item.SaleInvoiceID}
                      PhoneNumBer={item.CustomerPhone}
                    ></ItemsCustom>
                  )}
                </View>
              )}
            />
          </View>
        ) : (
          <View>

          </View>
        )}
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  tabview: {
    flex:1,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
});

export default WaitingUnprinted;
