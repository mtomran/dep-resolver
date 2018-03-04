const Node = require("./node");
const _ = require("lodash");
const bluebird = require("bluebird");

/**
 * dependency resolution class
 * @class DepResolver
 */
class DepResolver {
	/**
	 * constructor
	 */
	constructor() { }

	/**
	 * adds a new node to the dependency graph
	 * @param {String} title title of the node
	 * @param {Function} runFunc a function to run after node is visited
	 * @return {Node} newly generated node
	 */
	addNode(title, runFunc) {
		return new Node(title, runFunc);
	}

	/**
	 * resets the dependency graph structure
	 */
	reset() {
		Node.reset();
	}

	/**
	 * sorts the dependency graph and runs provided function asyncronously
	 * @return {Array} list of node sorted with respect to the dependency graph
	 */
	sortAll() {
		// holds list of sorted nodes
		const sorted = [];

		// holds temporary list of nodes that could be sorted
		const visitedList = [];
		_.each(Node.getAll(), (node) => {
			if (node.degree == 0) {
				visitedList.push(node);
			}
		});

		/**
		 * recursive function to resolve dependency of nodes
		 * @param {Array} visitedList list of nodes ready to be added to the sorted list
		 */
		function resolve(visitedList) {
			return Promise.map(visitedList, (visited) => {
				console.log(">>>", visited.title, "visited");

				//making sure runFunc returns a promise
				return bluebird.resolve(visited.runFunc())
				.then(() => {
					console.log("<<<", visited.title, "resolved");
					sorted.push(visited);
					const visitedList = [];
					_.each(visited.incomings, (inNode) => {
						inNode.degree = inNode.degree - 1;
						if (inNode.degree == 0) {
							visitedList.push(inNode);
						}
					});

					if (!visitedList.length) {
						return Promise.resolve();
					} else {
						return resolve(visitedList);
					}
				});
			});
		}

		return resolve(visitedList)
		.then(() => {
			// cycle detection
			_.each(Node.getAll(), (node) => {
				if (node.degree > 0) {
					return Error("The dependency graph has a cycle.");
				}
			});

			return sorted;
		});
	}
}

module.exports = DepResolver;