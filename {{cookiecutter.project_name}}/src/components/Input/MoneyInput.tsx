'use client'

import { ChangeEvent, FocusEvent, InputHTMLAttributes, forwardRef } from 'react'

import { tv } from 'tailwind-variants'

interface MoneyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'pattern'> {
  label?: string
  error?: string
  wrapperClassName?: string
}

const moneyInput = tv({
  base: 'w-full rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none'
})

export const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(function MoneyInput(
  { label, error, wrapperClassName, className, onChange, onBlur, placeholder = '$0.00', ...rest },
  ref
) {
  const formatNumber = (numberString: string) => {
    // Format number 1000000 to 1,234,567
    return numberString.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const formatCurrency = (event: any) => {
    const inputElement = event.target as HTMLInputElement
    let inputValue = inputElement.value

    // Don't validate empty input
    if (inputValue === '') return

    // Check for decimal
    if (inputValue.indexOf('.') >= 0) {
      // Get position of first decimal
      // This prevents multiple decimals from being entered
      const decimalPosition = inputValue.indexOf('.')

      // Split number by decimal point
      let leftSide = inputValue.substring(0, decimalPosition)
      let rightSide = inputValue.substring(decimalPosition)

      // Add commas to the left side of the number
      leftSide = formatNumber(leftSide)

      // Validate the right side
      rightSide = formatNumber(rightSide)

      // On blur, make sure 2 numbers after the decimal
      if (event.type === 'blur') {
        rightSide += '00'
      }

      // Limit decimal to only 2 digits
      rightSide = rightSide.substring(0, 2)

      // Join the number by "."
      inputValue = '$' + leftSide + '.' + rightSide
    } else {
      // No decimal entered
      // Add commas to the number and remove all non-digits
      inputValue = formatNumber(inputValue)
      inputValue = '$' + inputValue

      // Final formatting
      if (event.type === 'blur') {
        inputValue += '.00'
      }
    }

    // Send the updated string to the input
    inputElement.value = inputValue

    if (event.type === 'blur') {
      onBlur?.(event as FocusEvent<HTMLInputElement>)
    } else {
      onChange?.(event as ChangeEvent<HTMLInputElement>)
    }
  }

  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide" htmlFor={rest.name}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type="text"
        inputMode="decimal"
        pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
        className={moneyInput({ className })}
        placeholder={placeholder}
        onChange={formatCurrency}
        onBlur={formatCurrency}
        {...rest}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
})
