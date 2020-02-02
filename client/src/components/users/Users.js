import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import UserItem from './UsertItem';
import Spinner from '../layout/Spinner';
import UserContext from '../../context/user/userContext';

const Users = () => {
  const userContext = useContext(UserContext);

  const { users, getUsers, loading } = userContext;

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);
  console.log(users);

  //   if (users !== null && users.length === 0 && !loading) {
  //     return <h4>No user has done registration</h4>;
  //   }

  //   return (
  //     <Fragment>
  //       {users !== null && !loading ? (
  //         <TransitionGroup>
  //           users.map(user => (
  //           <CSSTransition key={user._id} timeout={500} classNames='item'>
  //             <UserItem user={user} />
  //           </CSSTransition>
  //           )
  //         </TransitionGroup>
  //       ) : (
  //         <Spinner />
  //       )}
  //     </Fragment>
  //   );
};

export default Users;
