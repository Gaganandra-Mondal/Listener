import { useEffect, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaUserPlus,
  FaUserMinus,
  FaMusic,
} from "react-icons/fa";
import { useOutletContext, useParams } from "react-router-dom";

const UserViewSingerProfile = () => {
  let { theme, songToggle, songPlay } = useOutletContext();
  const { sid } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [playingSongId, setPlayingSongId] = useState(null);
  const [ArtistDetails, setArtistDetails] = useState({
    name: "",
    img: "",
    followers: 0,
  });
  const [mockArtist, setMockArtist] = useState([]);

  const handleFollow = () => setIsFollowing((prev) => !prev);

  const handlePlayAll = () => {
    setPlayingSongId("all");
    setTimeout(() => setPlayingSongId(null), 1500);
  };

  const handlePlaySong = (id) => {
    setPlayingSongId(id);
    setTimeout(() => setPlayingSongId(null), 1200);
  };

  useEffect(() => {
    try {
      async function getArtistDetails() {
        const response = await fetch(`http://localhost:3333/singer/${sid}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          let data = await response.json();
          alert(data.message);
          return;
        }
        const data = await response.json();
        // console.log(data.message);
        setArtistDetails(data.message);
      }
      async function getArtistDetails2() {
        const response = await fetch(`http://localhost:3333/singer2/${sid}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          // let data = await response.json();
          // alert(data.message);
          setMockArtist([]);
          return;
        }
        const data = await response.json();
        // console.log(data.message);
        setMockArtist(data.message);
      }
      getArtistDetails();
      getArtistDetails2();
    } catch (err) {
      console.log(err.message);
      setMockArtist([]);
    }
  }, [sid]);

  return (
    <div
      className={`h-full w-full bg-${theme.background} text-${theme.text} font-sans px-6 py-10 overflow-x-hidden overflow-y-auto`}
    >
      <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
        <div className="relative flex-shrink-0">
          <img
            src={ArtistDetails.img}
            alt="Artist Avatar"
            className={`w-40 h-40 rounded-full object-cover shadow-2xl border-8 border-black`}
            style={{
              boxShadow:
                "0 8px 32px 0 rgba(0,0,0,0.7), 0 1.5px 8px 0 rgba(255,0,0,0.15)",
            }}
          />
          <div className="absolute bottom-2 right-2 bg-red-500 rounded-full p-2 shadow-lg border-4 border-black">
            <FaMusic className="text-white text-xl" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1
            className={`text-4xl font-extrabold mb-2 text-${theme.text} drop-shadow-lg`}
          >
            {ArtistDetails.name}
          </h1>
          <span className="text-red-400 font-semibold">
            {ArtistDetails.followers || 0} followers
          </span>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <button
            onClick={handleFollow}
            className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-200 shadow flex items-center gap-2 ${
              isFollowing
                ? "bg-red-600/50 hover:bg-red-600/90 text-white"
                : "bg-white hover:bg-red-600 text-black"
            } cursor-pointer`}
          >
            {isFollowing ? <FaUserMinus /> : <FaUserPlus />}
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
          <button
            onClick={handlePlayAll}
            className="px-5 py-2 rounded-lg font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 shadow flex items-center gap-2 cursor-pointer"
            disabled={playingSongId === "all"}
          >
            <FaPlay className={playingSongId === "all" ? "animate-spin" : ""} />
            {playingSongId === "all" ? "Playing..." : "Play All"}
          </button>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-red-400">
          Songs ({mockArtist.length})
        </h2>
        {mockArtist.length === 0 && (
          <p className="text-center text-gray-500">No songs available.</p>
        )}
        <ul className="space-y-4">
          {mockArtist?.map((song) => (
            <li
              key={song.id}
              className="flex flex-row gap-2 items-center justify-between px-3 py-3 rounded-md cursor-pointer border-l-4 border-transparent transition-all duration-200 hover:border-red-600 hover:bg-gray-100 dark:hover:bg-white/10 text-left w-full"
            >
              <div>
                <span className={`text-lg font-medium text-${theme.text}`}>
                  {song.name}
                </span>
                <span className={`ml-4 text-${theme.hoverText} `}>
                  {Math.floor(song.duration / 60)}:
                  {String(song.duration % 60).padStart(2, 0)}
                </span>
              </div>
              <button
                className={`px-4 py-1 rounded-md font-medium bg-red-600 hover:bg-red-600/50 cursor-pointer text-white transition-colors duration-200 flex items-center gap-1 ${
                  playingSongId === song.id ? " cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  handlePlaySong(song.id);
                  songPlay(song.url);
                }}
                disabled={playingSongId === song.id}
              >
                {songToggle[song.url] ? (
                  <FaPause
                    className={playingSongId === song.id ? "animate-spin" : ""}
                  />
                ) : (
                  <FaPlay
                    className={playingSongId === song.id ? "animate-spin" : ""}
                  />
                )}
                {songToggle[song.url] ? "Playing..." : "Play"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserViewSingerProfile;
