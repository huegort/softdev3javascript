Student = function(id, name, age){
    this.id= id;
    this.name=name;
    this.age=age;

    this.sayHi= function() {
        console.log("hello " + this.name);
    }
}
Student.prototype.canDrink = function(){
    return (this.age < 18 )
}