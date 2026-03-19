var findKthPositive = function(arr, k) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= k) {
            k++;
        } else {
            break;
        }
    }
    return k;
};

// Run Examples
console.log(findKthPositive([2,3,4,7,11],5));
console.log(findKthPositive([1,2,3,4],2));
