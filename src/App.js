import './App.css';
import Header from "./components/Header"
import Content from "./components/Content"
import Demo from "./components/Demo"

function App() {
  return (
    <div className="App">
      <Header/>
      <Content/>
      <Demo numCols="20" numRows="20"/>
      <div className = "dummy"></div>
    </div>
  );
}

export default App;
