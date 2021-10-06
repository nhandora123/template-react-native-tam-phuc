import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, FlatList, Modal } from 'react-native';
import Ripple from 'react-native-material-ripple';
//import CodePush from 'react-native-code-push';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BackgroundDetailScreen } from '../../../components/backgroundScreen/backgroundDetailScreen/BackgroundDetailScreen.view';
import { Receiver} from '../../../assets/index';
import { mainColors } from '../../../constants/index';
import { getSaleInvoiceShipping } from './Transportion';
import { ItemTransportion } from '../../../components/items/ItemTransportion';
import { HeaderSearchCustom } from '../../../components/headerSearch/HeaderSearchCustom';
import lodash from 'lodash';
import { getSaleInvoiceBycode } from '../detailEnvoice/GetSaleInvoiceByCode';

const Transportion = (props: any) => {
  const { data, onPressSearch, setsearchString, setData } = getSaleInvoiceShipping(props);
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
      getdata();
    });
    return () => {};
  }, []);
  const onScanBarCode = () => {
    props.navigation.navigate('CameraScreenDetail', { type: 1 });
  };
  return (
    <BackgroundDetailScreen title='3. Vận chuyển' navigation={props.navigation}>
      <View style={styles.container}>
        <HeaderSearchCustom
          onPressBarCode={() => {
            onScanBarCode();
          }}
          onScanSuccess={() => {
            console.log(1);
          }}
          onPressSearch={() => {
            onPressSearch();
          }}
          _onChangeText={search}
        ></HeaderSearchCustom>
        {lodash.isEmpty(data) ? (
          <View></View>
        ) : (
          <FlatList
            style={{ backgroundColor: '#fff' }}
            keyExtractor={(item, index) => 'key' + index}
            data={data}
            renderItem={({ item, index }) => (
              <View>
                {index % 2 == 0 ? (
                  <ItemTransportion
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
                    Option={'3'}
                    type={'5'}
                    customerCode={item.CustomerCode}
                    SaleVoiceID={item.SaleInvoiceID}
                    PhoneNumBer={item.CustomerPhone}
                    index={index.toString()}
                    onPressTransposition={{}}
                  ></ItemTransportion>
                ) : (
                  <ItemTransportion
                    styleItem={{ backgroundColor: '#c7ecee' }}
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
                    Option={'3'}
                    type={'5'}
                    customerCode={item.CustomerCode}
                    SaleVoiceID={item.SaleInvoiceID}
                    PhoneNumBer={item.CustomerPhone}
                    index={index.toString()}
                    onPressTransposition={{}}
                  ></ItemTransportion>
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
    width: wp(100),
    height: hp(100),
    flexDirection: 'column',
  },
  headertabview: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    height: hp(10),
    width: wp(100),
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
export default Transportion;
