import React, { useState } from "react";
import CharacterForm from "../components/CharacterForm";
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import HearingIcon from '@mui/icons-material/Hearing';
import HearingDisabledIcon from '@mui/icons-material/HearingDisabled';
import AirlineSeatLegroomReducedIcon from '@mui/icons-material/AirlineSeatLegroomReduced';
import AirlineSeatLegroomExtraIcon from '@mui/icons-material/AirlineSeatLegroomExtra';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ElderlyIcon from '@mui/icons-material/Elderly';
import ElderlyWomanIcon from '@mui/icons-material/ElderlyWoman';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import '../assets/scss/style.scss';

function Create() {
    const calculateNextHeight = (index) => 200 + index * 80;
    const [dressupState, setDressupState] = useState({
        ears: { current: 0, total: 9 },
        eyes: { current: 0, total: 9 },
        mouth: { current: 0, total: 9 },
        arms: { current: 0, total: 9 },
        body: { current: 0, total: 7 },
        legs: { current: 0, total: 8 },
        region: { current: 0, total: 4 },
    });
    const icons = {
        eyes: { prev: <VisibilityOffIcon />, next: <VisibilityIcon /> },
        ears: { prev: <HearingDisabledIcon />, next: <HearingIcon /> },
        mouth: { prev: <MoodBadIcon />, next: <TagFacesIcon /> },
        arms: { prev: <AccessibilityNewIcon />, next: <EmojiPeopleIcon /> },
        body: { prev: <ElderlyWomanIcon />, next: <ElderlyIcon /> },
        legs: { prev: <AirlineSeatLegroomReducedIcon />, next: <AirlineSeatLegroomExtraIcon /> },
        region: { prev: <InsertPhotoIcon />, next: <CropOriginalIcon /> },
    };

    function next(item) {
        setDressupState((prevState) => {
            const next_num = prevState[item].current + 1;
            const new_current = next_num < prevState[item].total ? next_num : 0;
            return {
                ...prevState,
                [item]: {
                    current: new_current,
                    total: prevState[item].total,
                },
            };
        });
    }

    function prev(item) {
        setDressupState((prevState) => {
            const prev_num = prevState[item].current - 1;
            const new_current = prev_num >= 0 ? prev_num : prevState[item].total - 1;
            return {
                ...prevState,
                [item]: {
                    current: new_current,
                    total: prevState[item].total,
                },
            };
        });
    }

    function randomize() {
        const updatedState = {};
        Object.keys(dressupState).forEach((item) => {
            updatedState[item] = {
                current: Math.floor(Math.random() * Math.floor(dressupState[item].total)),
                total: dressupState[item].total,
            };
        });
        setDressupState(updatedState);
    }

    async function handleSubmit(formData) {
        try {
            const response = await fetch('http://localhost:5555/characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
            } else {
                const responseData = await response.json();
                console.log('Character created:', responseData);
                // Optionally, you can redirect or perform other actions upon successful submission
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div id="create">
            <CharacterForm onSubmit={handleSubmit} dressupState={dressupState} />

            <div id="region" className={`region${dressupState.region.current + 1}`}>
                <div id="body" className={`body${dressupState.body.current + 1}`}></div>
                <div id="eyes" className={`eyes${dressupState.eyes.current + 1}`}></div>
                <div id="ears" className={`ears${dressupState.ears.current + 1}`}></div>
                <div id="arms" className={`arms${dressupState.arms.current + 1}`}></div>
                <div id="mouth" className={`mouth${dressupState.mouth.current + 1}`}></div>
                <div id="legs" className={`legs${dressupState.legs.current + 1}`}></div>
            </div>

            {Object.keys(dressupState).map((item, index) => (
                <div key={item}>
                    <Button
                        variant="contained"
                        startIcon={icons[item].next}
                        style={{
                            position: 'absolute',
                            left: '60%',
                            top: `${calculateNextHeight(index)}px`,
                        }}
                        onClick={() => next(item)}
                    >
                        Next
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={icons[item].prev}
                        style={{
                            position: 'absolute',
                            left: '52%',
                            top: `${calculateNextHeight(index)}px`,
                        }}
                        onClick={() => prev(item)}
                    >
                        Previous
                    </Button>
                </div>
            ))}

            <Button
                variant="contained"
                startIcon={<ShuffleIcon />}
                style={{
                    position: 'absolute',
                    left: '52%',
                    width: '10%',
                    top: '800px',
                }}
                onClick={() => randomize()}
            >
                RANDOMIZE
            </Button>
        </div>
    );
}

export default Create;
