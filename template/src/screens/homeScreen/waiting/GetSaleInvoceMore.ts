import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { waittingPrinted } from '../../../services/homeScreen/Waitting/waitting';
import { SaleInvoiceClient } from '../../../components/object/Order';
import lodash from 'lodash'


export const GetSaleInvoiceMore = (props: any) => {
  const dispatch = useDispatch();
  const {profileInfo} = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userIDMore, setUserIDMore] = useState(profileInfo.UserID);
  const [pageIndexMore, setPageIndexMore] = useState(1);
  const [searchStringMore, setsearchStringMore] = useState('');
  const [dataMore, setDataMore] = useState(new Array<SaleInvoiceClient>());

  const onPressSearchMore = async () => {
    try {

      let dataGetSaleInvoiceNoteReceive = await waittingPrinted(profileInfo.UserID, pageIndexMore, searchStringMore);

      let result = dataGetSaleInvoiceNoteReceive.data;

      if (result?.StatusID == 1) {

        const data: Array<SaleInvoiceClient> = await result.SaleInvoiceList;
        setDataMore(data)
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
    userIDMore, setUserIDMore,
    pageIndexMore, setPageIndexMore,
    onPressSearchMore,
    dataMore, setDataMore,
    searchStringMore,setsearchStringMore

  }

}

