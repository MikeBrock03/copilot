// UserIdContext.js
import React from 'react';

const UserIdContext = React.createContext({
  userId: null,
  setUserId: () => {},
});

export default UserIdContext;