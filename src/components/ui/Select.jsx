import { useState, useRef, useEffect } from 'react';

function Select({
	options = [],
	value,
	onChange,
	name,
	className = '',
	placeholder = 'Select option...',
	disabled = false,
	ariaLabel,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const containerRef = useRef(null);

	const selectedOption = options.find((opt) => opt.value === value);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (containerRef.current && !containerRef.current.contains(event.target)) {
				setIsOpen(false);
				setFocusedIndex(-1);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSelect = (optionValue) => {
		if (disabled) return;
		if (onChange) {
			if (name) {
				onChange({ target: { name, value: optionValue } });
			} else {
				onChange(optionValue);
			}
		}
		setIsOpen(false);
		setFocusedIndex(-1);
	};

	const handleKeyDown = (e) => {
		if (disabled) return;
		if (!isOpen) {
			if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				e.preventDefault();
				setIsOpen(true);
				const index = options.findIndex((opt) => opt.value === value);
				setFocusedIndex(index >= 0 ? index : 0);
			}
			return;
		}

		switch (e.key) {
			case 'Escape':
				e.preventDefault();
				setIsOpen(false);
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				if (focusedIndex >= 0 && focusedIndex < options.length) {
					handleSelect(options[focusedIndex].value);
				}
				break;
			case 'ArrowDown':
				e.preventDefault();
				setFocusedIndex((prev) => (prev + 1) % options.length);
				break;
			case 'ArrowUp':
				e.preventDefault();
				setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
				break;
			case 'Tab':
				setIsOpen(false);
				break;
			default:
				break;
		}
	};


	return (
		<div
			ref={containerRef}
			className={`relative inline-block w-full text-left ${className}`}
		>
			<button
				type="button"
				onClick={() => !disabled && setIsOpen(!isOpen)}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				aria-label={ariaLabel}
				className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 
					${isOpen ? 'border-neo-500 ring-2 ring-neo-200' : 'border-neo-200/60 hover:border-neo-300 hover:bg-neo-50/10'}
					${disabled ? 'cursor-not-allowed opacity-50 bg-slate-50' : 'cursor-pointer'}
				`}
			>
				<span className={selectedOption ? 'text-slate-900 font-medium' : 'text-slate-400'}>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<svg
					className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-neo-600' : ''}`}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2.5"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{isOpen && (
				<ul
					role="listbox"
					aria-label={ariaLabel}
					className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-neo-100 bg-white/95 p-1 shadow-neo backdrop-blur-md animate-dropdown focus:outline-none custom-scrollbar"
				>
					{options.map((option, index) => {
						const isSelected = option.value === value;
						const isFocused = index === focusedIndex;

						return (
							<li
								key={option.value}
								role="option"
								aria-selected={isSelected}
								onClick={() => handleSelect(option.value)}
								onMouseEnter={() => setFocusedIndex(index)}
								className={`cursor-pointer rounded-lg px-3.5 py-2 text-sm transition-all duration-150 block
									${isSelected ? 'bg-neo-gradient text-white font-semibold shadow-sm' : ''}
									${isFocused && !isSelected ? 'bg-neo-50 text-neo-700' : ''}
									${!isSelected && !isFocused ? 'text-slate-700 hover:text-slate-900' : ''}
								`}
							>
								{option.label}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}

export default Select;
