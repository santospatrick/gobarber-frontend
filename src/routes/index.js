import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashbaord" component={Dashboard} />
            <Route path="/profile" component={Profile} />
        </Switch>
    );
}
