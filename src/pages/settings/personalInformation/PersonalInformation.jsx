import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import { useState } from 'react';
const PersonalInformation = () => {
    const [selectedItem, setSelectedItem] = useState('Select Province');
    const [postalCode, setPostalCode] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');
    const handleMenuClick = (e) => {
        setSelectedItem(e.key);
      };
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
    <>
     <div className="lg:px-32 px-8 font-sans">
<form  className='w-full max-w-7xl mx-auto mt-32 p-6'>

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
      {selectedItem} 
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

  
</div>



  

<div className='flex justify-end mt-8'>
<button
  style={{ boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)" }}
  className={`rounded-2xl text-gray-600 hover:bg-gray-600 hover:text-white border-none
     font-semibold text-[16px] flex items-center justify-between py-1 cursor-pointer 
   
    `}

>
  <span className="px-5">Save</span>

</button>

        </div>
  </form>
 
</div>
    </>
  )
}

export default PersonalInformation
