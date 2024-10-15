import { useState } from "react";
import Sidebar from "../../../components/sideBar/SideBar";
import TopBar from "../../../components/topBar/TopBar";
import "./css/SubscribtionCancallation.css"; // Import the CSS file

export default function SubscribtionCancallation() {
  // State to control the visibility of the checkboxes
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [checkedReasons, setCheckedReasons] = useState({}); // State to manage checkbox selections

  // Array of cancellation reasons
  const cancellationReasons = [
    "No longer needed",
    "Too expensive",
    "I do not like the services",
    "The features do not work for my business",
    "Other",
    
  ];

  const handleCheckboxChange = (reason) => {
    setCheckedReasons((prev) => ({
      ...prev,
      [reason]: !prev[reason], // Toggle the checkbox state for the reason
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      <div className="flex pt-32 pr-6">
        <Sidebar />
      </div>

      <div className="flex flex-col justify-center items-center gap-y-6 ">
        <p className="text-gray-600 font-semibold text-xl text-center">
          Are you sure you want to cancel?
        </p>

        <button
          onClick={() => setShowCheckboxes(!showCheckboxes)} // Show the checkboxes when clicked
          style={{ boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)" }}
          className="w-64 rounded-full text-gray-600 bg-white hover:bg-gray-600 hover:text-white border-none
           font-semibold text-[16px] py-3 cursor-pointer text-center"
        >
          Yes, cancel my subscription
        </button>

        {showCheckboxes && (
          <div className="flex flex-col items-start">
            {cancellationReasons.map((reason, index) => (
              <div className="flex items-center" key={index}>
                <input
                  type="checkbox"
                  id={`reason-${index}`}
                  className={`custom-checkbox mr-2`} // Apply custom class for styling
                  checked={checkedReasons[reason] || false} // Check if the reason is selected
                  onChange={() => handleCheckboxChange(reason)} // Toggle the checkbox state
                />
                <label htmlFor={`reason-${index}`} className="text-gray-600 text-md ">
                  {reason}
                </label>
              </div>
            ))}
          </div>
        )}

        <button
          style={{ boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)" }}
          className="w-64 rounded-full text-gray-600 bg-white hover:bg-gray-600 hover:text-white border-none
           font-semibold text-[16px] py-3 cursor-pointer text-center"
        >
          No, take me back
        </button>
      </div>
    </div>
  );
}
