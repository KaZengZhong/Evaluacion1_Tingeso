import React, { useEffect } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [connectionStatus, setConnectionStatus] = React.useState(null);

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            width: '100%',
            bgcolor: 'background.default', 
            pt: 10,
            pb: 4
        }}>
            <Container maxWidth="lg" sx={{ ml: { xs: 2, sm: 4, md: 18 }, mr: 'auto' }}>
                {connectionStatus && (
                    <Alert 
                        severity={connectionStatus.type} 
                        sx={{ mb: 2 }}
                    >
                        {connectionStatus.message}
                    </Alert>
                )}
                
                <Box textAlign="center" mb={6}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Bienvenido a PrestaBanco
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        La mejor opción para tu crédito hipotecario
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Simula tu Préstamo
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                    Calcula tus cuotas mensuales y conoce nuestras tasas.
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large"
                                    sx={{ py: 1.5 }}
                                    onClick={() => navigate('/loan-simulator')}
                                >
                                    Simular Ahora
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Solicita tu Crédito
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                    Comienza el proceso de tu préstamo hipotecario.
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large"
                                    sx={{ py: 1.5 }}
                                    onClick={() => navigate('/loan-application')}
                                >
                                    Solicitar
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Seguimiento
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                    Revisa el estado de tu solicitud.
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large"
                                    sx={{ py: 1.5 }}
                                    onClick={() => navigate('/applications')}
                                >
                                    Ver Estado
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;