// Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import UserService from '../services/user.service';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = UserService.getCurrentUser();

    const handleLogout = () => {
        UserService.logout();
        navigate('/login');
    };

    return (
        <AppBar position="fixed" sx={{ width: '100%' }}>
            <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/"
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                    >
                        PrestaBanco
                    </Button>
                    <Button 
                        color="inherit"
                        component={Link} 
                        to="/loan-simulator"
                    >
                        Simulador
                    </Button>
                    {isAuthenticated && (
                        <>
                            <Button 
                                color="inherit"
                                component={Link} 
                                to="/loan-application"
                            >
                                Solicitar Préstamo
                            </Button>
                            <Button 
                                color="inherit"
                                component={Link} 
                                to="/applications"
                            >
                                Mis Solicitudes
                            </Button>
                        </>
                    )}
                </Box>
                
                <Box>
                    {isAuthenticated ? (
                        <Button 
                            color="inherit"
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </Button>
                    ) : (
                        <>
                            <Button 
                                color="inherit"
                                component={Link} 
                                to="/login"
                            >
                                Iniciar Sesión
                            </Button>
                            <Button 
                                variant="outlined"
                                color="inherit"
                                component={Link} 
                                to="/register"
                            >
                                Registrarse
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;