import { Link } from 'react-router-dom'
import logo from '../../assets/joelogo.png'
export default function Header() {
    return (
        <div className='header'>
            <div>
                <img src={logo} width={110} />
            </div>
            <div>
                <Link to={"/login"}>
                    <button >Admin</button>
                </Link>
            </div>
        </div>
    )
}