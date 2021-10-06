
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  ToastAndroid,
  Modal
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BackgroundBig } from '../../../components';
import { BarCode, Box, Receiver } from '../../../assets/index';
import { mainColors, Fonts } from '../../../constants';
import { TextInputCustom } from '../../../components/userComponents/TextInputCustom';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { TextInput, Button, Card } from 'react-native-paper';
import { ItemsCustom } from '../../../components/items/ItemCustom';
import { ItemsDetailCustom } from '../../../components/items/ItemDetailCustom';
import { getSaleInvoiceReceivedNotStockOut } from './GetSaleInvoiceReceivedNotStockOut';
import lodash from 'lodash';
import { returnSaleInvoiceByID } from './ReturnSaleInvoiceNotStock';
import { getSaleInvoiceBycode } from '../detailEnvoice/GetSaleInvoiceByCode';
import { DialogError } from '../../../components/modal/DialogError';
import Toast from 'react-native-toast-message';

const AcceptanceReceivedNotStockOut = (props: any) => {
  const { data, setData, onPressSearch, setsearchString } =
    getSaleInvoiceReceivedNotStockOut(props);
  const { SaleInvoiceID2, onPressReturn, setSaleInvoiceID2, returnResult2 } =
    returnSaleInvoiceByID(props);
  const { GetDataCode, dataSaleInvoiceCode, dataSaleInvoiceDetailCode, setdataSaleInvoiceCode } =
    getSaleInvoiceBycode(props);
  const [VisbleDialogError, setVisbleDialogError] = useState(false);
  const search = (value: any) => {
    if (value == '') {
      setsearchString('');
    } else {
      setsearchString(value);
    }
  };
  const getdata = async () => {
    await onPressSearch();
  };
  useEffect(() => {
    setsearchString('');
    getdata();
    props.navigation.addListener('focus', () => {
      getdata()
    });

    return () => { };
  }, []);

  const onPress = async (ID: string, Index: any) => {
    try {
      if (ID != '') {
        setSaleInvoiceID2(ID);
        await onPressReturn(ID);
        if ((await returnResult2) == 1) {
          await deleteData(Index);
        } else if (returnResult2 == 0) {
        }
      }
    } catch (E) { }
  };
  const deleteData = (rowIndex: any) => {
    try {
     
      if (rowIndex >= 0) {
      
        data.splice(rowIndex, 1);
        let _data = [...data];
        setData(_data);
        Toast.show({
          type: 'success',
          text1: 'Thao Tác Thành Công',
        });
      }
    } catch (E) { }
  };
  const onScanBarCode = () => {
    props.navigation.navigate('CameraScreenDetail',{ type: 1 });

  }
  return (
    <View style={styles.tabview}>
      <HeaderSearchCustom
        onScanSuccess={() => {
          console.log(1);
        }}
        onPressSearch={() => {
          onPressSearch();
        }}
        onPressBarCode={() => { onScanBarCode() }}
        _onChangeText={search}></HeaderSearchCustom>
      <View style={{ flex: 1}}>
        {lodash.isEmpty(data) ? (
          <View></View>
        ) : (
          <View style={{ width: '100%', height: '100%' }}>
            <FlatList
              style={{ backgroundColor: '#fff' }}
              keyExtractor={(item, index) => 'key' + index}
              data={data}
              renderItem={({ item, index }) => (
                <View>
                  {index % 2 == 0 ? (
                    <ItemsCustom
                      navigation={props.navigation}
                      addressCustomer={item.ShipAddress}
                      codeOrder={index + 1 + ': ' + item.Code}
                      dateTime={item.DeliveryDate}
                      invoiceWeight={item.TotalQuantity.toString()}
                      nameCustomer={item.CustomerName}
                      onPressItem={() => { }}
                      typeItem={false}
                      noteOder={item.Notes}
                      sourceIcon={Receiver}
                      onPressIcon={() => console.log('ok ne')}
                      Option={'7'}
                      customerCode={item.CustomerCode}
                      index={index}
                      type={'7'}
                      onPressReturn={onPress}
                      SaleVoiceID={item.SaleInvoiceID}
                      PhoneNumBer={item.CustomerPhone}></ItemsCustom>
                  ) : (
                    <ItemsCustom
                      navigation={props.navigation}
                      addressCustomer={item.ShipAddress}
                      codeOrder={index + 1 + ': ' + item.Code}
                      dateTime={item.DeliveryDate}
                      invoiceWeight={item.TotalQuantity.toString()}
                      nameCustomer={item.CustomerName}
                      onPressItem={() => { }}
                      typeItem={false}
                      noteOder={item.Notes}
                      index={index}
                      sourceIcon={Receiver}
                      onPressIcon={() => console.log('ok ne')}
                      Option={'7'}
                      customerCode={item.CustomerCode}
                      styleItem={{ backgroundColor: '#c7ecee' }}
                      type={'7'}
                      onPressReturn={onPress}
                      SaleVoiceID={item.SaleInvoiceID}
                      PhoneNumBer={item.CustomerPhone}></ItemsCustom>
                  )}
                </View>
              )}
            />
          </View>
        )}
             
      </View>
      <Toast  style={{backgroundColor:'white'}} position={'top'} ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};
const styles = StyleSheet.create({
  tabview: {
    flex:1,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
});

export default AcceptanceReceivedNotStockOut;
