# dep-resolver
A modified version of Kahn's algorithm for topological sorting to resolve dependencies of asyncronous tasks. 

# Description
Consider a list of tasks with dependencies described as a Directed Acyclic Graph that need to run asyncronously. The goal of this implementation is to run tasks with respect to their dependencies and
as asyncronous as possible. In other word, with the least overall wait time possible.

# Usage 

## Define task nodes
    const Promise= require("bluebird");
    const depResolver= require("dep-resolver");
    const a= depResolver.addNode("a", function (){ return Promise.delay(5000)});
    const b= depResolver.addNode("b", function (){ return Promise.delay(3000)});
    const c= depResolver.addNode("c", function (){ return Promise.delay(2000)});

## Define task dependencies
    a.dependsOn(b);
    b.dependsOn(c)

## Topological ordering of dependencies
    depResolver.sortAll()
    .then((sorted)=>{
        console.log("sorted nodes:", _.map(sorted, "title"));
    });


# Licence
MIT