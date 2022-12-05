let numbers = new Array("2");
console.log(numbers.length); 
console.log(numbers); 

// Array.of()
let numbers1 = Array.of(2);
numbers1.push(3);

let numbers2 = new Set(numbers1);
let numbers3 = [...numbers2];
console.log('Numbers 1: ', numbers3);

if (!Array.of) {
    Array.of = function() {
        return Array.prototype.slice.call(arguments);
    };
}

// Array.from
function arrayFromArgs() {
    // var results = [];
    // for (var i = 0; i < arguments.length; i++) {
    //     results.push(arguments[i]);
    // }
    // return results;

   return Array.from(arguments)
}

function addOne(){
   return Array.from(arguments, x=> x+1);
}
var fruits = arrayFromArgs('Apple', 'Orange', 'Banana');
let numbersArr = addOne(1,2,3,4,5);
console.log(fruits);
console.log(numbersArr);


let doubler = {
    factor: 2,
    double(x) {
        return x * this.factor;
    }
}
let scores = [5, 6, 7];
let newScores = Array.from(scores, doubler.double, doubler);
console.log(newScores)

let even = {
    *[Symbol.iterator]() {
        for (let i = 0; i < 10; i += 2) {
            yield i;
        }
    }
};
let evenNumbers = Array.from(even);
console.log(evenNumbers);


// Array.find()
let customers = [{
    name: 'ABC Inc',
    credit: 100
}, {
    name: 'ACME Corp',
    credit: 200
}, {
    name: 'IoT AG',
    credit: 300
}];

console.log(customers.find(c => c.credit > 100));

let newArr = [];

customers.map(customer => {
    
    if(customer.credit > 100) newArr.push(customer);
    
    // console.log(newArr)
    // return newArr;
}); 

console.log(newArr);


// Array.findIndex()
// let ranks = [1, 5, 7, 8, 10, 7];

// let index = ranks.findIndex(
//     (rank, index) => rank === 7 && index > 2
// );

// console.log(index);

const products = [
    { name: 'Phone', price: 999 },
    { name: 'Computer', price: 1999 },
    { name: 'Tablet', price: 995 },
  ];
  
  const index = products.findIndex(product => product.price > 1000);
  
  console.log(index);
