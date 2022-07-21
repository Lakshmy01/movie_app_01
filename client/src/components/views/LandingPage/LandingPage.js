import React, { useEffect, useState, useRef } from "react";
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import MainImage from "./Sections/MainImage";
import { Typography, Row } from "antd";
import GridCard from "./Sections/GridCard";
const { Title } = Typography;

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const endPath = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endPath);
  }, []);
  const fetchMovies = (path) => {
    fetch(path)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies([...Movies,...response.results]);
        setCurrentPage(response.page);
      });
  };
  const loadMoreMovies = () => {
    const endPath = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endPath);
  };
  return (
    <>
      <div style={{ width: "100%", margin: 0 }}>
        <MainImage
          image={`${IMAGE_URL}w1280${Movies[0]?.backdrop_path}`}
          title={Movies[0]?.original_title}
          text={Movies[0]?.overview}
        />
        {/* body */}
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <Title level={2}> Movies by latest </Title>
          <hr />
          {/*      Grid cards */}
          <Row gutter={[16, 16]}>
            {Movies &&
              Movies.map((movie, index) => (
                <React.Fragment  key={index}>
                  <GridCard
                    image={`${IMAGE_URL}w500${movie?.poster_path}`}
                    movieId={movie?.id}
                  />
                </React.Fragment>
              ))}
          </Row>

          {/* Load More button */}
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              // ref={buttonRef}
              className="loadMore"
              onClick={loadMoreMovies}
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
