const AuthLayout = ({children}:{children:React.ReactNode}) =>{
  return (
    <div className="flex pt-[150px] justify-center h-full">
      {children}
    </div>
  )
}
export default AuthLayout;