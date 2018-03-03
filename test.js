const depResolver= require("./app.js");
console.log("Running Dependency Test..");
Promise= require("bluebird");
// const x= depResolver.addNode("x", function (){ return Promise.delay(500)} );
// const y= depResolver.addNode("y", function (){ return Promise.delay(500)});
// const z= depResolver.addNode("z", function (){ return Promise.delay(500)});
// const w= depResolver.addNode("w", function (){ return Promise.delay(500)});
// x.dependsOn(y);
// y.dependsOn(z);
// z.dependsOn(w);
// depResolver.sortAll()
// .then((sorted)=>{
//     console.log("sorted list:", sorted);
// });


// depResolver.reset();

const a= depResolver.addNode("a", function (){ return Promise.delay(5000)});
const b= depResolver.addNode("b", function (){ return Promise.delay(5000)});
const c= depResolver.addNode("c", function (){ return Promise.delay(5000)});
const d= depResolver.addNode("d", function (){ return Promise.delay(5000)});
const e= depResolver.addNode("e", function (){ return Promise.delay(5000)});
const f= depResolver.addNode("f", function (){ return Promise.delay(2000)});
const g= depResolver.addNode("g", function (){ return Promise.delay(5000)});
a.dependsOn(b);
a.dependsOn(c);
a.dependsOn(e);
b.dependsOn(e);
c.dependsOn(d);
d.dependsOn(g);
e.dependsOn(d);
e.dependsOn(f);
f.dependsOn(g);
//g.dependsOn(c);
depResolver.sortAll()
.then((sorted)=>{
    console.log("sorted list 2:", sorted);
});


