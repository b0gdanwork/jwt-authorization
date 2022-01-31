import React, {useContext} from 'react';
import {Context} from "../index";
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRouters, publicRouters, RouteName} from "../routes";

const ApiRoute = () => {

  const {store} = useContext(Context)

  return (
    store.isAuth ?
    <Routes>
      {
        publicRouters.map(item=>
          <Route
            key={item.path}
            path={item.path}
            element={<item.component />}
          />
        )
      }
      <Route path="/" element={<Navigate replace to={RouteName.USERS} />} />
    </Routes>
      :
    <Routes>
      {
        privateRouters.map(item=>
          <Route
            key={item.path}
            path={item.path}
            element={<item.component />}
          />
        )
      }
      <Route path="/" element={<Navigate replace to={RouteName.LOGIN} />} />
    </Routes>

  );
};

export default ApiRoute;