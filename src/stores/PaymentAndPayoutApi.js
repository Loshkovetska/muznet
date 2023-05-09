import React from "react";
import {
    PermissionsAndroid,
    Platformn
} from "react-native";
import { makeAutoObservable, action, runInAction, observable } from "mobx";
import { apiMocks } from "@/api/mock/apiMocks"
// offerDetails = {
//     offerAdditionalInfo:"", 
//             offerDate: {
//         milliseconds: "",
//         string: "",
//     },
//     offerDuration: 0,
//     offerStartTime: {
//         milliseconds: "",
//         string: "",
//     },
//     offerEndTime: {
//         milliseconds: "",
//         string: "",
//     },
//     offerLocation: "",
//     offerPhoneNumber: "",
//     offerPricePerHour: "",
//     offerTotalMoney: 0,
// }
class PaymentAndPayoutApi {
    // Payment
    isOpenPaymentDetails = false
    isClosePaymentDetails = false
    paymentDetails = {}
    // Payout
    isOpenPayoutDetails = false
    isClosePayoutDetails = false
    payoutDetails = {}

    constructor() {
        makeAutoObservable(this, {
            // Payment
            isOpenPaymentDetails: observable,
            isClosePaymentDetails: observable,
            paymentDetails: observable,
            // Payout
            isOpenPayoutDetails: observable,
            isClosePayoutDetails: observable,
            payoutDetails: observable,
            // Payment
            setOpenPaymentDetails: action.bound,
            setClosePaymentDetails: action.bound,
            setPaymentDetails: action.bound,
            // Payout
            setOpenPayoutDetails: action.bound,
            setClosePayoutDetails: action.bound,
            setPayoutDetails: action.bound,


        })
    }

    setOpenPaymentDetails(boolean) {
        this.isOpenPaymentDetails = boolean
    }
    setClosePaymentDetails(boolean) {
        this.isOpenPaymentDetails = false
        this.isClosePaymentDetails = boolean
    }
    setPaymentDetails(details) {
        this.paymentDetails = details
    }

    setOpenPayoutDetails(boolean) {
        this.isOpenPayoutDetails = boolean
    }
    setClosePayoutDetails(boolean) {
        this.isOpenPayoutDetails = false
        this.isClosePayoutDetails = boolean
    }
    setPayoutDetails(details) {
        this.payoutDetails = details
    }

}

const PaymentAndPayoutApiStore = new PaymentAndPayoutApi();

export const PaymentAndPayoutApiStoreStoreContext = React.createContext(PaymentAndPayoutApiStore);
export const usePaymentAndPayoutApiStore = () => React.useContext(PaymentAndPayoutApiStoreStoreContext)


