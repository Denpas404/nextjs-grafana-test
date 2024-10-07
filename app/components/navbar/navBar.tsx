import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <div>
            <nav className='flex justify-around m-5'>
                <Link href='/'>Home</Link>
                <Link href='/influxdb'>Progress Bar</Link> 
                <Link href='/gauges'>Gauges</Link>               

            </nav>
            <hr />
    </div>
    )
}

export default NavBar
