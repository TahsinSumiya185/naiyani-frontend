import { Link } from 'react-router-dom';
import { FaArrowAltCircleRight } from "react-icons/fa";
import Navbar1 from '../../../components/navbar/Navbar1';

const AccountSubscription = ({ subscription }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'canceled':
        return 'text-red-600';
      case 'incomplete':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <>
  
       <section className='flex justify-center' data-aos="fade-up">
      <div className="p-6 bg-white hover:bg-gray-200 border-none my-5 rounded-xl mx-5"
        style={{
          boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <h4>
          <a className='text-gray-500' href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`}>
            Account Id: {subscription.id}
          </a>
        </h4>

        <p className='font-semibold text-lg text-gray-500'>
          Status: <span className={getStatusColor(subscription.status)}>{subscription.status}</span>
        </p>

        <p className='text-lg text-gray-500'>
          Card last: {subscription.default_payment_method?.card?.last4}
        </p>

        <p className='text-lg text-gray-500'>
          Current period end: {new Date(subscription.current_period_end * 1000).toString()}
        </p>

        <Link to={`/cancel`} state={{ subscription: subscription.id }}
          style={{
            boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
          }}
          className="rounded-2xl bg-gray-200 text-gray-600 hover:bg-gray-600 hover:text-white border-none font-semibold text-[16px] py-1 cursor-pointer"
        >
          <span className="px-5">Cancel</span>
          <FaArrowAltCircleRight className="h-[18px] w-[16px] -mb-1 mx-2" />
        </Link>
      </div>
    </section>
    </>
 
  );
};

export default AccountSubscription;
