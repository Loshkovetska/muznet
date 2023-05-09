import React from "react";
import {
    PermissionsAndroid,
    Platformn
} from "react-native";
import { makeAutoObservable, action, runInAction, observable } from "mobx";
import { apiMocks } from "@/api/mock/apiMocks"

class PromoteAdApi {
    payoutDetails = {}

    constructor() {
        makeAutoObservable(this, {
            paymentDetails: observable,

            setPaymentDetails: action.bound,
        })
    }
    setPaymentDetails(details) {
        this.paymentDetails = details
    }

}

const PromoteAdApiStore = new PromoteAdApi();

export const PromoteAdApiStoreStoreContext = React.createContext(PromoteAdApiStore);
export const usePromoteAdApiStore = () => React.useContext(PromoteAdApiStoreStoreContext)


