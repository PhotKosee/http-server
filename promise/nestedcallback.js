/* 
    Create a scipt which has two methods that return promises
    - One of the promises should get resolved after 6 seconds timeout
    and the other one after 3 seconds timeout.
    Call the promise in such a way that the second promise is invoked
    after the first promise is resolved
*/

let firstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("First promise resolved");
    }, 6000);
});

let secondPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Second promise resolved");
    }, 3000);
});

firstPromise.then((successMessage) => {
    console.log("From callback " + successMessage);
    secondPromise.then((successMessage) => {
        console.log("From callback " + successMessage);
    });
});