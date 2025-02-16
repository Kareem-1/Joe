import { Link } from 'react-router-dom';
import productimage from '../../assets/heroimage.png'
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function HeroSection() {
    return (
        <div className="hero-container">
            <div className="hero-text-container">
                <h1>
                    <p>Quieter Clinic</p>
                    <p>Happier Dentists</p>
                </h1>
                <p>Reduce compressor noise to below 40 dB for a calm, patient-friendly environment. Silence that enhances care and comfort.</p>
                <div className='hero-button-container'>
                    <Link to={'/shop'} className='hero-button-container-Link' style={{ textDecoration: 'none', color: 'white' }}>
                        <button className='hero-button-container-button'>
                            Order Yours Now
                        </button>
                    </Link>
                </div>
            </div>
            <div className="hero-image-container">
                <div>
                    <img src={productimage} width={450} />
                </div>
                <div className='icons-container'>
                    <div >
                        <button className='icon'><FaInstagram size={24} /></button>
                    </div>
                    <div >
                        <button className='icon'><FaFacebook size={24} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}