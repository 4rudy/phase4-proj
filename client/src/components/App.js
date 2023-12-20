import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Create from "./pages/create";
import Quest from "./pages/quest";


function App() {
  
  return(
    <>
    <header>
      <h1>Project Client</h1>
    </header>
    <main>
      <Home/>
      <Create/>
      <Quest/>
    </main>
    <footer>

    </footer>
    </>
    
  
  );
}

export default App;
