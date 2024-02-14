import { InputHTMLAttributes, forwardRef } from 'react'

interface OptionProps {
  key: string
  label: string
  value: string
}

interface SelectInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: OptionProps[]
  defaultValue?: string
}

const Select = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, defaultValue, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col pl-40 mb-4">
        <label>{label}</label>
        <select
          defaultValue={''}
          className={'select select-secondary w-full max-w-xs ' + className}
          ref={ref}
          {...props}
        >
          {defaultValue && (
            <option key="" value="" disabled>
              {defaultValue}
            </option>
          )}
          {props.options.map((option) => (
            <option key={option.key} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

export default Select
