import React, { useEffect, useRef, useContext } from "react";
import styles from "./CustomModal.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { AppContext } from "../../../context/AppContext";

const CustomModal = ({
  children,
  show,
  onClose,
  style,
  wrapperStyle,
}: {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  style?: any;
  wrapperStyle?: any;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { isMobile } = useContext(AppContext);
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const modal = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: isMobile ? "0" : "20%",
      opacity: 1,
      transform: { delay: 1 },
    },
  };
  useEffect(() => {
    //  add when mounted
    document.addEventListener("mousedown", handleClick);
    //  clean on unmount
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleClick = (e: any) => {
    // clicked inside the modal
    e.stopPropagation();

    console.log(modalRef?.current?.contains(e.target));
    if (modalRef?.current?.contains(e.target)) {
      return;
    }
    // outside the modal
    onClose();
  };
  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <motion.div
          className={styles.backdrop}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            ref={modalRef}
            style={{ ...wrapperStyle }}
            className={styles.modal}
            variants={modal}
          >
            <div style={{ ...style }} className={styles.modalContent}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
