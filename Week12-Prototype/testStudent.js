require('./Student.js');

var s1 = new Student(
    'G0012',
    'Joe',
    12);
s1.sayHi();

var s2 = new Student('G0012','Mary', 18);
s2.sayHi();

console.log(s2.canDrink());
Student.prototype.canDrink = function(){
    if (this.age<21) return false;
    return true;
}

console.log(s2.canDrink());