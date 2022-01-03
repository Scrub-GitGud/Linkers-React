import React, { useEffect, useContext} from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import AuthContextProvider, { AuthContext } from './components/Context/AuthContext';
// import ProtectedRoute from "./utility/ProtectedRoute";
// import setDefaultHeader from "./utility/SetAxiosDefaultHeader";
// import { AuthContext } from "../src/context/AuthContext";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/Utility/ProtectedRoute';
import setDefaultHeader from './components/Utility/SetAxiosDefaultHeader';
import Layout from './components/Layout';
import AddLink from './components/AddLink';
import TagContextProvider from './components/Context/TagContext';
import LinkContextProvider from './components/Context/LinkContext';
import Links from './components/Links';
import Folder from './components/Folder';
import SingleFolder from './components/SingleFolder';

if (localStorage.linkers_token) {
  setDefaultHeader(localStorage.linkers_token)
} else {
  setDefaultHeader()
}
if(!localStorage.getItem('linkers_active_route')) localStorage.setItem('linkers_active_route', "/dashboard")


const App = (props) => {

  const { isAuth, user, LoadUser, Logout } = useContext(AuthContext);

  useEffect(() => {
    if(!isAuth) LoadUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  return (
    <Switch >
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />

      <Layout {...props}>
        <div className="h-full p-5">
            <LinkContextProvider>
              <TagContextProvider>

                  <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                  <ProtectedRoute exact path="/links" component={Links} />
                  <ProtectedRoute exact path="/add" component={AddLink} />
                  <ProtectedRoute exact path="/folder" component={Folder} />
                  <ProtectedRoute exact path="/folder/:id" component={SingleFolder} />

              </TagContextProvider>
            </LinkContextProvider>
        </div>
      </Layout>
      
    </Switch>
  )
}

export default App
