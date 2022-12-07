let add =  (x, y) => {
	return x + y;
};

console.log(add(10, 20));

let numbers = [4,2,6];
numbers.sort((a,b) => b - a);
console.log(numbers);

let names = ['John', 'Mac', 'Peter'];
let lengths = names.map(name => name.length);

console.log(lengths);


function Car() {
    this.speed = 0;

    // this.speedUp = function (speed) {
    //     this.speed = speed;
    //     setTimeout(
    //         () => console.log(this.speed),
    //         1000);

    // };

    this.speedUp = (speed) => {
        this.speed = speed;
        setTimeout( _ => console.log(this.speed),1000)
    } 
}

let car = new Car();
car.speedUp(50);