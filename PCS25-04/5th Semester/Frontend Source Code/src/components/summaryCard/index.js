import React from "react";
import styles from "./index.module.scss";
const SummaryCard = ({ heading, data }) => {
  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        <h4>{heading}</h4>
      </div>
      <div>
        <p>
          <span>Total Purchase : </span> {data?.data?.total_purchases ?? "N/A"}
        </p>
        <p>
          <span>Total Sales : </span>
          {data?.data?.total_sales ?? "N/A"}
        </p>
        {heading === "Annual Summary" ? (
          <>
            <p>
              <span>To Get: </span> {data?.data?.total_to_get ?? "N/A"}
            </p>
            <p>
              <span>To Pay: </span>
              {data?.data?.total_to_pay ?? "N/A"}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SummaryCard;
