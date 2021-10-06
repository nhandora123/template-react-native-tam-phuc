
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BackgroundDetailScreen } from '../../../components/backgroundScreen/backgroundDetailScreen/BackgroundDetailScreen.view';
import {
  BarCode,
  Phone,
  Box,
  Search,
  LOGOUTICON,
  Receiver,
  FILES,
  Cancel,
  Check,
  Exchange2,
  GHIM
} from '../../../assets/index';
import { Fonts, mainColors } from '../../../constants/index';

import { ItemDetailCustomName } from '../../../components/items/ItemDetailCustomName';
import { ItemsDetailCustom } from '../../../components/items/ItemDetailCustom';

import { IconDetailCustom } from '../../../components/iconsCustom/IconDetailCustom';
import { getSaleInvoiceById } from './GetSaleInvoiceById';
import { getSaleInvoiceNotPrintById } from './GetSaleInVoiceNotPrintById';
import lodash from 'lodash';
import { Linking, Alert, Platform } from 'react-native';
import { receiveSaleInvoiceByID } from '../waiting/ReceiveSaleInvoiceByID';
import { getMerchandiseToDelivery } from '../acceptance/GetMerchandiseToDelivery';
import getDataByThing from '../../../utils/getDataByThing';
import { returnSaleInvoiceByID } from '../acceptance/ReturnSaleInvoiceNotStock';
import { DialogAccpetOrder } from '../../../components/modal/DialogAccpetOrder';
import { DialogRefuseOrder } from '../../../components/modal/DialogRefuseOrder';
import { AcceptSaleInvoice } from '../submission/AcceptSaleInvoice';
import { RefuseOrderByID } from './RefuseOrderByID';
import { BackgroundDetailCellScreen } from '../../../components/backgroundScreen/backgroudDetailCellScreen/BackgroundDetailCellScreen.view';
import { getSaleInvoiceBycode } from './GetSaleInvoiceByCode';
import { getSaleInvoiceNotPrintBycode } from './GetSaleInvoiceNotPrintByCode';
import { DialogPaymentOrder } from '../../../components/modal/DialogPaymentOrder';
import { DialogQRCode } from '../../../components/modal/DialogQRCode';
import { receiveSaleInvoiceOtherByID } from '../waiting/ReceiveSaleInvoiceOrderByID';
import { receiveSaleInvoiceBycode } from '../waiting/ReceiveSaleInvoiceByCode';
import Toast from 'react-native-toast-message';
import GetLocation from 'react-native-get-location'
import {
  ICONRIGHT,
} from '../../../assets/index';
const DetaiEnvoice = (props: any) => {
  const {
    GetDataType1,
    dataSaleInvoice,
    dataSaleInvoiceDetail,
    IDOrder,
    setIDSaleVoice,
    setdataSaleInvoiceDetail,
  } = getSaleInvoiceById(props);
  const { GetDataType2, dataSaleInvoice1, dataSaleInvoiceDetail1, IDOrder1, setIDSaleVoice1 } =
    getSaleInvoiceNotPrintById(props);
  const [Show, setShow] = useState(2);
  const [Type, setType] = useState('');
  const { SaleInvoiceID, setUserID, setSaleInvoiceID, returnResult, onPressAccept } =
    receiveSaleInvoiceByID(props);
  const {
    userID1,
    setUserID1,
    SaleInvoiceID1,
    setSaleInvoiceID1,
    onPressGetMerchand,
    returnResult1,
  } = getMerchandiseToDelivery(props);
  const [VisbleDialog, setVisbleDialog] = useState(false);
  const [VisbleDialog1, setVisbleDialog1] = useState(false);
  const [VisbleDialog2, setVisbleDialog2] = useState(false);
  const [VisbleDialogQRCode, setVisbleDialogQRCode] = useState(false);
  const [Index, setIndex] = useState(0);
  const { SaleInvoiceIDOrder, setSaleInvoiceIDOrder, returnResultOrder, onPressAcceptOrder } =
    receiveSaleInvoiceOtherByID(props);
  const { onPressReturn, returnResult2, SaleInvoiceID2, setSaleInvoiceID2 } =
    returnSaleInvoiceByID(props);
  const { SaleInvoiceID4, returnResult4, onPressSubmiss, setSaleInvoiceID4 } =
    AcceptSaleInvoice(props);
  const { SaleInvoiceID3, Reason, returnResult3, onPressRefuse, setSaleInvoiceID3, setReason } =
    RefuseOrderByID(props);
  const { GetDataCode, dataSaleInvoiceCode, dataSaleInvoiceDetailCode, setdataSaleInvoiceCode } =
    getSaleInvoiceBycode(props);
  const {
    GetDataCodeNotPrint,
    dataSaleInvoiceDetailNotPrintCode,
    dataSaleInvoiceNotPrintCode,
    setdataSaleInvoiceNotPrintCode,
  } = getSaleInvoiceNotPrintBycode(props);
  const { onPressCode, returnResultcode } = receiveSaleInvoiceBycode(props);
  const CallCustomer = (phone: string) => {
    if (Platform.OS == 'android') {
      Linking.openURL('tel:' + phone + '').then((supported) => {
        if (!supported) {
          Alert.alert('Số điện thoại không đúng');
        } else {
          return Linking.openURL(phone);
        }
      });
    } else if (Platform.OS == 'ios') {
      Linking.openURL('tel:' + phone);
    }
  };
  const goBack = () => {
    props.navigation.goBack();
  };
  const onPressAccpectItem = async () => {
    if (Type == '1') {
      setSaleInvoiceID(SaleInvoiceID);
      if (SaleInvoiceID != '') {
        await onPressAccept(SaleInvoiceID);

        if ((await returnResult) == 1) {
          Toast.show({
            type: 'success',
            text1: 'Thao Tác Thành Công',
          });
          goBack();
        }
      }
    } else if (Type == '3') {
      await setSaleInvoiceID1(SaleInvoiceID1);
      if (SaleInvoiceID1 != '') {
        await onPressAccept(SaleInvoiceID1);
        if ((await returnResult1) == 1) {
          Toast.show({
            type: 'success',
            text1: 'Thao Tác Thành Công',
          });
          props.navigation.goBack();
        }
      }
    } else if (Type == '4') {
      await setSaleInvoiceID4(SaleInvoiceID4);
      if (SaleInvoiceID4 != '') {
        await onPressSubmiss(SaleInvoiceID4);
        if ((await returnResult4) == 1) {
          Toast.show({
            type: 'success',
            text1: 'Thao Tác Thành Công',
          });
          props.navigation.goBack();
        }
      }
    } else if (Type == '5') {
      showDialogPayment(1);
    }
    if (Type == '7') {
      await setSaleInvoiceID2(SaleInvoiceID2);
      if (SaleInvoiceID2 != '') {
        await onPressReturn(SaleInvoiceID2);
        if ((await returnResult2) == 1) {
          Toast.show({
            type: 'success',
            text1: 'Thao Tác Thành Công',
          });
          props.navigation.goBack();
        }
      }
    } else if (Type == '11') {
      await setSaleInvoiceIDOrder(SaleInvoiceIDOrder);
      if (SaleInvoiceIDOrder != '') {
        await onPressAcceptOrder(SaleInvoiceIDOrder);
        if ((await returnResultOrder) == 1) {
          Toast.show({
            type: 'success',
            text1: 'Thao Tác Thành Công',
          });
          props.navigation.goBack();
        }
      }
    } else if (Type == 'Code') {
      setSaleInvoiceID(SaleInvoiceID);
      if (SaleInvoiceID != '') {
        await onPressCode(SaleInvoiceID);
        if ((await returnResultcode) == 1) {
          Toast.show({
            type: 'success',
            text1: 'Thao Tác Thành Công',
          });
          props.navigation.goBack();
        }
      }
    }
  };
  const checkLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        Toast.show({
          type: 'success',
          text1: 'x: '+location.latitude.toString(),
          text2: 'y: '+location.longitude.toString(),
         
        });
        const _temp = {
          ...dataSaleInvoice,
          Latitue: location.latitude.toString(),
          Longitue  : location.longitude.toString()
      }
      setdataSaleInvoiceCode(_temp);
       
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }
  const getData = async () => {
    try {
      const TypeAPI = await props.route.params.TypeAPI;

      const ID = await props.route.params.IDOrder;
      setIDSaleVoice(ID);
      setIDSaleVoice1(ID);
      setSaleInvoiceID2(ID);
      setSaleInvoiceID1(ID);
      setSaleInvoiceID(ID);
      setSaleInvoiceID4(ID);
      setSaleInvoiceIDOrder(ID);
      setdataSaleInvoiceCode(ID);
      await setType(TypeAPI);
      if (TypeAPI == '2') {
        if (ID != '') {
          await GetDataType2(ID);
          if (!!lodash.isEmpty(dataSaleInvoiceDetail1)) {
            setShow(1);
          }
        }
      } else if (TypeAPI == '11') {
        if (ID != '') {
          await GetDataType1(ID);
          if (!!lodash.isEmpty(dataSaleInvoiceDetail)) {
            setShow(1);
          }
        }
      } else if (TypeAPI == 'Code') {
        await GetDataCode(ID);
        if (lodash.isEmpty(dataSaleInvoiceDetailCode) == false) {
          setShow(1);
        } else {
          setTimeout(() => {
            props.navigation.goBack();
          }, 1000);
        }
      } else if (TypeAPI == 'CodeNotPrint') {
        await GetDataCodeNotPrint(ID);
        if (lodash.isEmpty(dataSaleInvoiceDetailNotPrintCode) == false) {
          setShow(1);
        } else {
          setTimeout(() => {
            props.navigation.goBack();
          }, 1000);
        }
      } else {
        if (ID != '') {
          await GetDataType1(ID);
          if (!!lodash.isEmpty(dataSaleInvoiceDetail)) {
            setShow(1);
          }
        }
      }
    } catch (E) { }
  };
  const toggleModalVisibility = () => {
    setVisbleDialog(!VisbleDialog);
  };
  const toggleModalVisibility1 = () => {
    setVisbleDialog1(!!VisbleDialog1);
  };
  const toggleModalVisibilityQRCode = () => {
    setVisbleDialogQRCode(!!VisbleDialogQRCode);
  };
  const toggleModalVisibility2 = () => {
    setVisbleDialog2(!!VisbleDialog2);
  };
  const showDialog = (index: any) => {
    if (VisbleDialog == true) {
      setVisbleDialog(false);
    } else {
      setIndex(index);
      setVisbleDialog(true);
    }
  };
  const acceptRefuseOrderByID = async () => {
    if (Reason != '') {
      await onPressRefuse(
        Type == '2'
          ? dataSaleInvoice1.SaleInvoiceID
          : Type == '11'
            ? dataSaleInvoice.SaleInvoiceID
            : dataSaleInvoice.SaleInvoiceID
      );
      if ((await returnResult3) == 1) {
        Toast.show({
          type: 'success',
          text1: 'Thao Tác Thành Công',
        });
        setVisbleDialog1(false);
        props.navigation.goBack();
      }
    }
  };
  const showDialogrefuse = (value: any) => {
    if (VisbleDialog1 == true) {
      setVisbleDialog1(false);
    } else {
      setVisbleDialog1(true);
    }
  };

  const showDialogPayment = (value: any) => {
    if (VisbleDialog2 == true) {
      setVisbleDialog2(false);
    } else {
      setVisbleDialog2(true);
    }
  };
  const showDialogQRCode = () => {
    console.log(1);
    if (VisbleDialogQRCode == true) {
      setVisbleDialogQRCode(false);
    } else {
      setVisbleDialogQRCode(true);
    }
  };
  useEffect(() => {
    getData();
    checkLocation()
    // props.navigation.addListener('focus', () => {
    //   props.navigation.goBack()

    // });
    return () => { };
  }, []);
  const onTextChange = (value: any) => {
    if (value == '') {
    } else {
      setReason(value);
    }
  };
  const onTextTakeChange = (value: any) => {
    if (value == '' || value == 0 || value > dataSaleInvoiceDetail[Index].Quantity) {
    } else {
      dataSaleInvoiceDetail[Index].Quantity = value;
      setdataSaleInvoiceDetail(dataSaleInvoiceDetail);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <BackgroundDetailCellScreen title='Chi Tiết Phiếu' navigation={props.navigation}>
          {Show == 2 ? (
            <View
              style={{
                width: wp(100),
                height: hp(95),
                backgroundColor: '#fff',
                flexDirection: 'column',
                padding: 3,
              }}
            ></View>
          ) : (
            <View style={styles.container}>
              <ItemDetailCustomName
                styleItem={{ backgroundColor: '#c7ecee', marginBottom: 10 }}
                addressCustomer={
                  Type == '2'
                    ? dataSaleInvoice1.ShipAddress
                    : Type == '11'
                      ? dataSaleInvoice.ShipAddress
                      : Type == 'CodeNotPrint'
                        ? dataSaleInvoiceNotPrintCode.ShipAddress
                        : Type == 'Code'
                          ? dataSaleInvoiceCode.ShipAddress
                          : dataSaleInvoice.ShipAddress
                }
                codeOrder={
                  Type == '2'
                    ? dataSaleInvoice1.Code
                    : Type == '11'
                      ? dataSaleInvoice.Code
                      : Type == 'CodeNotPrint'
                        ? dataSaleInvoiceNotPrintCode.Code
                        : Type == 'Code'
                          ? dataSaleInvoiceCode.Code
                          : dataSaleInvoice.Code
                }
                dateTime={
                  Type == '2'
                    ? dataSaleInvoice1.DeliveryDate
                    : Type == '11'
                      ? dataSaleInvoice.DeliveryDate
                      : Type == 'CodeNotPrint'
                        ? dataSaleInvoiceNotPrintCode.DeliveryDate
                        : Type == 'Code'
                          ? dataSaleInvoiceCode.DeliveryDate
                          : dataSaleInvoice.DeliveryDate
                }
                invoiceWeight={
                  Type == '2'
                    ? dataSaleInvoice1.TotalQuantity.toString()
                    : Type == '11'
                      ? dataSaleInvoice.TotalQuantity.toString()
                      : Type == 'CodeNotPrint'
                        ? dataSaleInvoiceNotPrintCode.TotalQuantity.toString()
                        : Type == 'Code'
                          ? dataSaleInvoiceCode.TotalQuantity.toString()
                          : dataSaleInvoice.TotalQuantity.toString()
                }
                nameCustomer={
                  Type == '2'
                    ? dataSaleInvoice1.CustomerName
                    : Type == '11'
                      ? dataSaleInvoice.CustomerName
                      : Type == 'CodeNotPrint'
                        ? dataSaleInvoiceNotPrintCode.CustomerName
                        : Type == 'Code'
                          ? dataSaleInvoiceCode.CustomerName
                          : dataSaleInvoice.CustomerName
                }
                onPressItem={() => {
                  Type == '5' ? showDialogQRCode() : {};
                }}
                customerCode={
                  Type == '2'
                    ? dataSaleInvoice1.CustomerCode
                    : Type == '11'
                      ? dataSaleInvoice.CustomerCode
                      : Type == 'CodeNotPrint'
                        ? dataSaleInvoiceNotPrintCode.CustomerCode
                        : Type == 'Code'
                          ? dataSaleInvoiceCode.CustomerCode
                          : dataSaleInvoice.CustomerCode
                }
                typeItem={true}
                noteOder={
                  Type == '2'
                    ? dataSaleInvoice1.Notes
                    : Type == '11'
                      ? dataSaleInvoice.Notes
                      : Type == 'Code'
                        ? dataSaleInvoiceCode.Notes
                        : Type == 'CodeNotPrint'
                          ? dataSaleInvoiceNotPrintCode.Notes
                          : dataSaleInvoice.Notes
                }
                sourceIcon={BarCode}
                Option={'0'}
                type={'0'}
              ></ItemDetailCustomName>
              {Type == '2' ? (
                <FlatList
                  keyExtractor={(item, index) => 'key' + index}
                  data={dataSaleInvoiceDetail1}
                  renderItem={({ item, index }) => (
                    <ItemsDetailCustom
                      nameItem={index + 1 + '. ' + item.ProductName}
                      onPressItem={{}}
                      quantityItem={item.Quantity.toString() + ' ' + item.UnitName}
                      titleItem={item.Notes}
                      index={index.toString()}
                      type={Type.toString()}
                    ></ItemsDetailCustom>
                  )}
                ></FlatList>
              ) : Type == '11' ? (
                <FlatList
                  keyExtractor={(item, index) => 'key' + index}
                  data={dataSaleInvoiceDetail}
                  renderItem={({ item, index }) => (
                    <ItemsDetailCustom
                      nameItem={index + 1 + '. ' + item.ProductName}
                      onPressItem={{}}
                      quantityItem={item.Quantity.toString() + ' ' + item.UnitName}
                      titleItem={item.Notes}
                      index={index}
                      styleItem={{ backgroundColor: mainColors.whiteColor }}
                    ></ItemsDetailCustom>
                  )}
                ></FlatList>
              ) : Type == 'Code' ? (
                <FlatList
                  keyExtractor={(item, index) => 'key' + index}
                  data={dataSaleInvoiceDetailCode}
                  renderItem={({ item, index }) => (
                    <ItemsDetailCustom
                      nameItem={index + 1 + '. ' + item.ProductName}
                      onPressItem={{}}
                      quantityItem={item.Quantity.toString() + ' ' + item.UnitName}
                      titleItem={item.Notes}
                      index={index}
                      styleItem={{ backgroundColor: mainColors.whiteColor }}
                    ></ItemsDetailCustom>
                  )}
                ></FlatList>
              ) : Type == 'CodeNotPrint' ? (
                <FlatList
                  keyExtractor={(item, index) => 'key' + index}
                  data={dataSaleInvoiceDetailNotPrintCode}
                  renderItem={({ item, index }) => (
                    <ItemsDetailCustom
                      nameItem={index + 1 + '. ' + item.ProductName}
                      onPressItem={{}}
                      quantityItem={item.Quantity.toString() + ' ' + item.UnitName}
                      titleItem={item.Notes}
                      index={index}
                      styleItem={{ backgroundColor: mainColors.whiteColor }}
                    ></ItemsDetailCustom>
                  )}
                ></FlatList>
              ) : (
                <FlatList
                  keyExtractor={(item, index) => 'key' + index}
                  data={dataSaleInvoiceDetail}
                  renderItem={({ item, index }) => (
                    <ItemsDetailCustom
                      nameItem={index + 1 + '. ' + item.ProductName}
                      onPressDialog={showDialog}
                      onPressItem={{}}
                      quantityItem={item.Quantity.toString() + ' ' + item.UnitName}
                      titleItem={item.Notes}
                      type={Type}
                      index={index}
                      styleItem={{ backgroundColor: mainColors.whiteColor }}
                    ></ItemsDetailCustom>
                  )}
                ></FlatList>
              )}

              <View style={styles.view_bottom}>
                <View style={styles.text_bottom}>
                  <Text style={{ fontSize: wp(5), fontWeight: 'bold', color: 'red' }}>
                    Tổng Tiền:
                  </Text>
                  <Text style={{ fontSize: wp(5), fontWeight: 'bold', color: 'red' }}>
                    {Show != 2
                      ? Type == '2'
                        ? getDataByThing.getcurrency(dataSaleInvoice1.TotalAmount.toString()) +
                        ' VNĐ'
                        : Type == '11'
                          ? getDataByThing.getcurrency(dataSaleInvoice.TotalAmount.toString()) +
                          ' VNĐ'
                          : Type == 'Code'
                            ? getDataByThing.getcurrency(dataSaleInvoiceCode.TotalAmount.toString()) +
                            ' VNĐ'
                            : Type == 'CodeNotPrint'
                              ? getDataByThing.getcurrency(
                                dataSaleInvoiceNotPrintCode.TotalAmount.toString()
                              ) + ' VNĐ'
                              : getDataByThing.getcurrency(dataSaleInvoice.TotalAmount.toString()) +
                              ' VNĐ'
                      : 0}
                  </Text>
                </View>

                <View style={styles.bottom}>
                  <Toast style={{paddingBottom:hp(5)}} position={'bottom'} visibilityTime={5} ref={(ref) => Toast.setRef(ref)} />
                  <IconDetailCustom
                    iconShow={true}
                    onPress={() => {
                      {
                        Type == '2'
                          ? CallCustomer(dataSaleInvoice1.CustomerPhone)
                          : Type == '11'
                            ? CallCustomer(dataSaleInvoice.CustomerPhone)
                            : Type == 'Code'
                              ? CallCustomer(dataSaleInvoiceCode.CustomerPhone)
                              : Type == 'CodeNotPrint'
                                ? CallCustomer(dataSaleInvoiceNotPrintCode.CustomerPhone)
                                : CallCustomer(dataSaleInvoice.CustomerPhone);
                      }
                    }}
                    labelStyle={{ color: mainColors.whiteColor, fontSize: wp(4) }}
                    title={'Gọi'}
                    sourceICon={Phone}
                    style={styles.ButtonBottomgreen}
                  ></IconDetailCustom>
                  {Type == '5' ? (
                    <IconDetailCustom
                      iconShow={true}
                      onPress={() => showDialogrefuse(1)}
                      labelStyle={{ color: mainColors.blackColor, fontSize: wp(3.5) }}
                      title={'Không Giao Được'}
                      sourceICon={Cancel}
                      style={styles.ButtonBottomsmoke}
                    ></IconDetailCustom>
                  ) : (
                    <View></View>
                  )}
                  {Type == '1'  || Type == '11' || Type == 'Code' ? (
                    <IconDetailCustom
                      iconShow={true}
                      onPress={() => onPressAccpectItem()}
                      labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
                      title={'Nhận Phiếu'}
                      sourceICon={Check}
                      type={Type}
                      SaleVoiceID={
                        lodash.isEmpty(dataSaleInvoice1)
                          ? dataSaleInvoice.SaleInvoiceID
                          : dataSaleInvoice1.SaleInvoiceID
                      }
                      style={styles.ButtonBottomgreen}
                    ></IconDetailCustom>
                  ) : Type == '3' ? (
                    <IconDetailCustom
                      iconShow={true}
                      onPress={() => onPressAccpectItem()}
                      labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
                      title={'Nhận Hàng'}
                      sourceICon={Check}
                      type={Type}
                      SaleVoiceID={
                        lodash.isEmpty(dataSaleInvoice1)
                          ? dataSaleInvoice.SaleInvoiceID
                          : dataSaleInvoice1.SaleInvoiceID
                      }
                      style={styles.ButtonBottomgreen}
                    ></IconDetailCustom>
                  ) : Type == '5' ? (
                    <IconDetailCustom
                      iconShow={true}
                      onPress={() => onPressAccpectItem()}
                      labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
                      title={'Thanh Toán'}
                      sourceICon={Check}
                      type={Type}
                      SaleVoiceID={
                        lodash.isEmpty(dataSaleInvoice1)
                          ? dataSaleInvoice.SaleInvoiceID
                          : dataSaleInvoice1.SaleInvoiceID
                      }
                      style={styles.ButtonBottomgreen}
                    ></IconDetailCustom>
                  ): Type == '4' ? (
                    <IconDetailCustom
                      iconShow={true}
                      onPress={() => onPressAccpectItem()}
                      labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
                      title={'Nộp Phiếu'}
                      sourceICon={Check}
                      type={Type}
                      SaleVoiceID={
                        lodash.isEmpty(dataSaleInvoice1)
                          ? dataSaleInvoice.SaleInvoiceID
                          : dataSaleInvoice1.SaleInvoiceID
                      }
                      style={styles.ButtonBottomgreen}
                    ></IconDetailCustom>)
                   : (
                    <View></View>
                  )}
                  {Type == '7' ? (
                    <IconDetailCustom
                      iconShow={true}
                      onPress={() => onPressAccpectItem()}
                      labelStyle={{ color: mainColors.whiteColor, fontSize: wp(3) }}
                      title={'Trả Phiếu'}
                      sourceICon={Exchange2}
                      type={Type}
                      SaleVoiceID={
                        lodash.isEmpty(dataSaleInvoice1)
                          ? dataSaleInvoice.SaleInvoiceID
                          : dataSaleInvoice1.SaleInvoiceID
                      }
                      style={styles.ButtonBottomblue}
                    ></IconDetailCustom>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
            </View>
          )}

          {VisbleDialog == true ? (
            <Modal
              animationType='slide'
              transparent
              visible={VisbleDialog}
              presentationStyle='formSheet'
              style={{ justifyContent: 'flex-end', margin: 0 }}
              onDismiss={toggleModalVisibility}
            >
              <DialogAccpetOrder
                onTextTakeChange={onTextTakeChange}
                onTextChange={onTextChange}
                noteOrder={
                  lodash.isEmpty(dataSaleInvoiceDetail) ? '' : dataSaleInvoiceDetail[Index].Notes
                }
                noteUser={'nhập ghi chú khách hàng'}
                onPressAcpect={showDialog}
                onPressClose={showDialog}
                quanlitiPut={
                  lodash.isEmpty(dataSaleInvoiceDetail)
                    ? ''
                    : dataSaleInvoiceDetail[Index].QuantityOrg.toString()
                }
                quanlitiTake={
                  lodash.isEmpty(dataSaleInvoiceDetail)
                    ? ''
                    : dataSaleInvoiceDetail[Index].Quantity.toString()
                }
                title={
                  lodash.isEmpty(dataSaleInvoiceDetail)
                    ? ''
                    : dataSaleInvoiceDetail[Index].ProductName
                }
              ></DialogAccpetOrder>
            </Modal>
          ) : (
            <View></View>
          )}

          <Modal
            animationType='slide'
            transparent
            visible={VisbleDialog1}
            presentationStyle='formSheet'
            style={{ justifyContent: 'flex-end', margin: 0 }}
            onDismiss={toggleModalVisibility1}
          >
            <DialogRefuseOrder
              onTextChange={onTextChange}
              onPressAcpect={() => acceptRefuseOrderByID()}
              onPressClose={() => showDialogrefuse(1)}
            ></DialogRefuseOrder>
          </Modal>

          <Modal
            animationType='slide'
            transparent
            visible={VisbleDialogQRCode}
            presentationStyle='formSheet'
            style={{ justifyContent: 'flex-end', margin: 0 }}
            onDismiss={toggleModalVisibilityQRCode}
          >
            <DialogQRCode onPressClose={() => showDialogQRCode()}></DialogQRCode>
          </Modal>
          <Modal
            animationType='slide'
            transparent
            visible={VisbleDialog2}
            presentationStyle='formSheet'
            style={{ justifyContent: 'flex-end', margin: 0 }}
            onDismiss={toggleModalVisibility2}
          >
            <DialogPaymentOrder
              SaleInvoiceClient={
                Type == '2'
                  ? dataSaleInvoice1
                  : Type == '11'
                    ? dataSaleInvoice
                    : Type == 'Code'
                      ? dataSaleInvoiceCode
                      : dataSaleInvoice
              }
              TotalPrice={
                Show != 2
                  ? Type == '2'
                    ? dataSaleInvoice1.TotalAmount
                    : Type == '11'
                      ? dataSaleInvoice.TotalAmount
                      : Type == 'Code'
                        ? dataSaleInvoiceCode.TotalAmount
                        : dataSaleInvoice.TotalAmount
                  : 0
              }
              SaleInvoiceDetailClient={
                Type == '2'
                  ? dataSaleInvoiceDetail1
                  : Type == '11'
                    ? dataSaleInvoiceDetail
                    : Type == 'Code'
                      ? dataSaleInvoiceDetailCode
                      : dataSaleInvoiceDetail
              }
              navigation={props.navigation}
              onPressClosePay={showDialogPayment}
            ></DialogPaymentOrder>
          </Modal>
          {Type == '5' ? <Ripple onPressIn={()=>checkLocation()} style={[styles.ButtonFloating,
          Platform.OS == 'ios'
            ? styles.shadowIos
            : styles.shadowAndroid,
          ]}>
            <Image style={styles.ImageBT2} source={GHIM} />
          </Ripple> : <View></View>}
        </BackgroundDetailCellScreen>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(0.5),
    flex: 1,
    backgroundColor: '#fff',
  },
  view_bottom: {
    width: '100%',
    marginTop: hp(1),
    paddingLeft: 5,
    paddingRight: 5,
    height: hp(13),
    flexDirection: 'column',
    borderRadius: 5,
    elevation: 4,
    backgroundColor: '#d8fcf7',
  },
  text_bottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },

  bottom: {
    width: '100%',
    height: hp(8),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  floatting_butotn: {
    width: wp(15),
    height: wp(15),
    borderRadius: 100,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: hp(20),
    right: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonBottomgreen: {
    marginLeft: wp(5),
    width: wp(25),
    height: hp(5),
    borderRadius: 5,
    backgroundColor: mainColors.greenscolor,
  },
  ButtonBottomblue: {
    marginLeft: wp(5),
    width: wp(25),
    height: hp(5),
    borderRadius: 5,
    backgroundColor: mainColors.blue,
  },
  ButtonBottomsmoke: {
    marginLeft: wp(5),
    width: wp(25),
    height: hp(5),
    borderRadius: 5,
    backgroundColor: mainColors.smokecolor,
  },
  ButtonFloating: {
    height: wp(14),
    width: wp(14),
    backgroundColor:'#dff9fb',
    position: 'absolute',
    bottom: hp(14.5),
    right: wp(3),
    borderRadius: wp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowAndroid: {
    elevation: 5,
  },
  shadowIos: {
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.21,
    shadowRadius: 4,
  },
  ImageBT2: {
    height: wp(6),
    width: wp(6),

  }
});
export default DetaiEnvoice;
