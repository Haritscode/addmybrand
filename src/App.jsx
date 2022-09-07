import React,{createContext} from "react";
import FormControl from "./Components/Form/Form";
function App() {
  let location=createContext();
  return (
    <>
    <FormControl/>
    </>
  );
}

export default App;
