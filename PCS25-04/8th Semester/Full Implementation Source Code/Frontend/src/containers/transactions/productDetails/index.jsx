import React from "react";
import styles from "./index.module.scss";
import FormProviderWrapper from "../../../components/formProviderWrapper";
import FormProviderInput from "../../../components/formInput/providerInput";
import Button from "../../../components/button";
import { useState } from "react";
import { MdEdit, MdEditOff } from "react-icons/md";
import useFetch from "../../../utils/hooks/useFetch";
import { useParams } from "react-router-dom";
import LogFormError from "../../../components/logFormError";
import { toast } from "react-toastify";
import * as yup from "yup";
import { updateData } from "../../../utils/hooks/updateData";

const ProductDetails = () => {
  const [editFields, setEditFields] = useState(true);
  const { id } = useParams();
  const { data: productData, refetch } = useFetch(`/product/${id}`);
  const [loading, setLoading] = useState(false);

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
    <>
      <div className={styles.container}>
        <div className={styles.modalHeading}>
          <h1>{editFields ? "View" : "Edit"} Product Details</h1>
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
              name: productData?.name,
              salePrice: productData?.sale_price,
              costPrice: productData?.cost_price,
              tax: productData?.tax,
              quantity: productData?.quantity,
              min_qty: productData?.min_qty,
              hsn: productData?.hsn,
            }}
            schemaValidation={schemaValidation}
            onSubmit={async (data) => {
              setLoading(true);
              try {
                const payload = {
                  id: id,
                  hsn: "hsn",
                  name: data?.name,
                  sale_price: data?.salePrice,
                  cost_price: data?.costPrice,
                  tax: data?.tax,
                  quantity: data?.quantity,
                  min_qty: Number(data?.min_qty),
                };
                const res = await updateData("/product", payload);
                if (res?.statusCode === 200) {
                  toast.success(res?.msg);
                  setEditFields((prev) => !prev);
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
                  label="Product Name"
                  placeholder="Enter Product Name"
                  className={styles.input}
                  disabled={editFields}
                />
              </div>
              <div className={styles.formInput}>
                <FormProviderInput
                  name="salePrice"
                  label="Sales Price"
                  className={styles.input}
                  placeholder={"Sales Price"}
                  disabled={editFields}
                />
                <FormProviderInput
                  name="costPrice"
                  label="Cost Price"
                  className={styles.input}
                  placeholder={"Cost Price"}
                  disabled={editFields}
                />
              </div>

              <div className={styles.formInput}>
                <FormProviderInput
                  name="tax"
                  label="Tax"
                  placeholder="Enter address"
                  className={styles.input}
                  disabled={editFields}
                />
                <FormProviderInput
                  name="quantity"
                  label="Quantity"
                  placeholder="Quantity"
                  className={styles.input}
                  disabled={editFields}
                />
              </div>
              <div className={styles.formInput}>
                <FormProviderInput
                  name="hsn"
                  label="HSN Code"
                  placeholder="Enter HSN Code"
                  className={styles.input}
                  disabled={editFields}
                />
                <FormProviderInput
                  name="min_qty"
                  label="Minium Quantity"
                  placeholder="Enter Minimum Quantity For Alert"
                  className={styles.input}
                  disabled={editFields}
                />
              </div>
              {!editFields && (
                <div className={styles.button}>
                  <Button label={"Save"} type={"submit"} isLoading={loading} />
                </div>
              )}
            </div>{" "}
          </FormProviderWrapper>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
