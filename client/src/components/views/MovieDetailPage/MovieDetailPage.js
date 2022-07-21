import React, { useEffect, useState, useRef } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import { Typography, Descriptions, Badge, Button, Row } from "antd";
import MainImage from "../LandingPage/Sections/MainImage";
import GridCard from "../LandingPage/Sections/GridCard";
import Favorite from "./Sections/Favorite";
const { Title } = Typography;

function MovieDetailPage(props) {
  const movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState({});
  const [Casts, setCasts] = useState([]);
  const [ToggleActorView, setToggleActorView] = useState(false);
  useEffect(() => {
    const endPath = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetch(endPath)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setMovie(result);

        let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        fetch(endpointForCasts)
          .then((result) => result.json())
          .then((result) => {
            console.log(result);
            setCasts(result.cast);
          });
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  const toggleActors = () => {
    setToggleActorView(!ToggleActorView);
  };
  return (
    <>
      <div>
        {Movie && (
          <MainImage
            image={`${IMAGE_URL}w1280${Movie && Movie?.backdrop_path}`}
            title={Movie?.original_title}
            text={Movie?.overview}
          />
        )}

        <div style={{ width: "85%", margin: "1rem auto" }}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Favorite
              userFrom={localStorage.getItem("userId")}
              movieId={movieId}
              movieInfo={Movie}
            />
          </div>
          {/*    Table */}
          <Descriptions title="Movie Info" bordered>
            <Descriptions.Item label="Title">
              {Movie.original_title}
            </Descriptions.Item>
            <Descriptions.Item label="release_date">
              {Movie.release_date}
            </Descriptions.Item>
            <Descriptions.Item label="revenue">
              {Movie.revenue}
            </Descriptions.Item>
            <Descriptions.Item label="runtime">
              {Movie.runtime}
            </Descriptions.Item>
            <Descriptions.Item label="vote_average" span={2}>
              {Movie.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="vote_count">
              {Movie.vote_count}
            </Descriptions.Item>
            <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>
            <Descriptions.Item label="popularity">
              {Movie.popularity}
            </Descriptions.Item>
          </Descriptions>

          {/* Load More button */}
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={toggleActors}>Toggle Actor View</Button>
          </div>
          <br />
          {/*      Grid cards */}
          {ToggleActorView && (
            <Row gutter={[16, 16]}>
              {Casts &&
                Casts.map((Cast, index) => (
                  <React.Fragment>
                    <GridCard
                      actor
                      cast={`${IMAGE_URL}w500${Cast?.profile_path}`}
                    />
                  </React.Fragment>
                ))}
            </Row>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieDetailPage;
