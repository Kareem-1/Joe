import { Link } from 'react-router-dom'
import logo from '../../assets/joelogo.png'
export default function Header() {
    return (
        <div className='header'>
            <div>
                <img src={logo} width={128} />
            </div>
            <div>
                <button >Admin</button>
            </div>
        </div>
    )
}