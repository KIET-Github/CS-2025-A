import React from "react";
import styles from "./index.module.scss";
import FormProviderWrapper from "../../components/formProviderWrapper";
import FormProviderInput from "../../components/formInput/providerInput";
import Button from "../../components/button";
import { useState } from "react";
import { MdEdit, MdEditOff } from "react-icons/md";
import useFetch from "../../utils/hooks/useFetch";
import { useParams } from "react-router-dom";
import LogFormError from "../../components/logFormError";
import { toast } from "react-toastify";
import * as yup from "yup";
import { updateData } from "../../utils/hooks/updateData";

const UserProfile = () => {
  const [editFields, setEditFields] = useState(true);
  const { id } = useParams();
  const { data: userData, refetch } = useFetch(`/user/info`);
  const schemaValidation = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    address: yup.string().required("Address is required"),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    gstIn: yup.string()
      .nullable()
      .transform(value => value === "" ? null : value)
      .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
        message: "Invalid GST format. Example: 29ABCDE1234F1Z5",
        excludeEmptyString: true
      }),
    companyName: yup.string().required("Company Name is required"),
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modalHeading}>
          <h1>{editFields ? "" : "Edit"} User Profile</h1>
          <span>
            {editFields ? (
              <MdEdit onClick={() => setEditFields((prev) => !prev)} />
            ) : (
              <MdEditOff onClick={() => setEditFields((prev) => !prev)} />
            )}
          </span>
        </div>
        <div>
          {" "}
          <FormProviderWrapper
            values={{
              name: userData?.name,
              email: userData?.email,
              phoneNumber: userData?.phone_number,
              gstIn: userData?.gstin,
              address: userData?.address,
              companyName: userData?.company_name,
            }}
            schemaValidation={schemaValidation}
            onSubmit={async (data) => {
              try {
                const payload = {
                  id: id,
                  name: data?.name,
                  email: data?.email,
                  phoneNumber: data?.phoneNumber,
                  gstIn: data?.gstIn,
                  companyName: data?.companyName,
                  address: data?.address,
                };
                const res = await updateData("/user/update", payload);

                setEditFields((prev) => !prev);
                toast.success(res?.message);
                refetch();
              } catch (err) {
                toast.error(err?.data);
              }
            }}
          >
            <div className={styles.form}>
              <div className={styles.formInput}>
                <LogFormError />
                <FormProviderInput
                  name="name"
                  label="User Name"
                  placeholder="Enter Your FullName"
                  className={styles.input}
                  disabled={editFields}
                />
                <FormProviderInput
                  name="email"
                  label="Email"
                  className={styles.input}
                  placeholder={"Enter your email"}
                  disabled={editFields}
                />
                <FormProviderInput
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Enter Phone No"
                  className={styles.input}
                  disabled={editFields}
                />
              </div>
              <div className={styles.formInput}>
                <FormProviderInput
                  name="gstIn"
                  label="Gst No"
                  placeholder="Enter GstIn"
                  className={styles.input}
                  disabled={editFields}
                />

                <FormProviderInput
                  name="companyName"
                  label="Company Name"
                  placeholder="Enter Company Name"
                  className={styles.input}
                  disabled={editFields}
                />
              </div>
              <div className={styles.formInput}></div>
              <div className={styles.formInput}>
                <FormProviderInput
                  name="address"
                  label="Address"
                  placeholder="Enter address"
                  className={styles.input}
                  disabled={editFields}
                />
              </div>
              {!editFields && (
                <div className={styles.button}>
                  <Button label={"Save"} type={"submit"} />
                </div>
              )}
            </div>{" "}
          </FormProviderWrapper>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
