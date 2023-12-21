import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../pages/home";
import Create from "../pages/create";
import Quest from "../pages/quest";

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/quest" component={Quest} />
          </Switch>
        </main>
        <footer></footer>
      </>
    </Router>
  );
}

export default App;
