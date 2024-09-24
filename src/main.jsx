import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index";
import { Elements } from "@stripe/react-stripe-js";
 // Use existing paymentApi for Stripe config
 // To store Stripe instance

import { useGetConfigQuery } from "./redux/api/payment/paymentApi";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "./components/loading/Loading";

const RootComponent = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const { data, error } = useGetConfigQuery(); // Fetch config (including publishableKey)

  useEffect(() => {
    // Assuming `data` contains a nested object
    const publishableKey = data?.data?.publishableKey;

    console.log(publishableKey);
    console.log(stripePromise);

    if (publishableKey) {
      const stripe = loadStripe(publishableKey); // Initialize Stripe instance
      setStripePromise(stripe); // Store in component state
    }
  }, [data]);

  if (error) {
    return <Loading/>;
  }

  return stripePromise ? (
    <Elements stripe={stripePromise}>
      <RouterProvider router={routes} />
    </Elements>
  ) : (
    <Loading/>
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
