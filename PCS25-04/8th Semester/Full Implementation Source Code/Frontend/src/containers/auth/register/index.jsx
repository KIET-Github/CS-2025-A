import React, { useState } from "react";
import styles from "./index.module.scss";
import logo from "./../../../assets/images/logo/BillWisePro_transparent.png";
import { Link } from "react-router-dom";
import FormProviderWrapper from "../../../components/formProviderWrapper";
import FormProviderInput from "../../../components/formInput/providerInput";
import Button from "../../../components/button";
import { toast } from "react-toastify";
import { postApiCall } from "../../../utils/hooks/addData";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const schemaValidation = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    companyName: yup.string().required("Address is required"),
    gstIn: yup.string()
      .nullable()
      .transform(value => value === "" ? null : value)
      .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
        message: "Invalid GST format.",
        excludeEmptyString: true
      }),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits") // Phone number pattern
      .required("Phone number is required"),
    address: yup.string().required(),
  });

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.heading}>
        <h1>Sign Up</h1>
      </div>

      <div className={styles.innerContainer}>
        <div className={styles.loginForm}>
          <FormProviderWrapper
            schemaValidation={schemaValidation}
            onSubmit={async (data) => {
              const payload = {
                name: data?.name,
                gstIn: data?.gstIn,
                phoneNumber: data?.phoneNumber,
                companyName: data?.companyName,
                email: data?.email,
                address: data?.address,
              };
              try {
                setLoading(true);
                const res = await postApiCall("/auth/signup", payload);
                if (res.statusCode === 201) {
                  toast.success("User registered successfully");
                  setLoading(false);
                  navigate("/login");
                } else if (res.statusCode === 409) {
                  setLoading(false);
                  toast.error(res?.message || "User with this phone number is already registered");
                } else if (res.statusCode === 500) {
                  setLoading(false);
                  toast.error("Internal Server Error");
                } else {
                  setLoading(false);
                  toast.error(res?.message || res?.msg || "An error occurred");
                }
              } catch (err) {
                setLoading(false);
                toast.error(err);
              }
            }}
          >
            <div className={styles.inputBox}>
              {" "}
              <FormProviderInput
                name="name"
                className={styles.input}
                label="Name"
                placeholder="Name"
              />
            </div>

            <div className={styles.inputBox}>
              {" "}
              <FormProviderInput
                name="phoneNumber"
                className={styles.input}
                label="Phone Number"
                placeholder="Phone Number"
              />{" "}
              <FormProviderInput
                name="email"
                className={styles.input}
                label="Email"
                placeholder="Email"
              />
            </div>

            <div className={styles.inputBox}>
              {" "}
              <FormProviderInput
                name="companyName"
                className={styles.input}
                label="Company Name"
                placeholder="Company Name"
              />
              <FormProviderInput
                name="address"
                className={styles.input}
                label="Address"
                placeholder="Address"
              />
            </div>
            <div className={styles.inputBox}>
              {" "}
              <FormProviderInput
                name="gstIn"
                className={styles.input}
                label="GstIn"
                placeholder="Gst no."
              />
            </div>

            <div className={styles.button}>
              {" "}
              <Button label="Register" type={"submit"} isLoading={loading} />
            </div>
          </FormProviderWrapper>
          <p className={styles.text}>
            Have any account?
            <Link to={"/login"}>&nbsp;Signin now</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
