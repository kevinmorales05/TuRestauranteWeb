import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
      <div className="p-6">
        <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
          Restaurante App
        </p>
        <p className="text-gray-600 mt-3">
          Administra tu restaurant en las siguientes opciones:
        </p>
        <nav className="mt-10">
       
            <NavLink className="text-gray-600 block p-1 hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" exact to="/">Ordenes</NavLink>
          
            <NavLink className="text-gray-600 block p-1 hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" to="/menu">Menu</NavLink>
         
           
      </nav>
      </div>

      
    </div>
  );
}
