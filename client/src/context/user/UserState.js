import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';
import { GET_USERS, USER_ERROR } from '../types';

const UserState = props => {
  const initialState = {
    users: null,
    error: null
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get Users
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.msg
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        error: state.error,
        users: state.users,
        getUsers
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
