import React, { useState } from "react";
import QuestMiniGame from "../components/QuestMiniGame";

function Quest() {
  const [clickedArea, setClickedArea] = useState(null);
  const [isQuestAreaVisible, setIsQuestAreaVisible] = useState(true);

  const handleDivClick = (area) => {
    setClickedArea(area);
    // console.log(`Clicked on ${area} area`);
    
    // You can perform any other actions or state updates here
  };

  return (
    <div id="container">
      <div id="questScroll">
        <img src="https://i.imgur.com/BlLXW6a.png" alt="quest scroll"></img>
      </div>

      <div id="Winter" onClick={() => handleDivClick("Winter")}>
        <img src="https://i.imgur.com/LdNM2ce.png" alt="Winter"></img>
      </div>

      <div id="Jungle" onClick={() => handleDivClick("Jungle")}>
        <img src="https://i.imgur.com/SaImjSH.png" alt="Jungle"></img>
      </div>

      <div id="Lava" onClick={() => handleDivClick("Lava")}>
        <img src="https://i.imgur.com/bgcXE4Y.png" alt="Lava"></img>
      </div>

      <div id="Desert" onClick={() => handleDivClick("Desert")}>
        <img src="https://i.imgur.com/aQPPVTW.png" alt="Desert"></img>
      </div>

      <div id="World" onClick={() => handleDivClick("World")}>
        <img src="https://i.imgur.com/ONLCghH.png" alt="World"></img>
      </div>

      <div id="selection">
        {isQuestAreaVisible && clickedArea !== null ? <></> : (
          <h1>Select Region to quest in...</h1>
        )}
        <div>
            <div id="powers">
            <QuestMiniGame
                area={clickedArea} 
            />
            </div>
        </div>
      </div>
    </div>
  );
}

export default Quest;
