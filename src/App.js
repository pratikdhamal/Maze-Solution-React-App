import './App.css';
import MazeSolution from './Components/MazeSolution';
import {Provider} from 'react-redux'
import { store } from "./Redux/store";
function App() {

  return (
    <>
    <Provider store={store}>
    <MazeSolution/>
    </Provider>
    
    </>
  );
}

export default App;
