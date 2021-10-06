
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

import { BackgroundDetailScreen } from '../../../components/backgroundScreen/backgroundDetailScreen/BackgroundDetailScreen.view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TextInput, Button, Card, Searchbar, IconButton } from 'react-native-paper';
import { BarCode, Box, Search, LOGOUTICON, Receiver, FILES } from '../../../assets/index';
import { Fonts, mainColors } from '../../../constants/index';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { ItemSubmisstionCustom } from '../../../components/items/ItemSubmisstionCustom';
import { getDataSubmisstion } from '../submission/GetDataSubmission';
import { AcceptSaleInvoice } from './AcceptSaleInvoice';
import lodash from 'lodash';
import { getSaleInvoiceBycode } from '../detailEnvoice/GetSaleInvoiceByCode';
import { DialogError } from '../../../components/modal/DialogError';
import Toast from 'react-native-toast-message';

const Submission = (props: any) => {
  const { data, onPressSearch, setData, setsearchString } = getDataSubmisstion(props);
  const { SaleInvoiceID4, returnResult4, onPressSubmiss, setSaleInvoiceID4 } =
    AcceptSaleInvoice(props);
  const { GetDataCode, dataSaleInvoiceCode, dataSaleInvoiceDetailCode, setdataSaleInvoiceCode } =
    getSaleInvoiceBycode(props);
  const [VisbleDialogError, setVisbleDialogError] = useState(false);

  const ReceiveSaleInvoiceByID = async (ID: string, Index: any) => {
    setSaleInvoiceID4(ID);
    if (SaleInvoiceID4 != '') {
      await onPressSubmiss(ID);
      if (returnResult4 == 1) {
        await deleteData(Index);
      }
    }
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
    } catch (E) { }
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
    return () => { };
  }, []);
  const onScanBarCode = () => {
    props.navigation.navigate("CameraScreenDetail", { type: 1 })
  };

  return (
    <BackgroundDetailScreen title='4. Nộp phiếu' navigation={props.navigation}>
      <View style={styles.container}>

        <HeaderSearchCustom
          onScanSuccess={() => {
            console.log(1);
          }}
          onPressSearch={() => {
            onPressSearch();
          }}
          _onChangeText={search}
          onPressBarCode={() => {
            onScanBarCode();
          }}
        ></HeaderSearchCustom>

        {lodash.isEmpty(data) ? (
          <View></View>
        ) : (
          <FlatList
            style={{ backgroundColor: '#fff' }}
            data={data}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item, index }) => (
              <View>
                {item.SaleInvoiceStatus == 5 ? (
                  <ItemSubmisstionCustom
    
                    navigation={props.navigation}
                    addressCustomer={item.ShipAddress}
                    codeOrder={index + 1 + '. ' + item.Code}
                    dateTime={item.DeliveryDate}
                    invoiceWeight={item.TotalQuantity.toString()}
                    nameCustomer={item.CustomerName}
                    onPressItem={() => { }}
                    typeItem={false}
                    noteOder={item.Notes}
                    sourceIcon={Receiver}
                    customerCode={item.CustomerCode}
                    Option={'1'}
                    type={'4'}
                    index={index}
                    SaleVoiceID={item.SaleInvoiceID}
                    PhoneNumBer={item.CustomerPhone}
                    onPressApply={ReceiveSaleInvoiceByID}
                  ></ItemSubmisstionCustom>
                ) : item.SaleInvoiceStatus == 6 ? (
                  <ItemSubmisstionCustom
                    styleItem={{ backgroundColor: mainColors.blue }}
                    navigation={props.navigation}
                    addressCustomer={item.ShipAddress}
                    codeOrder={index + 1 + '. ' + item.Code}
                    dateTime={item.DeliveryDate}
                    invoiceWeight={item.TotalQuantity.toString()}
                    nameCustomer={item.CustomerName}
                    onPressItem={() => { }}
                    typeItem={false}
                    noteOder={item.Notes}
                    sourceIcon={Receiver}
                    customerCode={item.CustomerCode}
                    Option={'1'}
                    type={'4'}
                    index={index}
                    SaleVoiceID={item.SaleInvoiceID}
                    PhoneNumBer={item.CustomerPhone}
                    onPressApply={ReceiveSaleInvoiceByID}
                  ></ItemSubmisstionCustom>
                ) : item.SaleInvoiceStatus == 7 ? (
                  <ItemSubmisstionCustom
                    styleItem={{ backgroundColor:'#32ff7e' }}
                    navigation={props.navigation}
                    addressCustomer={item.ShipAddress}
                    codeOrder={index + 1 + '. ' + item.Code}
                    dateTime={item.DeliveryDate}
                    invoiceWeight={item.TotalQuantity.toString()}
                    nameCustomer={item.CustomerName}
                    onPressItem={() => { }}
                    typeItem={false}
                    noteOder={item.Notes}
                    sourceIcon={Receiver}
                    customerCode={item.CustomerCode}
                    Option={'1'}
                    type={'4'}
                    index={index}
                    SaleVoiceID={item.SaleInvoiceID}
                    PhoneNumBer={item.CustomerPhone}
                    onPressApply={ReceiveSaleInvoiceByID}
                  ></ItemSubmisstionCustom>
                ) : (
                  <ItemSubmisstionCustom
                    styleItem={{ backgroundColor: mainColors.colorItem }}
                    navigation={props.navigation}
                    addressCustomer={item.ShipAddress}
                    codeOrder={index + 1 + '. ' + item.Code}
                    dateTime={item.DeliveryDate}
                    invoiceWeight={item.TotalQuantity.toString()}
                    nameCustomer={item.CustomerName}
                    onPressItem={() => { }}
                    typeItem={false}
                    noteOder={item.Notes}
                    sourceIcon={Receiver}
                    customerCode={item.CustomerCode}
                    Option={'1'}
                    type={'4'}
                    index={index}
                    SaleVoiceID={item.SaleInvoiceID}
                    PhoneNumBer={item.CustomerPhone}
                    onPressApply={ReceiveSaleInvoiceByID}
                  ></ItemSubmisstionCustom>
                )}
              </View>

            )}
          />

        )}


      </View>

    </BackgroundDetailScreen>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(8),
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 8,
  },
  tabview: {
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  headertabview: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    height: hp(10),
    backgroundColor: mainColors.greenscolor,
    justifyContent: 'space-between',
  },
  headertabview_iconsearch: {
    paddingLeft: 5,
    paddingRight: 5,
    height: hp(8),
    width: wp(35),
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default Submission;
