import React from "react";
import {
    PermissionsAndroid,
    Platformn
} from "react-native";
import { makeAutoObservable, action, runInAction, observable } from "mobx";
import { apiMocks } from "@/api/mock/apiMocks"
class OfferToMusicianApi {
    offerDetails = {
        offerAdditionalInfo: "",
        offerDate: {
            milliseconds: "",
            string: "",
        },
        offerDuration: 0,
        offerStartTime: {
            milliseconds: "",
            string: "",
        },
        offerEndTime: {
            milliseconds: "",
            string: "",
        },
        offerLocation: "",
        offerPhoneNumber: "",
        offerPricePerHour: "",
        offerTotalMoney: 0,
    }
    // offerDetails = {
    //     offerAdditionalInfo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    //     offerDate: {
    //         milliseconds: 55800000,
    //         string: "Wednesday, Jun 29",
    //     },
    //     offerDuration: 3,
    //     offerStartTime: {
    //         milliseconds: 55800000,
    //         string: "03:30pm",
    //     },
    //     offerEndTime: {
    //         milliseconds: 73800000,
    //         string: "06:30pm",
    //     },
    //     offerLocation: "Jefferson Avenue, Buffalo, NY, USA",
    //     offerPhoneNumber: "+1 (465) 656-5665",
    //     offerPricePerHour: 100,
    //     offerTotalMoney: 300,
    // }
    isSendOffer = false
    isOpenCreateOffer = false
    isFirstCreatedOffer = false
    isOpenOfferPreview = false
    isPaySuccesful = false
    isOpenPaySuccesfulModal = false
    isPayError = false

    constructor() {
        makeAutoObservable(this, {
            offerDetails: observable,
            isSendOffer: observable,
            paymentDetails: observable,
            isOpenCreateOffer: observable,
            isFirstCreatedOffer: observable,
            isOpenOfferPreview: observable,

            isPaySuccesful: observable,
            isOpenPaySuccesfulModal: observable,

            isPayError: observable,

            setOpenCreateOffer: action.bound,
            setSendOffer: action.bound,
            setOpenOfferPreview: action.bound,
            setFirstCreatedOffer: action.bound,
            setPaySucessful: action.bound,
            setOpenPaySuccesfulModal: action.bound,
            setPayError: action.bound,
            setOfferDetails: action.bound,
            resetState: action.bound,
        })
    }

    setOpenCreateOffer(boolean) {
        this.isOpenCreateOffer = boolean
    }

    setSendOffer(boolean) {
        this.isSendOffer = boolean
    }

    setOpenOfferPreview(boolean) {
        this.isOpenOfferPreview = boolean
    }

    setPaySucessful(boolean) {
        this.isPaySuccesful = boolean
    }

    setOpenPaySuccesfulModal(boolean) {
        this.isOpenPaySuccesfulModal = boolean
    }

    setPayError(boolean) {
        this.isPayError = boolean
    }

    setOfferDetails(data) {
        this.offerDetails = data
        console.log(data)
    }
    setFirstCreatedOffer(bool) {
        this.isFirstCreatedOffer = bool
    }

    resetState() {

    }
}

const OfferToMusicianApiStore = new OfferToMusicianApi();

export const OfferToMusicianApiStoreStoreContext = React.createContext(OfferToMusicianApiStore);
export const useOfferToMusicianApiStore = () => React.useContext(OfferToMusicianApiStoreStoreContext)


