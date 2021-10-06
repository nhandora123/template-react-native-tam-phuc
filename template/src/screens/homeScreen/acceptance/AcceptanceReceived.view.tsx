
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  ToastAndroid,
  Modal,
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

import { TextInput, Button, Card } from 'react-native-paper';
import { ItemAccptanceCustom } from '../../../components/items/ItemAccptanceCustom';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { getSaleInvoiceReceived } from './GetSaleInvoiceReceived';
import lodash from 'lodash';
import { getMerchandiseToDelivery } from '../acceptance/GetMerchandiseToDelivery';
import { getSaleInvoiceBycode } from '../detailEnvoice/GetSaleInvoiceByCode';
import { DialogError } from '../../../components/modal/DialogError';
import Toast from 'react-native-toast-message';

const AcceptanceReceived = (props: any) => {
  const { data, setData, onPressSearch, setsearchString } = getSaleInvoiceReceived(props);
  const { GetDataCode, dataSaleInvoiceCode, dataSaleInvoiceDetailCode, setdataSaleInvoiceCode } =
    getSaleInvoiceBycode(props);
  const {
    userID1,
    setUserID1,
    SaleInvoiceID1,
    setSaleInvoiceID1,
    onPressGetMerchand,
    returnResult1,
  } = getMerchandiseToDelivery(props);

  const onPressGet = async (ID: string, Index: any) => {
    try {
      setSaleInvoiceID1(ID);
      if (ID != '') {
        await onPressGetMerchand(ID);
        if ((await returnResult1) == 1) {
          await deleteData(Index);
        }
      }
    } catch (E) {}
  };
  const deleteData = (rowIndex: any) => {
    try {
      if (rowIndex >= 0) {
        Toast.show({
          type: 'success',
          text1: 'Thao Tác Thành Công',
        });
        data.splice(rowIndex, 1);
        let _data = [...data];
        setData(_data);
      }
    } catch (E) {}
  };

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
      getdata();
    });
    return () => {};
  }, []);
  const onScanBarCode = () => {
    props.navigation.navigate('CameraScreenDetail',{ type: 1 });
  };
  return (
    <View style={styles.tabview}>
      <HeaderSearchCustom
        onScanSuccess={() => {}}
        onPressSearch={() => {
          getdata();
        }}
        onPressBarCode={() => {
          onScanBarCode();
        }}
        _onChangeText={search}
      ></HeaderSearchCustom>
      <View style={{ flex: 1}}>
        {lodash.isEmpty(data) ? (
          <View></View>
        ) : (
          <View style={{ width: '100%', height: '100%' }}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={({ item, index }) => (
                <View>
                  {index % 2 == 0 ? (
                    <ItemAccptanceCustom
                      navigation={props.navigation}
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
                      index={index}
                      Option={'1'}
                      type={'3'}
                      SaleVoiceID={item.SaleInvoiceID}
                      PhoneNumBer={item.CustomerPhone}
                      onPressGet={onPressGet}
                    ></ItemAccptanceCustom>
                  ) : (
                    <ItemAccptanceCustom
                      navigation={props.navigation}
                      addressCustomer={item.ShipAddress}
                      codeOrder={index + 1 + '. ' + item.Code}
                      dateTime={item.DeliveryDate}
                      invoiceWeight={item.TotalQuantity.toString()}
                      nameCustomer={item.CustomerName}
                      onPressItem={() => {}}
                      typeItem={false}
                      index={index}
                      noteOder={item.Notes}
                      sourceIcon={Receiver}
                      customerCode={item.CustomerCode}
                      styleItem={{ backgroundColor: '#c7ecee' }}
                      Option={'1'}
                      type={'3'}
                      SaleVoiceID={item.SaleInvoiceID}
                      PhoneNumBer={item.CustomerPhone}
                      onPressGet={onPressGet}
                    ></ItemAccptanceCustom>
                  )}
                </View>
              )}
            />
          </View>
        )}
      </View>
      {/* <Toast position={'top'} ref={(ref) => Toast.setRef(ref)} /> */}
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

export default AcceptanceReceived;
