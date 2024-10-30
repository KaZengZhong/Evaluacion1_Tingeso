import React, { useState } from 'react';
import { 
    Box, 
    Container, 
    Card, 
    CardContent, 
    TextField, 
    Button, 
    Typography, 
    MenuItem,
    Grid,
    Stepper,
    Step,
    StepLabel,
    Alert
} from '@mui/material';
import ApplicationService from '../services/application.service';

const LoanApplication = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState('');
    const [applicationData, setApplicationData] = useState({
        // Personal Info
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        rut: '',
        age: '',
        // Employment Info
        employmentType: '',
        monthlyIncome: '',
        employmentYears: '',
        // Loan Info
        loanType: '',
        amount: '',
        term: '',
        interestRate: ''
    });

    const steps = ['Información Personal', 'Información Laboral', 'Detalles del Préstamo', 'Confirmación'];

    const employmentTypes = [
        { value: 'DEPENDENT', label: 'Dependiente' },
        { value: 'INDEPENDENT', label: 'Independiente' },
        { value: 'RETIRED', label: 'Jubilado' }
    ];

    const loanTypes = [
        { value: 'FIRST_HOME', label: 'Primera Vivienda', rate: '3.5% - 5.0%' },
        { value: 'SECOND_HOME', label: 'Segunda Vivienda', rate: '4.0% - 6.0%' },
        { value: 'COMMERCIAL', label: 'Propiedades Comerciales', rate: '5.0% - 7.0%' },
        { value: 'RENOVATION', label: 'Remodelación', rate: '4.5% - 6.0%' }
    ];

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handleSubmit();
        } else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async () => {
        try {
            await ApplicationService.create(applicationData);
            // Redirigir a la página de seguimiento o mostrar mensaje de éxito
        } catch (err) {
            setError('Error al enviar la solicitud');
        }
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                required
                                value={applicationData.firstName}
                                onChange={(e) => setApplicationData({
                                    ...applicationData,
                                    firstName: e.target.value
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Apellido"
                                required
                                value={applicationData.lastName}
                                onChange={(e) => setApplicationData({
                                    ...applicationData,
                                    lastName: e.target.value
                                })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="RUT"
                                required
                                value={applicationData.rut}
                                onChange={(e) => setApplicationData({
                                    ...applicationData,
                                    rut: e.target.value
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Teléfono"
                                type="tel"
                                required
                                value={applicationData.phone}
                                onChange={(e) => setApplicationData({
                                    ...applicationData,
                                    phone: e.target.value
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Edad"
                                type="number"
                                required
                                value={applicationData.age}
                                onChange={(e) => setApplicationData({
                                    ...applicationData,
                                    age: e.target.value
                                })}
                                InputProps={{
                                    inputProps: { min: 18, max: 100 }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                required
                                value={applicationData.email}
                                onChange={(e) => setApplicationData({
                                    ...applicationData,
                                    email: e.target.value
                                })}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Tipo de Empleo"
                                required
                                value={applicationData.employmentType}
                                onChange={(e) => setApplicationData({
                                    ...applicationData,
                                    employmentType: e.target.value
                                })}
                            >
                                {employmentTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Ingreso Mensual"
                                type="number"
                                required
                                value={applicationData.monthlyIncome}
                                onChange={(e) => setApplicationData({
                                    ...applicationData,
                                    monthlyIncome: e.target.value
                                })}
                                InputProps={{
                                    startAdornment: '$'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Años de Empleo"
                                type="number"
                                required
                                value={applicationData.employmentYears}
                                onChange={(e) => setApplicationData({
                                    ...applicationData,
                                    employmentYears: e.target.value
                                })}
                            />
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Tipo de Préstamo"
                                required
                                value={applicationData.loanType}
                                onChange={(e) => setApplicationData({
                                    ...applicationData,
                                    loanType: e.target.value
                                })}
                            >
                                {loanTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label} - {option.rate}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Monto Solicitado"
                                type="number"
                                required
                                value={applicationData.amount}
                                onChange={(e) => setApplicationData({
                                    ...applicationData,
                                    amount: e.target.value
                                })}
                                InputProps={{
                                    startAdornment: '$'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Plazo (años)"
                                type="number"
                                required
                                value={applicationData.term}
                                onChange={(e) => setApplicationData({
                                    ...applicationData,
                                    term: e.target.value
                                })}
                                InputProps={{
                                    inputProps: { min: 1, max: 30 }
                                }}
                            />
                        </Grid>
                    </Grid>
                );
            case 3:
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Resumen de la Solicitud
                        </Typography>
                        <Typography>Nombre: {applicationData.firstName} {applicationData.lastName}</Typography>
                        <Typography>RUT: {applicationData.rut}</Typography>
                        <Typography>Email: {applicationData.email}</Typography>
                        <Typography>Teléfono: {applicationData.phone}</Typography>
                        <Typography>Tipo de Préstamo: {
                            loanTypes.find(type => type.value === applicationData.loanType)?.label
                        }</Typography>
                        <Typography>Monto: ${applicationData.amount}</Typography>
                        <Typography>Plazo: {applicationData.term} años</Typography>
                    </Box>
                );
            default:
                return 'Unknown step';
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
            <Container maxWidth="md">
                <Card sx={{ boxShadow: 3 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                            Solicitud de Préstamo
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {getStepContent(activeStep)}

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                            {activeStep !== 0 && (
                                <Button
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Atrás
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Enviar Solicitud' : 'Siguiente'}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default LoanApplication;
