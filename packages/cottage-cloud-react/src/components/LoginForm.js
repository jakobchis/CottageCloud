import React from 'react';
import { Field, Form } from 'react-final-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useLogin, useSafeSetState } from 'react-admin';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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

export default function LoginForm() {
  const login = useLogin();
  const [loading, setLoading] = useSafeSetState(false);
  const classes = useStyles();

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
    setLoading(true);
    login(values)
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        NotificationManager.error("Login failed, invalid credentials!");
      });
  };

  const validate = values => {
    const errors = { username: undefined, password: undefined };

    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

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
              id="username"
              name="username"
              component={Input}
              label="Username"
              disabled={loading}
            />
            <Field
              id="password"
              name="password"
              component={Input}
              label="Password"
              type="password"
              disabled={loading}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
              </Button>
          </form>
        )} />
    </div>
  )
}