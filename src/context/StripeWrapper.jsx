import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const StripeWrapper = ({ children }) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublishableKey = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('No access token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/v1/payment/config/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch subscription config');
        }

        const { publishableKey } = await response.json();
        if (!publishableKey) {
          throw new Error('Missing publishableKey in config response');
        }

        setStripePromise(loadStripe(publishableKey));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPublishableKey();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stripePromise) {
    return <div>Loading Stripe...</div>;
  }

  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeWrapper;
