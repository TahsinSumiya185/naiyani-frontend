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
import { useSelector } from "react-redux";
import { useGetConfigQuery } from "./redux/api/payment/paymentApi";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "./components/loading/Loading";

// Main logic for rendering the app
const RootComponent = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const { data, error } = useGetConfigQuery(); // Fetch config (including publishableKey)

  useEffect(() => {
    if (data && data.publishableKey) {
      const stripe = loadStripe(data.publishableKey); // Initialize Stripe instance
      setStripePromise(stripe); // Store in component state
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
