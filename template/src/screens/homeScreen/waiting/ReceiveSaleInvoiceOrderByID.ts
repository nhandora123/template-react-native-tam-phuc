import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { waittingPrinted } from '../../../services/homeScreen/Waitting/waitting';
import { SaleInvoiceClient } from '../../../components/object/Order'
import { ReceiveSaleInvoiceOtherByID } from '../../../services/homeScreen/Waitting/ReceiveSaleInvoiceOtherByID';


export const receiveSaleInvoiceOtherByID = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID, setUserID] = useState(profileInfo.UserID);
  const [SaleInvoiceIDOrder, setSaleInvoiceIDOrder] = useState('');
  const [returnResultOrder, setreturnResultOrder] = useState(1);

  useEffect(() => {
    setUserID(profileInfo.UserID);
    return () => {
    }
  })
  
  const onPressAcceptOrder = async (ID: string) => {
    let dataResult = await ReceiveSaleInvoiceOtherByID(profileInfo.UserID, ID);
    let result = await dataResult.data;

    if (await result?.StatusID == 1) {
  
      let resul = 1;
      setreturnResultOrder(resul);

    }
    else {
      let resul = 0;
  
      setreturnResultOrder(resul);

    }
  }
  return {

    userID, setUserID,
    SaleInvoiceIDOrder, setSaleInvoiceIDOrder,
    returnResultOrder, onPressAcceptOrder

  }
}