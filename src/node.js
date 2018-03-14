const _= require("lodash");
/**
 * a unique id assigned to nodes
 */
let id= 0;

/**
 * list of all nodes keyed by their id
 */
let nodes= {};

/**
 * list of all outgoing nodes keyed by source and destination node ids
 */
let outgoing= {};

/**
 * list of all incoming nodes keyed by destination and source node ids
 */
let incoming= {};

/**
 * degrees of all nodes keyed by node id
 */
let degree= {};

/**
 * a class to store nodes of the dependency graph
 * @class Node
 */
class Node {
	/**
	 * Node class constructor
	 * @param {String} title title of the node
	 * @param {Function} runFunc a function to run when node is visited
	 */
	constructor(title, runFunc) {
		this.id = generateNewId();
		this.title = title;
		this.runFunc = runFunc;
		degree[this.id] = 0;
		nodes[this.id] = this;
	}

	/**
	 * resets the graph stored structures
	 */
	static reset() {
		nodes = {};
		outgoing = {};
		incoming = {};
		degree = {};
		id = 0;
	}

	/**
	 * sets a new dependency link from this node to a given node
	 * @param {Node} node a node of the dependency graph
	 */
	dependsOn() {
		const nodes= arguments;
		_.each(nodes, node=>{
			outgoing[this.id] = outgoing[this.id] || {};

			if (!outgoing[this.id][node.id]) {
				outgoing[this.id][node.id] = node;
				// only increase degree if link does not exist
				degree[this.id] += 1;
			}

			incoming[node.id] = incoming[node.id] || {};
			incoming[node.id][this.id] = this;
		});		
	}

	/**
	 * gets all nodes of outgoing links from this node
	 * @return {Array} list of nodes of outging links from this node
	 */
	get outgoings() {
		return _.values(outgoing[this.id]);
	}

	/**
	 * gets all nodes of incoming links to this node
	 * @return {Array} list of nodes of incoming links to this node
	 */
	get incomings() {
		return _.values(incoming[this.id]);
	}

	/**
	 * gets the degree of outgoing links of this node
	 * @return {Number} number of outgoing links
	 */
	get degree() {
		return degree[this.id];
	}

	/**
	 * @param  {Number} value degree of graph node
	 */
	set degree(value) {
		degree[this.id] = value;
	}

	/**
	 * returns all nodes added to the dependency graph
	 * @return {Object} all nodes
	 */
	static getAll() {
		return _.values(nodes);
	}
}

/**
 * generates a new unique id for the node created
 * @return {Number} a new id
 */
function generateNewId() {
	id += 1;
	return id;
}

module.exports = Node;