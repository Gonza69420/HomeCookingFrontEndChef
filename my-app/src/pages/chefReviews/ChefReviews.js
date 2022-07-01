import React from "react";
import Navbar from "../../components/Navbar";
import { ReviewCard } from "../../components/reviewCard";
export const ChefReviews = () => {
    return (
        <div>
            <Navbar />
            <div className='container mt-5 bg-white'>
                <h1 className="d-flex justify-content-start">Reviews</h1>
                <ReviewCard firstname="Raul" lastname="Salvio" review="Interesante el concepto. Mercado Libre es una herramienta" src="https://pbs.twimg.com/media/BcFrAwtIYAAsqsE.jpg" stars={3}/>
            </div>
        </div>
    )
}