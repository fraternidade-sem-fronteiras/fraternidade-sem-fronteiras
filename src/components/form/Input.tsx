import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  centralize?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ centralize = true, label, type = 'text', className = '', ...props }, ref) => {
    return (
      <div className={centralize ? 'flex flex-col pl-40 mb-4' : ''}>
        <label>{label}</label>
        <input
          type={type}
          className={'input input-bordered input-md w-full max-w-xs ' + className}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

export default Input
