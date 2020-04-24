import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import splashImage from '../images/splash_image.jpg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Cottage Cloud
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  splashImage: {
    width: '100%',
    padding: '15px'
  }
}));

export default function SplashPage() {
  const classes = useStyles();
  const location = useLocation();
  let form;
  let link;
  let message;

  if (location.pathname === "/login") {
    form = LoginForm;
    link = <Link href="register" variant="body2">{"Register for an account"}</Link>
    message = "Sign in";
  } else if (location.pathname === "/register") {
    form = RegisterForm;
    link = <Link href="login" variant="body2">{"Back to login"}</Link>
    message = "Register for an account";
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img className={classes.splashImage} src={splashImage} alt="Splash Image of Cabin" />
        <Typography component="h1" variant="h5">
          {message}
        </Typography>
        {form()}
        <Grid container>
          <Grid item>
            {link}
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}