interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function InputGroup({ className, children, ...props }: Readonly<InputGroupProps>) {
  return (
    <div className={'flex flex-wrap justify-between py-5 px-0 ' + className} {...props}>
      {children}
    </div>
  )
}
