import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { HandOutSaleInvoice } from '../../../services/homeScreen/Detail/HandOutSaleInvoice'
import { SaleInvoiceClient, SaleInvoiceDetailClient, PaymentInfo } from '../../../components/object/Order'
import { ToastAndroid } from 'react-native';
export const handOutSaleInvoice = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID1, setUserID1] = useState(profileInfo.UserID);

  const [returnResultHandout, setreturnResultHandout] = useState(1);

  useEffect(() => {
    setUserID1(profileInfo.UserID);
    return () => {
    }
  })
  const onPressHandout = async (ID: string, data: SaleInvoiceDetailClient, dataPayment: PaymentInfo) => {
    let dataResult = await HandOutSaleInvoice(profileInfo.UserID, ID, data, dataPayment);
    let result = await dataResult.data;
    ToastAndroid.show(result.ErrorDescription, ToastAndroid.CENTER)
    if (await result?.StatusID == 1) {
      let resul = 1;
      setreturnResultHandout(resul);
    }
    else {
      let resul = 0;
      setreturnResultHandout(resul);

    }
  }
  return {
    onPressHandout,

    returnResultHandout,
  }
}