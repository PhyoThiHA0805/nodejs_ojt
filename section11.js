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
