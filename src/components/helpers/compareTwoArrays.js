export const compareTwoArrays = (arrA, arrB) => {

    //check if lengths are different
    if (arrA.length !== arrB.length) return false;

    //slice so we do not effect the original
    //sort makes sure they are in order
    //join makes it a string so we can do a string compare
    var cA = arrA.slice().sort().join(",");
    var cB = arrB.slice().sort().join(",");

    return cA === cB;
}


