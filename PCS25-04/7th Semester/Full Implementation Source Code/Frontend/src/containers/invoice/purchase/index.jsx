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
const ItemRow = ({ idx, onDelete, setTotalAmount, selectedProducts, updateSelectedProducts }) => {
  const [id, setId] = useState();

  const { setValue, watch } = useFormContext();

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
    } else {
      setId("");
      setValue(`items.${idx}.productId`, "");
    }
  };

  const productId = watch(`items.${idx}.productId`) || 0;

  const quantity = watch(`items.${idx}.quantity`) || 0;
  const salePrice = watch(`items.${idx}.salePrice`) || 0;
  const tax = watch(`items.${idx}.tax`) || 0;

  React.useEffect(() => {
    const subtotal = parseFloat(quantity) * parseFloat(salePrice);
    const taxAmount = (subtotal * parseFloat(tax)) / 100;
    const totalAmount = subtotal + taxAmount;
    // Use the raw value for calculations but ensure it's not NaN
    setTotalAmount(totalAmount || 0);
  }, [quantity, salePrice, tax, setTotalAmount]);

  React.useEffect(() => {
    if (productData) {
      setValue(
        `items.${idx}.salePrice`,
        JSON.parse(productData.cost_price) ?? 0
      );
      setValue(`items.${idx}.quantity`, 1);
      setValue(`items.${idx}.tax`, JSON.parse(productData.tax) ?? 0);
    }
  }, [productData, idx, setValue]);

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
              placeholder={productData?.cost_price ?? 0}
              name={`items.${idx}.salePrice`}
            />
          </div>
        </td>
        <td>
          <div>
            <FormProviderInput placeholder={0} name={`items.${idx}.quantity`} />
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
      const costPrice = parseFloat(item?.saleprice) || 0; // Still using saleprice field from DB but it contains cost price for purchases

      const total = quantity * costPrice;
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

const Purchase = () => {
  const [finalAmount, setFinalAmount] = useState(0);
  const clients = useFetch("/client/list");
  const [id, setId] = useState(null);
  const [client, setClient] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [salePurchaseId, setSalePurchaseId] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]); // Track selected product IDs

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
          <span>Generate Purchase</span>
        </div>
        <FormProviderWrapper
          defaultValues={{
            items: [
              {
                productId: "",
                salePrice: "", // Keeping the field name for compatibility
                quantity: "",
                tax: "",
              },
            ],
            paymentMethod: "",
            discountAmount: 0,

            amountRecieved: 0,
          }}
          schemaValidation={invoiceSchema}
          onSubmit={async (data, { reset, setValue }) => {
            try {
              if (client == null) {
                setLoading(false);
                toast.error("Please add client");
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
                saleAndPurchaseType: "PURCHASE",
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
                    salePrice: "", // Keeping the field name for compatibility
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
                        "Cost Price",
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
                            salePrice: "", // Keeping the field name for compatibility
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

export default Purchase;
