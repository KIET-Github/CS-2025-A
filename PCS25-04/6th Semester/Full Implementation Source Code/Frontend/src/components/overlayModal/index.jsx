import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

const OverlayModal = ({
  showModal,
  onModalClose,
  children,
  isSmallModal,
  isMediumModal,
  className,
}) => {
  if (!children) {
    console.warn("Modal Opened without children");
    return <></>;
  }
  return (
    <div
      className={classNames(styles.modalContainer, {
        [styles.showModal]: showModal,
        [styles.out]: !showModal,
      })}
      onClick={onModalClose}
    >
      <div className={styles.modalBackground}>
        <div
          className={classNames(styles.modal, className, {
            [styles.smallModal]: isSmallModal,
            [styles.mediumModal]: isMediumModal,
          })}
          onClick={(e) => e?.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default OverlayModal;
