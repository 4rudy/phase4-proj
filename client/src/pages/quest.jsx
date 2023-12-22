import React, { useState } from "react";
import QuestMiniGame from "../components/QuestMiniGame";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import "./quest.css";

function Quest() {
    const [clickedArea, setClickedArea] = useState(null);
    const [isQuestAreaVisible, setIsQuestAreaVisible] = useState(true);
    const { id, name } = useParams();

    const handleDivClick = (area) => {
        setClickedArea(area);
        console.log(`Clicked on ${area} area`);
    };

    const handleStartOver = () => {
        setClickedArea(null);
    };

    const handleQuitDemo = () => {
        window.location.href = "/";
    };

    const handleRestartDemo = async () => {
        try {
            const response = await fetch(`http://localhost:5555/characters/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                console.error('Failed to delete character');
                return;
            }

            window.location.href = "/create";
        } catch (error) {
            console.error('Error during character deletion:', error);
        }
    };

    const handleViewWinners = () => {
        window.location.href = "/winners";
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
                {isQuestAreaVisible && clickedArea !== null ? (
                    <></>
                ) : (
                    <h1>Select Region to quest in...</h1>
                )}
                <div>
                    <div id="powers">
                        <QuestMiniGame area={clickedArea} />
                    </div>
                </div>
                <div>
                    <div>
                        <Button
                            variant="contained"
                            onClick={handleRestartDemo}
                            style={{
                                position: 'absolute',
                                padding: '10px',
                                fontSize: '1rem',
                                backgroundColor: '#3450ed',
                                borderRadius: '45px',
                                bottom: '-250px',
                                right: '-250px',
                            }}
                        >
                            RESTART DEMO
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleQuitDemo}
                            style={{
                                position: 'absolute',
                                padding: '10px',
                                fontSize: '1rem',
                                backgroundColor: '#FF5733',
                                borderRadius: '45px',
                                bottom: '-250px',
                                right: '-100px',
                            }}
                        >
                            END DEMO
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleViewWinners}
                            style={{
                                position: 'absolute',
                                padding: '10px',
                                fontSize: '1rem',
                                backgroundColor: '#3a692e',
                                borderRadius: '45px',
                                bottom: '-250px',
                                right: '-400px',
                            }}
                        >
                            VIEW WINNERS
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quest;
