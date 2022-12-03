import {createSlice} from '@reduxjs/toolkit'

export const dataSlice = createSlice({
    name:"data",
    initialState:{
        startIndex:{
            row:null,
            col:null
        },
        endIndex:{
            row:null,
            col:null
        },
        isSetStart:false,
        isSetEnd:false,
        isWallStart:false,
        wallArr:[
        ]
    },
    reducers:{
        setStart:(state,action)=>{
            state = {...state,startIndex:action.payload}
            state = {...state,isSetStart:true}
            return state;
        },
        setEnd:(state,action)=>{
            state = {...state,endIndex:action.payload}
            state = {...state,isSetEnd:true}
            return state;
        },
        setWalls:(state,action)=>{
            state = {...state,isWallStart:true}
            return state;
        },
        setWallArray:(state,action)=>{
            var newArr = state.wallArr.push(action.payload)
            state = {...state,wallArr:newArr}
        }
    }
})

export const {setStart, setEnd,setWalls,setWallArray} = dataSlice.actions;

export const selectData = (state)=>state;

export default dataSlice.reducer;