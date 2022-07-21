import React, { useEffect, useState } from "react";
import { Typography, Popover, Button } from "antd";
import axios from "axios";
import "./favorite.css";
import { useSelector } from "react-redux";
import { IMAGE_URL, POSTER_SIZE } from "../../Config";

const { Title } = Typography;

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);
  let variable = { userFrom: localStorage.getItem("userId") };
  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie=()=>{
    axios.post("/api/favorite/getFavoredMovie", variable).then((response) => {
        if (response.data.success) {
          console.log(response.data.favorites);
          setFavorites(response.data.favorites);
          setLoading(false);
        } else {
          alert("Failed to get subscription videos");
        }
      });
}
  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_URL}w500${favorite.moviePost}`} />
        ) : (
          "no image"
        )}
      </div>
    );
    const onClickDelete= (movieId, userFrom) => {

        const variables = {
            movieId: movieId,
            userFrom: userFrom,
        }
        axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if (response.data.success) {
                fetchFavoredMovie()
            } else {
                alert('Failed to Remove From Favorite')
            }
        })
    }
    return (
      <tr>
        <Popover  content={content} title={`${favorite.movieTitle}`}>
        <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime} mins</td>
        <td>
          <button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            {" "}
            Remove{" "}
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Favorite Movies By Me </Title>
      <hr />
      <table>
        <thead>
          <tr>
            <td>Movie Title</td>
            <td>Movie RunTime</td>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}
export default FavoritePage;
