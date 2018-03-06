# dep-resolver
A modified version of Kahn's algorithm for topological sorting to resolve dependencies of asynchronous tasks. 

# Description
The goal of this package is to resolve dependencies of asynchronous tasks described with a Directed Acyclic Graph. Tasks are defined with functions that return promises and we are aiming to find an ordering of the tasks with the least overall wait time possible.

# Usage 

## Define task nodes
The following defines a new node named `title` with a `function` to run with respect to task dependencies.
Provided functions are expected to return a promise when finished.

    addNode(title, function)

Example:

    const Promise= require("bluebird");
    const depResolver= require("dep-resolver");
    const a= depResolver.addNode("a", function (){ return Promise.delay(5000)});
    const b= depResolver.addNode("b", function (){ return Promise.delay(3000)});
    const c= depResolver.addNode("c", function (){ return Promise.delay(2000)});

## Define task dependencies
    a.dependsOn(b);
    b.dependsOn(c);

## Topological ordering of dependencies
    depResolver.sortAll()
    .then((sorted)=>{
        console.log("sorted nodes:", _.map(sorted, "title"));
    });


# Licence
MIT