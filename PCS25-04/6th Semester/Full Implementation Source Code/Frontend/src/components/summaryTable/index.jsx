import React from "react";
import styles from "./index.module.scss";
import TableView from "../tableView";
import { getDate } from "../../utils/handlers/getDate";

const SummaryRow = (data) => {
  const summaryData = data?.data?.data;
  return (
    <>
      {summaryData?.map((item) => {
        const amount = item?.total_amount - item?.amount_received;
        return (
          <>
            <tr>
              {" "}
              <td>{item?.client_name}</td>
              <td>{item?.phone_number}</td>
              <div className={styles.dueDate}>
                <td>{getDate(item?.due_date)}</td>
              </div>
              <td>₹{amount}</td>
            </tr>
          </>
        );
      })}
    </>
  );
};
const Summary = ({ heading, data }) => {
  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        <h4>{heading}</h4>
      </div>
      <TableView
        headingItems={[
          "Client Name",
          "Phone Number",
          "Due Date",
          "Payment Due",
        ]}
        disablePagination
      >
        <tbody>
          {" "}
          <SummaryRow data={data} />
        </tbody>
      </TableView>
    </div>
  );
};

export default Summary;
