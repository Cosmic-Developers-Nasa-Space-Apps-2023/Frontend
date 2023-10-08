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
import { useEffect, useState } from 'react';
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
import { Checkbox, FormControlLabel } from '@mui/material';
import { UserProvider } from '../../context/userContext'; 
import { useUser } from '../../context/userContext';

const drawerWidth = 240;

interface UserProfile {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_public: boolean;
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  const formData = {
    first_name: data.get('firstName') as string,
    last_name: data.get('lastName') as string,
    username: data.get('username')as string,
    email: data.get('email') as string,
    password: data.get('password') as string,
    is_public: data.get('is_public') === 'on'
  };

  try {
    const response = await fetch('URL_DEL_SERVIDOR', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Updated data');
    } else {
      console.error('Error updating data', response.statusText);
    }
  } catch (error) {
    console.error('Error when updating', error);
  }
};


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
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    is_public: false
  });

  useEffect(() => {
    fetch(`http://api.opencommunity.work/api/users/`, {
      method: 'GET',
      headers: {
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setUserProfile(data);
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
  }, []);

  
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    if (isEditing) {
      try {
        const response = await fetch('URL_DE_TU_API', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userProfile),
        });
  
        if (response.ok) {
          console.log('Cambios guardados con éxito');
          setIsEditing(false);
          console.error('Error al guardar cambios:', response.statusText);
        }
      } catch (error) {
        console.error('Error al guardar cambios:', error);
      }
    } else {
      setIsEditing(true); // Activa el modo de edición si no estaba activo
    }
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
          default:
            window.location.href = '/profile';
        }
      };

  return (
    <UserProvider>
    <Box sx={{ display: 'flex' }}>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}></Box>
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
          {['Projects', 'Profile', 'Logout'].map((text, index) => (
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
                value={userProfile.first_name}
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
                value={userProfile.last_name}
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
            <FormControlLabel
              required
              control={
                <Checkbox
                  name="is_public"
                  color="primary"
                  checked={userProfile.is_public} // Establece el estado del checkbox basado en userProfile
                  disabled={!isEditing} // Deshabilita el checkbox cuando no se está editando
                />
              }
              label="Check this box if you want your profile to be public"
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
        </Box>
      </Container>
    </ThemeProvider>
    </Main>
    </Box>
    </UserProvider>
  );
}

