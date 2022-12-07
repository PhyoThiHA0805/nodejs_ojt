// Setting default values
let person = {
    firstName: 'John',
    lastName: 'Doe',
    currentAge: 28
};

// let { firstName:fName, lastName, middleName = '', currentAge: age = 18 } = person;

// console.log(fName);
// console.log(age);


// Nested object destructuring
let employee = {
    id: 1001,
    name: {
        firstName: 'John',
        lastName: 'Doe'
    }
};

let {
    id,
    name: {
        firstName,
        lastName
    },
    name
} = employee;

console.log(firstName);
console.log(lastName); 
console.log(name);
console.log(id);


// Destructuring function arguments
function display({firstName, lastName}) {
    console.log(`fullName: ${firstName} ${lastName}`);
} 

let person1 = {
    firstName: 'John',
    lastName: 'Doe'
};

display(person1);