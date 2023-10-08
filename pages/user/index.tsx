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
import skills from '../profile/skills.json';
import fields from '../profile/fields.json';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface FormData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  preferred_language: string;
  skills: string[];
  experience: string;
  country: string;
  seeking_fields: string[];
  working_availablity: Date;
  default_summary: string;
  is_public: boolean;
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {

const [countries, setCountries] = useState([]);

const [selectedDate, setSelectedDate] = useState(null);

const [selectedSkills, setSelectedSkills] = useState<{ title: string }[]>([]);

const [selectedSeekingFields, setSelectedSeekingFields] = useState<{ title: string }[]>([]);

const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

const handleDateChange = (newDate: any) => {
  setSelectedDate(newDate);
};
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const formData = {
      first_name: data.get('firstName') as string,
      last_name: data.get('lastName') as string,
      username: data.get('username')as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
      password_confirmation: data.get('password') as string,
      preferred_laguage: 'en',
      /*skills: selectedSkills,
      experience: data.get('experience') as string,
      country: selectedCountry,
      seeking_fields: selectedSeekingFields,
      working_availablity: selectedDate,
      default_summary: data.get('default_summary') as string,
      is_public: data.get('is_public') === 'on'*/
    };
  
    try {
      const response = await fetch('http://api.opencommunity.work/api/auth/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Sign up successful');
      } else {
        console.error('Error in sign up:', response.statusText);
      }
    } catch (error) {
      console.error('Error when sending the request:', error);
    }
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
        const countryNames = data.map((country: { name: { common: any; }; }) => country.name.common);
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []); 

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
              value={selectedSkills}
              onChange={(event, newValue) => setSelectedSkills(newValue)}
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
              options={countries}
              value={selectedCountry}
              onChange={(event, newValue) => setSelectedCountry(newValue)}
              renderInput={(params) => <TextField {...params} label="Country" />}
            />
            </Grid>
            <Grid item xs={12}>
            <Autocomplete
              multiple
              id="seeking_fields"
              options={fields.items}
              getOptionLabel={(option) => option.title}
              value={selectedSeekingFields}
              onChange={(event, newValue) => setSelectedSeekingFields(newValue)}
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
              <Typography>
                Working availability
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={(newDate) => handleDateChange(newDate)}
              />
              </LocalizationProvider>
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
      </Container>
    </ThemeProvider>
  );
}