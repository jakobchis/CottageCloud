import React from 'react';
import { Admin, fetchUtils, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import authProvider from './utils/AuthProvider';
import { createBrowserHistory } from 'history';
import SplashPage from './components/SplashPage';
import customRoutes from './utils/CustomRoutes';
import Globals from './utils/Globals';
import MyLayout from './layout/Layout.js';
import { ListingList, ListingShow, ListingCreate, ListingEdit } from './components/ListingPage';
import myDataProvider from './utils/DataProvider';
import { PropertyEdit, PropertyList, PropertyShow, PropertyCreate } from './components/PropertyPage';
import { AddressCreate, AddressList, AddressShow, AddressEdit } from './components/AddressPage';
import { BookingEdit, BookingList, BookingCreate, BookingShow } from './components/BookingPage';
import { PhotoEdit, PhotoList, PhotoCreate, PhotoShow } from './components/PhotoPage';


const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  var lbtoken = JSON.parse(localStorage.getItem('lbtoken'));
  var token = "";
  if (lbtoken !== null) {
    token = lbtoken.value.id;
  }
  options.headers.set('Authorization', token);
  return fetchUtils.fetchJson(url, options);
}

const App = () =>
  <Admin
    loginPage={SplashPage}
    authProvider={authProvider(Globals.APIURL + '/Profiles/login')}
    dataProvider={myDataProvider(Globals.APIURL, httpClient)}
    history={createBrowserHistory()}
    customRoutes={customRoutes}
    appLayout={MyLayout}
  >
    {permissions => 
      permissions === 'admintoken'
      ? [
        <Resource name="listings" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />,
        <Resource name="properties" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />,
        <Resource name="credit_cards" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />,
        <Resource name="addresses" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />,
        <Resource name="bookings" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />,
        <Resource name="photos" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />,
        <Resource name="countries" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />,
        <Resource name="provinces" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />,
        <Resource name="profiles" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
      ]
      : [
        <Resource name="listings" list={ListingList} show={ListingShow} create={ListingCreate} edit={ListingEdit} />,
        <Resource name="properties" list={PropertyList} create={PropertyCreate} show={PropertyShow} edit={PropertyEdit}/>,
        <Resource name="bookings" list={BookingList} show={BookingShow} edit={BookingEdit} create={BookingCreate}/>,
        <Resource name="credit_cards" />,
        <Resource name="addresses" list={AddressList} create={AddressCreate} show={AddressShow} edit={AddressEdit} />,
        <Resource name="photos" list={PhotoList} create={PhotoCreate} show={PhotoShow} edit={PhotoEdit} />,
        <Resource name="countries" />,
        <Resource name="provinces" />,
        <Resource name="profiles" />
      ]
    }
  </Admin>
  ;

export default App;
