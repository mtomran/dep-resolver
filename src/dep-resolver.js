
class DepResolver{
    constructor(){
        this.nodes= {};
        this.adjacents= {};
        this.adjacentsReverse= {};
        this.degree= {};
        this._id= 0;
    }

    getNewId(){
        this._id+= 1;
        return this._id;
    }

    buildNode(title, runFunc){
        const $this= this;
        const id= $this.getNewId();
        const node= {
            id: id,
            title: title,
            runFunc: runFunc
        }
        this.nodes[id]= node;
        return node;
    }

    addDependencyLink(source, dest){
        this.adjacents[source.id]= this.adjacents[source.id] || {};    
        this.adjacents[source.id][dest.id]= true;
        this.adjacentsReverse[dest.id]= this.adjacentsReverse[dest.id] || {}; 
        this.adjacentsReverse[dest.id][source.id]= true;
    }

    sortAll(){
        const sorted= []
        const resolved= [];
        for(let nodeId in this.nodes){
            this.degree[nodeId]= (this.adjacents[nodeId])? Object.keys(this.adjacents[nodeId]).length : 0;
            if(this.degree[nodeId] == 0){
                resolved.push(nodeId);
            }
        }
        console.log("data structures", resolved, this.adjacents, this.adjacentsReverse, this.degree);
        while(resolved.length != 0){
            const nodeId= resolved.pop();
            //console.log("poped node", nodeId);
            sorted.push(nodeId);
            for(let adjId in this.adjacentsReverse[nodeId]){
                this.degree[adjId]-= 1;
                if(this.degree[adjId] == 0){
                    resolved.push(adjId);
                }
            }
        }
        
        for(let nodeId in this.degree){
            if (this.degree[nodeId] > 0){
                return Error("The dependency graph has a cycle.");
            }
        }

        const titles= [];
        for (let i=0; i< sorted.length; ++i){
            titles.push(this.nodes[sorted[i]].title);
        };
        return titles;
    }
}



module.exports= DepResolver;