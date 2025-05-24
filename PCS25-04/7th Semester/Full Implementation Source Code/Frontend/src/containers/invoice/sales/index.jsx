import React, { useState } from "react";
import styles from "./index.module.scss";
import DropdownSelect from "../../../components/dropdownSelection";
import useFetch from "../../../utils/hooks/useFetch";
import FormDatePicker from "../../../components/datePicker/providerDatePicker";
import DateInput from "../../../components/datePicker";
import TableView from "../../../components/tableView";
import { get, useFormContext } from "react-hook-form";
import Input from "../../../components/input";
import FormInput from "../../../components/formInput";
import FormArrayFieldsProviderWrapper from "../../../components/fieldArrayWrapper/providerFieldArray";
import FormProviderWrapper from "../../../components/formProviderWrapper";
import FormProviderInput from "../../../components/formInput/providerInput";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import Button from "../../../components/button";
import FieldValueProvider from "../../../components/fieldValueProvider";
import FormProviderDropdown from "../../../components/dropdown/providerDropdown";
import classNames from "classnames";
import { invoiceSchema } from "../sharedSchema";
import { postApiCall } from "../../../utils/hooks/addData";
import LogFormError from "../../../components/logFormError";

import Modal from "../../../components/modal";
import { getDate } from "../../../utils/handlers/getDate";

const ItemRow2 = ({ data }) => {
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
const ItemRow = ({ idx, onDelete, setTotalAmount, selectedProducts, updateSelectedProducts, setHasErrors }) => {
  const [id, setId] = useState();
  const [availableQuantity, setAvailableQuantity] = useState(0);

  const { setValue, watch, setError, clearErrors, formState: { errors } } = useFormContext();

  const getProductList = useFetch(`/product/${id}`);
  const productData = getProductList?.data;

  const getItems = useFetch("/product/list");
  const itemList = getItems?.data;

  // Filter out already selected products
  const availableItems = itemList?.filter(item =>
    !selectedProducts.includes(item.id) || item.id === id
  );

  const handleDropdownChange = (e) => {
    // If there was a previously selected product, remove it from the selected list
    if (id) {
      updateSelectedProducts(prev => prev.filter(productId => productId !== id));
    }

    // Add the newly selected product to the list
    const selectedId = e?.target?.value;
    if (selectedId && selectedId !== "") {
      setId(selectedId);
      setValue(`items.${idx}.productId`, JSON.parse(selectedId));
      updateSelectedProducts(prev => [...prev, selectedId]);
      // Clear any previous quantity errors
      clearErrors(`items.${idx}.quantity`);
    } else {
      setId("");
      setValue(`items.${idx}.productId`, "");
      setAvailableQuantity(0);
    }
  };

  const productId = watch(`items.${idx}.productId`) || 0;

  const quantity = watch(`items.${idx}.quantity`) || 0;
  const salePrice = watch(`items.${idx}.salePrice`) || 0;
  const tax = watch(`items.${idx}.tax`) || 0;

  // Validate quantity against available stock - completely rewritten
  const validateQuantity = React.useCallback((qty) => {
    if (!productData) return true;

    // Convert both values to numbers using Number() to ensure proper comparison
    const requestedQty = Number(qty);
    const availableQty = Number(productData.quantity);

    // Only validate if we have valid numbers
    if (isNaN(requestedQty) || isNaN(availableQty)) {
      return true; // Skip validation if values aren't valid numbers
    }

    // Simple numeric comparison
    if (requestedQty > availableQty) {
      // Set the form error
      setError(`items.${idx}.quantity`, {
        type: "manual",
        message: `Maximum available quantity is ${availableQty}`
      });

      // Notify parent component about the error
      if (setHasErrors) {
        setHasErrors(true);
      }
      return false;
    } else {
      clearErrors(`items.${idx}.quantity`);

      // Notify parent component that this field is valid
      if (setHasErrors) {
        setHasErrors(false);
      }
      return true;
    }
  }, [productData, idx, setError, clearErrors, setHasErrors]);

  // Watch for quantity changes and validate
  React.useEffect(() => {
    if (productData && quantity) {
      validateQuantity(quantity);
    }
  }, [quantity, productData, validateQuantity]);

  React.useEffect(() => {
    const subtotal = parseFloat(quantity) * parseFloat(salePrice);
    const taxAmount = (subtotal * parseFloat(tax)) / 100;
    const totalAmount = subtotal + taxAmount;
    // Use the raw value for calculations but ensure it's not NaN
    setTotalAmount(totalAmount || 0);
  }, [quantity, salePrice, tax, setTotalAmount]);

  React.useEffect(() => {
    if (productData) {
      // Use Number() for consistent number conversion
      const availableQty = Number(productData.quantity) || 0;
      setAvailableQuantity(availableQty);

      setValue(
        `items.${idx}.salePrice`,
        JSON.parse(productData.sale_price) ?? 0
      );

      // Set initial quantity to 1 only if there's enough stock
      const initialQty = availableQty >= 1 ? 1 : 0;
      setValue(`items.${idx}.quantity`, initialQty);
      setValue(`items.${idx}.tax`, JSON.parse(productData.tax) ?? 0);

      // Validate initial quantity
      validateQuantity(initialQty);
    }
  }, [productData, idx, setValue, validateQuantity]);

  return (
    <>
      <tr key={1}>
        <td>{idx + 1}</td>
        <td>
          <DropdownSelect
            onChange={handleDropdownChange}
            name={`items.${idx}.productId`}
          >
            <option key={""} value="">{"Select"}</option>
            {availableItems?.map((item) => {
              return (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              );
            })}
          </DropdownSelect>
        </td>
        <td>
          <div>
            <FormProviderInput
              placeholder={productData?.sale_price ?? 0}
              name={`items.${idx}.salePrice`}
            />
          </div>
        </td>
        <td>
          <div>
            <FormProviderInput
              placeholder={0}
              name={`items.${idx}.quantity`}
            />
          </div>
        </td>
        <td>
          <div>
            <FormProviderInput
              placeholder={productData?.tax ?? 0}
              name={`items.${idx}.tax`}
              disabled={true}
            />
          </div>
        </td>
        <td>
          <div>
            <AiOutlineDelete onClick={onDelete} />
          </div>
        </td>
      </tr>
    </>
  );
};

const GenerateInvoice = ({ id, showModal, onModalClose }) => {
  const { data: invoiceData, refetch } = useFetch(`/invoice/${id}`);

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
    <div>
      {" "}
      <Modal showModal={showModal} onModalClose={onModalClose}>
        <div className={styles.container2}>
          <div className={styles.modalHeading2}>
            <h1>{invoiceData?.salePurchaseInfo?.invoicetype + " "}INVOICE</h1>
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
              <h3>Status :</h3> <span>{invoiceData?.invoiceInfo?.status}</span>{" "}
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
                <ItemRow2 data={invoiceData?.transactionItems} />
              </tbody>
            </TableView>
          </div>
          <div className={styles.summary}>
            <div className={styles.modalHeading2}>
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
                    ₹{(CalculateTotalAmount(invoiceData?.transactionItems) ?? 0).toFixed(2)}
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
      </Modal>
    </div>
  );
};

const Sale = () => {
  const [finalAmount, setFinalAmount] = useState(0);
  const clients = useFetch("/client/list");
  const products = useFetch("/product/list"); // Fetch all products
  const itemList = products?.data;

  const [id, setId] = useState(null);
  const [client, setClient] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [salePurchaseId, setSalePurchaseId] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]); // Track selected product IDs
  const [hasQuantityErrors, setHasQuantityErrors] = useState(false); // Track quantity validation errors

  const [rowTotals, setRowTotals] = useState({});

  let totalAmount = React.useMemo(() => {
    return Object.values(rowTotals).reduce((acc, curr) => acc + curr, 0);
  }, [rowTotals]);

  const updateRowTotal = (index, amount) => {
    setRowTotals((prev) => {
      if (prev[index] === amount) return prev;
      return { ...prev, [index]: amount };
    });
  };

  const getClientData = useFetch(id ? `/client/${id}` : 0);
  const clientData = getClientData?.data;

  const [shippingAddress, setShippingAddress] = useState("");

  React.useEffect(() => {
    if (clientData) {
      setShippingAddress(clientData?.address);
    }
  }, [clientData]);

  const PaymentMethod = [
    { id: "CASH", label: "CASH" },
    { id: "ONLINE", label: "ONLINE" },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span>Generate Sale</span>
        </div>
        <FormProviderWrapper
          defaultValues={{
            items: [
              {
                productId: "",
                salePrice: "",
                quantity: "",
                tax: "",
              },
            ],
            paymentMethod: "",
            discountAmount: 0,

            amountRecieved: 0,
          }}
          schemaValidation={invoiceSchema}
          onSubmit={async (data, { reset, setValue, formState, setError }) => {
            try {
              if (client == null) {
                setLoading(false);
                toast.error("Please add client");
                return;
              }

              // Check for any quantity validation errors
              if (hasQuantityErrors) {
                toast.error("Please fix quantity errors before submitting");
                return;
              }

              // Also check form validation errors
              if (formState.errors && Object.keys(formState.errors).length > 0) {
                // If there are errors in the items array
                if (formState.errors.items) {
                  toast.error("Please fix form errors before submitting");
                  return;
                }
              }

              // Perform a final validation check on all items
              let hasErrors = false;

              // Get the latest product data to ensure we have current stock levels
              const latestProductData = await fetch(`${process.env.REACT_APP_API_BASE_URL}/product/list`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
              }).then(res => res.json()).catch(() => ({ data: [] }));

              const latestProducts = latestProductData.data || [];

              data.items.forEach((item, index) => {
                // Get the product data for this item
                const productId = Number(item.productId);
                if (productId) {
                  // Find the product in the available items with the latest data
                  const product = latestProducts.find(p => Number(p.id) === productId) ||
                                 itemList?.find(p => Number(p.id) === productId);

                  if (product) {
                    // Clean approach: Convert both to numbers using Number()
                    const availableQty = Number(product.quantity);
                    const requestedQty = Number(item.quantity);

                    // Only validate if we have valid numbers
                    if (!isNaN(availableQty) && !isNaN(requestedQty)) {
                      // Simple numeric comparison
                      if (requestedQty > availableQty) {
                        hasErrors = true;
                        toast.error(`Item #${index + 1}: Quantity exceeds available stock (${availableQty})`);

                        // Set the error in the form
                        setError(`items.${index}.quantity`, {
                          type: "manual",
                          message: `Maximum available quantity is ${availableQty}`
                        });
                      }
                    }
                  }
                }
              });

              if (hasErrors) {
                setHasQuantityErrors(true);
                return;
              }

              setLoading(true);
              const items = data?.items?.map((item) => {
                const items = {
                  productId: Number(item?.productId),
                  salePrice: Number(item?.salePrice),
                  quantity: Number(item?.quantity),
                };
                return items;
              });

              // Calculate the final amount after discount
              const discountAmount = Number(data?.discountAmount) || 0;

              // Ensure discount doesn't exceed total amount
              const validDiscount = Math.min(discountAmount, totalAmount);

              // Calculate final amount
              const finalAmount = totalAmount - validDiscount;

              const payload = {
                clientId: id,
                saleAndPurchaseType: "SALE",
                paymentMethod: data?.paymentMethod,
                shippingAddress: shippingAddress,
                totalAmount: Number(finalAmount), // Use final amount after discount
                transactionItems: items,
                discountAmount: validDiscount, // Use validated discount amount
                amountReceived: Number(data?.amountRecieved) || 0,
              };

              const res = await postApiCall("/invoice", payload);

              if (res?.statusCode === 201) {
                setLoading(false);
                setClient(null);
                setId(null);
                setShowModal(true);
                totalAmount = 0;
                setSalePurchaseId(res?.salePurchaseId);
                // Clear selected products
                setSelectedProducts([]);
                reset();
                setValue("items", [
                  {
                    productId: "",
                    salePrice: "",
                    quantity: "",
                    tax: "",
                  },
                ]);
                toast.success(res?.msg);
              }
            } catch (err) {
              setLoading(false);
              toast.error(err?.message);
            }
          }}
        >
          <div className={styles.filter}>
            <DropdownSelect
              name="clientName"
              className={styles.select}
              value={JSON.stringify({ name: client, id })}
              onChange={(e) => {
                const selectedValue = JSON.parse(e.target.value);
                setClient(selectedValue.name);
                setId(selectedValue.id);
              }}
              label={"Client Name"}
            >
              <option value={""}>Select</option>
              {clients?.data?.map((client) => {
                return (
                  <>
                    <option
                      key={client?.id}
                      value={JSON.stringify({
                        name: client?.name,
                        id: client?.id,
                      })}
                    >
                      {client?.name}
                    </option>
                  </>
                );
              })}
            </DropdownSelect>
            {/* <FormProviderDropdown
          label={"Client Name"}
          name="clientId"
          options={clients?.data}
          placeholder={"Select Mode"}
          renderOptions={(val) => {
            return (
              <>
                <option
                  key={val?.id}
                  value={val?.id}

                >
                  {val?.name}
                </option>
              </>
            );
          }}
        /> */}
          </div>
          <LogFormError />
          <div className={styles.clientContainer}>
            {client && clientData && (
              <>
                <div className={styles.clientHeader}>
                  <p>Phone Number</p>
                  <FormInput
                    name="phoneNumber"
                    value={clientData?.phone_number}
                    placeholder={clientData?.phone_number}
                    disabled
                  />
                </div>
                <div className={styles.clientHeader}>
                  <p>Billing Address</p>
                  <FormInput
                    name="billing address"
                    placeholder={clientData?.address}
                    disabled
                  />
                </div>
                <div className={styles.clientHeader}>
                  <p>Shipping Address</p>
                  <FormInput
                    name="shipping address"
                    placeholder={clientData?.address}
                    onChange={(e) => setShippingAddress(e?.target?.value)}
                  />
                </div>
              </>
            )}
          </div>
          <div>
            <FormArrayFieldsProviderWrapper
              name="items"
              className={styles.itemList}
              renderFields={({ fields, append, remove }) => {
                if (fields.length === 0) {
                  append({
                    productId: "",
                    costPrice: "",
                    salePrice: "",
                    quantity: "",
                    tax: "",
                  });
                }

                return (
                  <div>
                    <TableView
                      headingItems={[
                        "S.No",
                        "Item Name",
                        "Sale Price",
                        "Quantity",
                        "Tax",
                        "",
                      ]}
                      disablePagination
                    >
                      <tbody>
                        {fields?.map((field, idx) => {
                          return (
                            <ItemRow
                              idx={idx}
                              key={field?.id}
                              onDelete={() => {
                                if (fields.length === 1) {
                                  return toast.error("Unable to Delete");
                                }
                                // Get the product ID before removing the row
                                const productId = fields[idx]?.productId;
                                if (productId) {
                                  // Remove the product ID from the selected products list
                                  setSelectedProducts(prev =>
                                    prev.filter(id => id !== productId)
                                  );
                                }
                                remove(idx);
                                updateRowTotal(idx, 0);
                              }}
                              selectedProducts={selectedProducts}
                              updateSelectedProducts={setSelectedProducts}
                              setTotalAmount={(amount) =>
                                updateRowTotal(idx, amount)
                              }
                              setHasErrors={setHasQuantityErrors}
                            />
                          );
                        })}
                      </tbody>
                    </TableView>
                    <div className={styles.newButtonBox}>
                      <span
                        onClick={() => {
                          append({
                            productId: "",
                            salePrice: "",
                            quantity: "",
                            tax: "",
                          });
                        }}
                        className={styles.addNew}
                      >
                        + Add New
                      </span>
                    </div>
                  </div>
                );
              }}
            />
            <div className={styles.paymentMethod}>
              <FormProviderDropdown
                label={"Payment Mode"}
                name="paymentMethod"
                options={PaymentMethod}
                placeholder={"Select Mode"}
                renderOptions={(val) => {
                  return (
                    <>
                      <option key={val?.id} value={val?.id}>
                        {val?.label}
                      </option>
                    </>
                  );
                }}
              />
            </div>
            <div className={styles.amountContainer}>
              <div className={styles.innerContainer}>
                <FormProviderInput
                  name="totalAmount"
                  label="Total Amount"
                  placeholder={totalAmount ? totalAmount.toFixed(2) : "Enter amount"}
                  disabled
                  className={styles.bottomInput}
                />
                <FormProviderInput
                  name="discountAmount"
                  label="Discount"
                  placeholder="0"
                  type="number"
                  min="0"
                  className={styles.bottomInput}
                  onChange={(e) => {
                    // Ensure non-negative values
                    if (e.target.value < 0) {
                      e.target.value = 0;
                    }
                  }}
                />
                <FieldValueProvider
                  name="discountAmount"
                  renderChild={(value) => {
                    if (totalAmount) {
                      // Convert value to number and ensure it's not NaN
                      const discountValue = Number(value) || 0;

                      // Ensure discount doesn't exceed total amount
                      const validDiscount = Math.min(discountValue, totalAmount);

                      // Calculate final amount
                      const finalAmount2 = totalAmount - validDiscount;
                      setFinalAmount(finalAmount2);
                    }

                    return (
                      <FormProviderInput
                        name="finalAmount"
                        label="Final Amount"
                        placeholder={finalAmount >= 0 ? finalAmount.toFixed(2) : 0}
                        disabled
                        className={styles.bottomInput}
                      />
                    );
                  }}
                />
              </div>
              <div className={styles.innerContainer}>
                <FormProviderInput
                  name="amountRecieved"
                  label="Amount Received"
                  placeholder="Enter Amount to be Paid"
                  type="number"
                  min="0"
                  className={styles.bottomInput}
                  onChange={(e) => {
                    // Ensure non-negative values
                    if (e.target.value < 0) {
                      e.target.value = 0;
                    }
                  }}
                />
                <FieldValueProvider
                  name="amountRecieved"
                  renderChild={(value) => {
                    // Convert value to number and ensure it's not NaN
                    const amountReceived = Number(value) || 0;

                    // Calculate amount due
                    const amountDue = Math.max(0, finalAmount - amountReceived);

                    return (
                      <FormProviderInput
                        name="amountDue"
                        label="Amount Pending"
                        placeholder={amountDue.toFixed(2)}
                        className={classNames(
                          styles.bottomInput,
                          styles.amountDue
                        )}
                        disabled
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className={styles.button}>
              <Button
                type={"submit"}
                className={styles.save}
                label="Save"
                isLoading={loading}
              />
            </div>
          </div>
          <div>
            {showModal && (
              <GenerateInvoice
                id={salePurchaseId}
                showModal={showModal}
                onModalClose={() => {
                  setShowModal(false);
                  window.location.reload();
                }}
              />
            )}
          </div>
        </FormProviderWrapper>
      </div>
    </>
  );
};

export default Sale;
