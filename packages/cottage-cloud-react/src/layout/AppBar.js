import React from 'react';
import { AppBar } from 'react-admin';
import MyUserMenu from './UserMenu';

const MyAppBar = props => <AppBar {...props} userMenu={<MyUserMenu />} />;
export default MyAppBar;