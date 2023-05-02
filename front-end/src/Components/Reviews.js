import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review"
import ReviewForm from "./ReviewForm";

const API = process.env.REACT_APP_API_URL;

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${API}/bookmarks/${id}/reviews`)
            .then((res) => {
                setReviews(res.data);
                console.log(res);
            })
    }, [id, API]);

    const handleAdd = (newReview) => {
        axios.post(`${API}/bookmarks/${id}/reviews`, newReview)
            .then((res) => {
                setReviews([res.data, ...reviews])
            },
                (err) => console.error(err))
            .catch((err) => console.warn("catch", err))
    };

    const handleDelete = (id) => {
        axios.delete(`${API}/bookmarks/${id}/reviews/${id}`)
            .then((res) => {
                const copyReviewArray = [...reviews];
                const indexDeletedReview = copyReviewArray.findIndex((review) => {
                    return review.id === id;
                });
                // Now we want to use the extracted INDEX
                // & match with with the copy of the state's
                // Array of objects, and cut it off
                copyReviewArray.splice(indexDeletedReview, 1);
                setReviews(copyReviewArray);
            },
                (error) => console.error(error)
            )
            .catch((err) => console.warn("catch", err))
    };


    return (
        <section className="Reviews">
            <h2>Reviews</h2>
            <ReviewForm handleSubmit={handleAdd}>
                <h3>Add a New Review</h3>
            </ReviewForm>
            {
                reviews.map((review) => {
                    return <Review key={review.id} review={review} handleDelete={handleDelete} />
                })
            }
        </section>
    )
};
