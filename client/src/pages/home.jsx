import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import mainImage from '../assets/imgs/main/main.png';
import Button from '@mui/material/Button';
import './home.css'; // Import the CSS file

function Home() {
    return (
        <div className="home-container">
            <h1 className="big-fancy-text">Questor</h1>
            <img src={mainImage} alt="Main" className="image-style" />
            <div className="button-container">
                <Link to="/create"> {/* Use Link component for navigation */}
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            '&.action-button': {
                                padding: '20px',
                                fontSize: '2rem',
                                backgroundColor: '#FF5733',
                                borderRadius: '50px',
                            },
                        }}
                        className="action-button"
                    >
                        DEMO
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
