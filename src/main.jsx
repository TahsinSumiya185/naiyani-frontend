import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index";
import { Elements } from "@stripe/react-stripe-js";
import { useGetConfigQuery } from "./redux/api/payment/paymentApi";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "./components/loading/Loading";
import { logout, setUserInfo } from "./redux/api/auth/authSlice";
import { getFromLocalStorage } from "./utils/localStorage";
import { isLoggedIn } from "./services/auth.service";

const RootComponent = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const { data, error } = useGetConfigQuery(); 
  const dispatch = useDispatch(); 
  useEffect(() => {

    if (!isLoggedIn()) {
      dispatch(logout()); 
    }
  }, [dispatch]);

useEffect(() => {
  const storedUserInfo = {
    firstName: getFromLocalStorage("firstName"),
    email: getFromLocalStorage("email"),
    accessToken: getFromLocalStorage("accessToken"),
  };
  
  if (storedUserInfo.firstName && storedUserInfo.email) {
    dispatch(setUserInfo(storedUserInfo));
  }
}, [dispatch]);


  useEffect(() => {
    const publishableKey = data?.data?.publishableKey;

    console.log("publishkey", publishableKey);
 

    if (publishableKey) {
      const stripe = loadStripe(publishableKey); 
      setStripePromise(stripe); 
    }
  }, [data]);

  if (error) {
    return <Loading />;
  }

  return stripePromise ? (
    <Elements stripe={stripePromise}>
      <RouterProvider router={routes} />
    </Elements>
  ) : (
    <Loading />
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RootComponent />
    </Provider>
  </React.StrictMode>
);
