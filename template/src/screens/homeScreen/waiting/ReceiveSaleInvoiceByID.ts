import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { waittingPrinted } from '../../../services/homeScreen/Waitting/waitting';
import { SaleInvoiceClient } from '../../../components/object/Order';
import { ReceiveSaleInvoiceByID } from '../../../services/homeScreen/Waitting/ReceiveSaleInvoiceByID';

export const receiveSaleInvoiceByID = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID, setUserID] = useState(profileInfo.UserID);
  const [SaleInvoiceID, setSaleInvoiceID] = useState('');
  const [returnResult, setreturnResult] = useState(1);

  useEffect(() => {
    setUserID(profileInfo.UserID);
    return () => {};
  });
  const onPressAccept = async (ID: string) => {
    let dataResult = await ReceiveSaleInvoiceByID(profileInfo.UserID, ID);
    let result = await dataResult.data;

    if (await result?.StatusID == 1) {
    
      let resul = 1;
      setreturnResult(resul);
    } else {
      let resul = 0;
      setreturnResult(resul);
    }
  };
  return {
    userID,
    setUserID,
    SaleInvoiceID,
    setSaleInvoiceID,
    returnResult,
    onPressAccept,
  };
};
