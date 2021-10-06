import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { waittingPrinted } from '../../../services/homeScreen/Waitting/waitting';
import { SaleInvoiceClient } from '../../../components/object/Order'
import { ApplySaleInvoiceByID } from '../../../services/homeScreen/Submisstion/ApplySaleInvoiceByID';

export const AcceptSaleInvoice = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID, setUserID] = useState(profileInfo.UserID);
  const [SaleInvoiceID4, setSaleInvoiceID4] = useState('');
  const [returnResult4, setreturnResult4] = useState(1);
  useEffect(() => {
    setUserID(profileInfo.UserID);
    return () => {
    }
  })
  const onPressSubmiss = async (ID: string) => {
    let dataResult = await ApplySaleInvoiceByID(profileInfo.UserID, ID);
    let result = await dataResult.data;

    if (await result?.StatusID == 1) {
      let result = 1;
      setreturnResult4(result);
    }
    else {
      let result = 0;
      setreturnResult4(result);
    }
  }
  return {
    userID, setUserID,
    SaleInvoiceID4, setSaleInvoiceID4,
    returnResult4, onPressSubmiss

  }
}