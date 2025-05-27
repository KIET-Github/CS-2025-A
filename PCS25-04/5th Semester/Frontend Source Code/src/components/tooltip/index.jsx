import classNames from "classnames";
import React, { useState } from "react";
import styles from "./index.module.scss";

const Tooltip = ({ delay, children, direction, content, className }) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className={classNames(styles["Tooltip-Wrapper"], className)}
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {children}
      {active && (
        <div
          className={classNames(
            styles["Tooltip-Tip"],
            styles[direction || "top"]
          )}
        >
          {/* Content */}
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
