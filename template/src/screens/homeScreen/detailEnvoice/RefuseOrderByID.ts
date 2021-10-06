import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { NotHandoutSaleInvoiceByID } from '../../../services/homeScreen/Detail/NotHandoutSaleInvoiceByID'
export const RefuseOrderByID = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID1, setUserID1] = useState(profileInfo.UserID);

  const [SaleInvoiceID3, setSaleInvoiceID3] = useState('');
  const [returnResult3, setreturnResult3] = useState(1);
  const [Reason, setReason] = useState('')
  useEffect(() => {
    setUserID1(profileInfo.UserID);
    return () => {
    }
  })
  const onPressRefuse = async (ID: string) => {
    let dataResult = await NotHandoutSaleInvoiceByID(profileInfo.UserID, ID, Reason);
    let result = await dataResult.data;

    if (await result?.StatusID == 1) {
      let resul = 1;
      setreturnResult3(resul);


    }
    else {
      let resul = 0;
      setreturnResult3(resul);

    }
  }
  return {
    userID1, setUserID1,
    SaleInvoiceID3, setSaleInvoiceID3,
    returnResult3, onPressRefuse,
    setReason,Reason
  }
}