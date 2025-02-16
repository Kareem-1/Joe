import logo from '../../assets/joelogo.png'
import { IoSearchOutline, IoCartOutline, IoPersonCircleSharp } from "react-icons/io5";

export default function Header() {
    return (
        <>
            <div className='shop-navigation'>
                <div>
                    <img src={logo} width={118} />
                </div>
                <div>
                    <ul className='shop-navigation-items'>
                        <li>Shop</li>
                        <li>On Sale</li>
                        <li>New Arrivals</li>
                    </ul>
                </div>
                <div className='search-container'>
                    <IoSearchOutline className='search-icon' size={20} />
                    <input className='search-input' placeholder="Search for products..." />
                </div>
                <div className='ending-icons-container'>
                    <IoCartOutline size={30} className='ending-icons'/>
                    <IoPersonCircleSharp size={30} className='ending-icons'/>
                </div>
            </div>
            <div className="header-line"></div>
        </>
    )
}