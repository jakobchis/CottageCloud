import React from 'react';
import {
  SimpleShowLayout, List, Create, Show, SimpleForm, TextInput, ReferenceInput,
  SelectInput, TextField, ReferenceField, Datagrid
} from 'react-admin';
import storage from '../utils/Storage.js';

const UserId = storage.load('lbtoken').userId;

export const AddressList = props => (
  <List bulkActionButtons={false} sort={{ field: 'street', order: 'ASC' }} {...props}>
    <Datagrid rowClick="show">
      <TextField source="street" />
      <TextField source="city" />
      <ReferenceField source="province_id" reference="provinces" link={false}><TextField source="name" /></ReferenceField>
      <ReferenceField source="country_id" reference="countries" link={false}><TextField source="name" /></ReferenceField>
    </Datagrid>
  </List>
);

export const AddressShow = props => (
  <Show title='Address Details' {...props}>
    <SimpleShowLayout>
      <TextField source="street" />
      <TextField source="city" />
      <ReferenceField label="Province" reference="provinces" source="province_id" link={false}>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Country" reference="countries" source="country_id" link={false}>
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export const AddressCreate = props => (
  <Create title='Create Address' {...props}>
    <SimpleForm>
      <TextInput source="street" />
      <TextInput source="city" />
      <ReferenceInput label="Province" reference="provinces" source="province_id">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Country" reference="countries" source="country_id">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput disabled source="profile_id" initialValue={UserId} />
    </SimpleForm>
  </Create>
);

export const AddressEdit = props => (
  <Create title='Edit Address' {...props}>
    <SimpleForm>
      <TextInput source="street" />
      <TextInput source="city" />
      <ReferenceInput label="Province" reference="provinces" source="province_id">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Country" reference="countries" source="country_id">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput disabled source="profile_id" initialValue={UserId} />
    </SimpleForm>
  </Create>
);

export default AddressList;