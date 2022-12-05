
// Getters and Setters
class Person {
    
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        newName = newName.trim();
        if (newName === '') {
            throw 'The name cannot be empty';
        }
        this._name = newName;
    }
}

const person = new Person('John Smith');
person.name = 'John Doe'
console.log(person.name); 

// Using getter in an object literal
let meeting = {
    attendees: [],
    add(attendee) {
        console.log(`${attendee} joined the meeting.`);
        this.attendees.push(attendee);
        return this;
    },
    get latest() {
        let count = this.attendees.length;
        return count == 0 ? 'Noone in the meeting' : this.attendees[count - 1];
    }
};

meeting.add('John').add('Jane').add('Peter');


if (meeting.attendees.length == 0 ) console.log(meeting.latest);
else console.log(`The latest attendee is ${meeting.latest}.`); 


// Static Method
class Person1 {
	constructor(name) {
		this.name = name;
	}
	getName() {
		return this.name;
	}
	static createAnonymous(gender) {
		let name = gender == "male" ? "John Doe" : "Jane Doe";
		return new Person1(name);
	}
}

let anonymous = Person1.createAnonymous("male");
console.log('Name',anonymous.name);


// Static Properties
class Item {
    constructor(name, quantity) {
      this.name = name;
      this.quantity = quantity;
    //   Item.count++;
    this.constructor.count++;
    }
    static count = 0;
    static getCount() {
      return Item.count;
    }
  }
  
  let pen = new Item('Pen', 5);
  let notebook = new Item('notebook', 10);
  
  console.log(Item.getCount());


// Computed Property
let name = 'fullName';
  class Person2 {
    constructor(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
    get [name]() {
      return `${this.firstName} ${this.lastName}`;
    }

  }
  
  let person2 = new Person2('John', 'Doe');
  console.log(person2.fullName);


// Inheritance

// class Animal {
//     constructor(legs) {
//         this.legs = legs;
//     }
//     walk() {
//         console.log('walking on ' + this.legs + ' legs');
//     }
// }

// class Bird extends Animal {
//     constructor(legs) {
//         super(legs);
        
//     }
//     fly() {
//         console.log('flying');
//     }
// }


// let bird = new Bird(2);

// bird.walk();
// bird.fly();

// class Bird extends Animal {
// 	constructor(legs, color) {
// 		super(legs);
// 		this.color = color;
// 	}
// 	fly() {
// 		console.log("flying");
// 	}
// 	getColor() {
// 		return this.color;
// 	}
// }

// let pegion = new Bird(2, "white");
// console.log(pegion.getColor());

class Animal {
    constructor(legs) {
        this.legs = legs;
    }
    walk() {
        console.log('walking on ' + this.legs + ' legs');
    }
    static helloWorld() {
        console.log('Hello World');
    }
}

class Bird extends Animal {
    fly() {
        console.log('flying');
    }
}

class Dog extends Animal {
    constructor(leg) {
        super(leg);
    }
    walk() {
        super.walk();
        console.log(`go walking`);
    }
}

let bingo = new Dog(4);
bingo.walk();
// walking on 4 legs
// go walking


// new Target

class Person4 {
    constructor(name) {
        this.name = name;
        console.log(new.target.name);
    }
}

class Employee extends Person4 {
    constructor(name, title) {
        super(name);
        this.title = title;
    }
}

let john = new Person4('John Doe'); // Person4
let lily = new Employee('Lily Bush', 'Programmer'); // Employee