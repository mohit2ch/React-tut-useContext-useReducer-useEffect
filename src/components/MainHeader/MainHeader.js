import React from 'react';
import AuthContext from '../../store/auth-context';
import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import { useContext } from 'react';
const MainHeader = (props) => {
  const ctx = useContext(AuthContext);
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation isLoggedIn={ctx.isLoggedIn} onLogout={ctx.onLogout} />
    </header>
  );
};

export default MainHeader;
