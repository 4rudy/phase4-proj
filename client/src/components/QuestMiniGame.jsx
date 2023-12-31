import React, { useState,useEffect } from "react";

function QuestMiniGame({ area, onBossDefeat }) {
  const [spellCasted, setSpellCasted] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [xPos, setXPos] = useState(0);
  const [firebossHealth, setFireBossHealth] = useState(100);
  const [winterbossHealth, setWinterBossHealth] = useState(100);
  const [desertbossHealth, setDesertBossHealth] = useState(100);
  const [junglebossHealth, setJungleBossHealth] = useState(100);
  const [worldbossHealth, setWorldBossHealth] = useState(100);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPower, setSelectedPower] = useState(null);
  const [powers, setPowers] = useState([]);
  const [hue,setHue]=useState(100)
  const [currentBoss,setCurretBoss]=useState("null")
  const [areaChange,setAreaChange]=useState("")
    let dead

    function getArea(area) {
        switch (area) {
          case "Winter":
            setCurretBoss(winterbossHealth + 10);
            setHue(winterbossHealth);
            return setAreaChange("Winter");
          case "Desert":
            setCurretBoss(desertbossHealth + 10);
            setHue(desertbossHealth);
            return setAreaChange("Desert");
          case "Lava":
            setCurretBoss(firebossHealth + 10);
            setHue(firebossHealth);
            return setAreaChange("Lava");
          case "Jungle":
            setCurretBoss(junglebossHealth + 10);
            setHue(junglebossHealth);
            return setAreaChange("Jungle");
          default:
            setCurretBoss(worldbossHealth + 10);
            setHue(worldbossHealth);
            return setAreaChange("World");
        }
      }

    if(currentBoss && currentBoss<=10){
        console.log(`the current boss is dead${currentBoss}`)
        dead = true

    }else{
        dead=false
    }
    
    useEffect(() => {
        getArea(area)
        
      },[area]);

      useEffect(() => {
        setHue(currentBoss)
      },[currentBoss]);
    
        
      
    
  const handleScrollButtonClick = (spell) => {
    if (spellCasted === false) {
      console.log(`Spell Cast: ${spell}`);
      setSpellCasted(true);

      // Trigger the attack animation
      setIsAttacking(true);

      // Reset the attack animation and visibility after a delay
      setTimeout(() => {
        castSpell();
        setIsAttacking(false);
      }, 500);
    }
  };

  function getWizardType(area) {
    switch (area) {
      case "Winter":
        setCurretBoss(winterbossHealth+10);

        return setWinterBossHealth((prevHealth) => Math.max(0, prevHealth - 20));
      case "Desert":
        setCurretBoss(desertbossHealth+10);

        return setDesertBossHealth((prevHealth) => Math.max(0, prevHealth - 20));
      case "Lava":
        setCurretBoss(firebossHealth+10);

        return setFireBossHealth((prevHealth) => Math.max(0, prevHealth - 20));
      case "Jungle":
        setCurretBoss(junglebossHealth+10);

        return setJungleBossHealth((prevHealth) => Math.max(0, prevHealth - 20));
      default:
        setCurretBoss(worldbossHealth+10);

        return setWorldBossHealth((prevHealth) => Math.max(0, prevHealth - 20));
    }
  }

  function castSpell() {

    setHue(currentBoss)
    getWizardType(area);


    // Reduce boss health when a spell is cast
    setTimeout(() => {
      setSpellCasted(false); // Reset SpellCasted after the delay
    }, 500);
  }

  const handleMenuSelect = (power) => {
    // Perform actions based on the selected power
    console.log(`Selected power: ${power}`);

    // Close the menu
    setIsMenuOpen(false);
  };

  // Define bossdivStyle within the render function
  const bossdivStyle = {
    filter: `hue-rotate(${hue}deg)`
  };

  const divStyle = {
    transform: isAttacking ? `translate(-200px, -20px)` : "none",
    transition: "transform 0.5s ease-in-out",
    opacity: isAttacking ? 1 : 0,
  };

  const tokendivStyle = {
    transform: spellCasted ? `translate(-200px, -20px)` : "none",
  };
  const deaddivStyle = {
    opacity: dead ? 1 : 0,
  };

  return (
    <div id="container">
      {area && (
        <div id="questArea">
          <h1 id="questName">{area} Quest</h1>
          <div id="wizard">
            <img src={dead? "https://th.bing.com/th/id/OIG.0XF5kfRHxpQI8NCuSbq5?pid=ImgGn": `${getWizardImageSrc(area)}`} alt="wizard"></img>
            <div id="bosshp" style={bossdivStyle}>
              <h1>hp</h1>
            </div>
          </div>
          <img id="player" src="https://i.imgur.com/trxMkNS.png" alt="player"></img>
          <img id="attack" src={dead?"":"https://i.imgur.com/NKTdWPW.png"} style={divStyle}></img>
          <img id="token" src={dead?"":"https://i.imgur.com/OJuXhSK.png"} style={tokendivStyle}></img>
        </div>
      )}

      {area && (
        <div>
          <button onClick={() => handleScrollButtonClick("Fire")}>Fire Scroll</button>
          <button onClick={() => handleScrollButtonClick("Ice")}>Ice Scroll</button>
          <button onClick={() => handleScrollButtonClick("Sand")}>Sand Scroll</button>
          <button onClick={() => handleScrollButtonClick("Vine")}>Vine Scroll</button>
        </div>
      )}

      {isMenuOpen && (
        <div id="powerMenu">
          <h2>Choose a new power:</h2>
          <ul>
            {powers.map((power) => (
              <li key={power.id} onClick={() => handleMenuSelect(power.name)}>
                {power.name}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

function getWizardImageSrc(area) {
  switch (area) {
    case "Winter":
      return "https://i.imgur.com/7Kgk9Eb.png";
    case "Desert":
      return "https://i.imgur.com/UHh8y90.png";
    case "Lava":
      return "https://i.imgur.com/S88sYIh.png";
    case "Jungle":
      return "https://i.imgur.com/6PyqUFX.png";
    default:
      return "https://i.imgur.com/iciFF7C.png";
  }
}

export default QuestMiniGame;
