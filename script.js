// Bubble sort function
function bubbleSort() {
    let arr = [5, 3, 8, 1, 2];
    let n = arr.length;
    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    document.getElementById('result').textContent = "Sorted Array: [" + arr.join(", ") + "]";
}

// Last modified date
document.getElementById('lastModified').textContent = document.lastModified;

