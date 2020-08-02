import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, withRouter } from "react-router-dom";

import Start from './components/start'
import Navigation from './components/navbar'
import About from './components/about'
import Post from './pages/post'
import SinglePost from './pages/singlepost'


import './App.css';

function App() {
  return (
    <div className="App">
       
       <Navigation/>
       
          <Switch>
              <Route exact path="/" component={Start} />
              <Route exact path="/about" component={About} />
              <Route exact path ="/posts" component={Post} />
              <Route path = "/:blogId" component={SinglePost} />
          </Switch>
       
       
    </div>
  );
}

export default withRouter(App);
