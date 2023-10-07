import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import skills from './skills.json';
import fields from './fields.json';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const [countries, setCountries] = useState([]);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Extrae los nombres de los países de la respuesta y almacénalos en una matriz
        const countryNames = data.map((country: { name: { common: any; }; }) => country.name.common);
        setCountries(countryNames); // Actualiza la variable de estado con la matriz de nombres
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []); // El segundo argumento [] asegura que se ejecute solo una vez al montar el componente

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="username"
                label="Username"
                id="username"
              />
            </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            <Grid item xs={12}>
            <Autocomplete
              multiple
              id="skills"
              options={skills.items}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Skills"
                  placeholder="Skills"
                />
              )}
            />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="experience"
                label="Working experience (in years)"
                id="experience"
              />
            </Grid>
            <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="country"
              options={countries} // Utiliza la matriz de nombres de países como opciones
              renderInput={(params) => <TextField {...params} label="Country" />}
            />
            </Grid>
            <Grid item xs={12}>
            <Autocomplete
              multiple
              id="seeking_fields"
              options={fields.items}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Seeking fields"
                  placeholder="Seeking fields"
                />
              )}
            />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="working_availablity"
                label="Working Availability"
                id="working_availablity"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                multiline
                fullWidth
                rows={5}
                name="default_summary"
                label="Default Summary"
                id="default_summary"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                required
                control={<Checkbox name="is_public" color="primary" />}
                label="Check this box if you want your profile to be public"
              />
            </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}