import React from "react";
import useClickOutside from "../../utils/hooks/useClickOutside";
import styles from "./index.module.scss";
import { IoCloseCircleSharp } from "react-icons/io5";
import classNames from "classnames";

const Modal = ({
  children,
  showModal,
  onModalClose,
  onClickOutside,
  className,
}) => {
  const ref = React.useRef();
  //   useClickOutside(ref, onClickOutside);

  React.useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onModalClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  if (!children) {
    console.warn("Modal Opened without any children");
    return;
  }

  return (
    <div
      className={classNames(styles.rootModal, className, {
        [styles.showModal]: showModal,
      })}
    >
      <div className={styles.modalCard} ref={ref}>
        <div className={styles.close} onClick={onModalClose}>
          <IoCloseCircleSharp />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
