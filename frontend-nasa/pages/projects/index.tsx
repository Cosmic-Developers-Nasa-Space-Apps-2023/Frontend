import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardActions, CardContent, Chip } from '@mui/material';
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
import feed from './feed.json';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Pagination from '@mui/material/Pagination';

const drawerWidth = 240;

interface Projects {
    title: string;
    description: string;
    desired_skills: string;
    field: string;
    status: string;
    starting_date: Date;
    finishing_date: string;
    email: string;
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
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  })); 

export default function UserProfilePage() {

  const [projects, setProjects] = useState<Projects[]>([]);

  const defaultTheme = createTheme();

  const [userProfile, setUserProfile] = useState<Projects>({
    title: 'Project Title',
    description: 'Project Description',
    desired_skills: "skill 1, skill 2",
    field: 'Field',
    status: 'Status',
    starting_date: new Date(),
    finishing_date: "",
    email: 'a@a.com'
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff0000', 
      },
      secondary: {
        main: '#00ff00',
      },
      background: {
        default: '#f0f0f0', 
        paper: '#ffffff', 
      },
    },
  });
  
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

      const [openDialog, setOpenDialog] = useState(false);

      const [selectedProject, setSelectedProject] = useState<Projects | null>(null);

      const handleOpenDialog = (project: Projects) => {
        setSelectedProject(project);
        setOpenDialog(true);
      };
      
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };

      useEffect(() => {
        if (feed._project) {
          const mappedProjects: Projects[] = feed._project.map((feed: any) => ({
            title: feed.project_name,
            description: feed.project_description,
            desired_skills: (feed.participations_tasks),
            field: feed.fields_of_science,
            status: feed.project_status,
            starting_date: feed.start_date,
            finishing_date: '',
            email: feed.email
          }));
          setProjects(mappedProjects);
        }
      }, []);

  const [page, setPage] = useState(1); 
  const projectsPerPage = 9; 
  const [open, setOpen] = React.useState(true); 


  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); 
  };
    
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
      
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
        <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start', // Comienza desde la izquierda
            gap: '16px', // Espacio entre las Cards
            padding: '16px', // Espaciado interno del contenedor
            borderRadius: '8px',
        }}
        >
          {projects
            .slice((page - 1) * projectsPerPage, page * projectsPerPage)
            .map((project) => (
            <Card
            key={project.title}
            sx={{
                flex: '1 1 calc(33.33% - 16px)', // 33.33% de ancho en una fila (ajustar según el número máximo deseado)
                boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.2)', // Agregar sombra
                '@media (max-width: 768px)': {
                flex: '1 1 calc(50% - 16px)', // 50% de ancho en pantallas más pequeñas
                },
                '@media (max-width: 480px)': {
                flex: '1 1 calc(100% - 16px)', // 100% de ancho en pantallas aún más pequeñas
                },
            }}
            >
            <CardContent>
            <Typography variant="h5" component="div">
            {project.title}
            </Typography>
            <Chip label={project.desired_skills} />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {project.field}
            </Typography>
            <CardActions>
            <Button size="small" onClick={() => handleOpenDialog(project)}> Learn more about this project </Button>
            <BootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={openDialog}
              >
                {selectedProject && (
                  <>
                    <DialogTitle sx={{ m: 0, p: 2 }}>Project Details</DialogTitle>
                    <DialogContent dividers>
                      <Typography gutterBottom>Project title: {selectedProject.title}</Typography>
                      <Typography gutterBottom>Project description: {selectedProject.description}</Typography>
                      <Typography gutterBottom>Desired skills: {selectedProject.desired_skills}</Typography>
                      <Typography gutterBottom>Field: {selectedProject.field}</Typography>
                      <Typography gutterBottom>Project status: {selectedProject.status}</Typography>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        target="_top"
                        rel="noopener noreferrer"
                        href={`mailto:${selectedProject.email}`}
                      >
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="button" style={{ fontSize: '0.69rem'}}>
                          Send the project owner an email
                        </Typography>
                        </div>
                      </Button>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        target="_top"
                        rel="noopener noreferrer"
                        href='joining_requests'
                        >
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="button" style={{ fontSize: '0.69rem'}}>
                          Request to join this project
                        </Typography>
                        </div>
                      </Button>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleCloseDialog}>
                        Close
                      </Button>
                    </DialogActions>
                  </>
                )}
              </BootstrapDialog>
            </CardActions>
        </CardContent>
        </Card>
        ))}
        </Box>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={Math.ceil(projects.length / projectsPerPage)}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
          />
        </div>
      </Container>
    </ThemeProvider>
    </Main>
    </Box>
  );
}