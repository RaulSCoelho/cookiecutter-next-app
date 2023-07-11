'use client'

import { ChangeEvent, ChangeEventHandler, FocusEvent, FocusEventHandler, InputHTMLAttributes } from 'react'
import { ChangeHandler, UseFormRegisterReturn } from 'react-hook-form'

import { tv } from 'tailwind-variants'

interface MoneyInputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: never
  label?: string
  wrapperClassName?: string
  register?: UseFormRegisterReturn<any>
  error?: string
  onChange?: never
  onBlur?: never
}

interface MoneyInputLabledProps extends Omit<MoneyInputBaseProps, 'name' | 'register' | 'onChange' | 'onBlur'> {
  name: string
  register?: never
  onChange?: ChangeEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
}

type MoneyInputProps = Omit<MoneyInputLabledProps | MoneyInputBaseProps, 'type' | 'pattern'>

const moneyInput = tv({
  base: 'w-full rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none'
})

export function MoneyInput({
  label,
  name,
  register,
  error,
  className,
  wrapperClassName,
  placeholder,
  onChange,
  onBlur,
  ...rest
}: MoneyInputProps) {
  const formatNumber = (numberString: string) => {
    // Format number 1000000 to 1,234,567
    return numberString.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const formatCurrency = (event: Parameters<ChangeHandler>[0]) => {
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

    onChange?.(event as ChangeEvent<HTMLInputElement>)
    if (event.type === 'blur') onBlur?.(event as FocusEvent<HTMLInputElement>)
  }

  if (register) {
    const originalOnChange = register.onChange
    const originalOnBlur = register.onBlur

    register.onChange = e => {
      formatCurrency(e)
      return originalOnChange(e)
    }
    register.onBlur = e => {
      formatCurrency(e)
      return originalOnBlur(e)
    }
  }

  return (
    <div className={wrapperClassName}>
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wide" htmlFor={register?.name || name}>
          {label}
        </label>
      )}
      <input
        type="text"
        pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
        className={moneyInput({ className })}
        placeholder={placeholder || '$0.00'}
        inputMode="decimal"
        {...(!register && { onChange: formatCurrency, onBlur: formatCurrency })}
        {...(register || { name })}
        {...rest}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
