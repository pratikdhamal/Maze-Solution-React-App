import React, { useState } from "react";
import "../Assets/Node.css";
import { selectData } from "../Redux/slice";
import { useSelector, useDispatch } from "react-redux";
import {setStart,setEnd,setWallArray} from '../Redux/slice'

const Node = ({ props}) => {
  const dispatch = useDispatch();
  const {data} = useSelector(selectData)
  const [start, setStartVal] = useState();
  const [finish, setEndVal] = useState();
  const [wall, setWall] = useState();
  var { row, col, isStart, isWall, isFinish} = props;
  isStart = start;
  isFinish = finish;
  isWall = wall
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";
    
    return (
      <div
      onClick={() => {
        if (!data.isSetStart) {
          dispatch(setStart({
            row, col
          }))
          setStartVal(row,col);
        }
        if (data.isSetStart && !data.isSetEnd) {
          dispatch(setEnd({
            row, col
          }))
          setEndVal(row,col)
        }

        if(data.isWallStart){
          dispatch(setWallArray({row,col}))
          setWall(row,col)
        }
      }}
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
    ></div>
  
  );
};

export default Node;
