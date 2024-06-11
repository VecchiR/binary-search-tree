export function mergeSort(arr) {
    if (arr.length <= 1) { return arr; }

    let left = arr.slice(0, arr.length / 2);
    let right = arr.slice(arr.length / 2);
    left = mergeSort(left);
    right = mergeSort(right);

    let a = 0;
    let b = 0;
    let c = 0;
    let sortedArr = [];

    while (c < (left.length) + (right.length)) {
        if (left[a] <= right[b] || right[b] === undefined) {
            sortedArr.push(left[a]); a++;
        }
        else {
            sortedArr.push(right[b]); b++;
        }
        c++;
    }

    return sortedArr;
}