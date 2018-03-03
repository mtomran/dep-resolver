let id= 0;
let nodes= {};
let outgoing= {};
let incoming= {};
let degree= {}
const _= require("lodash");
class Node{
    constructor(title, runFunc){        
        this.id= this.getNewId();
        this.title= title;
        this.runFunc= runFunc
        degree[this.id]= 0;
        nodes[this.id]= this;
    }  

    static reset(){
        nodes= {};
        outgoing= {};
        incoming= {};
        degree= {};
        id= 0;
    }

    getNewId(){
        id+= 1;
        return id;
    }

    dependsOn(node){
        outgoing[this.id]= outgoing[this.id] || {};
        
        if(!outgoing[this.id][node.id]){
            outgoing[this.id][node.id]= true;
            degree[this.id]+= 1;
        }

        incoming[node.id]= incoming[node.id] || {}; 
        incoming[node.id][this.id]= true;
    }

    get outgoings(){
        return outgoing[this.id];
    }

    get incomings(){
        return incoming[this.id];
    }

    // get degree(){
    //     return degree[this.id];
    // }

    static getAll(){
        return _.values(nodes);
    }

    static get nodes(){
        return nodes;
    }

    static get adjacents(){
        return outgoing;
    }

    static get adjacentsReverse(){
        return incoming;
    }

    static get degree(){
        return degree;
    }
}

module.exports= Node;