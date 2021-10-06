import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { ReturnSaleInvoiceByID } from '../../../services/homeScreen/acceptance/ReturnSaleInvoiceByID'
export const returnSaleInvoiceByID = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID1, setUserID1] = useState(profileInfo.UserID);

  const [SaleInvoiceID2, setSaleInvoiceID2] = useState('');
  const [returnResult2, setreturnResult2] = useState(1);
  useEffect(() => {
    setUserID1(profileInfo.UserID);
    return () => {
    }
  })
  const onPressReturn = async (ID: string) => {
    let dataResult = await ReturnSaleInvoiceByID(profileInfo.UserID, ID);
    let result = await dataResult.data;

    if (await result?.StatusID == 1) {
      let resul = 1;
      setreturnResult2(resul);
    }
    else {
      let resul = 0;
      setreturnResult2(resul);

    }
  }
  return {
    userID1, setUserID1,
    SaleInvoiceID2, setSaleInvoiceID2,
    returnResult2, onPressReturn

  }
}