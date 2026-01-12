import React from 'react'

const Navbar = () => {
  return (
    <nav className='md:w-full'>
        <div className="nav-container p-4w-full ">
        {/* 
            nav-menu flex flex-col md:flex-row md:justify-center 
            md:gap-12 gap-6 items-end md:items-center md:py-6  */}
            <ul className='nav-menu flex flex-col md:flex-row md:justify-center md:items-center gap-12 md:gap-32 font-bold text-base md:text-xl text-[#C7CE69]'>
                <li className='nav-item'><a href="">Gallery</a></li>
                <li className='nav-item'><a href="">Testimonials</a></li>
                <li className='nav-item'><a href="">About Us</a></li>
                <li className='nav-item'><a href="">Contact</a></li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
