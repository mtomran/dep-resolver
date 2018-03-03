const Node= require("./node");
const _= require("lodash");
class DepResolver{
    constructor(){
    }

    addNode(title, runFunc){
        return new Node(title, runFunc);
    }

    reset(){
        Node.reset();
    };

    getNode(id){
        return Node.nodes[id];
    }

    getTitle(id){
        return Node.nodes[id].title;
    }

    getRunFunc(id){
        return Node.nodes[id].runFunc;
    }

    sortAll(){
        const $this= this;
        const sorted= []
        const visitedList= [];
        _.each(Node.getAll(), (node)=>{
            const nodeId= node.id;
            //Node.degree[nodeId]= (Node.adjacents[nodeId])? Object.keys(Node.adjacents[nodeId]).length : 0;
            if(Node.degree[nodeId] == 0){
                visitedList.push(nodeId);
            }
        });

        console.log("data structures", visitedList, Node.adjacents, Node.adjacentsReverse, Node.degree);
        function resolve(visitedList){       
            return Promise.map(visitedList, (visited)=>{
                const nodeId= visited;
                console.log(">>>", $this.getTitle(nodeId),"visited");           
                return $this.getRunFunc(nodeId)()
                .then(()=>{
                    console.log("<<<", $this.getTitle(nodeId), "resolved");
                    sorted.push(nodeId);                    
                    const visitedList= [];
                    for(let adjId in Node.adjacentsReverse[nodeId]){
                        Node.degree[adjId]-= 1;
                        if(Node.degree[adjId] == 0){
                            visitedList.push(adjId);                            
                        }
                    }
                    if(!visitedList.length) return Promise.resolve();

                    return resolve(visitedList);
                });            
            });
        }
        
        return resolve(visitedList)
        .then(()=>{
            for(let nodeId in Node.degree){
                if (Node.degree[nodeId] > 0){
                    return Error("The dependency graph has a cycle.");
                }
            }
    
            const titles= [];
            for (let i=0; i< sorted.length; ++i){
                titles.push(Node.nodes[sorted[i]].title);
            };
            return titles;
        });       
    }
}

module.exports= DepResolver;