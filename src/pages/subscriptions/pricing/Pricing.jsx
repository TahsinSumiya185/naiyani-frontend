import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../layouts/Footer";
import Navbar1 from "../../../components/navbar/Navbar1";
import PricingCards from './PricingCards';
import { useGetConfigQuery, useCreateSubscriptionMutation } from '../../../redux/api/payment/paymentApi';
import Loading from "../../../components/loading/Loading";

const Pricing = () => {
  const [showMonthly, setShowMonthly] = React.useState(true);
  const [showYearly, setShowYearly] = React.useState(false);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false); // Add loading state for subscription
  const navigate = useNavigate();

  // Fetch pricing data
  const { data: pricesData, error, isLoading } = useGetConfigQuery();
  const [createSubscription] = useCreateSubscriptionMutation();

  useEffect(() => {
    if (pricesData) {
      console.log("Prices:", pricesData);
    }
  }, [pricesData]);

  // Handle the subscription creation and navigate to Subscribe page
  const handleSubscribe = async (priceId) => {
    setIsLoadingSubscription(true);  // Set loading state

    try {
      const { data, error } = await createSubscription(priceId);

      if (error) {
        console.error("Error creating subscription:", error);
      } else if (data) {
        const { clientSecret, subscriptionId } = data;
        // Navigate to Subscribe page, passing the clientSecret and subscriptionId
        navigate('/subscribe', { state: { clientSecret, subscriptionId } });
      }
    } catch (err) {
      console.error("Error during subscription creation:", err);
    } finally {
      setIsLoadingSubscription(false);  // Reset loading state
    }
  };

  if (isLoading || isLoadingSubscription) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading pricing data</div>;
  }

  return (
    <>
      <div className="lg:px-32 px-8 font-sans">
        <Navbar1 />
        <div className="headerFont gradient-text text-center lg:text-[44px] my-10 text-xl text-[#A1A1A1]">
          Plans and Pricing
        </div>

        <div className="text-center mt-8">
          <div
            style={{ boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)" }}
            className="w-[175px] rounded-[50px] mx-auto flex justify-center items-center"
          >
            <button
              className={`border-none cursor-pointer rounded-[30px] text-sm py-2 px-5 ${showMonthly ? "bg-[#963939] font-semibold text-white" : "bg-white text-[#A1A1A1]"}`}
              onClick={handleMonthlyClick}
            >
              Monthly
            </button>
            <button
              className={`border-none cursor-pointer text-[#A1A1A1] rounded-[30px] text-sm py-2 px-5 ${showYearly ? "bg-[#A1A1A1] font-semibold text-white" : "bg-white text-[#A1A1A1]"}`}
              onClick={handleYearlyClick}
            >
              Yearly
            </button>
          </div>
        </div>

        <PricingCards
          isLoading={isLoadingSubscription} // Pass loading state to PricingCards
          prices={pricesData?.prices?.data || []}
          showMonthly={showMonthly}
          showYearly={showYearly}
          createSubscription={handleCreateSubscription}
        />

        <div className="mt-32">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Pricing;
