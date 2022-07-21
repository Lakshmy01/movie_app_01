import React from "react";
import { Typography, Col } from "antd";
const { Title } = Typography;

function GridCard(props) {
  let { actor, key, image, movieId, movieName, characterName } = props
  if (props.actor) {
    return (
      <Col key={key} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            src={props.cast}
          />
        </div>
      </Col>
    );
  } else {
    return (
      <Col key={key} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              alt={"img"}
              src={props.image}
            />
          </a>
        </div>
      </Col>
    );
  }
}

export default GridCard;
