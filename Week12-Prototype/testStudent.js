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
var students = [];
for (var i = 0; i<36; i++){
    var age = Math.floor((Math.random()*36)+1);
    var age = i;
    students[i]= new Student("G0023","joe", age);
}
for (var i = 0; i< students.length;i++){
    var student = students[i];
    console.log(student.name+" "+student.age+" "+student.canDrink());
}