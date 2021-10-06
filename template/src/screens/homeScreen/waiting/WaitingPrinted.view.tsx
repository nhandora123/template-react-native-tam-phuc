import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, FlatList, Modal } from 'react-native';
import Ripple from 'react-native-material-ripple';
//import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BackgroundDetailScreen } from '../../../components/backgroundScreen/backgroundDetailScreen/BackgroundDetailScreen.view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  TextInput,
  Button,
  Card,
  Searchbar,
  IconButton,
  Menu,
  Divider,
  Provider,
} from 'react-native-paper';
import { BarCode, Box, Search, LOGOUTICON, Receiver } from '../../../assets/index';
import { Fonts, mainColors } from '../../../constants/index';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { ItemPrintedCustom } from '../../../components/items/ItemPrintedCustom';
import { IconCustom } from '../../../components/iconsCustom/IconCustom';
import { ModalBottomCustom } from '../../../components/modal/ModalBottomCustom';
// import { DialogAccpetOrder } from '../../../components/modal/DialogAccpetOrder'
import { DialogCustom1 } from '../../../components/modal/DialogCustom1';
import { GetSaleInvoiceNoteReceive } from './GetSaleInvoice';
import { GetSaleInvoiceMore } from './GetSaleInvoceMore';
import MenuItem from 'react-native-paper/lib/typescript/components/Menu/MenuItem';

import lodash from 'lodash';
import { receiveSaleInvoiceByID } from '../../../screens/homeScreen/waiting/ReceiveSaleInvoiceByID';
import getDataByThing from '../../../utils/getDataByThing';
import { receiveSaleInvoiceBycode } from './ReceiveSaleInvoiceByCode';
import { getSaleInvoiceBycode } from '../detailEnvoice/GetSaleInvoiceByCode';
import { DialogError } from '../../../components/modal/DialogError';
import Toast from 'react-native-toast-message';

const WaitingPrinted = (props: any) => {
  const { data, onPressSearch, setData,searchString, setsearchString, pageIndex, setPageIndex } =
    GetSaleInvoiceNoteReceive(props);

  const {
    dataMore,
    onPressSearchMore,
    setDataMore,
    setsearchStringMore,
    pageIndexMore,
    setPageIndexMore,
  } = GetSaleInvoiceMore(props);
  const { SaleInvoiceID, setUserID, setSaleInvoiceID, returnResult, onPressAccept } =
    receiveSaleInvoiceByID(props);
  const { returnResultcode, onPressCode } = receiveSaleInvoiceBycode(props);
  const [VisbleDialog, setVisbleDialog] = useState(false);
  const [VisbleDialogError, setVisbleDialogError] = useState(false);
  const { GetDataCode, dataSaleInvoiceCode, dataSaleInvoiceDetailCode, setdataSaleInvoiceCode } =
    getSaleInvoiceBycode(props);
  const [CheckMore, setCheckMore] = useState(false);
  const ReceiveSaleInvoiceByID = async (ID: string, Index: any) => {
    try {
      setSaleInvoiceID(ID);
      if (SaleInvoiceID != '') {
        await onPressAccept(ID);
        if ((await returnResult) == 1) {
          await deleteData(Index);
        }
      }
    } catch (E) {}
  };

  const search = (value: any) => {
    if (value == '') {
      setsearchString('');
      setsearchStringMore('');
    } else {
      setsearchString(value);
      setsearchStringMore(value);
    }
  };

  const getdata = async () => {
    setPageIndexMore(1);
    setCheckMore(false);
    await onPressSearch();
  };
  const handleLoadMore = async () => {
    if (CheckMore == false) {
      let a = pageIndexMore + 1;
      setPageIndexMore(a);
      console.log(a);
      await onPressSearchMore();
      if (lodash.isEmpty(dataMore)) {
        setCheckMore(true);
      }

    }
    else{
      setPageIndexMore(1)
    }
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
    } catch (E) {}
  };
  useEffect(() => {
    setsearchString('');
    getdata();
    props.navigation.addListener('focus', () => {
      getdata();
      setPageIndex(1);
      setsearchString('');
      setsearchStringMore('');
      setCheckMore(false);
    });

    return () => {};
  }, []);

  const onScanSuccess = async (value: any) => {
    if (value.nativeEvent.codeStringValue != '') {
      await GetDataCode(value.nativeEvent.codeStringValue);
      if (await lodash.isEmpty(dataSaleInvoiceDetailCode)) {
        setVisbleDialogError(true);
      } else {
        props.navigation.push('DetailEnvoice', {
          IDOrder: value.nativeEvent.codeStringValue,
          TypeAPI: 'Code',
        });
      }
    }
  };

  return (
    <View style={styles.tabview}>
      <HeaderSearchCustom
        onScanSuccess={onScanSuccess}
        onPressSearch={() => {
          getdata();
        }}
        _onChangeText={search}
        value={searchString}
        onPressBarCode={() => {
          props.navigation.navigate('SearchProduct');
        }}
      ></HeaderSearchCustom>
      <View style={{ flex: 1 }}>
        {lodash.isEmpty(data) ? (
          <View></View>
        ) : (
          <View style={{ width: '100%', height: '100%' }}>
            <FlatList
              keyExtractor={(item, index) => 'key' + index}
              data={data}
              initialNumToRender={20} // how many item to display first
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                handleLoadMore();
              }}
              renderItem={({ item, index }) => (
                <View>
                  {index % 2 == 0 ? (
                    <ItemPrintedCustom
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
                      Option={'1'}
                      type={'1'}
                      index={index}
                      onPressAcept={ReceiveSaleInvoiceByID}
                      SaleVoiceID={item.SaleInvoiceID}
                      PhoneNumBer={item.CustomerPhone}
                    ></ItemPrintedCustom>
                  ) : (
                    <ItemPrintedCustom
                      styleItem={{ backgroundColor: '#c7ecee' }}
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
                      Option={'1'}
                      type={'1'}
                      onPressAcept={ReceiveSaleInvoiceByID}
                      SaleVoiceID={item.SaleInvoiceID}
                      PhoneNumBer={item.CustomerPhone}
                    ></ItemPrintedCustom>
                  )}
                </View>
              )}
            />
          </View>
        )}
      </View>
      <Toast position={'top'} ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};
const styles = StyleSheet.create({
  tabview: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
});

export default WaitingPrinted;
