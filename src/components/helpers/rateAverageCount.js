export const rateAverageCount = (reviewData) => {
    if (reviewData === undefined) return []
    const allReviewRate = []
    reviewData.forEach(element => {
        allReviewRate.push(element.reviewRate)
    });
    const sum = (rateArr) => {
        var s = 0;
        for (i = 0; i < rateArr.length; i++) {
            s += rateArr[i]
        }
        return s
    }
    const rateMidDefine = sum(allReviewRate) / allReviewRate.length
    return rateMidDefine.toFixed(1)
}