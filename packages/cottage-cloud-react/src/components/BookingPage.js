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
  SimpleShowLayout
} from 'react-admin';
import { parse } from "query-string";
import storage from '../utils/Storage.js';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';

const UserId = storage.load('lbtoken').userId;

const BlobField = ({ record = {} }) => <img style={{ width: "100%", height: "auto", maxWidth: "200px", maxHeight: "200px" }} src={`${record.photoBlob}`} />;

// Hack since react-admin doesn't support nested ReferenceFields https://github.com/marmelab/react-admin/issues/2140
const SubReference = ({ translateChoice, children, ...props }) => (
  <ReferenceField {...props}>{children}</ReferenceField>
);

const CustomTextField = ({ source, record, text = {} }) => <span>{text}</span>

const Empty = ({ basePath, resource }) => (
  <Box textAlign="center" m={1}>
    <Typography variant="h4" paragraph>
      No bookings
      </Typography>
    <Typography variant="body1">
      Create one by viewing a listing
      </Typography>
  </Box>
);

export const BookingList = (props) => (
  <List {...props} bulkActionButtons={false} empty={<Empty />} sort={{ field: 'book_from', order: 'ASC' }}>
    <Datagrid rowClick="show">
      <ReferenceField source="listing_id" reference="listings" label="Listing Link" link="show" sortable={false}>
        <CustomTextField text="View Listing Details" />
      </ReferenceField>
      <DateField label="Booking Start Date" source="book_from" options={{ year: 'numeric', month: 'long', day: 'numeric' }} />
      <DateField label="Booking End Date" source="book_to" options={{ year: 'numeric', month: 'long', day: 'numeric' }} />
    </Datagrid>
  </List>
);

export const BookingCreate = props => {
  const { listing_id: listing_id_string } = parse(props.location.search);
  const listing_id = listing_id_string ? listing_id_string : "";

  return (
    <Create title='Create Booking' {...props}>
      <SimpleForm redirect="list">
        <TextInput source="listing_id" initialValue={listing_id} />
        {/* Should add a way to see the listing's available_from and available_to here */}
        <DateInput label="Booking Starting" source="book_from" />
        <DateInput label="Booking Ending" source="book_to" />
        <TextInput disabled source="requester_id" initialValue={UserId} />
      </SimpleForm>
    </Create>
  );
};

export const BookingEdit = (props) => (
  <Edit title='Edit Booking' {...props}>
    <SimpleForm>
      <DateInput label="Booking Starting" source="book_from" />
      <DateInput label="Booking Ending" source="book_to" />
    </SimpleForm>
  </Edit>
);

export const BookingShow = (props) => (
  <Show title="Booking Details" {...props}>
    <SimpleShowLayout>
      <DateField label="Booking Start Date" source="book_from" options={{ year: 'numeric', month: 'long', day: 'numeric' }} />
      <DateField label="Booking End Date" source="book_to" options={{ year: 'numeric', month: 'long', day: 'numeric' }} />
    </SimpleShowLayout>
  </Show>
);
