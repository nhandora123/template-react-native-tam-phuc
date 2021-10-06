import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { ShippedSaleInvoiceByID } from '../../../services/homeScreen/acceptance/ShippedSaleInvoiceByID'
export const getMerchandiseToDelivery = (props: any) => {
  const {profileInfo} = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID1, setUserID1] = useState(profileInfo.UserID);
  
  const [SaleInvoiceID1, setSaleInvoiceID1] = useState('');
  const [returnResult1, setreturnResult1] = useState(1);
  useEffect(() => {
    setUserID1(profileInfo.UserID);
    return () => {
    }
  })
  const onPressGetMerchand = async (ID: string) => {
    let dataResult = await ShippedSaleInvoiceByID(profileInfo.UserID, ID);
    let result = await dataResult.data;

    if (await result?.StatusID == 1) {
      let resul =1;
      setreturnResult1(resul)
     
    }
    else {
      let resul =0;
      setreturnResult1(resul)
      
    }
  }
  return {
    userID1, setUserID1,
    SaleInvoiceID1, setSaleInvoiceID1,
    returnResult1, onPressGetMerchand

  }
}