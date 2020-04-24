import React from 'react';
import { Filter, TextInput } from 'react-admin'; 
import CustomDateInput from './CustomDateInput';
import WildCardInput from './CustomWildCardInput';

const HomePageFilter = (props) => (
  <Filter {...props}>
      <WildCardInput label="Amenities" source="description_amenities" />
      <CustomDateInput label="Available Starting" source="available_from" operation="gt"/>
      <CustomDateInput label="Available Ending" source="available_to" operation="gt"/>
      <TextInput label="Daily Rate" source="daily_rate" />
  </Filter>
);

export default HomePageFilter;