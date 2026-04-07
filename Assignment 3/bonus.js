var majorityElement = function(nums) {
    let repeated_element = null;
    let count = 0;

    for (let num of nums) {
        if (count === 0) {
            repeated_element = num;
        }
        count += num === repeated_element ? 1 : -1;
    }

    return repeated_element;
};
majorityElement([3,2,3]);
majorityElement([2,2,1,1,1,2,2]);