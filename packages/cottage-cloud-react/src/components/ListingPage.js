import React from 'react';
import {
  Create, SimpleForm, DateInput, NumberInput, List, Show, SimpleShowLayout,
  NumberField, Datagrid, ReferenceField, TextField, DateField, TextInput, Edit, SelectInput, ReferenceInput,
  TopToolbar, EditButton, Button
} from 'react-admin';
import HomePageFilter from './HomePageFilter';
import { Link } from 'react-router-dom';
import { parse } from "query-string";

// Hack since react-admin doesn't support nested ReferenceFields https://github.com/marmelab/react-admin/issues/2140
const SubReference = ({ translateChoice, children, ...props }) => (
  <ReferenceField {...props}>{children}</ReferenceField>
);

const CustomTextField = ({ source, record, text = {} }) => <span>{text}</span>

const ListingShowCustomActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
    {/* Add your custom actions */}
    <AddNewCommentButton record={data} />
  </TopToolbar>
);

const AddNewCommentButton = ({ record }) => (
  <Button
    component={Link}
    to={{
      pathname: "/bookings/create",
      search: `?listing_id=${record.id}`,
    }}
    label="Book your vacation"
  >
  </Button>
);

export const ListingList = ({ staticContext, ...props }) => {
  return (
    <List {...props} filters={<HomePageFilter />} bulkActionButtons={false} sort={{ field: 'available_from', order: 'ASC' }}>
      <Datagrid rowClick="show">
        <ReferenceField source="property_id" reference="properties" label="Property Link" link="show" sortable={false}>
          <CustomTextField text="View Property Details" />
        </ReferenceField>
        <ReferenceField label="Property Name" source="property_id" reference="properties" link={false}>
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="Property Street Address" source="property_id" reference="properties" link={false}>
          <SubReference source="address_id" reference="addresses" link={false}>
            <TextField source="street" />
          </SubReference>
        </ReferenceField>
        <DateField label="Availability Start Date" source="available_from" options={{ year: 'numeric', month: 'long', day: 'numeric' }} />
        <DateField label="Availability End Date" source="available_to" options={{ year: 'numeric', month: 'long', day: 'numeric' }} />
        <TextField label="Amenities" source="description_amenities"></TextField>
        <TextField label="Daily Rate" source="daily_rate"></TextField>
      </Datagrid>
    </List>
  );
};

export const ListingShow = props => (
  <Show title='Listing Details' actions={<ListingShowCustomActions />} {...props}>
    <SimpleShowLayout>
      <ReferenceField label="Property Name" source="property_id" reference="properties" link={false}>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Property Street Address" source="property_id" reference="properties" link={false}>
        <SubReference source="address_id" reference="addresses" link={false}>
          <TextField source="street" />
        </SubReference>
      </ReferenceField>
      <DateField source="available_from" />
      <DateField source="available_to" />
      <NumberField source="daily_rate" />
      <TextField source="description_amenities" />
    </SimpleShowLayout>
  </Show>
);

export const ListingCreate = props => {
  const { property_id: property_id_string } = parse(props.location.search);
  const property_id = property_id_string ? property_id_string : "";

  return (
    <Create title='Create Listing' {...props}>
      <SimpleForm redirect="list">
        <TextInput source="property_id" initialValue={property_id} />
        <DateInput label="Availability Starting Date" source="available_from" />
        <DateInput label="Availability Ending Date" source="available_to" />
        <NumberInput label="Daily Rate" source="daily_rate" />
        <TextInput label="Description of Amenities" source="description_amenities" />
      </SimpleForm>
    </Create>
  );
}

export const ListingEdit = props => (
  <Edit title='Edit Listing' {...props}>
    <SimpleForm>
      <ReferenceInput label="Property" reference="properties" source="property_id">
        <SelectInput optionText="name" optionValue="id" />
      </ReferenceInput>
      <DateInput label="Availability Starting Date" source="available_from" />
      <DateInput label="Availability Ending Date" source="available_to" />
      <NumberInput label="Daily Rate" source="daily_rate" />
      <TextInput label="Description of Amenities" source="description_amenities" />
    </SimpleForm>
  </Edit>
);

export default ListingList;