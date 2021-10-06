import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { waittingPrinted } from '../../../services/homeScreen/Waitting/waitting';
import { SaleInvoiceClient } from '../../../components/object/Order'
import { ReceiveSaleInvoiceByCode } from '../../../services/homeScreen/Waitting/ReceiveSaleInvoceByCode';


export const receiveSaleInvoiceBycode = (props: any) => {
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID, setUserID] = useState(profileInfo.UserID);

  const [returnResultcode, setreturnResultcode] = useState(2);

  useEffect(() => {
    setUserID(profileInfo.UserID);
    return () => {
    }
  })
  const onPressCode = async (code: any) => {
    let dataResult = await ReceiveSaleInvoiceByCode(profileInfo.UserID, code);
    let result = await dataResult.data;

    if (await result?.StatusID == 1) {
      let resul = 1;
      setreturnResultcode(resul);

    }
    else {
      let resul = 0;

      setreturnResultcode(resul);

    }
  }
  return {
    returnResultcode,onPressCode

  }
}