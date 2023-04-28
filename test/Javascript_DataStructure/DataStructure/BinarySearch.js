function BinarySearch(array, findvalue){
    let left = 0;
    let right = array.length - 1;
    let mid = Math.floor(right/2);
    while(left < right){
        if(array[mid] === findvalue){
            return mid;
        }

        if(array[mid] < findvalue){
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
        mid = Math.floor((left+right)/2);
    }
    return -1;
}