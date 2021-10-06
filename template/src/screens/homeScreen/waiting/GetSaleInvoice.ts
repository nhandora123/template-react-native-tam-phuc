import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { waittingPrinted } from '../../../services/homeScreen/Waitting/waitting';
import { SaleInvoiceClient } from '../../../components/object/Order';
import lodash from 'lodash'


export const GetSaleInvoiceNoteReceive = (props: any) => {
  const dispatch = useDispatch();
  const {profileInfo} = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID, setUserID] = useState(profileInfo.UserID);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchString, setsearchString] = useState('');
  const [data, setData] = useState(new Array<SaleInvoiceClient>());

  const onPressSearch = async () => {
    try {

      let dataGetSaleInvoiceNoteReceive = await waittingPrinted(profileInfo.UserID, pageIndex, searchString);

      let result = dataGetSaleInvoiceNoteReceive.data;

      if (result?.StatusID == 1) {

        const data: Array<SaleInvoiceClient> = await result.SaleInvoiceList;
        setData(data)
        return data;
      }
      else {
        return null;
      }
    }
    catch (E) {
      
     }
  }
  return {
    userID, setUserID,
    pageIndex, setPageIndex,
    onPressSearch,
    data, setData,
    searchString,setsearchString

  }

}

