import React from "react";

import styles from "./index.module.scss";
import OverlayModal from "../overlayModal";
import Button from "../button";

const ConfirmModal = ({ onConfirm, onClose, label, showModal, isLoading }) => {
  return (
    <OverlayModal
      showModal={showModal}
      onModalClose={onClose}
      isSmallModal={true}
      className={styles.confirmModal}
    >
      <div className={styles.modal}>
        <h3 className={styles.label}>{"Are You Sure!"}</h3>
        {label && <p>{label}</p>}
        <div className={styles.actionButton}>
          <Button onClick={onClose} label={"Close"} />
          <Button onClick={onConfirm} label={"Confirm"} isLoading={isLoading} />
        </div>
      </div>
    </OverlayModal>
  );
};

export default ConfirmModal;
