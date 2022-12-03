import React, { useState, useEffect } from "react";
import Node from "./Node";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/dijkstra";
import { bfs, visitedNodesInOrder} from "../Algorithms/bfs";
import { dfs} from "../Algorithms/dfs";
import { selectData, setWalls } from "../Redux/slice";
import { useSelector, useDispatch } from "react-redux";
const MazeSolution = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(selectData);
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const matrix = formGrid();
    setGrid(matrix);
    // eslint-disable-next-line
  }, []);

  const START_NODE_ROW = data?.startIndex?.row || 10;
  const START_NODE_COL = data?.startIndex?.col || 15;
  const FINISH_NODE_ROW = data?.endIndex?.row || 15;
  const FINISH_NODE_COL = data?.endIndex?.col || 35;

  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      g: 0,
      f: 0,
      h: 0,
    };
  };

  const formGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        // const startElement = document.getElementsByClassName('node-start');
        // const endElement = document.getElementsByClassName('node-finish');
        // console.log(document.getElementById(`node-${node.row}-${node.col}`).classList)
        document
          .getElementById(`node-${node.row}-${node.col}`)
          .classList.add("node-visited");
        // startElement.classList.add('node-start')
        // endElement.classList.add('node-finish')
      }, 10 * i);
    }
  };

  const markWalls = (grid) => {
    const wallArray = data.wallArr;
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        for (var i = 0; i < wallArray.length; i++) {
          if (
            grid[row][col].row === wallArray[i].row &&
            grid[row][col].col === wallArray[i].col
          ) {
            grid[row][col].isWall = true;
          }
        }
      }
    }
    return grid;
  };

  // const setRandomWalls = (grid)=>{
  //   for (let row = 0; row < 10; row++) {
  //     for (let col = 0; col < 20; col++) {
  //         let randomRow = Math.floor(Math.random() * 19);
  //         let randomCol = Math.floor(Math.random() * 48);
  //         grid[randomRow][randomCol].isWall = true;
  //     }
  //   }
  //   return grid;
  // }

  
  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const newGrid = markWalls(grid);
    const visitedNodesInOrder = dijkstra(newGrid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualizeBfs = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const newGrid = markWalls(grid);
    const visitedNodesInOrder = bfs(newGrid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };


  const visualizeDfs = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const newGrid = markWalls(grid);
    const visitedNodesInOrder = dfs(newGrid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <>
      <div className="fcontainer">
        <div>
          {grid.map((row) => {
            return (
              <div>
                {row.map((node) => {
                  var { row, col, isWall, isStart, isFinish } = node;
                  // const wall = Math.round(Math.random())
                  // if(wall==1){
                  //   isWall=true;
                  // }
                  return (
                    <Node props={{ row, col, isStart, isWall, isFinish }} />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="container">
        <div className="node-container">
          <div className="flex-inner">
            <span className="index-node node-start"></span>{" "}
            <span className="ml">Start Node</span>
          </div>
          <div className="flex-inner">
            <span className="index-node node-finish"></span>{" "}
            <span className="ml">End Node</span>
          </div>
          <div className="flex-inner">
            <span className="index-node node-wall"></span> <span className="ml">Wall</span>
          </div>
        </div>
        <div className="container">
          <button className="button" onClick={() => dispatch(setWalls())}>
            Set Walls
          </button>
          <button className="button" onClick={() => visualizeDijkstra()}>
            Visualize Dijkstra's Algorithm
          </button>
          <button className="button" onClick={() => visualizeBfs()}>
            Visualize BFS Algorithm
          </button>
          <button className="button" onClick={() => visualizeDfs()}>
            Visualize DFS Algorithm
          </button>
        </div>
      </div>
    </>
  );
};

export default MazeSolution;
