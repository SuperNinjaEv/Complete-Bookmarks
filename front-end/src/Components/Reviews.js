import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";

const API = process.env.REACT_APP_API_URL;

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${API}/reviews?bookmarkId=${id}`)
            .then((res) => {
                setReviews(res.data);
                console.log(res);
            })
    }, [id, API])



    return (
        <section className="Reviews">
            {
                reviews.map((review) => {
                    return <Review key={review.id} review={review} />
                })
            }
        </section>
    )
};
