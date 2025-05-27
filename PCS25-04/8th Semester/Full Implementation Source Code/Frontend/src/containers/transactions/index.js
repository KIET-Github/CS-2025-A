import React, { useState } from "react";
import styles from "./index.module.scss";
import TableView from "../../components/tableView";
import Button from "../../components/button";
import useFetch from "../../utils/hooks/useFetch";
import Modal from "../../components/modal";
import FormProviderWrapper from "../../components/formProviderWrapper";
import FormProviderInput from "../../components/formInput/providerInput";
import * as yup from "yup";
import { MdDelete, MdEdit, MdEditOff } from "react-icons/md";
import { postApiCall } from "../../utils/hooks/addData";
import { toast } from "react-toastify";
import Loader from "../../components/loader";
import { deleteData } from "../../utils/hooks/delete";
import { useNavigate } from "react-router-dom";

const TransactionRow = ({ data, refetch, loading }) => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [editFields, setEditFields] = useState(true);

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loader />
      ) : data?.length > 0 ? (
        data.map((item, idx) => (
          <tr key={item?.id}>
            <td>{idx + 1}</td>
            <td>{item?.name}</td>
            <td>{item?.sale_price ?? "N/A"}</td>
            <td>{item?.cost_price}</td>
            <td>{item?.quantity}</td>
            <td>
              <Button
                label="View More"
                onClick={(e) => {
                  navigate(`/product/${item?.id}`);
                }}
              />
            </td>
            <td>
              <MdDelete
                className={styles.delete}
                onClick={async (e) => {
                  try {
                    const res = await deleteData(`/product/${item?.id}`);
                    if (res?.statusCode === 200) {
                      toast.success("Data Deleted Successfully!");
                      refetch();
                    } else {
                      toast.error("Something went wrong");
                    }
                  } catch (err) {
                    toast.error(err?.data || "Failed to delete data");
                  }
                }}
              />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          {" "}
          <td className={styles.noDataDisplay} colSpan="6">
            <p colSpan="6">No Records to display!</p>
          </td>
        </tr>
      )}
    </>
  );
};

const Transactions = () => {
  const { data, refetch, loading } = useFetch("/product", "GET");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sort product data by name in ascending order
  const sortedData = data ? [...data].sort((a, b) => {
    if (a.name && b.name) {
      return a.name.localeCompare(b.name);
    }
    return 0;
  }) : data;

  const schemaValidation = yup.object().shape({
    name: yup.string().required("Name is required"),
    costPrice: yup
      .number()
      .required("Cost Price is required")
      .typeError("Cost Price is required"),
    salePrice: yup
      .number()
      .required("Sales Price is required")
      .typeError("Sales Price is required"),
    tax: yup.number().required("Tax is required").typeError("Tax is required"),
    quantity: yup
      .number()
      .required("Quantity is required")
      .typeError("Quantity is required"),
  });

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal}
        onModalClose={() => setShowModal((prev) => !prev)}
      >
        <div className={styles.modalHeading}>
          <h1>Add New Product</h1>
        </div>
        <FormProviderWrapper
          defaultValue={{
            name: "",
            hsn: "",
            sale_price: "",
            cost_price: "",
            tax: "",
            quantity: "",
            min_qty: "",
          }}
          schemaValidation={schemaValidation}
          onSubmit={async (data, { reset }) => {
            try {
              setIsLoading(true);
              const payload = {
                hsn: data?.hsn,
                name: data?.name,
                sale_price: data?.salePrice,
                cost_price: data?.costPrice,
                tax: data?.tax,
                quantity: data?.quantity,
                min_qty: Number(data?.min_qty),
              };
              const res = await postApiCall("/product", payload);
              if (res?.statusCode === 200 || res?.statusCode === 201) {
                toast.success(res?.msg);
                setShowModal((prev) => !prev);
                refetch();
                reset();
              } else {
                toast.error("Something went wrong");
              }
              setIsLoading(false);
            } catch (err) {
              toast.error("Something went wrong");
            } finally {
              setIsLoading(false);
              reset();
            }
          }}
        >
          <div className={styles.form}>
            <div className={styles.formInput}>
              <FormProviderInput
                name="name"
                label="Product Name"
                placeholder="Enter Product Name"
                className={styles.input}
              />
            </div>
            <div className={styles.formInput}>
              <FormProviderInput
                name="salePrice"
                label="Sales Price"
                className={styles.input}
                placeholder={"Sales Price"}
              />
              <FormProviderInput
                name="costPrice"
                label="Cost Price"
                className={styles.input}
                placeholder={"Cost Price"}
              />
            </div>
            <div className={styles.formInput}>
              <FormProviderInput
                name="tax"
                label="Tax"
                placeholder="Tax"
                className={styles.input}
              />
              <FormProviderInput
                name="quantity"
                label="Product Quantity"
                placeholder="Enter Quantity"
                className={styles.input}
              />
            </div>
            <div className={styles.formInput}>
              <FormProviderInput
                name="hsn"
                label="HSN Code"
                placeholder="Enter HSN Code"
                className={styles.input}
              />
              <FormProviderInput
                name="min_qty"
                label="Minium Quantity"
                placeholder="Enter Minimum Quantity For Alert"
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
        <span>Inventory</span>{" "}
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
            "Product Name",
            "Sale Price",
            "Cost Price",
            "Quantity",
            "Action",
            "",
          ]}
          alignTop
          noHoverChange
          disablePagination
        >
          <tbody>
            <TransactionRow data={sortedData} refetch={refetch} loading={loading} />
          </tbody>
        </TableView>
      </div>
    </div>
  );
};

export default Transactions;
