import { Navigate, Route } from "@solidjs/router";
import Dashboard from "pages/dashboard/Dashboard";
import Login from "pages/login/Login";

export default () => {
    return (
        <>
            <Route path={"/"} component={() => <Navigate href={"/login"} />} />
            <Route path={"/login"} component={Login} />
            <Route path={"/~"} component={Dashboard}/>
            <Route path={"/dashboard"} component={Dashboard} />

        </>
    )
}