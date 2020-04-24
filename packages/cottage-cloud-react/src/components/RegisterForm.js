import React from 'react';
import { Field, Form } from 'react-final-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Globals from '../utils/Globals'

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
}));

export default function RegisterForm() {
  const classes = useStyles();
  const history = useHistory();

  const Input = ({
    meta: { touched, error }, // eslint-disable-line react/prop-types
    input: inputProps, // eslint-disable-line react/prop-types
    ...props
  }) => (
      <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
      />
    );

  const submit = values => {
    fetch(Globals.APIURL + '/Profiles', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
      .then((response) => {
        if (response.status === 200) {
          NotificationManager.success("Registration success!");
          history.push('/login');
        } else {
          NotificationManager.error("Registration failed!");
        }
      });
  }

  const validate = values => {
    const errors = {
      name_first: undefined,
      name_last: undefined,
      email: undefined,
      phone: undefined,
      username: undefined,
      password: undefined
    };

    if (!values.name_first) {
      errors.name_first = "Required";
    }
    if (!values.name_last) {
      errors.name_last = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    else if (!values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      errors.email = "Not a valid email";
    }
    if (!values.phone) {
      errors.phone = "Required";
    }
    else if (!values.phone.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)) {
      errors.phone = "Not a valid phone number";
    }
    if (!values.username) {
      errors.username = "Required";
    } 
    else if (values.username === "admin") {
      errors.username = "Invalid username (can't be admin)"
    }
    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  }

  return (
    <div>
      <NotificationContainer />
      <Form
        onSubmit={submit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Field
              autoFocus
              id="name_first"
              name="name_first"
              component={Input}
              label="First Name"
            />
            <Field
              id="name_last"
              name="name_last"
              component={Input}
              label="Last Name"
            />
            <Field
              id="email"
              name="email"
              component={Input}
              label="Email Address"
            />
            <Field
              id="phone"
              name="phone"
              component={Input}
              label="Phone Number"
            />
            <Field
              id="username"
              name="username"
              component={Input}
              label="Username"
            />
            <Field
              id="password"
              name="password"
              type="password"
              component={Input}
              label="Password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
          </form>
        )} />
    </div>
  )
}