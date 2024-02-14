import { InputHTMLAttributes, forwardRef } from 'react'

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        type="checkbox"
        className={'toggle toggle-primary ' + className}
        ref={ref}
        {...props}
      ></input>
    )
  }
)

export default Checkbox
