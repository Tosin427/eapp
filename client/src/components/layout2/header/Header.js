import React from 'react'
import './Header.css'

const Header = () => {
    return <div className="header">
        <span className='mobile-nav-toggle'>
            Menu
            <i className='fa fa-arrow-right'></i>
        </span>
        <span className="name-abbv">CU</span>
        <a href="">Chinedu Ukpe</a>

    </div>
}

export default Header;