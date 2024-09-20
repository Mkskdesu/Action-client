import { Navigate, Route } from "@solidjs/router";
import Dashboard from "pages/dashboard/Dashboard";
import Home from "pages/home/Home";
import Login from "pages/login/Login";
import Notification from "global/components/notification/Notification";
import Record from "pages/record/Record";
import Register from "pages/register/Register";
import Timer from "pages/timer/Timer";

export default () => {
    return (
        <>
            <Route path={"/"} component={() => <Navigate href={"/login"} />} />
            <Route path={"/login"} component={Login} />
            <Route path={"/register"} component={Register} />
            <Route path={["/home", "/~"]} component={Home}>
                <Route path={["/", "/dashboard"]} component={Dashboard} />
                <Route path={"/record"} component={Record} />
                <Route path={"/timer"} component={Timer} />
            </Route>
        </>
    )
}