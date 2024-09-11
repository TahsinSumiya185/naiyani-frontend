/* eslint-disable react/no-unescaped-entities */
import { Input, message as antdMessage } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Footer from "../../layouts/Footer";
import Navbar1 from "../../components/navbar/Navbar1";
import { useState } from "react";
import "./ContactUs.css";
import { usePostContactMutation } from "../../redux/api/contact/ContactApi";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [textFocus, setTextFocus] = useState(false);

  const [postContact, { isLoading }] = usePostContactMutation(); // Use the mutation

  const handleInputChange = (type, event) => {
    const inputValue = event.target.value;

    if (type === "email") {
      event.target.style.fontSize =
        inputValue.length > 40
          ? "12px"
          : inputValue.length > 27
          ? "15px"
          : "20px";
    } else if (type === "firstName" || type === "lastName") {
      event.target.style.fontSize =
        inputValue.length > 18
          ? "12px"
          : inputValue.length > 11
          ? "15px"
          : "20px";
    } else if (type === "message") {
      event.target.style.fontSize =
        inputValue.length > 180 ? "15px" : "20px";
    }

    if (type === "firstName") {
      setFirstName(inputValue);
    } else if (type === "lastName") {
      setLastName(inputValue);
    } else if (type === "email") {
      setEmail(inputValue);
    } else if (type === "message") {
      setMessage(inputValue);
    }
  };

  const handleSubmit = async () => {
    try {
      await postContact({
        first_name: firstName,
        last_name: lastName,
        email,
        message,
      }).unwrap();
      antdMessage.success("Message sent successfully!");
      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error details:", error);
      antdMessage.error("An error occurred while sending the message.");
    }
  };

  return (
    <div className="lg:px-32 px-8 font-sans">
      <Navbar1 />
      <div className="flex lg:flex-row flex-col items-center gap-12 mb-12">
        {/* left */}
        <div className="flex flex-col text-center gap-12 text-[#A1A1A1] headerFont gradient-text lg:text-[30px] text-xl ">
          <div>
            Hello there<span className="font-serif font-bold">,</span>
          </div>
          <div className="lg:leading-[4rem] leading-9">
            Seems like you have something to ask us
          </div>
          <div className="text-[20px] font-sans"> Tell us how can we help</div>
        </div>
        {/* right */}
        <div className="flex flex-col items-center gap-5 ">
          <div
            style={{
              boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
            }}
            className="lg:w-[400px] lg:text-[18px] headerFont text-[#A1A1A1] px-8 text-[12px] rounded-[50px] bg-white border-none font-bold py-3 text-center lg:mb-4"
          >
            Let's get in touch
          </div>

          <div className="flex items-center justify-center gap-5">
            <div className="gradient-button lg:w-[230px] w-[170px] bg-white">
              <Input
                type="text"
                autoComplete="true"
                className="w-full h-full expanding-input"
                onChange={(e) => handleInputChange("firstName", e)}
                placeholder="First Name"
                required
                value={firstName}
              />
            </div>
            <div className="gradient-button bg-white lg:w-[230px] w-[170px]">
              <Input
                type="text"
                autoComplete="true"
                className="w-full h-full expanding-input"
                onChange={(e) => handleInputChange("lastName", e)}
                placeholder="Last Name"
                required
                value={lastName}
              />
            </div>
          </div>
          <div className="gradient-button lg:w-[480px] w-[360px] bg-white">
            <Input
              type="email"
              autoComplete="true"
              className="w-full h-full expanding-input"
              onChange={(e) => handleInputChange("email", e)}
              placeholder="Email"
              required
              value={email}
            />
          </div>
          <div className="relative lg:w-[480px] w-[360px] bg-white">
            <TextArea
              onFocus={() => setTextFocus(true)}
              onBlur={() => setTextFocus(false)}
              style={{
                boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
                padding: "10px",
                resize: "vertical",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              rows={6}
              type="text"
              autoComplete="true"
              className="rounded-[30px] border-none text-[20px] font-bold px-4 text-center outline-none"
              onChange={(e) => handleInputChange("message", e)}
              required
              value={message}
            />

            <div
              className={`tracking-wide font-sans font-bold ${
                textFocus || message.length > 0 ? "text-transparent" : ""
              }`}
              style={{
                position: "absolute",
                top: "50%",
                left: "42%",
                transform: "translateY(-50%)",
                color: "#a1a1a1",
              }}
            >
              Message
            </div>
          </div>

          <div>
            <button
              style={{
                boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
              }}
              className="rounded-2xl text-gray-600 hover:bg-gray-600 hover:text-white border-none font-semibold text-[16px] flex items-center justify-between py-1 cursor-pointer"
              onClick={handleSubmit}
            >
              <span className="px-5">SUBMIT</span>
              <FaArrowAltCircleRight className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
