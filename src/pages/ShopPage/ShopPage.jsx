import { useState } from 'react';
import Header from './Header'
import Product from './Product'
import Reviews from './Reviews'
import './shoppage.css'
import Details from './Details';
import Footer from './Footer';

export default function ShopPage() {
    const [open, setOpen] = useState('reviews');
    return (
        <div>
            <Header />
            <Product />
            <div className='details-and-ratings'>
                <div className='details-and-ratings-container'>
                    <button onClick={() => setOpen('details')} className={open != 'reviews' ? 'details-and-ratings-open' : 'details-and-ratings-close'}>Product Details</button>
                    <button onClick={() => setOpen('reviews')} className={open == 'reviews' ? 'details-and-ratings-open' : 'details-and-ratings-close'}>Rating & Reviews</button>
                </div>
                <div className='header-line'></div>
            </div>
            {open == 'reviews' && <Reviews />}
            {open == 'details' && <Details />}
            <Footer />
        </div>
    )
}