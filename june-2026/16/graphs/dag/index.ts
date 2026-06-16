const graph = {
  A: ["B", "C"],
  B: ["C"],
  C: [],
  D: ["A", "C"],
};

function sorting(graph: Record<string, string[]>) {
  const inDegrees: Map<string, number> = new Map();

  for (const node in graph) {
    inDegrees.set(node, 0);
  }

  for (const node in graph) {
    for (const element of graph[node]!) {
      // ["B", "C"]
      // "B"
      inDegrees.set(element, inDegrees.get(element)! + 1);
    }
  }

  console.log(inDegrees);

  const readyQueue = [];

  for (const [node, degree] of inDegrees) {
    if (degree === 0) {
      readyQueue.push(graph[node]);
    }
  }

  const result: string[] = []; // ["A", "B"]

  while (readyQueue.length > 0) {
    const node = readyQueue.shift()!;

    result.push(node);

    if (!graph[node]) {
      break;
    }

    for (const child of graph[node]!) {
      inDegrees.set(child, inDegrees.get(child)! - 1);

      if (inDegrees.get(child) === 0) {
        readyQueue.push(node);
      }
    }
  }

  return result;
}

console.log(sorting(graph));

// function topologicalSort(graph: Record<string, string[]>) {
//   const inDegreesOfEachNode: Map<string, number> = new Map();
//
//   for (const node in graph) {
//     inDegreesOfEachNode.set(node, 0);
//   }
//
//   for (const node in graph) {
//     for (const element of graph[node]!) {
//       console.log(element);
//       inDegreesOfEachNode.set(element, inDegreesOfEachNode.get(element)! + 1);
//     }
//   }
//
//   const resultQueue = [];
//
//   for (const [node, degree] of inDegreesOfEachNode) {
//     if (degree === 0) {
//       resultQueue.push(graph[node]);
//     }
//   }
//
//   const result: string[] = [];
//
//   while (resultQueue.length > 0) {
//     const node = resultQueue.shift()!;
//
//     result.push(node);
//
//     for (const child of graph[node]) {
//       inDegreesOfEachNode.set(child, inDegreesOfEachNode.get(child)! - 1);
//
//       if (inDegreesOfEachNode.get(child) === 0) {
//         resultQueue.push(child);
//       }
//     }
//   }
//
//   return result;
// }
//
// console.log(topologicalSort(graph));
