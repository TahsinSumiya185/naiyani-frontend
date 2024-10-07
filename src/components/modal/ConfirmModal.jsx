import React from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
const ConfirmModal = ({ isOpen, onConfirm, onCancel,msg,btnMsg }) => {
  return (
    <div>
      {isOpen && (
        <div
          id="popup-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white  " 
                style={{
                    boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
                    padding: "10px",
                    resize: "vertical",
                    border: "1px solid #ccc",
                    borderRadius: "24px",
                  }}
            >
              <button
                type="button"
                className="absolute top-3 right-3 border-none bg-transparent  rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                onClick={onCancel}
              >
          <IoClose className='w-8 h-8 text-gray-600 cursor-pointer' />
            
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
              <MdErrorOutline className='h-16 w-16 text-gray-400' />
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  {msg}
                </h3>
                <button
              style={{
                boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
              }}
              className="rounded-2xl text-gray-600 hover:bg-gray-600 hover:text-white border-none inline-flex font-semibold text-[16px] flex items-center justify-center
               py-1 cursor-pointer"
              onClick={onConfirm}
            >
              <span className="px-5">{btnMsg}</span>
              <FaArrowAltCircleRight className="h-[18px] w-[18px]" />
            </button>
             
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmModal;
