
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