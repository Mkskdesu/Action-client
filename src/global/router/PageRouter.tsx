import { Navigate, Route } from "@solidjs/router";
import Login from "pages/login/Login";

export default () => {
    return (
        <>
            <Route path={"/"} component={() => <Navigate href={"/login"} />} />
            <Route path={"/login"} component={Login} />
        </>
    )
}