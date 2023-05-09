import React from "react";
// Images
import IMAGES from "@/res/images"
const { RateStarIcon } = IMAGES;
// Styles
import { style } from "./style"
const {
    ItemContainer,
    ItemImageBlock,
    ItemImage,
    // Info
    ItemInfo,
    ItemInfoBlock,
    ItemInfoName,
    ItemInfoDate,
    ItemReviewBlock,
    ItemReviewText,
    ItemInfoRate,
    ItemInfoRateText,
} = style;

const CardFullscreenReviewItem = ({ reviewData }) => {
    if (reviewData === undefined) return null

    const {
        reviewRate,
        reviewDate,
        reviewWritter,
        reviewerAvatar,
        reviewMessage
    } = reviewData;

    const getDaysLeftString = (dueDate) => {
        const currentDate = Date.now();
        const subscriptionDeadline = new Date(dueDate);
        const convertedDate = +subscriptionDeadline.getDate() + "." + (subscriptionDeadline.getMonth() + 1) + "." + subscriptionDeadline.getFullYear()
        const daysLeft = Math.abs(Math.floor((dueDate - currentDate) / 86400000))
        const isDay = dueDate > 86400000 ? `${daysLeft} days ago` : "Today"
        return { convertedDate, isDay }
    }
    const { isDay } = getDaysLeftString(reviewDate)

    return (
        <ItemContainer>
            {/* Main data */}
            <ItemInfo>
                {/* Image */}
                <ItemImageBlock>
                    <ItemImage source={reviewerAvatar} resizeMode={"cover"} />
                </ItemImageBlock>

                <ItemInfoBlock>
                    {/* Name */}
                    <ItemInfoName>
                        {reviewWritter}
                    </ItemInfoName>
                    <ItemInfoDate>
                        {isDay}
                    </ItemInfoDate>
                </ItemInfoBlock>

                <ItemInfoRate>
                    <RateStarIcon width={17} height={16} />
                    <ItemInfoRateText>
                        {reviewRate}.0
                    </ItemInfoRateText>
                </ItemInfoRate>
            </ItemInfo>

            {/* Review text */}
            <ItemReviewBlock>
                <ItemReviewText>
                    {reviewMessage}
                </ItemReviewText>
            </ItemReviewBlock>

        </ItemContainer>

    );
}


export default CardFullscreenReviewItem;