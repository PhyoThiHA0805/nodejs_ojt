function getScores() {
    return [70, 80, 90, 100];
 }

//  let [x, y, z] = getScores();

// console.log(x); 
// console.log(y); 
// console.log(z); 


let [x, y ,...args] = getScores();
console.log(x); // 70
console.log(y); // 80
console.log(args);

function getProfile() {
    return [
        'John',
        'Doe',
        ['Red', 'Green', 'Blue']
    ];
}

let [
    firstName,
    lastName,
    [
        color1,
        color2,
        color3
    ]
] = getProfile();

console.log(color1, color2, color3); 