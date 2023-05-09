export const addDotForNumber = (value) => {
    const stringLength = value.length
    if (value < 999) return value

    if (value > 999 && value < 9999) {
        const firstNum = `${value}`.slice(0, 1)
        const elseNum = `${value}`.slice(1, stringLength)
        return `${firstNum},${elseNum}`
    }

    if (value > 9999) {
        const twoNum = `${value}`.slice(0, 2)
        const elseNum = `${value}`.slice(2, stringLength)
        return `${twoNum},${elseNum}`
    } else if (value > 99999) {
        const twoNum = `${value}`.slice(0, 3)
        const elseNum = `${value}`.slice(3, stringLength)
        return `${twoNum},${elseNum}`
    }
}


