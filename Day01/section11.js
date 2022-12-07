// Object.assign()
let box = {
    height: 10,
    width: 20,
    color: 'Red'
};

let style = {
    color: 'Green',
    borderStyle: 'solid'
};

let styleBox = Object.assign({}, box, style);
// styleBox = {...style, ...box};
console.log(styleBox);


// Object.is()
let amount = +0,
    volume = -0;
console.log('From Operator : ', volume === amount);
console.log('From Object.is() : ', Object.is(amount, volume));

let quantity = NaN;
console.log('From Operator : ', quantity === quantity);
console.log('From Object.is() : ', Object.is(quantity, quantity));