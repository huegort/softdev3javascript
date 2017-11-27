Student = function(id, name, age){
    this.id= id;
    this.name=name;
    this.age=age;

    this.sayHi= function() {
        console.log("hello " + this.name);
    }
}
Student.prototype.canDrink = function(){
    if (this.age< 18 ) return false;
    return true
}