import React from 'react'
import { Link } from 'react-router-dom'

const SideMenuItem = ({icon, text, link}) => {
    return <li className="menu-item">
                {icon} 
                <Link to={link} >{text}</Link>
            </li>
}

export default SideMenuItem;