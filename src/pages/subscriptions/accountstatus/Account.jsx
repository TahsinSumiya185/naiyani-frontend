import { useEffect } from 'react';
import AccountSubscription from './AccountSubscription';
import Navbar1 from '../../../components/navbar/Navbar1';
import { useGetAllSubscriptionsQuery } from '../../../redux/api/payment/paymentApi';
import Loading from '../../../components/loading/Loading';

const Account = () => {
  const { data, error, isLoading } = useGetAllSubscriptionsQuery();

  useEffect(() => {
    if (data) {
      console.log('Fetched subscription data:', data);
    }
    if (error) {
      console.error("Error fetching subscriptions:", error);
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='lg:px-32 px-8'>
          <Navbar1 />
          <h1 data-aos="zoom-in" className='text-center text-gray-400 text-3xl'>| Account Status |</h1>
          <div className='flex justify-between mx-5'>
            <a href="/pricing" className='text-xl text-gray-400 hover:text-cyan-700 hover:underline font-semibold' data-aos="fade-right">Add a subscription</a>
            <a href="/" className='text-xl text-gray-400 hover:text-cyan-700 hover:underline font-semibold' data-aos="fade-left">Restart demo</a>
          </div>

          <h2 className='text-gray-400 text-center' data-aos="fade-up">Subscriptions</h2>

          <div id="subscription">
            {error && <p>Error loading subscriptions: {error.message}</p>}
            {data?.data?.subscriptions?.data?.length > 0 ? (
              data.data.subscriptions.data.map(s => (
                <AccountSubscription key={s.id} subscription={s} />
              ))
            ) : (
              <p>No subscriptions available</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
