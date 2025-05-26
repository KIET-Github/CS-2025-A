import React from "react";
import styles from "./index.module.scss";
import FormProviderWrapper from "../../../components/formProviderWrapper";
import FormProviderInput from "../../../components/formInput/providerInput";
import Button from "../../../components/button";
import { useState } from "react";
import { MdEdit, MdEditOff } from "react-icons/md";
import useFetch from "../../../utils/hooks/useFetch";
import { useParams } from "react-router-dom";
import TableView from "../../../components/tableView";
import Modal from "../../../components/modal";
import { getDate } from "../../../utils/handlers/getDate";
import LogFormError from "../../../components/logFormError";
import { toast } from "react-toastify";
import * as yup from "yup";
import { updateData } from "../../../utils/hooks/updateData";
import Input from "../../../components/input";
import { putCall } from "../../../utils/hooks/putData";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmModal from "../../../components/confirmationModal";
import { deleteData } from "../../../utils/hooks/delete";

const ItemRow = ({ data }) => {
  return (
    <>
      {data?.map((item) => {
        const quantity = parseFloat(item?.quantity) || 0;
        const salePrice = parseFloat(item?.saleprice) || 0;

        const total = quantity * salePrice;
        const totalTax = (total * parseFloat(item?.taxpercentage || 0)) / 100;
        const totalAmount = total + totalTax;

        return (
          <tr key={item?.productname}>
            <td>1</td>
            <td>{item?.productname}</td>
            <td>{quantity}</td>
            <td>₹{salePrice.toFixed(2) ?? "N/A"}</td>
            <td>{item?.taxpercentage}</td>
            <td>₹{totalAmount.toFixed(2)}</td>
          </tr>
        );
      })}
    </>
  );
};

const ClientDetailRow = ({ data, refetchData, refetchClient }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [id, setId] = useState();
  const [confirmationModal, setConfirmationModal] = useState(false);

  const { data: invoiceData, refetch } = useFetch(`/invoice/${id}`);

  const [isLoading, setIsLoading] = useState(false);

  const remainingAmount =
    invoiceData?.transactionInfo?.totalamount -
    invoiceData?.transactionInfo?.amountreceived;

  const [payAmount, setPayAmount] = useState();

  function CalculateTotalAmount(data) {
    return data?.reduce((acc, item) => {
      const quantity = parseFloat(item?.quantity) || 0;
      const salePrice = parseFloat(item?.saleprice) || 0;

      const total = quantity * salePrice;
      const totalTax = (total * parseFloat(item?.taxpercentage || 0)) / 100;
      const totalAmount = total + totalTax;

      return acc + totalAmount;
    }, 0);
  }

  return (
    <>
      <Modal
        showModal={showModal}
        onModalClose={() => setShowModal((prev) => !prev)}
      >
        <>
          <Modal
            showModal={showPayModal}
            onModalClose={() => {
              setShowModal((prev) => !prev);
              setShowPayModal((prev) => !prev);
            }}
          >
            <div
              className={styles.container}
              onModalClose={() => setShowModal((prev) => !prev)}
            >
              <div className={styles.modalHeading}>
                <h1>Pay Remaining Amount</h1>
              </div>

              <div className={styles.body}>
                <Input
                  name="payAmount"
                  label="Pay Amount"
                  className={styles.input}
                  onChange={(e) => setPayAmount(Number(e?.target?.value))}
                  type="number"
                  value={payAmount ?? remainingAmount}
                />
                <Button
                  label={"Pay"}
                  type={"submit"}
                  className={styles.payButton}
                  onClick={async () => {
                    try {
                      const payload = {
                        salePurchaseId: id,
                        amountPaid: payAmount ?? remainingAmount,
                      };
                      const res = await putCall(
                        "/invoice/pay-remaining-amount",
                        payload
                      );
                      if (res?.statusCode === 200) {
                        toast.success(res?.msg);
                        refetch();
                        refetchData();
                        refetchClient();
                        setShowPayModal((prev) => !prev);
                      } else {
                        toast.error("Something went wrong");
                      }
                    } catch (err) {
                      toast.error("Something went wrong");
                    }
                  }}
                />
              </div>
            </div>
          </Modal>
          <ConfirmModal
            showModal={confirmationModal}
            label={"You want to delete this invoice?"}
            onClose={() => setConfirmationModal((prev) => !prev)}
            onConfirm={async () => {
              try {
                setIsLoading(true);
                const res = await deleteData(`/invoice/${id}`);
                if (res?.statusCode === 200) {
                  setShowModal(false);
                  refetchData();
                  setIsLoading(false);
                  toast.success("Invoice Deleted!");
                } else {
                  toast.error("Something went wrong");
                }
                setConfirmationModal((prev) => !prev);
              } catch (err) {
                toast?.error(err?.message);
              }
            }}
            isLoading={isLoading}
          >
            {" "}
            <div className={styles.container}>
              <div className={styles.confirmationHeading}>
                {" "}
                <h1>Are you sure to delete this invoice?</h1>
              </div>

              <div className={styles.body}>
                <Button label={"Cancel"} />
              </div>
            </div>
          </ConfirmModal>
          <div className={styles.container}>
            <div className={styles.modalHeading}>
              <h1>{invoiceData?.salePurchaseInfo?.invoicetype + " "}INVOICE</h1>

              <div className={styles.rightHeading}>
                {invoiceData?.invoiceInfo?.status === "UNPAID" ? (
                  <Button
                    label="Pay Remaining Balance"
                    onClick={() => setShowPayModal((prev) => !prev)}
                  />
                ) : null}
                <AiOutlineDelete
                  className={styles.delete}
                  onClick={() => setConfirmationModal((prev) => !prev)}
                />
              </div>
            </div>
            <div className={styles.header}>
              <div className={styles.content}>
                <h3>Invoice No :</h3>{" "}
                <span>{invoiceData?.invoiceInfo?.invoicenumber}</span>{" "}
              </div>
              <div className={styles.content}>
                <h3>Issue Date :</h3>{" "}
                <span>{getDate(invoiceData?.invoiceInfo?.issuedate)}</span>{" "}
              </div>
              <div className={styles.content}>
                <h3>Due Date :</h3>{" "}
                <span>{getDate(invoiceData?.invoiceInfo?.duedate)}</span>{" "}
              </div>
              <div className={styles.content}>
                <h3>Status :</h3>{" "}
                <span>{invoiceData?.invoiceInfo?.status}</span>{" "}
              </div>
            </div>
            <div>
              <div className={styles.billing}>
                <h3>Billed To:</h3>
                <p>{invoiceData?.salePurchaseInfo?.clientname}</p>
                <p>{invoiceData?.salePurchaseInfo?.phonenumber}</p>
                <p>{invoiceData?.salePurchaseInfo?.billingaddress}</p>
              </div>

              <TableView
                disablePagination
                headingItems={[
                  "S.no",
                  "Item",
                  "Quantity",
                  "Unit Price",
                  "Tax (%)",
                  "Total (₹)",
                ]}
                alignTop
                noHoverChange
                className={styles.table}
              >
                <tbody>
                  <ItemRow data={invoiceData?.transactionItems} />
                </tbody>
              </TableView>
            </div>
            <div className={styles.summary}>
              <div className={styles.modalHeading}>
                <h1>Summary</h1>
              </div>
              <TableView
                disablePagination
                headingItems={["Description", "Amount (₹)"]}
                alignTop
                noHoverChange
                className={styles.summaryTable}
              >
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>
                      ₹
                      {(CalculateTotalAmount(invoiceData?.transactionItems) ?? 0).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>
                      - ₹{(invoiceData?.transactionInfo?.discountamount ?? 0).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Amount</td>
                    <td>₹{(CalculateTotalAmount(invoiceData?.transactionItems) - (invoiceData?.transactionInfo?.discountamount || 0)).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Amount Received</td>
                    <td>₹{(invoiceData?.transactionInfo?.amountreceived ?? 0).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Payment Method</td>
                    <td>{invoiceData?.transactionInfo?.paymentmethod}</td>
                  </tr>
                </tbody>
              </TableView>
              <div className={styles.shipping}>
                <h3>Shipped:</h3>
                <p>
                  {invoiceData?.salePurchaseInfo?.shippingaddress ??
                    "Not Available"}
                </p>
              </div>
            </div>
          </div>
        </>
      </Modal>

      {data?.map((item, index) => {
        return (
          <>
            <tr>
              {" "}
              <td>{index + 1}</td>
              <td>₹{item?.total_amount}</td>
              <td>₹{item?.discount_amount ?? "N/A"}</td>
              <td>₹{item?.amount_received}</td>
              <td>
                <Button
                  label={"Generate Invoice"}
                  onClick={() => {
                    setId(item?.sale_and_purchase_id);
                    setShowModal((prev) => !prev);
                  }}
                />
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
};

const ClientDetails = () => {
  const [editFields, setEditFields] = useState(true);
  const { id } = useParams();
  const { data: clientData, refetch } = useFetch(`/client/${id}`);
  const { data, refetch: refetchData } = useFetch(`/transactions/${id}`);
  const [loading, setLoading] = useState(false);

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
    noticePeriod: yup.number().nullable(),
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modalHeading}>
          <h1>{editFields ? "View" : "Edit"} Client Details</h1>
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
              name: clientData?.name,
              email: clientData?.email,
              phoneNumber: clientData?.phone_number,
              toGet: clientData?.to_get,
              toPay: clientData?.to_pay,
              gstIn: clientData?.gstin,
              noticePeriod: clientData?.notice_period ?? 0,
              address: clientData?.address,
            }}
            schemaValidation={schemaValidation}
            onSubmit={async (data) => {
              setLoading(true);
              try {
                const payload = {
                  id: id,
                  name: data?.name,
                  email: data?.email,
                  phoneNumber: data?.phoneNumber,
                  toGet: data?.toGet,
                  toPay: data?.toPay,
                  gstIn: data?.gstIn,
                  noticePeriod: data?.noticePeriod ?? 0,
                  address: data?.address,
                };
                const res = await updateData("/client", payload);
                if (res?.statusCode === 200) {
                  setEditFields((prev) => !prev);
                  toast.success(res?.message);
                  refetch();
                } else {
                  toast.error("Something went wrong");
                }
                setLoading(false);
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
                  label="Client Name"
                  placeholder="Enter Client Name"
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
                  name="toGet"
                  label="To Get"
                  className={styles.input}
                  placeholder={"To Get"}
                  disabled={editFields}
                />
                <FormProviderInput
                  name="toPay"
                  label="To Pay"
                  className={styles.input}
                  placeholder={"To Pay"}
                  disabled={editFields}
                />
                <FormProviderInput
                  name="gstIn"
                  label="Gst No"
                  placeholder="Enter GstIn"
                  className={styles.input}
                  disabled={editFields}
                />

                <FormProviderInput
                  name="noticePeriod"
                  label="Notice Period"
                  placeholder="Enter Notice Period"
                  className={styles.input}
                  disabled={editFields}
                  type="number"
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
      <div className={styles.container}>
        {" "}
        <div className={styles.modalHeading}>
          <h1>Transactions Details</h1>
        </div>
        <div>
          <TableView
            headingItems={[
              "S.No",
              "Total Amount(₹)",
              "discount_amount(₹)",
              "amount_received(₹)",
              "action",
            ]}
            alignTop
            noHoverChange
            disablePagination
          >
            <tbody>
              <ClientDetailRow
                data={data}
                refetchData={refetchData}
                refetchClient={refetch}
              />
            </tbody>
          </TableView>
        </div>
      </div>
    </>
  );
};

export default ClientDetails;
