const Node= require("./node");
class DepResolver{
    constructor(){
    }

    addNode(title, runFunc){
        return new Node(title, runFunc);
    }

    reset(){
        Node.reset();
    };

    sortAll(){
        const sorted= []
        const visitedList= [];
        for(let nodeId in Node.nodes){
            Node.degree[nodeId]= (Node.adjacents[nodeId])? Object.keys(Node.adjacents[nodeId]).length : 0;
            if(Node.degree[nodeId] == 0){
                visitedList.push(nodeId);
            }
        }
        console.log("data structures", visitedList, Node.adjacents, Node.adjacentsReverse, Node.degree);
        function resolve(visitedList){
            return Promise.map(visitedList, (visited)=>{
                const nodeId= visitedList;
                return Node.nodes[nodeId].runFunc()
                .then(()=>{
                    sorted.push(nodeId);
                    const visitedList= [];
                    for(let adjId in Node.adjacentsReverse[nodeId]){
                        Node.degree[adjId]-= 1;
                        if(Node.degree[adjId] == 0){
                            visitedList.push(adjId);                            
                        }
                    }
                    return resolve(visitedList);
                });            
            });
        }
        
        return resolve()
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