
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
import { BarCode, Box, Search, LOGOUTICON, Receiver, FILES } from '../../../assets/index';
import { Fonts, mainColors } from '../../../constants/index';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import { ItemsCustom } from '../../../components/items/ItemCustom';
import lodash from 'lodash'
import { getDataFinish } from './GetDataFinish'
import { getSaleInvoiceBycode } from '../detailEnvoice/GetSaleInvoiceByCode';
import { DialogError } from '../../../components/modal/DialogError';

const Finish = (props: any) => {
  const { data, onPressSearch, setsearchString } = getDataFinish(props);
  const { GetDataCode, dataSaleInvoiceCode, dataSaleInvoiceDetailCode, setdataSaleInvoiceCode } =
  getSaleInvoiceBycode(props);
  const [VisbleDialogError, setVisbleDialogError] = useState(false);
  const search = (value: any) => {
    if (value = '') {
      setsearchString('');
    }
    else {
      setsearchString(value);
    }
  }
  const onScanBarCode = () => {
    props.navigation.navigate("CameraScreenDetail", { type: 1 })

  }
  const getdata = async () => {
    await onPressSearch()
    props.navigation.addListener('focus', () => {
      getdata()
    });
  }
  useEffect(() => {
    setsearchString('');
    getdata()
    return () => { }
  }, [])
  return (
    <BackgroundDetailScreen title="5. Hoàn tất" navigation={props.navigation}>
      <View style={styles.container}>
        <HeaderSearchCustom
          onScanSuccess={() => { console.log(1) }}
          onPressSearch={() => { onPressSearch() }}
          onPressBarCode={()=>{onScanBarCode()}}
          _onChangeText={search}
        ></HeaderSearchCustom>
        {lodash.isEmpty(data) ?
          <View></View> :
          <FlatList
            style={{ backgroundColor: '#fff' }}
            data={data}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item, index }) =>
              <View>
                {index % 2 == 0 ? <ItemsCustom
                  navigation={props.navigation}
                  addressCustomer={item.ShipAddress}
                  codeOrder={index + 1 + '. ' + item.Code}
                  dateTime={item.DeliveryDate}
                  invoiceWeight={item.TotalQuantity.toString()}
                  nameCustomer={item.CustomerName}
                  onPressItem={() => { }}
                  typeItem={false}
                  noteOder={item.Notes}
                  customerCode={item.CustomerCode}
                  sourceIcon={Receiver}
                  Option={'5'}
                  type={'6'}
                  SaleVoiceID={item.SaleInvoiceID}
                  PhoneNumBer={item.CustomerPhone}
                ></ItemsCustom> : <ItemsCustom
                  styleItem={{ backgroundColor: mainColors.colorItem  }}
                  navigation={props.navigation}
                  addressCustomer={item.ShipAddress}
                  codeOrder={index + 1 + '. ' + item.Code}
                  dateTime={item.DeliveryDate}
                  invoiceWeight={item.TotalQuantity.toString()}
                  nameCustomer={item.CustomerName}
                  onPressItem={() => { }}
                  typeItem={false}
                  noteOder={item.Notes}
                  customerCode={item.CustomerCode}
                  sourceIcon={Receiver}
                  Option={'5'}
                  type={'6'}
                  SaleVoiceID={item.SaleInvoiceID}
                  PhoneNumBer={item.CustomerPhone}
                ></ItemsCustom>}

              </View>

            }

          />
        }
      </View>
    </BackgroundDetailScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#fff',
    flexDirection: 'column',
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
    backgroundColor: 'white',
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


})
export default Finish;
