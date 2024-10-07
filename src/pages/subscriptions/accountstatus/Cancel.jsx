import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCancelSubscriptionMutation } from '../../../redux/api/payment/paymentApi';
import { FaArrowAltCircleRight } from "react-icons/fa";
import Navbar1 from '../../../components/navbar/Navbar1';
import Footer from '../../../layouts/Footer';
const Cancel = () => {
  const [cancelled, setCancelled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [cancelSubscription, { isLoading, isSuccess, isError, error }] = useCancelSubscriptionMutation();

  const handleClick = async (e) => {
    e.preventDefault();
    const subscriptionId = location.state?.subscription;

    if (!subscriptionId) {
      console.error("No subscription ID found");
      return;
    }

    try {
      await cancelSubscription(subscriptionId).unwrap();
      setCancelled(true);
    } catch (err) {
      console.error('Error cancelling subscription:', err);
    }
  };

  useEffect(() => {
    if (cancelled || isSuccess) {
      navigate('/account');
    }
  }, [cancelled, isSuccess, navigate]);

  return (
    <>
    <Navbar1/>
    <div className='lg:px-32 px-8'>
      <div className="flex items-center justify-center  bg-white shaodw-md">
        <div
          className="w-96 max-h-lg p-6 bg-white border border-gray-200 rounded-lg "
          style={{
            boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
            padding: "10px",
            resize: "vertical",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h1 data-aos="zoom-in" className="text-center text-gray-600 text-3xl mb-6">
            | Cancel |
          </h1>
          <div className="flex justify-center">
            {isError && <p className="text-red-500">Error: {error?.data?.error || 'Failed to cancel subscription'}</p>}
            <button onClick={handleClick}
            style={{
              boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
            }}
            className="rounded-2xl text-gray-600 hover:bg-gray-600 hover:text-white border-none font-semibold text-[16px] flex items-center justify-between py-1 cursor-pointer"
         
          >
            <span className="px-5">SUBMIT</span>
            <FaArrowAltCircleRight className="h-[18px] w-[18px]" />
          </button>
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    </>
  );
};

export default Cancel;
