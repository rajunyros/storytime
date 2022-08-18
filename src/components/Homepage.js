import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "./audio/AudioPlayer";
import { useNavigate } from "react-router-dom";

const Homepage = ({ setLoginUser }) => {
  const [podcastData, setPodcastData] = useState([]);
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();
  const accessToken =
    "BQAuE4eRp_mk8Z0NvRCbSHlcDi7p7ZHmV3EAC_iIdvI5GPpXoxEs7_C6bcmoVGZnCoPGzysiLSiX5mRMdHtHX1FgA8sRTd_VUsUdqFH2UImIb7tIZ2qF5rt4yZmBqo-qrjeEJdhnCLRRnwGGYCAGjYAJr4gqNo13SihtTp39QXnT70rvgB_C08BhbRAPzj9qE4RaVuxs";

  const userLogout = () => {
    alert("Logout");
    // setLoginUser(null);
    localStorage.removeItem("user");
    navigate("/Login");
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function convertMsToMinutesSeconds(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60
      ? `${minutes + 1}:00`
      : `${minutes}:${padTo2Digits(seconds)}`;
  }

  const getStoryData = (p) => {
    fetch(
      "https://api.spotify.com/v1/shows/" +
        p.id +
        "/episodes?market=ES&limit=10&offset=5",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    ).then((response) => {
      response.json().then((data) => {
        console.log("Episodes Data", data.items);
        const allTracks = [];

        data.items.map((p, index) => {
          let obj = {
            title: p.name,
            artist: p.language,
            audioSrc: p.audio_preview_url,
            image: p.images[0].url,
            total_duration: convertMsToMinutesSeconds(p.duration_ms),
            color: "#ffb77a",
          };
          allTracks.push(obj);
        });
        console.log("TracksData", allTracks);
        navigate("/audioplayer2", {
          state: { podcastData: p, episodes: allTracks },
        });
      });
    });
  };
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/Login");
    }
    fetch(
      "https://api.spotify.com/v1/shows?market=ES&ids=7xvvdI85IO3kveUYobA6bR%2C0A6kWKFEOFtp8fkrpnAJQB%2C3N8CoC1BmXjICPfieW62D5%2C0zJ9ZaP49xQ85FbKcSFfey%2C23mX6smjcbPMYU2j82E0Uf",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    ).then((response) => {
      console.log(
        response.json().then((data) => {
          console.log("Stories for kids", data);
          setPodcastData(data.shows);
        })
      );
    });
  }, []);

  const list_tracks = podcastData.map((p, index) => {
    return (
      <div
        class="col-md-3"
        onClick={() => getStoryData(p)}

        // data-bs-toggle="modal" data-bs-target="#staticBackdrop"
      >
        <img width="160" height="160" src={p.images[1].url} />
        <br />

        <span>{p.name}</span>
        <br />
        <br />
      </div>
    );
  });
  return (
    <>
      <div class="container">
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ float: "right" }}>
          <a href="/Profile">Profile</a> &nbsp;&nbsp;
          <button className="btn btn-primary" onClick={() => userLogout()}>
            Logout
          </button>
        </div>

        <h3>Podcasts</h3>

        <div class="row">{list_tracks}</div>
      </div>
    </>
  );
};
export default Homepage;
