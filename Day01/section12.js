// startsWith()
const title = 'Jack and Jill Went Up the Hill';

console.log(title.startsWith('Jack'));
console.log(title.startsWith('jack'));
console.log(title.startsWith('Jill', 9));

// endswith()
const title1 = 'Jack and Jill Went Up the Hill';

console.log(title.endsWith('Hill'));
console.log(title.endsWith('hill'));
console.log(title.endsWith('Up', 21));


// includes()
let email = 'admin@example.com';
console.log(email.includes('@'));

let str = 'JavaScript String';

console.log(str.includes('Script'));
console.log(str.includes('script'));
console.log(str.includes('Script', 5));