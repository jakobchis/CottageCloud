import React from 'react';
import {
  List,
  Edit,
  Create,
  Datagrid,
  SimpleForm,
  ReferenceField,
  TextField,
  DateField,
  TextInput,
  DateInput,
  Show,
  SimpleShowLayout,
  ImageInput, ImageField
} from 'react-admin';
import { parse } from "query-string";
import storage from '../utils/Storage.js';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';

const BlobField = ({ record = {} }) => <img style={{ width: "100%", height: "auto", maxWidth: "200px", maxHeight: "200px" }} src={`${record.photoBlob}`} />;

// Hack since react-admin doesn't support nested ReferenceFields https://github.com/marmelab/react-admin/issues/2140
const SubReference = ({ translateChoice, children, ...props }) => (
  <ReferenceField {...props}>{children}</ReferenceField>
);

const CustomTextField = ({ source, record, text = {} }) => <span>{text}</span>

const Empty = ({ basePath, resource }) => (
  <Box textAlign="center" m={1}>
    <Typography variant="h4" paragraph>
      No Photos
      </Typography>
    <Typography variant="body1">
      Create one by viewing a property
      </Typography>
  </Box>
);

export const PhotoList = (props) => (
  <List {...props} bulkActionButtons={false} empty={<Empty />} >
    <Datagrid rowClick="show">
      <ReferenceField source="property_id" reference="properties" label="Property Link" link="show" sortable={false}>
        <CustomTextField text="View Property Details" />
      </ReferenceField>
      <ImageField source="photoBlob" />
    </Datagrid>
  </List>
);

export const PhotoCreate = props => {
  const { property_id: property_id_string } = parse(props.location.search);
  const property_id = property_id_string ? property_id_string : "";

  return (
    <Create title='Create Photo' {...props}>
      <SimpleForm redirect="list">
        <TextInput source="property_id" initialValue={property_id} />
        <TextInput source="description" />
        <TextInput source="list_position" />
        {/* <TextInput source="photoBlob" /> */}
        <ImageInput source="photoBlob" label="Cottage Photos" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};

export const PhotoEdit = (props) => (
  <Edit title='Edit Photo' {...props}>
    <SimpleForm>
      <TextInput source="description" />
      <TextInput source="list_position" />
      <TextInput source="photoBlob" />
    </SimpleForm>
  </Edit>
);

export const PhotoShow = (props) => (
  <Show title="Photo Details" {...props}>
    <SimpleShowLayout>
      <TextField source="description" />
      <TextField source="list_position" />
      <ImageField source="photoBlob" />
    </SimpleShowLayout>
  </Show>
);
