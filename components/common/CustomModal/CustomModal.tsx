import React, { useEffect, useRef, useContext } from 'react';
import styles from './CustomModal.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { AppContext } from '../../../context/AppContext';

const CustomModal = ({
	children,
	show,
	onClose,
	style,
	wrapperStyle,
	closeWithin,
	title,
}: {
	children: React.ReactNode;
	show: boolean;
	onClose: () => void;
	style?: any;
	wrapperStyle?: any;
	closeWithin?: boolean;
	title?: string;
}) => {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const { isMobile } = useContext(AppContext);
	const backDrop = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};
	const modal = {
		initial: {
			opacity: 0,
			scale: 0.25,
		},
		current: {
			opacity: 1,
			scale: 1,
			transform: { delay: 1 },
			transition: { duration: 0.6 },
		},
		exit: {
			opacity: 0,
			scale: 0,
			transition: { duration: 0.6 },
		},
	};

	useEffect(() => {
		//  add when mounted
		document.addEventListener('mousedown', handleClick);
		//  clean on unmount
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
	const handleClick = (e: any) => {
		// clicked inside the modal
		e.stopPropagation();

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
					variants={backDrop}
					initial="hidden"
					animate="visible"
					exit="hidden"
					className={styles.backdrop}
					style={{ ...wrapperStyle }}
				>
					<motion.div
						variants={modal}
						initial="initial"
						animate="current"
						exit="exit"
						className={styles.modal}
						ref={modalRef}
						style={{ ...style }}
					>
						<div className={styles.modalHeader}>
							{closeWithin && (
								<button onClick={onClose} className={styles.closeBtn}>
									&times;
								</button>
							)}
							{title && (
								<h2 className="text-2xl capitalize font-semibold text-center text-primary-dark">
									{title}
								</h2>
							)}
						</div>
						<div className={styles.modalContent}>{children}</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default CustomModal;
