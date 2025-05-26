import React from "react";
import SummaryCard from "../../components/summaryCard";
import useFetch from "../../utils/hooks/useFetch";
import styles from "./index.module.scss";
import Summary from "../../components/summaryTable";
import { MdOutlineStarRate } from "react-icons/md";
import SummaryProduct from "../../components/summaryProduct";

const Dashboard = () => {
  const data = useFetch("/transactions/summary");
  const monthlyData = useFetch("/transactions/monthly-summary");
  const dueData = useFetch("/transactions/due");
  const productData = useFetch("/product/low-stock");

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.heading}>
        {" "}
        <h1>
          Welcome Back ! <MdOutlineStarRate />
        </h1>
        <h3>
          {" "}
          We're glad to have you with us again and look forward to picking up
          right where we left off.{" "}
        </h3>
      </div>

      <div className={styles.dashboard}>
        <SummaryCard heading={"Annual Summary"} data={data} />
        <SummaryCard heading={"Monthly Summary"} data={monthlyData} />
      </div>
      <div className={styles.dashboard}>
        {dueData?.data?.length > 0 ? (
          <Summary heading={"Due Payments"} data={dueData} />
        ) : null}
        {productData.data?.length > 0 ? (
          <SummaryProduct heading={"Low Stock Products"} data={productData} />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
