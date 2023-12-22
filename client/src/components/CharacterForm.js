import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function CharacterForm({ handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom>
                    Character Info
                </Typography>

                <Box sx={{ '& .MuiTextField-root': { marginBottom: 2 } }}>
                    <TextField
                        fullWidth
                        required
                        label="Character Name"
                        variant="outlined"
                        placeholder="Enter Character Name"
                    />

                    <TextField
                        fullWidth
                        required
                        label="Character Power"
                        variant="outlined"
                        placeholder="Enter Character Power"
                    />

                    <TextField
                        fullWidth
                        required
                        label="Character Region"
                        variant="outlined"
                        placeholder="Enter Character Region"
                    />
                </Box>

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create Character
                </Button>
            </Container>
        </form>
    );
}

export default CharacterForm;
