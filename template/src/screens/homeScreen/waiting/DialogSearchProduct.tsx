import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, FlatList, ToastAndroid, Modal } from 'react-native';
import Ripple from 'react-native-material-ripple';
//import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Cancel, Receiver } from '../../../assets/index';
import { Fonts, mainColors } from '../../../constants';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { searchSaleInvoiceNotReceive } from './GetOrderByAnotherGuy';
import { ItemPrintedCustom } from '../../../components/items/ItemPrintedCustom';
import { receiveSaleInvoiceOtherByID } from '../../../screens/homeScreen/waiting/ReceiveSaleInvoiceOrderByID';
import lodash from 'lodash';
import { DialogError } from '../../../components/modal/DialogError';
import Toast from 'react-native-toast-message';

const SearchProduct = (props: any) => {
  const { onPressClose, navigation } = props;
  const {
    SaleInvoiceIDOrder,
    setUserID,
    setSaleInvoiceIDOrder,
    returnResultOrder,
    onPressAcceptOrder,
  } = receiveSaleInvoiceOtherByID(props);

  const { data, onPressSearch, setPageIndex, setsearchString, searchString, setData } =
    searchSaleInvoiceNotReceive(props);
  const [VisbleDialogError, setVisbleDialogError] = useState(false);

  const onTextChange = (value: any) => {
    if (value != '') {
      setsearchString(value);
    }
  };
  const onScanSuccess = async (value: any) => {
    if (value.nativeEvent.codeStringValue != '') {
      setsearchString(value.nativeEvent.codeStringValue);
      await onGetData();
      if (await lodash.isEmpty(data)) {

      }

    }
  };
  const onGetData = async () => {
    if (searchString != '') {
      await onPressSearch();
    }
  };

  const onScanBarCode = () => {
    props.navigation.navigate('CameraScreen', { onScanSuccess });
  };
  const getdata = async () => {
    await onPressSearch();
  }
  const deleteData = (rowIndex: any) => {
    try {
      if (rowIndex >= 0) {
        Toast.show({
          type: 'success',
          text1: 'Thao Tác Thành Công',
      
      });
        data.splice(rowIndex, 1);
        let _data = [...data];
        setData(_data)

      }
    }
    catch (E) { }
  }
  useEffect(() => {

    setsearchString('');
   
    return () => { };
  }, []);
  const ReceiveSaleInvoiceByID = async (ID: string, Index: any) => {
    try {
      setSaleInvoiceIDOrder(ID);
      if (SaleInvoiceIDOrder != '') {
        await onPressAcceptOrder(ID);
        if (await returnResultOrder == 1) {
          deleteData(Index)
        }
      }
    } catch (E) { }
  };
  const closeDialogError = () => {
    setVisbleDialogError(false);
  }

  return (
    <View style={styles.containerBig}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ width: hp(3), height: hp(3) }}></View>
          <Text
            style={{
              fontSize: hp(2.5),
              color: 'white',
              fontFamily: Fonts.Roboto_Stab_Bold,
              marginRight: 5,
              fontWeight: 'bold',
            }}
          >
            {' '}
            Phiếu Giao Hàng
          </Text>
          <Ripple onPress={props.navigation.goBack}>
            <Image
              source={Cancel}
              style={{ width: hp(4), height: hp(4) }}
            ></Image>
          </Ripple>
        </View>
        <View style={styles.hedaerSearch}>
          <HeaderSearchCustom
            onPressSearch={() => onGetData()}
            _onChangeText={onTextChange}
            onPressBarCode={() => onScanBarCode()}
          ></HeaderSearchCustom>
        </View>

        {lodash.isEmpty(data) ? (
          <View>
            <Text> Không tìm được phiếu giao hàng</Text>
          </View>
        ) : (
          <View style={styles.viewData}>
            <FlatList
              style={{ height: hp(50), width: wp(100) }}
              keyExtractor={(item, index) => 'key' + index}
              data={data}
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
                      onPressItem={() => { }}
                      typeItem={false}
                      noteOder={item.Notes}
                      sourceIcon={Receiver}
                      customerCode={item.CustomerCode}
                      Option={'1'}
                      type={'11'}
                      index={index}
                      onPressAcept={ReceiveSaleInvoiceByID}
                      SaleVoiceID={item.SaleInvoiceID}
                      onPressClose={onPressClose}
                      PhoneNumBer={item.CustomerPhone}
                    ></ItemPrintedCustom>
                  ) : (
                    <ItemPrintedCustom
                      styleItem={{ backgroundColor: mainColors.colorItem }}
                      navigation={props.navigation}
                      addressCustomer={item.ShipAddress}
                      codeOrder={index + 1 + '. ' + item.Code}
                      dateTime={item.DeliveryDate}
                      invoiceWeight={item.TotalQuantity.toString()}
                      nameCustomer={item.CustomerName}
                      onPressItem={() => { }}
                      typeItem={false}
                      index={index}
                      noteOder={item.Notes}
                      sourceIcon={Receiver}
                      onPressClose={onPressClose}
                      customerCode={item.CustomerCode}
                      Option={'1'}
                      type={'11'}
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
       
        <Modal
          animationType='slide'
          transparent
          visible={VisbleDialogError}
          presentationStyle='formSheet'
          style={{ justifyContent: 'flex-end', margin: 0 }}
        >
          {/* <DialogError onPressClose={() => closeDialogError()} title='Phiếu giao hàng không tồn tại!'></DialogError> */}
        </Modal>
      </View>
      <Toast position={'top'} ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};
const styles = StyleSheet.create({
  containerBig: {
    // alignItems: 'stretch',
    // width: '100%',
    // flex: 1,
    // justifyContent: 'flex-end',
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    height: hp(93),

    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: wp(1),
    backgroundColor: mainColors.greenscolor,
    height: hp(6),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hedaerSearch: {
    marginTop: hp(1),

    height: hp(10),
  },
  viewData: {

    height: hp(72),
    width: wp(100),

    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default SearchProduct;
