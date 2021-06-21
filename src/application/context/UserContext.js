import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(localUser ? localUser : '');

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
