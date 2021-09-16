import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FormDataDiri from "../component/FormDataDiri/FormDataDiri";
import DataPendukung from "../component/DataPendukung/DataPendukung";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={FormDataDiri} />
                <Route exact path='/data-pendukung' component={DataPendukung} />
            </Switch>
        </Router>
    );
};

export default Routes;