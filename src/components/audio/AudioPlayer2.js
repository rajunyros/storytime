import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";
import Backdrop from "./Backdrop";
import "./styles.css";
import tracks from "./tracks";
import { useLocation } from "react-router-dom";

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const AudioPlayer2 = () => {
  // State
  const { state } = useLocation();

  const [tracks1, setTracks1] = useState(state.episodes);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log("SSSSS", tracks1);
    // getTracks();
  }, []);

  const secondsToMinSecPadded = (time) => {
    const minutes = "0" + Math.floor(time / 60);
    const seconds = "0" + (time - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
  };

  console.log(secondsToMinSecPadded(241));

  const getTracks = () => {
    const accessToken =
      "BQBIys1y7KvFMhoie3c_2gB0rkIp0NMuCFil91HZgJ86JVoc69hbBKxyMPn0MLjQlpXh__Z43yu4QmzQ_S_1BkH2HP2ZXvsct0Hp27Y8ThqadarEr7i";
    fetch(
      "https://api.spotify.com/v1/shows/" +
        state.podcastData.id +
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
        // console.log("Episodes Data",data);
        const allTracks = [];

        data.items.map((p, index) => {
          let obj = {
            title: p.name,
            artist: p.language,
            audioSrc: p.audio_preview_url,
            image: p.images[0].url,
            color: "#ffb77a",
          };
          allTracks.push(obj);
        });

        console.log("aaaaaaaaa", allTracks);
        const { title, artist, color, image, audioSrc } = allTracks[0];
        // console.log("Title",title)
        // setTracks1(allTracks);

        setTracks1([allTracks]);

        console.log("TracksData", tracks1);
      });
    });
  };

  // // Destructure for conciseness
  // const title = allTracks[trackIndex].title;
  // const artist = tracks1[trackIndex].artist;
  // const color = tracks1[trackIndex].color;
  // const image = tracks1[trackIndex].image;
  // const audioSrc = tracks1[trackIndex].audioSrc;

  const { title, artist, color, image, audioSrc, total_duration } =
    tracks1[trackIndex];
  const [playTime, setPlaytime] = useState(total_duration);

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Destructure for conciseness
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #777), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    // alert("Hii")
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);

    console.log("SSSSSS", audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const selectedTrack = (i) => {
    setTrackIndex(i);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const list_tracks = tracks1.map((p, index) => {
    return (
      <div
        class="audioTrack"
        role="button"
        onClick={() => selectedTrack(index)}
      >
        <div>
          <img width="70" height="70" src={p.image} />
          <span>{p.artist}</span>. &nbsp;
          <span>{p.title}</span>
        </div>
      </div>
    );
  });

  return (
    <div className="audio-player2">
      <div className="track-info2">
        <div class="grid grid-cols-2 gap-4">
          <div class="row">
            <div class="col-sm-5">
              <div>
                <img
                  className="artwork2"
                  src={image}
                  alt={`track artwork for ${title} by ${artist}`}
                />
                <h2 className="title">{title}</h2>
                <h3 className="artist">{artist}</h3>
              </div>
            </div>
            <div class="col-sm-6 ScrollStyle">
              Episodes <br />
              <br />
              {list_tracks}
            </div>
          </div>
        </div>
        <br />

        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
        <div class="d-flex justify-content-between">
          <div>
            {secondsToMinSecPadded(parseInt(audioRef.current.currentTime))}
          </div>
          <div>{secondsToMinSecPadded(parseInt(duration))}</div>
        </div>

        <div class="d-flex justify-content-center">{total_duration}</div>

        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
          playTime={playTime}
          playerType="audio-controls2"
        />
      </div>
      {/*  <Backdrop
        trackIndex={trackIndex}
        activeColor={color}
        isPlaying={isPlaying}
      />*/}
      <br />
    </div>
  );
};

export default AudioPlayer2;
