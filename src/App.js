import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import DropdownComponent from './components/DropdownComponent';

function App() {
  return (
    <div>
      <DropdownComponent label="Age" data={["Twenty", "Twenty one", "Twenty one and a half"]}/>
      <br></br>
      <DropdownComponent label="Tag" data={["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard"]} isMulti = {true}/>
    </div>
  );
}

export default App;
