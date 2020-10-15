import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar'
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About'
import User from './components/users/User'

import PropTypes from 'prop-types';
import Alert from './components/layout/Alert'
import axios from 'axios'

import './App.css';

class App extends Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }

  // async componentDidMount() {


  //   const res = await axios.get('https://api.github.com/users');

  //   this.setState({ users: res.data, loading: false })
  // }
  // search github users..

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  }
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);

    this.setState({ users: res.data.items, loading: false });
  }
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 1000);
  }
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}`);

    this.setState({ user: res.data, loading: false });
  }
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`);

    this.setState({ repos: res.data, loading: false });
  }

  render() {
    const { users, user, loading, repos } = this.state;
    return (
      <Router>
        <div className="App" >
          <Navbar title="Github Finder" icon="fab fa-github" />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router >
    );
  }
}

export default App;
