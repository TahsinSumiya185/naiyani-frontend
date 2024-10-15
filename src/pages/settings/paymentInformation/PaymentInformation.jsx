import { useState } from "react";


const PaymentInformation = () => {
    const [postalCode, setPostalCode] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');

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
  return (
    <>
    <div className="lg:px-32 px-8 font-sans">
<form  className='w-full max-w-7xl mx-auto mt-32 p-6'>


 <div className="gradient-button z-0 w-full mb-5 group">
 <input
       type="text"
       placeholder="Cardholder's name"
       // value={cardHolderName}
       // onChange={(e) => setCardHolderName(e.target.value)}
       className="w-full h-full expanding-input"
       required
     />
 </div>




 <div className="gradient-button z-0 w-full mb-5 group">
 <input
       type="text"
       placeholder="Card number"
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
       placeholder="Date of expiry"
       // value={cardHolderName}
       // onChange={(e) => setCardHolderName(e.target.value)}
       className="w-full h-full expanding-input"
       required
     />
 </div>
 <div className="gradient-button z-0 w-full mb-5 group">
 <input
       type="text"
       placeholder="Security Code"
       // value={cardHolderName}
       // onChange={(e) => setCardHolderName(e.target.value)}
       className="w-full h-full expanding-input"
       required
     />
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

export default PaymentInformation
