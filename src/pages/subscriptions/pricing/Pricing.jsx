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

  const { data: pricesData, error, isLoading } = useGetConfigQuery();
  const [createSubscription] = useCreateSubscriptionMutation();

  useEffect(() => {
    if (pricesData) {
      console.log("Prices Data:", pricesData);
    }
  }, [pricesData]);

  const handleMonthlyClick = () => {
    setShowMonthly(true);
    setShowYearly(false);
  };

  const handleYearlyClick = () => {
    setShowMonthly(false);
    setShowYearly(true);
  };

  const handleCreateSubscription = async (priceId) => {
    setIsLoadingSubscription(true); // Start loading
    try {
      const response = await createSubscription(priceId).unwrap();
      console.log(response);
  
      const { subscriptionId, clientSecret } = response.data; // Adjust to access the data object
  
      if (subscriptionId && clientSecret) {
        navigate("/subscribe", {
          state: {
            subscriptionId,
            clientSecret,
          },
        });
      } else {
        console.error("Missing subscriptionId or clientSecret in response", response);
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    } finally {
      setIsLoadingSubscription(false); // Stop loading
    }
  };
  

  if (isLoading || isLoadingSubscription) return <Loading />; // Show loading while fetching or creating a subscription
  if (error) return <div>Error loading prices</div>;

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
  className={`border-none cursor-pointer rounded-[30px] text-sm py-2 px-5 ${showYearly ? "bg-[#963939] font-semibold text-white" : "bg-white text-[#A1A1A1]"}`}
  onClick={handleYearlyClick}
>
  Yearly
</button>

          </div>
        </div>

        <PricingCards
  isLoading={isLoadingSubscription}
  prices={pricesData?.data?.prices?.data || []}  // Adjusted path to match your API response
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