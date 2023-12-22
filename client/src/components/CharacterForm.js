import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Select,
    MenuItem,
    InputLabel,
} from '@mui/material';

function CharacterForm({ onSubmit, dressupState }) {
    const [powers, setPowers] = useState([]);

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required')
            .matches(/^[A-Za-z]+$/, 'Name should only contain letters')
            .min(2, 'Name should have at least 2 characters')
            .max(15, 'Name should not exceed 15 characters'),
        power: Yup.string().required('Power is required'),
        power_id: Yup.number().required('Power ID is required').positive('Power ID should be positive'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            power: '',
            power_id: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const newData = { ...values, ...dressupState };
            onSubmit(newData);

            formik.resetForm();
        },
    });

    useEffect(() => {
        const fetchPowers = async () => {
            try {
                const response = await fetch('http://localhost:5555/powers');
                if (!response.ok) {
                    throw new Error('Failed to fetch powers');
                }
                const powersData = await response.json();
                setPowers(powersData);
            } catch (error) {
                console.error('Error fetching powers:', error);
            }
        };

        fetchPowers();
    }, []);

    const handleChange = (event) => {
        formik.handleChange(event);

        const selectedPower = powers.find((power) => power.name === event.target.value);
        if (selectedPower) {
            formik.setFieldValue('power_id', selectedPower.id);
        } else {
            formik.setFieldValue('power_id', null);
        }
    };

    const selectedPower = powers.find((power) => power.name === formik.values.power);
    const selectedPowerDescription = selectedPower ? selectedPower.description : '';

    return (
        <form onSubmit={formik.handleSubmit}>
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
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />

                    <Select
                        fullWidth
                        label="Character Power"
                        variant="outlined"
                        name="power"
                        value={formik.values.power}
                        onChange={handleChange}
                        error={formik.touched.power && Boolean(formik.errors.power)}
                        inputProps={{
                            name: 'power',
                            id: 'power-select',
                        }}
                    >
                        {powers.map((power) => (
                            <MenuItem key={power.id} value={power.name}>
                                {power.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {selectedPowerDescription && (
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            {selectedPowerDescription}
                        </Typography>
                    )}
                </Box>

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create Character
                </Button>
            </Container>
        </form>
    );
}

export default CharacterForm;
