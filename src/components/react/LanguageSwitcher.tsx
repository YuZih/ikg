import React, { useState, useRef, useEffect } from 'react'
import * as tb from 'react-icons/tb'
import { locales, localeCodeMap } from '../../i18n/ui'

interface LanguageSwitcherProps {
	currentLocale: string
	pathNameWithoutLocale: string
}

export default function LanguageSwitcher({
	currentLocale,
	pathNameWithoutLocale,
}: LanguageSwitcherProps) {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className="language-switcher" ref={dropdownRef}>
			<button
				className="language-button"
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Switch language"
			>
				<tb.TbLanguage />
				<span className="current-locale">
					{localeCodeMap[currentLocale as keyof typeof localeCodeMap]}
				</span>
			</button>

			{isOpen && (
				<div className="language-dropdown">
					{locales.map((locale) => (
						<a
							key={locale}
							href={`/${locale}${pathNameWithoutLocale}`}
							className={locale === currentLocale ? 'active' : ''}
							onClick={() => setIsOpen(false)}
						>
							{localeCodeMap[locale as keyof typeof localeCodeMap]}
						</a>
					))}
				</div>
			)}
		</div>
	)
}
