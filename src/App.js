import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Login from "./Container/Login/Login";
import Repo  from "./Container/Repo/Repo";

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route  path="/" exact component={Login} />
         <Route  exact path="/Repo" component={Repo}></Route> 
         
        </Switch>
    </div>
  );
}

export default App;


