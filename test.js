const depResolver= require("./app.js");
console.log("Running Dependency Test..");
const bluebird= require("bluebird");
const _= require("lodash");
// const x= depResolver.addNode("x", function (){ return bluebird.delay(500)} );
// const y= depResolver.addNode("y", function (){ return bluebird.delay(500)});
// const z= depResolver.addNode("z", function (){ return bluebird.delay(500)});
// const w= depResolver.addNode("w", function (){ return bluebird.delay(500)});
// x.dependsOn(y);
// y.dependsOn(z);
// z.dependsOn(w);
// depResolver.sortAll()
// .then((sorted)=>{
//     console.log("sorted list:", sorted);
// });


// depResolver.reset();

const a= depResolver.addNode("a", function (){ return bluebird.delay(5000);});
const b= depResolver.addNode("b", function (){ return bluebird.delay(5000);});
const c= depResolver.addNode("c", function (){ return bluebird.delay(1000);});
const d= depResolver.addNode("d", function (){ return bluebird.delay(1000);});
const e= depResolver.addNode("e", function (){ return bluebird.delay(5000);});
const f= depResolver.addNode("f", function (){ return bluebird.delay(5000);});
const g= depResolver.addNode("g", function (){ return bluebird.delay(5000);});
a.dependsOn(b, c, a);
b.dependsOn(e);
c.dependsOn(d);
d.dependsOn(g);
e.dependsOn(d, f);
f.dependsOn(g);
//g.dependsOn(c);
depResolver.sortAll()
.then((sorted)=>{
    console.log("sorted list 2:", _.map(sorted, "title"));
});


