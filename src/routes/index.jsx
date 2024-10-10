import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DatabaseList from "../pages/Lead-list/databaseList/DatabaseList";
import DatabaseButton from "../pages/Lead-list/databaseButton/DatabaseButton";
import DatabaseTable from "../pages/Lead-list/databaseTable/DatabaseTable";
import Help from "../pages/help/Help";
import SignUp from "../pages/auth/signUp/SignUp";
import Terms from "../pages/terms/Terms";
import Privacy from "../pages/privacy/Privacy";
import Verify from "../pages/auth/verify/Verify";
import Login from "../pages/auth/loginPage/Login";
import LandingPage from "../pages/landingPage/LandingPage";
import Pricing from "../pages/subscriptions/pricing/Pricing";
import ContactUs from "../pages/contactUs/ContactUs";
import AboutUs from "../pages/aboutUs/AboutUs";
import Team from "../pages/team/Team";
import Subscribe from "../pages/subscriptions/subscribe/Subscribe";
import Account from "../pages/subscriptions/accountstatus/Account";
import Cancel from "../pages/subscriptions/accountstatus/Cancel";
import PrivateRoute from "./PrivateRoute";
import Setiings from "../pages/settings/Setiings";
import PersonalInformation from "../pages/settings/personalInformation/PersonalInformation";
import PaymentInformation from "../pages/settings/paymentInformation/paymentInformation";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/database-btn",
        element: (
          <PrivateRoute>
            <DatabaseButton />
          </PrivateRoute>
        ),
      },
      {
        path: "/database-list",
        element: (
          <PrivateRoute>
            <DatabaseList />
          </PrivateRoute>
        ),
      },
      {
        path: "/database-table",
        element: (
          <PrivateRoute>
            <DatabaseTable />
          </PrivateRoute>
        ),
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/policy",
        element: <Privacy />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/subscribe",
        element: <Subscribe />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <Setiings />
          </PrivateRoute>
        ),
        children: [
          {
            path: "personal-information",  // Nested path under settings
            element: (
              <PrivateRoute>
                <PersonalInformation />
              </PrivateRoute>
            ),
          },
          {
            path: "payment-information",  // Nested path under settings
            element: (
              <PrivateRoute>
                <PaymentInformation />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default routes;


