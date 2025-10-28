// ====== INTERACTIVE JAVASCRIPT ======
document.addEventListener("DOMContentLoaded", function () {
    // Trending scores example array
    const scores = [45, 12, 78, 34, 56, 89];

    // Get elements from DOM
    const originalArray = document.getElementById("originalArray");
    const sortedArray = document.getElementById("sortedArray");
    const sortBtn = document.getElementById("sortBtn");

    // Show the initial scores
    originalArray.textContent = scores.join(", ");

    // Add click event to sort button
    sortBtn.addEventListener("click", function () {
        let arr = [...scores]; // copy original
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        sortedArray.textContent = arr.join(", ");
        sortBtn.textContent = "Sorted! ✅";
    });

    // ====== LAST MODIFIED SCRIPT ======
    const modified = document.lastModified;
    document.getElementById("lastModified").textContent = modified;
});
