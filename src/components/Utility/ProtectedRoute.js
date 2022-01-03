import React, { useContext, useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {

  const { isAuth, loading } = useContext(AuthContext);
  
  const active_route = useLocation().pathname
  if(isAuth) localStorage.setItem('linkers_active_route', active_route)
  
  const titles = {
    '/dashboard': 'Linkers | Dashboard',
  }
  
  useEffect(() => {
    let title = "Linkers"
    if(active_route.includes('/school/show')) title = 'Linkers | School'
    else if(active_route.includes('/instructor/show')) title = 'Linkers | Instructor'
    else if(active_route.includes('/student/show')) title = 'Linkers | Student'
    else title = titles[active_route] ?? 'Linkers'
    document.title = title
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active_route])

  return <Route {...rest} render={(props) => !isAuth ? (!loading ? <Redirect to="/login" /> : "Loading...")  : <Component {...props} />}/>
};

export default ProtectedRoute;
