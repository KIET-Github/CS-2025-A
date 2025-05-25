import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import TableView from "../../components/tableView";
import Button from "../../components/button";
import useFetch from "../../utils/hooks/useFetch";
import Modal from "../../components/modal";
import FormProviderWrapper from "../../components/formProviderWrapper";
import FormProviderInput from "../../components/formInput/providerInput";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postApiCall } from "../../utils/hooks/addData";
import LogFormError from "../../components/logFormError";
import { MdDelete } from "react-icons/md";
import { deleteData } from "../../utils/hooks/delete";
import Loader from "../../components/loader";

const ClientRow = ({ data, refetch, loading }) => {
  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {data?.length > 0 ? (
            data?.map((item, idx) => {
              return (
                <>
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.phone_number}</td>
                    <td>₹{item?.to_get?.toFixed(2)}</td>
                    <td>₹{item?.to_pay?.toFixed(2)}</td>
                    <td>
                      <Button
                        label={"View More"}
                        onClick={() => {
                          navigate(`/clientDetails/${item?.id}`);
                        }}
                      />
                    </td>
                    <td>
                      <MdDelete
                        className={styles.delete}
                        onClick={async () => {
                          try {
                            const res = await deleteData(`/client/${item?.id}`);
                            toast.success("Data Deleted Successfully!");

                            refetch();
                          } catch (err) {
                            toast.error(err?.data);
                          }
                        }}
                      />
                    </td>
                  </tr>
                </>
              );
            })
          ) : (
            <tr>
              {" "}
              <td className={styles.noDataDisplay} colSpan="6">
                <p colSpan="6">No Records to display!</p>
              </td>
            </tr>
          )}
        </>
      )}
    </>
  );
};

const Client = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data, refetch, loading } = useFetch(`/client`, "GET");

  // Sort client data by name in ascending order
  const sortedData = data ? [...data].sort((a, b) => {
    if (a.name && b.name) {
      return a.name.localeCompare(b.name);
    }
    return 0;
  }) : data;

  const totalLength = data?.length;

  const schemaValidation = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    address: yup.string().required("Address is required"),
    toGet: yup
      .number()
      .typeError("Must be a number")
      .required("To Get is required"),
    toPay: yup
      .number()
      .typeError("Must be a number")
      .required("To Pay is required"),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits") // Phone number pattern
      .required("Phone number is required"),
    gstIn: yup.string()
      .nullable()
      .transform(value => value === "" ? null : value)
      .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
        message: "Invalid GST format. Example: 29ABCDE1234F1Z5",
        excludeEmptyString: true
      }),
    noticePeriod: yup
      .number("Notice Period is must be a number")
      .required("Notice Period is required"),
  });

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal}
        onModalClose={() => setShowModal((prev) => !prev)}
      >
        <div className={styles.modalHeading}>
          <h1>Add New Client</h1>
        </div>
        <FormProviderWrapper
          defaultValue={{
            name: data?.name ?? "",
            email: "",
            address: "",
            gstIn: "",
            toGet: "",
            toPay: "",
            phoneNumber: "",
            noticePeriod: "",
          }}
          schemaValidation={schemaValidation}
          onSubmit={async (data) => {
            setIsLoading(true);
            try {
              const payload = {
                name: data?.name ?? "",
                email: data?.email ?? "",
                address: data?.address,
                gstIn: data?.gstIn,
                toGet: data?.toGet,
                toPay: data?.toPay,
                phoneNumber: data?.phoneNumber,
                noticePeriod: data?.noticePeriod,
              };
              const res = await postApiCall("/client", payload);
              refetch();
              toast.success(res?.message);
              setShowModal(false);
            } catch (err) {
              toast.log(err?.message);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <div className={styles.form}>
            <div className={styles.formInput}>
              <LogFormError />
              <FormProviderInput
                name="name"
                label="Client Name"
                placeholder="Enter Client Name"
                className={styles.input}
              />
              <FormProviderInput
                name="email"
                label="Email"
                className={styles.input}
                placeholder={"Enter your email"}
              />
            </div>
            <div className={styles.formInput}>
              <FormProviderInput
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter Phone No"
                className={styles.input}
              />
              <FormProviderInput
                name="toGet"
                label="To Get"
                className={styles.input}
                placeholder={"To Get"}
              />
              <FormProviderInput
                name="toPay"
                label="To Pay"
                className={styles.input}
                placeholder={"To Pay"}
              />
            </div>
            <div className={styles.formInput}>
              <FormProviderInput
                name="gstIn"
                label="Gst No"
                placeholder="Enter GstIn"
                className={styles.input}
              />
              <FormProviderInput
                name="noticePeriod"
                label="Notice Period"
                placeholder="Enter Notice Period"
                className={styles.input}
                type="number"
              />
            </div>
            <div className={styles.formInput}>
              <FormProviderInput
                name="address"
                label="Address"
                placeholder="Enter address"
                className={styles.input}
              />
            </div>
            <div className={styles.button}>
              <Button label={"Create"} type={"submit"} isLoading={isLoading} />
            </div>
          </div>{" "}
        </FormProviderWrapper>
      </Modal>
      <div className={styles.heading}>
        <span>Clients</span>{" "}
        <Button
          label={"Create"}
          onClick={() => {
            setShowModal((prev) => !prev);
          }}
        />
      </div>
      <div className={styles.content}>
        <TableView
          headingItems={[
            "S.No",
            "Client Name",
            "Phone Number",
            "Collect(₹)",
            "Pay(₹)",
            "Action",
            "",
          ]}
          alignTop
          noHoverChange
          disablePagination
        >
          <tbody>
            <ClientRow data={sortedData} refetch={refetch} loading={loading} />
          </tbody>
        </TableView>
      </div>
    </div>
  );
};

export default Client;
