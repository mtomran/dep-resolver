const Node = require("./node");
const _ = require("lodash");
const bluebird = require("bluebird");
class DepResolver {
	constructor() { }

	addNode(title, runFunc) {
		return new Node(title, runFunc);
	}

	reset() {
		Node.reset();
	}

	sortAll() {
		const sorted = [];
		const visitedList = [];
		_.each(Node.getAll(), (node) => {
			if (node.degree == 0) {
				visitedList.push(node);
			}
		});


		function resolve(visitedList) {
			//console.log("data structures", visitedList);
			return Promise.map(visitedList, (visited) => {
				console.log(">>>", visited.title, "visited");
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