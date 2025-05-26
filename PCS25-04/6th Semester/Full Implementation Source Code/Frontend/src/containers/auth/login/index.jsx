import React, { useContext, useState } from "react";
import styles from "./index.module.scss";
import Button from "../../../components/button";
import Input from "../../../components/input";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { postApiCall } from "../../../utils/hooks/addData";
import logo from "../../../assets/images/logo/BillWisePro_transparent.png";
import { FcMakeDecision } from "react-icons/fc";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [generatedOtp] = useState("9999");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(false);

  const navigate = useNavigate();

  const handlePhonenNumber = (e) => {
    setPhoneNumber(e?.target?.value);
  };

  const handleOtp = (e) => {
    setEnteredOtp(e?.target?.value);
  };

  const handleVerifyOtp = async () => {
    if (phoneNumber.length !== 10) {
      toast.error("Please enter Valid number of length 10");
      return;
    }
    try {
      setLoading(true);
      const payload = { phoneNumber: phoneNumber };
      const res = await postApiCall("/auth/signin", payload);
      if (res?.statusCode === 200) {
        setLoading(false);
        setPhoneNumber("");
        localStorage.setItem("token", res?.token);
        localStorage.setItem("username", res?.name);
        setOtpGenerated(true);
      } else {
        setLoading(false);
        toast.error(res?.message || res?.msg || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    if (enteredOtp === generatedOtp) {
      setLoading(false);

      navigate("/dashboard");
    } else {
      setLoading(false);
      toast.error("Otp is Incorrect");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.heading}>
        <h1>Sign In</h1>
      </div>

      <div className={styles.innerContainer}>
        <div className={styles.loginForm}>
          {otpGenerated ? (
            <Input
              name="otp"
              label="Enter Otp"
              className={styles.input}
              type="number"
              value={enteredOtp}
              onChange={handleOtp}
            />
          ) : (
            <Input
              name="phoneNumber"
              value={phoneNumber}
              label="Enter Phone Number"
              placeholder="Phone Number"
              className={styles.input}
              type="number"
              onChange={handlePhonenNumber}
            />
          )}

          <p>
            Haven't any account?<Link to={"/register"}>&nbsp;Signup now</Link>{" "}
          </p>
          {!otpGenerated ? (
            <Button
              label="Next"
              onClick={() => handleVerifyOtp()}
              isLoading={loading}
            />
          ) : (
            <Button
              label="Login"
              onClick={() => handleSubmit()}
              isLoading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
