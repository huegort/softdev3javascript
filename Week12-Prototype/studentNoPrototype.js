var s1 ={
    id: 'G0012',
    name: 'Joe',
    age:12,
    sayHi:function(){
        console.log("hi "+this.name);
    }
}
var s2 ={
    id: 'G0013',
    name: 'Mary',
    age:21,
    sayHi:function(){
        console.log("hi "+this.name);
    }
}
s1.sayHi();
s2.sayHi();