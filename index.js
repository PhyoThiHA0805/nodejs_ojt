function getUsers() {
  success = true;
  return new Promise((resolve, reject) => {
    if (success) {
      setTimeout(() => {
        resolve([
          { username: "john", email: "john@test.com" },
          { username: "jane", email: "jane@test.com" },
        ]);
      }, 1000);
    } else {
      reject(new Error("Error in getting users"));
    }
  });
}

function render() {
  console.log("From finally.....");
}

function onFulfilled(users) {
  console.log(users);
}

async function findUser(username) {
  const users = await getUsers();
  user = users.find((user) => user.username === username); // B

  return user;
}

const promise = getUsers();
// promise.then((result) => {
//   "On Fullfill ", onFulfilled(result);
// });

// findUser("john")
//   .then((result) => console.log("Result", result))
//   .catch((error) => console.log(error))
//   .finally(() => render());

// Promise Chaining
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 3 * 100);
});

// p.then((result) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(result); // 10
//       resolve(result * 2);
//     }, 2000);
//   });
// })
//   .then((result) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log(result); // 20
//         resolve(result * 3);
//       }, 2000);
//     });
//   })
//   .then((result) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log(result); // 60
//         resolve(result * 4);
//       }, 2000);
//     });
//   });

function generateNumber(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num);
    }, 3 * 1000);
  });
}

// generateNumber(10)
//   .then((result) => {
//     console.log(result);
//     return generateNumber(result * 2);
//   })
//   .then((result) => {
//     console.log(result);
//     return generateNumber(result * 3);
//   })
//   .then((result) => console.log(result));


//   function getUser(userId) {
//     return new Promise((resolve, reject) => {
//         console.log('Get the user from the database.');
//         setTimeout(() => {
//             resolve({
//                 userId: userId,
//                 username: 'admin'
//             });
//         }, 1000);
//     })
// }

function getServices(user) {
    return new Promise((resolve, reject) => {
        console.log(`Get the services of ${user.username} from the API.`);
        setTimeout(() => {
            resolve(['Email', 'VPN', 'CDN']);
        }, 3 * 1000);
    });
}

function getServiceCost(services) {
    return new Promise((resolve, reject) => {
        console.log(`Calculate the service cost of ${services}.`);
        setTimeout(() => {
            resolve(services.length * 100);
        }, 2 * 1000);
    });
}

// getUser(100)
//     .then(getServices)
//     .then(getServiceCost)
//     .then(console.log);

// async function showServiceCost() {
//     let user = await getUser(100);
//     let services = await getServices(user);
//     let cost = await getServiceCost(services);
//     console.log(`The service cost is ${cost}`);
// }

// showServiceCost();

// Promise.all()
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('The first promise has resolved');
    resolve(10);
  }, 1 * 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('The second promise has rejected');
    // reject(new Error('Failed'));
    resolve(20);
  }, 2 * 1000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('The third promise has resolved');
    resolve(30);
  }, 3 * 1000);
});

// Promise.all([p1, p2, p3]).then((results) => {
//   const total = results.reduce((p, c) => p + c);

//   console.log(`Results: ${results}`);
//   console.log(`Total: ${total}`);
// }).catch(err => console.log(err.message));

Promise.race([p1, p2, p3])
    .then(value => console.log(`Resolved: ${value}`))
    .catch(reason => console.log(`Rejected: ${reason}`));