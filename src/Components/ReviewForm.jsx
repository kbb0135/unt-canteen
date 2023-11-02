import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { postReview } from "../services/foods";
import { useParams } from "react-router-dom";

const ReviewForm = ({fetchReviews}) => {

    // ** Review data
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState('')
    const {id} = useParams()

    // ** Submit
    const submitHandler = async (event) => {
        event.preventDefault()
        const reviewData = {
            rating, 
            message, 
            id
        }

        auth.currentUser ? await postReview({data: reviewData, id}) : 
        toast.error('You must register first.')

        // Reset state
        setMessage('')
        setRating(0)
        fetchReviews()
    }
    return <form onSubmit={submitHandler} className="rev-form">
        <h3 className="rev-form-head">How was your experience?</h3>
        <Star stars={rating} changeHandler={(val) => setRating(val)}/>
        <textarea rows={5} placeholder="Your feedback matters..." value={message} onChange={event => setMessage(event.target.value)} required></textarea>
        <button type="submit" className="rev-form-btn">Submit Review</button>
    </form>
}




const Star = ({stars, changeHandler}) => {
    const ratingStars = Array.from({length: 5}, (_, index) => {
        let number = index + 0.5
        return <span key={index} className="rev-form-star" onClick={() => changeHandler(index + 1)}>
            {stars >= index + 1 ? 
            <FaStar className="star-icon" /> : stars >= number ? 
            <FaStarHalfAlt className="star-icon" /> : <FaRegStar className="star-icon" /> }
        </span>
    })

    return <div className="rev-form-stars">{ratingStars}</div>
}
export default ReviewForm