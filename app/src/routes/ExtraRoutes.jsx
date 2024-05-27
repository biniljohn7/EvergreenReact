import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedLayout from "../layout/ProtectedLayout";
import NotFound from "../views/NotFound";

const ExtraRoutes = () => {
  return (
    <Switch>
      {ProtectedRoutes.map((pathObj, i) => {
        return (
          <Route
            exact
            path={pathObj.path}
            key={i}
            // component={pathObj.component}
            render={(props) => (
              <ProtectedLayout {...props} mainComponent={pathObj.component} />
            )}
          />
        );
      })}

      <Route render={(props) => <NotFound {...props} />} />
    </Switch>
  );
};

export default ExtraRoutes;
