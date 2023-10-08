import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import styles from './styles.module.css';

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

const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              href='projects'
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <div className={styles.oauth}>
              <p>
                Or sign up with the following
              </p>
              <FacebookLogin
              appId="TU_ID_DE_APP_DE_FACEBOOK"
              textButton="Login with Facebook"
              autoLoad={false} // Puedes configurar si quieres que se cargue automáticamente
              fields="name,email,picture" // Campos que deseas obtener del usuario
              callback={""} // To define
              />
              <br />
              <GoogleLogin
                clientId="298732855262-5hvhtfpb4gjdafkukpp28nb8k88sfor2.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={() => { "You are logged in" }}
                onFailure={() => { "You are not logged in" }}
                cookiePolicy={'single_host_origin'}
              />
              <p className={styles.alter}>
                <Link href="sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </p>
              </div>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}