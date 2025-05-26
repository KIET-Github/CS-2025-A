import React from "react";
import styles from "./index.module.scss";
import TableView from "../tableView";
import { getDate } from "../../utils/handlers/getDate";

const SummaryRow = (data) => {
  const summaryData = data?.data?.data;
  return (
    <>
      {summaryData?.map((item) => {
        return (
          <>
            <tr>
              <td>{item?.name}</td>
              <div className={styles.dueDate}>
                <td>Only {item?.quantity} Left</td>
              </div>
            </tr>
          </>
        );
      })}
    </>
  );
};
const SummaryProduct = ({ heading, data }) => {
  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        <h4>{heading}</h4>
      </div>
      <TableView
        headingItems={["Product Name", "Quantity Remaining"]}
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

export default SummaryProduct;
