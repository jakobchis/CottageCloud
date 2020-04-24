import React from 'react';
import { Route } from 'react-router-dom';
import SplashPage from '../components/SplashPage';
import EditProfilePage from '../components/EditProfilePage';

export default [
  <Route path="/register" render={() => <SplashPage />} noLayout />,
  <Route path="/profile" component={EditProfilePage} />
];