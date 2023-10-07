import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete } from '@mui/material';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

interface UserProfile {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    skills: string[];
    experience: string;
    country: string;
    seeking_fields: string[];
    working_availability: Date;
    default_summary: string;
    is_public: boolean;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));
  
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
  
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));
  
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
})); 

export default function UserProfilePage() {

const [isEditing, setIsEditing] = useState(false);

const defaultTheme = createTheme();

const [userProfile, setUserProfile] = useState<UserProfile>({
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    skills: ['React', 'TypeScript', 'JavaScript'],
    experience: '7 yers',
    country: 'United States',
    seeking_fields: ['Frontend', 'Backend'],
    working_availability: new Date(),
    default_summary: 'I am a software engineer',
    is_public: true,
});

const handleEditClick = () => {
    setIsEditing(!isEditing);
};

const handleSaveClick = () => {
    // Aquí puedes realizar una solicitud HTTP para guardar los cambios
    // Utilizar userProfile para obtener los nuevos valores
    console.log('Guardando cambios:', userProfile);
    setIsEditing(false);
};

const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
    }));
};

const theme = useTheme();

const [open, setOpen] = React.useState(false);
  
const handleDrawerOpen = () => {
    setOpen(true);
};
  
const handleDrawerClose = () => {
    setOpen(false);
};

const handleListItemClick = (text: string) => {
    switch (text) {
        case 'Projects':
        window.location.href = '/projects';
        break;
        case 'Profile':
        window.location.href = '/profile';
        break;
        case 'Logout':
        // Realiza acciones específicas para Logout
        //TODO implement logout
        window.location.href = '/login';
        break;
        case 'Joining Requests':
        window.location.href = '/joining-requests';
        break;
        default:
        window.location.href = '/profile';
    }
};

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Open Community Work
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Projects', 'Profile', 'Logout', 'Joining Requests'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleListItemClick(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
            ))}
            </List>
            <Divider />
        </Drawer>
        <Main open={open}>
        <DrawerHeader />
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
            <AccountBoxIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {userProfile.username}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                label="First Name"
                name="firstName"
                value={userProfile.firstName}
                onChange={handleFieldChange}
                fullWidth
                variant={isEditing ? 'outlined' : 'standard'}
                InputProps={{ readOnly: !isEditing }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="Last Name"
                name="lastName"
                value={userProfile.lastName}
                onChange={handleFieldChange}
                fullWidth
                variant={isEditing ? 'outlined' : 'standard'}
                InputProps={{ readOnly: !isEditing }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="Email"
                name="email"
                value={userProfile.email}
                onChange={handleFieldChange}
                fullWidth
                variant={isEditing ? 'outlined' : 'standard'}
                InputProps={{ readOnly: !isEditing }}
                />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                multiple
                id="skills"
                options={userProfile.skills}
                getOptionLabel={(option) => option}
                defaultValue={userProfile.skills}
                readOnly = {!isEditing}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    variant="standard"
                    label="Skills"
                    />
                )}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="Experience"
                name="experience"
                value={userProfile.experience}
                onChange={handleFieldChange}
                fullWidth
                variant={isEditing ? 'outlined' : 'standard'}
                InputProps={{ readOnly: !isEditing }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="Country"
                name="country"
                value={userProfile.country}
                onChange={handleFieldChange}
                fullWidth
                variant={isEditing ? 'outlined' : 'standard'}
                InputProps={{ readOnly: !isEditing }}
                />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                multiple
                id="seeking_fields"
                options={userProfile.seeking_fields}
                getOptionLabel={(option) => option}
                defaultValue={userProfile.seeking_fields}
                readOnly = {!isEditing}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    variant="standard"
                    label="Seeking fields"
                    />
                )}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="Working Availability"
                name="working_availability"
                value={userProfile.working_availability.toDateString()}
                onChange={handleFieldChange}
                fullWidth
                variant={isEditing ? 'outlined' : 'standard'}
                InputProps={{ readOnly: !isEditing }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="Default Summary"
                name="default_summary"
                value={userProfile.default_summary}
                onChange={handleFieldChange}
                fullWidth
                multiline
                variant={isEditing ? 'outlined' : 'standard'}
                InputProps={{ readOnly: !isEditing }}
                />
            {isEditing ? (
                <Button onClick={handleSaveClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Save
                </Button>
            ) : (
                <Button onClick={handleEditClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Edit
                </Button>
            )}
        </Grid>
        </Grid>
        </Box>
      </Container>
    </ThemeProvider>
    </Main>
    </Box>
  );
}

