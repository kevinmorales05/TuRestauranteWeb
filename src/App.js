import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebase, {FirebaseContext} from './firebase/'  //es opcional colocar el index, porque el sistema lo toma por defecto
import Menu from "./components/paginas/Menu";
import NuevoPlatillo from "./components/paginas/NuevoPlatillo";
import Ordenes from "./components/paginas/Ordenes";
import SideBar from "./components/ui/SideBar";

function App() {
  return (
  <FirebaseContext.Provider
  value={{
    firebase
  }}
  >
 <Router> 
   <div className="md:flex min-h-screen">
      
 
      
      
    <SideBar />
    <div className="md:w-3/5 xl:w-4/5 p-6">
      <Switch>
        <Route exact path="/" >
          <Ordenes />
        </Route>
        <Route path="/nuevoPlatillo">
          <NuevoPlatillo />
        </Route>
        <Route path="/menu">
          <Menu />
        </Route>
      </Switch>
      </div>

      
      
   
   </div>
   </Router>
  </FirebaseContext.Provider>
  );
}

export default App;
