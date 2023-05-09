import React from "react";
import { useState, useEffect } from "react";
import { Text } from "react-native";

import { getWindowDimension } from "@/components/helpers/getWindowDimension"

// Images
import IMAGES from "@/res/images"
import C from "@/res/colors"
const {
    CrossBlackIcon,
} = IMAGES;
// Styles
import { style } from "./style"

const {
    ModalWindowBlock,
    OfferDetails,
    OfferDetailsTitle,
    OfferDetailsBlock,
    OfferLi,
    OfferLiKeys,
    OfferLiValue,
    OfferStatus,
    OfferStatusText,
    OfferButtons,
    OfferAccept,
    OfferAcceptText,
    OfferDecline,
    OfferDeclineText,
} = style;

const OfferMessage = ({ offerDetails, isContractor }) => {
    const { windowHeight, windowWidth } = getWindowDimension()
    const {
        offerAdditionalInfo,
        offerDate,
        offerDuration,
        offerStartTime,
        offerEndTime,
        offerLocation,
        offerPricePerHour,
        offerTotalMoney,
        offerPhoneNumber,
    } = offerDetails;

    const isDateString = offerDate.string !== undefined && offerDate.string

    const isTimeStartString = offerStartTime.string !== undefined && offerStartTime.string
    const isTimeEndString = offerEndTime.string !== undefined && offerEndTime.string
    const isDurationString = offerDuration !== undefined && offerDuration
    const timeString = `${isTimeStartString}-${isTimeEndString} (${isDurationString} hours)`

    const isLocationString = offerLocation !== undefined && offerLocation

    const isTotalPriceString = offerTotalMoney !== undefined && offerTotalMoney
    const isPricePerHourString = offerPricePerHour !== undefined && offerPricePerHour

    const isPhoneNumberString = offerPhoneNumber !== undefined && offerPhoneNumber

    const isAdditionalString = offerAdditionalInfo !== undefined && offerAdditionalInfo
    // Contractor
    const [offerStatus, setOfferStatus] = useState("Waiting for the answer");
    useEffect(() => {
        setTimeout(() => {
            setOfferStatus("Offer accepted")
        }, 5000);
    }, []);
    // Musician buttons
    const [isAccepted, setAccepted] = useState();
    return (
        <ModalWindowBlock
            style={{
                width: windowWidth - 32,
            }}
        >

            {/* Offer details */}
            <OfferDetails>
                <OfferDetailsBlock
                    style={{
                        width: windowWidth - 32,
                    }}>
                    <OfferDetailsTitle>
                        Michael is sending you offer, please check it
                    </OfferDetailsTitle>

                    <OfferLi>
                        <OfferLiKeys>Date:</OfferLiKeys>
                        <OfferLiValue>{isDateString}</OfferLiValue>
                    </OfferLi>

                    <OfferLi>
                        <OfferLiKeys>Time:</OfferLiKeys>
                        <OfferLiValue>{timeString}</OfferLiValue>
                    </OfferLi>

                    <OfferLi>
                        <OfferLiKeys>Location:</OfferLiKeys>
                        <OfferLiValue
                            style={{
                                paddingRight: 70
                            }}
                        >{isLocationString}</OfferLiValue>
                    </OfferLi>

                    <OfferLi>
                        <OfferLiKeys>Price:</OfferLiKeys>
                        <OfferLiValue>{`$${isTotalPriceString}`}</OfferLiValue>
                        <OfferLiValue
                            style={{
                                color: C.cyanGray,
                            }}
                        >{` ($${isPricePerHourString} per hour)`}</OfferLiValue>
                    </OfferLi>

                    <OfferLi>
                        <OfferLiKeys>Contact phone:</OfferLiKeys>
                        <OfferLiValue>{isPhoneNumberString}</OfferLiValue>
                    </OfferLi>

                    <OfferLi
                        style={{
                            marginBottom: 0,
                        }}
                    >
                        <Text>
                            <OfferLiKeys>Additional information: </OfferLiKeys><OfferLiValue>{isAdditionalString}</OfferLiValue>
                        </Text>
                    </OfferLi>


                    {isContractor && <OfferStatus>
                        <OfferStatusText>
                            {offerStatus}
                        </OfferStatusText>
                    </OfferStatus>
                    }
                    {!isContractor && (isAccepted === undefined ?
                        <OfferButtons>
                            <OfferAccept
                                onPress={() => {
                                    setAccepted(true)
                                }}
                            >
                                <OfferAcceptText>
                                    Accept offer
                                </OfferAcceptText>
                            </OfferAccept>

                            <OfferDecline
                                onPress={() => {
                                    setAccepted(false)
                                }}
                            >
                                <OfferDeclineText>
                                    Decline offer
                                </OfferDeclineText>
                            </OfferDecline>

                        </OfferButtons>
                        :
                        <OfferStatus>
                            <OfferStatusText>
                                {(isAccepted === true && isAccepted !== undefined) ? "Offer accepted" : "Offer declined"}
                            </OfferStatusText>
                        </OfferStatus>)
                    }
                </OfferDetailsBlock>

            </OfferDetails>


        </ModalWindowBlock>

    );
}

export default OfferMessage;