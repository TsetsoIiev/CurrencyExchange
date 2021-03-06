import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';

import './custom.css'

export default function App(props) {

  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/about-us' component={AboutUs} />
      <Route path='/contact-us' component={ContactUs} />
    </Layout>
  );
}
