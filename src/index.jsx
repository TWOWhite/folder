import React from 'react';
import ReactDom from 'react-dom';
import 'babel-polyfill';
import 'antd/dist/antd.min.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Provider from './folder/Provider';
import { mainPageRoutes } from './router';
import storeData from './store';
import App from './view/App';


import './style/index.less';


const main = (<Provider defaultState={storeData}>
    <Router>
        {mainPageRoutes}
    </Router>
</Provider>);

ReactDom.render(main, document.getElementById('root'));
