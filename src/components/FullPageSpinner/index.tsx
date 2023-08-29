import styles from './style.module.css';

const Spinner = () => {
	return (
		<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={styles.animationspiner} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
			<path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
		</svg>
	);
};

const FullPageSpinner = () => {
	return (
		<div
			style={{
				position: 'fixed',
				top: '0px',
				left: '0px',
				bottom: '0px',
				right: '0px',
				fontSize: '4em',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Spinner />
		</div>
	);
};

export default FullPageSpinner;
