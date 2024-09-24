import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { FaArrowAltCircleRight } from "react-icons/fa";
import '../subscribe/Subcribe.css'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import { Navigate, useLocation } from 'react-router-dom';

const Subscribe = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();

  const [clientSecret, setClientSecret] = useState(location.state?.clientSecret || '');
  const [subscriptionId, setSubscriptionId] = useState(location.state?.subscriptionId || '');
  const [cardHolderName, setCardHolderName] = useState('');
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [selectedItem, setSelectedItem] = useState('Select Province');

  // Log clientSecret and subscriptionId when the component loads
  useEffect(() => {
    console.log('ClientSecret:', clientSecret);
    console.log('SubscriptionId:', subscriptionId);
    
    if (!clientSecret || !subscriptionId) {
      setMessages('Client secret or subscription ID is missing. Please try again.');
    }
  }, [clientSecret, subscriptionId]);

  if (!stripe || !elements) {
    return null; // Stripe or Elements not loaded yet
  }
  const handlePostalCodeChange = (e) => {
    const input = e.target.value.toUpperCase();
    const lastChar = input.slice(-1);
    const previousInput = input.slice(0, -1);

    if (previousInput.length % 2 === 0 && /[A-Za-z]/.test(lastChar)) {
      setPostalCode(input);
      setPostalCodeError('');
    } else if (previousInput.length % 2 !== 0 && /\d/.test(lastChar)) {
      setPostalCode(input);
      setPostalCodeError('');
    } else if (previousInput.length === 3 && /\s/.test(lastChar)) {
      setPostalCode(input);
      setPostalCodeError('');
    } else {
      setPostalCodeError('Please enter the postal code in the format A1A 1A1');
    }
  };
  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Disable the submit button to prevent multiple submissions
    if (loading) return;
    setLoading(true);
  
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
  
    if (!clientSecret) {
      setMessages('Client secret is not available.');
      setLoading(false);
      return;
    }
  
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: cardHolderName,
          },
        },
      });
  
      if (error) {
        setMessages(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setPaymentIntent(paymentIntent);
        setMessages('Payment succeeded');
      }
    } catch (err) {
      setMessages('An error occurred during payment. Please try again.');
    } finally {
      setLoading(false);  // Re-enable the button after the process completes
    }
  };
  
  // Redirect to account page if payment is successful
  if (paymentIntent && paymentIntent.status === 'succeeded') {
    return <Navigate to="/account" />;
  }
  const items = (
    <Menu onClick={handleMenuClick} style={{ boxShadow: "0 4px 8px rgba(26, 25, 25, 0.25)", borderRadius: "20px" }}>
      <Menu.Item key="Alberta">Alberta</Menu.Item>
      <Menu.Item key="British Columbia">British Columbia</Menu.Item>
      <Menu.Item key="Manitoba">Manitoba</Menu.Item>
      <Menu.Item key="New Brunswick">New Brunswick</Menu.Item>
      <Menu.Item key="Newfoundland and Labrador">Newfoundland and Labrador</Menu.Item>
      <Menu.Item key="Northwest Territories">Northwest Territories</Menu.Item>
      <Menu.Item key="Nova Scotia">Nova Scotia</Menu.Item>
      <Menu.Item key="Nunavut">Nunavut</Menu.Item>
      <Menu.Item key="Ontario">Ontario</Menu.Item>
      <Menu.Item key="Prince Edward Island">Prince Edward Island</Menu.Item>
      <Menu.Item key="Quebec">Quebec</Menu.Item>
      <Menu.Item key="Saskatchewan">Saskatchewan</Menu.Item>
      <Menu.Item key="Yukon">Yukon</Menu.Item>
    </Menu>
  );
  return (
    <form onSubmit={handleSubmit} className='w-full max-w-7xl mx-auto my-10 p-6'>
    <div>
      <p className='text-fonts font-semibold'>Billing Information</p>
    </div>
<div className="grid md:grid-cols-2 md:gap-6">
  <div className="gradient-button z-0 w-full mb-5 group">
  <input
        type="text"
        placeholder="First Name"
        // value={cardHolderName}
        // onChange={(e) => setCardHolderName(e.target.value)}
        className="w-full h-full expanding-input"
        required
      />
  </div>
  <div className="gradient-button z-0 w-full mb-5 group">
  <input
        type="text"
        placeholder="Last Name"
        // value={cardHolderName}
        // onChange={(e) => setCardHolderName(e.target.value)}
        className="w-full h-full expanding-input"
        required
      />
  </div>
</div>


  <div className="gradient-button z-0 w-full mb-5 group">
  <input
        type="text"
        placeholder="Address"
        // value={cardHolderName}
        // onChange={(e) => setCardHolderName(e.target.value)}
        className="w-full h-full expanding-input"
        required
      />
  </div>


  <div className="grid md:grid-cols-2 md:gap-6">
  <div className="gradient-button z-0 w-full mb-5 group">
  <input
        type="text"
        placeholder="City"
        // value={cardHolderName}
        // onChange={(e) => setCardHolderName(e.target.value)}
        className="w-full h-full expanding-input"
        required
      />
  </div>
  <div className="gradient-button z-0 w-full mb-5">
<Dropdown overlay={items} trigger={['click']} className="expanding-input">
  <Typography.Link className="dropdown-link">
    <Space>
      {selectedItem} {/* Display selected item */}
      <DownOutlined />
    </Space>
  </Typography.Link>
</Dropdown>

  </div>
  
</div>

<div className="grid md:grid-cols-2 md:gap-6">
<div className="gradient-button z-0 w-full mb-5 group">
<div>
  <input
    type="text"
    placeholder="Postal Code"
    value={postalCode}
    onChange={handlePostalCodeChange}
    className="w-full h-full expanding-input"
    maxLength={7} // 6 characters + 1 space
    required
  />
  {postalCodeError && <p className="text-red-500">{postalCodeError}</p>}
  </div>
</div>
  <div className="gradient-button z-0 w-full mb-5 group">
  <input
        type="text"
        placeholder="Canada"
        // value={cardHolderName}
        // onChange={(e) => setCardHolderName(e.target.value)}
        className="w-full h-full expanding-input"
       disabled
      />
  </div>
  
</div>


<div>
<div>
      <p className='text-fonts font-semibold'>Payment Information</p>
    </div>

    <div className="gradient-button z-0 w-full mb-5 group">
  <input
        type="text"
        placeholder="Cardholder's Name"
        value={cardHolderName}
        onChange={(e) => setCardHolderName(e.target.value)}
        className="w-full h-full expanding-input"
        required
      />
  </div>



  <div className="grid md:grid-cols-4  md:gap-6">
<div className="gradient-button col-span-2 z-0  w-full mb-5">
  <CardNumberElement
    options={{
      style: {
        base: {
          textAlign: 'center',
          '::placeholder': {
            font: '1rem/3 sans-serif',
            fontWeight: 'bold',
            color: '#a1a1a1',
            textAlign: 'center',
          },
        },
      },
    }}
    className="w-full bg-white expanding-input text-center placeholder-center"
  />
</div>

<div className="gradient-button z-0 col-span-1  w-full mb-5">
  <CardExpiryElement
    options={{
      style: {
        base: {
          textAlign: 'center',
          '::placeholder': {
            font: '1rem/3 sans-serif',
            fontWeight: 'bold',
            color: '#a1a1a1',
            textAlign: 'center',
          },
        },
      },
    }}
    className="w-full bg-white expanding-input text-center placeholder-center"
  />
</div>
<div className="gradient-button z-0 w-full   mb-5">
  <CardCvcElement
    options={{
      style: {
        base: {
          textAlign: 'center',
          '::placeholder': {
            font: '1rem/3 sans-serif',
            fontWeight: 'bold',
            color: '#a1a1a1',
            textAlign: 'center',
          },
        },
      },
    }}
    className="w-full bg-white expanding-input"
  />
</div>

</div>

</div>
  

<div className='flex justify-end mt-8'>
<button
  style={{ boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)" }}
  className={`rounded-2xl text-gray-600 hover:bg-gray-600 hover:text-white border-none font-semibold text-[16px] flex items-center justify-between py-1 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={loading}  // Disable the button when loading
>
  <span className="px-5">SUBMIT</span>
  <FaArrowAltCircleRight className="h-[18px] w-[18px]" />
</button>

        </div>
  </form>
  );
};

export default Subscribe;
