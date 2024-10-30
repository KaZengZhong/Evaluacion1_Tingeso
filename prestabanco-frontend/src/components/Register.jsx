// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Card, CardContent, TextField, Button, Typography, Alert } from '@mui/material';
import UserService from '../services/user.service';

const Register = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rut: '',
        phone: '',
        age: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UserService.register(userData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Error al registrar usuario');
        }
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            bgcolor: 'background.default',
            pt: 10,
            pb: 4,
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Container maxWidth="sm">
                <Card sx={{ boxShadow: 3 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                            Registro
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                margin="normal"
                                required
                                value={userData.firstName}
                                onChange={(e) => setUserData({
                                    ...userData,
                                    firstName: e.target.value
                                })}
                            />
                            <TextField
                                fullWidth
                                label="Apellido"
                                margin="normal"
                                required
                                value={userData.lastName}
                                onChange={(e) => setUserData({
                                    ...userData,
                                    lastName: e.target.value
                                })}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                margin="normal"
                                required
                                value={userData.email}
                                onChange={(e) => setUserData({
                                    ...userData,
                                    email: e.target.value
                                })}
                            />
                            <TextField
                                fullWidth
                                label="Contraseña"
                                type="password"
                                margin="normal"
                                required
                                value={userData.password}
                                onChange={(e) => setUserData({
                                    ...userData,
                                    password: e.target.value
                                })}
                            />
                            <TextField
                                fullWidth
                                label="RUT"
                                margin="normal"
                                required
                                value={userData.rut}
                                onChange={(e) => setUserData({
                                    ...userData,
                                    rut: e.target.value
                                })}
                            />
                            <TextField
                                fullWidth
                                label="Teléfono"
                                margin="normal"
                                required
                                value={userData.phone}
                                onChange={(e) => setUserData({
                                    ...userData,
                                    phone: e.target.value
                                })}
                            />
                            <TextField
                                fullWidth
                                label="Edad"
                                type="number"
                                margin="normal"
                                required
                                value={userData.age}
                                onChange={(e) => setUserData({
                                    ...userData,
                                    age: e.target.value
                                })}
                                InputProps={{
                                    inputProps: { min: 18, max: 100 }
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{ mt: 3, mb: 2, py: 1.5 }}
                            >
                                Registrarse
                            </Button>
                        </form>

                        <Box textAlign="center" mt={2}>
                            <Button
                                onClick={() => navigate('/login')}
                                color="primary"
                            >
                                ¿Ya tienes una cuenta? Inicia sesión
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default Register;