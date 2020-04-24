import React from 'react';
import { Edit, TextInput, SimpleForm, required, regex } from 'react-admin';

const validateEmail = [required(), regex(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, "Must be a valid email address")];
const validatePhone = [required(), regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, "Must be a valid phone number")];
const validateUsername =  [required(), regex(/^((?!admin).)*$/, "Username can't be admin")];

const EditProfile = ({ staticContext, ...props }) => {
  var lbtoken = JSON.parse(localStorage.getItem('lbtoken'));
  var id = "";
  if (lbtoken !== null) {
    id = lbtoken.value.userId;
  }

  return (
    <Edit
      id={id}
      resource="profiles"
      basePath="/profile"
      title="My Profile"
      redirect={false}
      {...props}
    >
      <SimpleForm>
        <TextInput source="name_first" validate={required()} />
        <TextInput source="name_last" validate={required()} />
        <TextInput source="email" validate={validateEmail} />
        <TextInput source="phone" validate={validatePhone} />
        <TextInput source="username" validate={validateUsername} />
        <TextInput source="password" validate={required()} type="password" />
      </SimpleForm>
    </Edit>
  );
};

export default EditProfile;