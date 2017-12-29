import React from 'react';
import { Route, Switch } from 'react-router-dom';

import OffList from '../view/Offline/OffList';
import OffNew from '../view/Offline/OffNew';
import App from '../view/App';

export const mainPageRoutes = <Route path="/" component={App} />;

export const sidePageRoutes = [
    <Route path="/offline/list" key="/offline/list" component={OffList} />,
    <Route path="/offline/new" key="/offline/new" component={OffNew} />,
];
