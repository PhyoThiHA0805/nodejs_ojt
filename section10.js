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