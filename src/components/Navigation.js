import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core'

const Navigation = () => (
    <Grid>
        <Button variant="contained">
            <NavLink
                style={{ textDecoration: 'none' }}
                exact to='/'
                className='is-active'>
                Home
            </NavLink>
        </Button>
        <Button variant="contained">
            <NavLink
                style={{ textDecoration: 'none' }}
                exact to='/login'
                className='is-active'>
                Log In
            </NavLink>
        </Button>
        <Button variant="contained">
            <NavLink
                style={{ textDecoration: 'none' }}
                exact to='/signup'
                className='is-active'>
                Sign Up
            </NavLink>
        </Button>
        <Button variant="contained">
            <NavLink
                style={{ textDecoration: 'none' }}
                exact to='/logout'
                className='is-active'>
                Log Out
            </NavLink>
        </Button>
    </Grid>
);

export default Navigation;
