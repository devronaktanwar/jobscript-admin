import logo from '../assets/logo.png'
const Navbar = () => {
  return (
    <div className="py-2 border-b">
        <nav className="w-[80%] m-auto">
            <div className='w-16 h-16 cursor-pointer'>
<img src={logo} alt="" className='w-full h-full'/>
            </div>
        </nav>
    </div>
  )
}

export default Navbar