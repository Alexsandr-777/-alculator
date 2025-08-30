import { useState } from 'react';
import styles from './Calculator.module.css';

export const App = () => {
	const NUMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const [inputValue, setInputValue] = useState('0');
	const [resultColorText, setResultColorText] = useState(false);

	const handleOnChange = (event) => {
		setResultColorText(false);
		setInputValue(event.target.value);
	};

	const compute = (val) => {
		const [num1, oper, num2] = val.trim().split(/\s+/);
		if (num1 === undefined || oper === undefined || num2 === undefined) {
			return null;
		}
		const number1 = Number(num1);
		const number2 = Number(num2);
		if (Number.isNaN(number1) || Number.isNaN(number2)) {
			return null;
		}
		return oper === '+' ? number1 + number2 : number1 - number2;
	};

	const handleClickButtonDigit = (digit) => {
		setResultColorText(false);
		setInputValue((prev) => (prev === '0' ? String(digit) : prev + String(digit)));
	};

	const handleClickButtonClear = () => {
		setResultColorText(false);
		setInputValue('0');
	};

	const handleOperator = (operator) => {
		setResultColorText(false);
		setInputValue((prev) => {
			const prevValue = prev.trim();
			const result = compute(prevValue);
			if (result != null) {
				return `${result} ${operator} `;
			}
			if (prevValue.endsWith('+') || prevValue.endsWith('-')) {
				return prevValue.slice(0, -1) + operator + ' ';
			}
			return `${prevValue} ${operator} `;
		});
	};

	const handleEquals = () => {
		setInputValue((prev) => {
			const result = compute(prev);
			if (result != 0) {
				setResultColorText(true);
				return String(result);
			}
			setResultColorText(false);
			return prev;
		});
	};

	const inputClass = [styles.input, resultColorText && styles.resultColor]
		.filter(Boolean)
		.join(' ');

	return (
		<>
			<input
				className={inputClass}
				type="text"
				value={inputValue}
				onChange={handleOnChange}
			/>
			<div className={styles.keypad}>
				<button className={styles.buttonClear} onClick={handleClickButtonClear}>
					С
				</button>
				<button
					className={styles.buttonOperator}
					onClick={() => handleOperator('+')}
				>
					+
				</button>
				<button
					className={styles.buttonOperator}
					onClick={() => handleOperator('-')}
				>
					-
				</button>

				{NUMS.map((el) => (
					<button key={el} onClick={() => handleClickButtonDigit(el)}>
						{el}
					</button>
				))}

				<button className={styles.buttonEquals} onClick={handleEquals}>
					=
				</button>
			</div>
		</>
	);
};
