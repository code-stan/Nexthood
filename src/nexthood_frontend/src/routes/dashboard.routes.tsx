import { Navigate, RouteObject } from "react-router-dom";
import DashboardLayout from "../components/layout/dashboard.layout";
import Home from "../pages/dashboard/Home";
import { AuthClient } from "@dfinity/auth-client";

// AuthClient is like firebase
// Once you come to our website let AuthClient.create() run; It is an asynchronous function
// The client we get from that has a isAuthenticated method and a login method
// The login method is asynchronous. like await client.login(process.env.CANISter_id).
// Also I don't know if we have access to the process

//uncomment below: 
/*
const AuthCheck = async () => {
  const loggedIn = await AuthClient.create().then(
    (client) => client.isAuthenticated
  );

  return loggedIn;
};
*/

const DashboardRoutes: RouteObject = {
  path: "dashboard",
  element: <DashboardLayout />,
  children: [
    {
      path: "",
      element: <Home />
      // element: (await AuthCheck()) ? (
      //   <Home />
      // ) : (
      //   <Navigate to={"/auth/login"} replace />
      // or <SignIn client={}
      // ),
    },
  ],
};

export default DashboardRoutes;
