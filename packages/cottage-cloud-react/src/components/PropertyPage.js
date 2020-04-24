import React from 'react';
import {
    Show, Edit, Create, SimpleForm, TabbedShowLayout, Tab, DateField, SelectInput,
    TextField, NumberField, TextInput, BooleanField, BooleanInput, Datagrid,
    ImageField, ImageInput, ReferenceField, ReferenceManyField, List, ReferenceInput, SelectArrayInput,
    TopToolbar, EditButton, Button
} from 'react-admin';
import storage from '../utils/Storage.js';
import { Link } from 'react-router-dom';

const BlobField = ({ record = {} }) => <img style={{ width: "100%", height: "auto", maxWidth: "200px", maxHeight: "200px" }} src={`${record.photoBlob}`} />;

const SubReference = ({ translateChoice, children, ...props }) => (
    <ReferenceField {...props}>{children}</ReferenceField>
);
const UserId = storage.load('lbtoken').userId;

const PropertyShowCustomActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        <AddNewListingButton record={data} />
        <AddNewPhotoButton record={data} />
    </TopToolbar>
);

const AddNewListingButton = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: "/listings/create",
            search: `?property_id=${record.id}`,
        }}
        label="List your property"
    >
    </Button>
);

const AddNewPhotoButton = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: "/photos/create",
            search: `?property_id=${record.id}`,
        }}
        label="Add a Photo"
    >
    </Button>
);

export const PropertyShow = (props) => (
    <Show title="Property Details" actions={<PropertyShowCustomActions />} {...props}>
        <TabbedShowLayout>
            <Tab label='Summary'>
                <TextField label="Property Name" source="name" />
                <ReferenceManyField label="Photo(s)" reference="photos" target="property_id" link={false} sortable={false}>
                    <Datagrid>
                        <ImageField label="" source="photoBlob" />
                    </Datagrid>
                </ReferenceManyField>
                <ReferenceField label='Address' reference="addresses" source="address_id" link={false}>
                    <TextField source="street" />
                </ReferenceField>
                <NumberField source='bedrooms' />
                <NumberField source='bathrooms' />
            </Tab>

            <Tab label='Descriptions' path='descriptions'>
                <TextField source='description_base' />
                <TextField source='description_beds' />
                <TextField source='description_baths' />
                <TextField source='description_amenities' />
            </Tab>

            <Tab label='Amenities' path='amenities'>
                <BooleanField source='is_cannibis_friendly' />
                <BooleanField source='is_smoke_friendly' />
                <BooleanField source='is_pet_friendly' />
                <BooleanField source='has_central_air' />
                <BooleanField source='has_electricity' />
                <BooleanField source='has_television' />
                <BooleanField source='has_wifi' />
                <BooleanField source='has_water' />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const PropertyList = (props) => (
    <List bulkActionButtons={false} sort={{ field: 'name', order: 'ASC' }} {...props}>
        <Datagrid rowClick="show">
            <TextField label="Property Name" source="name" />
            <ReferenceField label="Street Address" source="address_id" reference="addresses" link={false}>
                <TextField source="street" />
            </ReferenceField>
            <ReferenceManyField label="Photo(s)" reference="photos" target="property_id" link={false}>
                <Datagrid>
                    <ImageField label="" source="photoBlob" />
                </Datagrid>
            </ReferenceManyField>
        </Datagrid>
    </List>
);

export const PropertyCreate = (props) => (
    <Create title='Create Property' {...props}>
        <SimpleForm redirect="list">
            <TextInput label="Property Name" source="name" />
            <ReferenceInput label="Address" reference="addresses" source="address_id">
                <SelectInput optionText="street" optionValue="id" />
            </ReferenceInput>
            <TextInput source='bedrooms' />
            <TextInput source='bathrooms' />
            <TextInput source='description_base' />
            <TextInput source='description_beds' />
            <TextInput source='description_baths' />
            <TextInput source='description_amenities' />
            <BooleanInput source='is_cannibis_friendly' initialValue={false} />
            <BooleanInput source='is_smoke_friendly' initialValue={false} />
            <BooleanInput source='is_pet_friendly' initialValue={false} />
            <BooleanInput source='has_central_air' initialValue={false} />
            <BooleanInput source='has_electricity' initialValue={false} />
            <BooleanInput source='has_television' initialValue={false} />
            <BooleanInput source='has_wifi' initialValue={false} />
            <BooleanInput source='has_water' initialValue={false} />
            <TextInput disabled source="owner_id" initialValue={UserId} />
        </SimpleForm>
    </Create>
);


export const PropertyEdit = (props) => (
    <Edit title='Edit Property' {...props}>
        <SimpleForm>
            <TextInput label="Property Name" source="name" />
            <ReferenceInput label="Address" reference="addresses" source="address_id">
                <SelectInput optionText="street" optionValue="id" />
            </ReferenceInput>
            <TextInput source='bedrooms' />
            <TextInput source='bathrooms' />
            <TextInput source='description_base' />
            <TextInput source='description_beds' />
            <TextInput source='description_baths' />
            <TextInput source='description_amenities' />
            <BooleanInput source='is_cannibis_friendly' />
            <BooleanInput source='is_smoke_friendly' />
            <BooleanInput source='is_pet_friendly' />
            <BooleanInput source='has_central_air' />
            <BooleanInput source='has_electricity' />
            <BooleanInput source='has_television' />
            <BooleanInput source='has_wifi' />
            <BooleanInput source='has_water' />
        </SimpleForm>
    </Edit>
);

export default PropertyShow;