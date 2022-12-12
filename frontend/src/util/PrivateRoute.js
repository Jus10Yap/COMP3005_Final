import { Route, Redirect} from "react-router-dom";

//if user is logged in then direct them to private route
const PrivateRoute = ({ isLoggedIn, ...props }) =>
  !isLoggedIn
    ? <Route { ...props } />
    : <Redirect to="/" />

export default PrivateRoute;