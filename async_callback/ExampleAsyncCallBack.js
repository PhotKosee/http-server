// This method will be provided as a parameter
function firstCallBack() {
    console.log("Inside the first call back");
}

console.log("Going to call setTimeOut with a delay of 5 seconds");
// Call the function firstCallBack after a delay using setTimeOut
setTimeout(firstCallBack, 5000);