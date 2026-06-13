const graph = {
  A: [],
  B: ["A"],
  C: ["A"],
  D: ["B", "C"],
};

function topologicalSort(graph: Record<string, string[]>) {
  const inDegreesOfEachNode: Map<string, number> = new Map();

  for (const node in graph) {
    inDegreesOfEachNode.set(node, 0);
  }

  for (const node in graph) {
    for (const element of graph[node]!) {
      console.log(element);
      inDegreesOfEachNode.set(element, inDegreesOfEachNode.get(element)! + 1);
    }
  }

  const resultQueue = [];

  for (const [node, degree] of inDegreesOfEachNode) {
    if (degree === 0) {
      resultQueue.push(graph[node]);
    }
  }

  const result: string[] = [];

  while (resultQueue.length > 0) {
    const node = resultQueue.shift()!;

    result.push(node);

    for (const child of graph[node]) {
      inDegreesOfEachNode.set(child, inDegreesOfEachNode.get(child)! - 1);

      if (inDegreesOfEachNode.get(child) === 0) {
        resultQueue.push(child);
      }
    }
  }

  return result;
}

console.log(topologicalSort(graph));
