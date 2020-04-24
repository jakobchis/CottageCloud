import React, { Component } from 'react';
import { UserMenu, MenuItemLink } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';

class MyUserMenu extends Component {
  render() {
    const { ...props } = this.props;

    return (
      <UserMenu {...props}>
        <MenuItemLink
          to="/profile"
          primaryText="Edit Profile"
          leftIcon={<SettingsIcon />}
        />
      </UserMenu>
    );
  }
}

export default MyUserMenu;