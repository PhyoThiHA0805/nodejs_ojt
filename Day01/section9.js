let john = {name: 'John Doe'},
    lily = {name: 'Lily Bush'},
    peter = {name: 'Peter Drucker'},
    foo = {name: 'Foo'};

let users = [john, lily, peter, foo];
let userRoles = new Map([
    [john, 'admin'],
    [lily, 'editor'],
    [peter, 'subscriber']
]);

users.map(user => {
    if (user.name.includes('John')) {
        user.role = 'admin';  
    }
    console.log(users);
})

console.log(typeof(userRoles)); // object
console.log(userRoles instanceof Map);
console.log(userRoles.get(john));
console.log(userRoles.has(foo));
console.log(userRoles.has(lily));
console.log(userRoles.size);

userRoles.set(foo, 'viewer');

console.log(userRoles, 'userRoles');

for (const [user, role] of userRoles.entries()) {
    // console.log('Entries: ', role)
    console.log(`${user.name}: ${role}`);
  }

userRoles.forEach((role, user) => console.log(`Result from forEach =>  ${user.name} : ${role}`));

userRoles.delete(john);
userRoles.clear();
console.log('After delete', userRoles);


// Set
let chars = ['a', 'a', 'b', 'c', 'c'];
// chars.add('a');
console.log('Chars: ', chars);

// let exist = chars.has('a');
// console.log(exist)

chars = new Set(chars.map(char =>{
    return char.toUpperCase();
} ));
console.log(chars);
