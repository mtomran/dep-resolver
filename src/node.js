let id= 0;
let nodes= {};
let adjacents= {};
let adjacentsReverse= {};
let degree= {}
class Node{
    constructor(title, runFunc){        
        this.id= this.getNewId();
        this.title= title;
        this.runFunc= runFunc
        nodes[this.id]= this;
    }  

    static reset(){
        nodes= {};
        adjacents= {};
        adjacentsReverse= {};
        degree= {};
        id= 0;
    }

    getNewId(){
        id+= 1;
        return id;
    }

    dependsOn(node){
        adjacents[this.id]= adjacents[this.id] || {};    
        adjacents[this.id][node.id]= true;
        adjacentsReverse[node.id]= adjacentsReverse[node.id] || {}; 
        adjacentsReverse[node.id][this.id]= true;
    }

    static get nodes(){
        return nodes;
    }

    static get adjacents(){
        return adjacents;
    }

    static get adjacentsReverse(){
        return adjacentsReverse;
    }

    static get degree(){
        return degree;
    }
}

module.exports= Node;