import { useState } from "react";
import ReviewForm from "./ReviewForm";


export default function Review({ review, handleDelete }) {
    const [viewEditFrom, toggleEditForm] = useState(false);

    /**UPDATE
     * toggle functionality to hide or show form
     */

    const toggleView = () => {
        toggleEditForm(!viewEditFrom);
    };

    return (
        <div className="Review">
            <button onClick={toggleView}>Edit this review...</button>
            {viewEditFrom ?
                (
                    <ReviewForm reviewDetails={review} />
                ) : (
                    <div>
                        <h4>{review.title} <span>{review.rating}</span></h4>
                        <h5>{review.reviewer}</h5>
                        <p>{review.content}</p>
                    </div>
                )}
            <button onClick={() => handleDelete(review.id)}>Delete</button>
        </div>
    )
};
