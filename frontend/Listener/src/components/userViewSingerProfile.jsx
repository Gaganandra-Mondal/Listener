import { useState } from 'react';
import { FaPlay, FaUserPlus, FaUserMinus, FaMusic } from 'react-icons/fa';
import { useOutletContext } from "react-router-dom";

const mockArtist = {
    name: 'Arijit Singh',
    avatar: 'https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-53685247/53685247.jpg',
    followers: 12000,
    songs: [
        { id: 1, title: 'Midnight Drive', duration: '3:45' },
        { id: 2, title: 'Echoes', duration: '4:12' },
        { id: 3, title: 'Sunset Boulevard', duration: '3:58' },
    ],
};

const UserViewSingerProfile = () => {
    let theme = useOutletContext();
    const [isFollowing, setIsFollowing] = useState(false);
    const [playingSongId, setPlayingSongId] = useState(null);

    const handleFollow = () => setIsFollowing((prev) => !prev);

    const handlePlayAll = () => {
        setPlayingSongId('all');
        setTimeout(() => setPlayingSongId(null), 1500);
    };

    const handlePlaySong = (id) => {
        setPlayingSongId(id);
        setTimeout(() => setPlayingSongId(null), 1200);
    };

    return (
        <div className={`min-h-screen w-full bg-${theme.background} text-${theme.text} font-sans px-6 py-10 overflow-x-hidden`}>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                <div className="relative flex-shrink-0">
                    <img
                        src={mockArtist.avatar}
                        alt="Artist Avatar"
                        className="w-40 h-40 rounded-full object-cover shadow-2xl border-8 border-black"
                        style={{
                            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.7), 0 1.5px 8px 0 rgba(255,0,0,0.15)',
                        }}
                    />
                    <div className="absolute bottom-2 right-2 bg-red-500 rounded-full p-2 shadow-lg border-4 border-black">
                        <FaMusic className="text-white text-xl" />
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h1 className={`text-4xl font-extrabold mb-2 text-${theme.text} drop-shadow-lg`}>{mockArtist.name}</h1>
                    <span className="text-red-400 font-semibold">
                        {mockArtist.followers.toLocaleString()} followers
                    </span>
                </div>
                <div className="flex gap-4 mt-6 md:mt-0">
                    <button
                        onClick={handleFollow}
                        className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-200 shadow flex items-center gap-2 ${isFollowing ? 'bg-red-600/50 hover:bg-red-600/90 text-white': 'bg-white hover:bg-red-600 text-black'} cursor-pointer`}
                    >
                        {isFollowing ? <FaUserMinus /> : <FaUserPlus />}
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                    <button
                        onClick={handlePlayAll}
                        className="px-5 py-2 rounded-lg font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 shadow flex items-center gap-2 cursor-pointer"
                        disabled={playingSongId === 'all'}
                    >
                        <FaPlay className={playingSongId === 'all' ? 'animate-spin' : ''} />
                        {playingSongId === 'all' ? 'Playing...' : 'Play All'}
                    </button>
                </div>
            </div>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-bold mb-4 text-red-400">Songs</h2>
                <ul className="space-y-4">
                    {mockArtist.songs.map(song => (
                        <li
                            key={song.id}
                            className="flex flex-row gap-2 items-center justify-between px-3 py-3 rounded-md cursor-pointer border-l-4 border-transparent transition-all duration-200 hover:border-red-600 hover:bg-gray-100 dark:hover:bg-white/10 text-left w-full"
                        >
                            <div>
                                <span className={`text-lg font-medium text-${theme.text}`}>{song.title}</span>
                                <span className={`ml-4 text-${theme.hoverText} `}>{song.duration}</span>
                            </div>
                            <button
                                className={`px-4 py-1 rounded-md font-medium bg-red-600 hover:bg-red-600/50 cursor-pointer text-white transition-colors duration-200 flex items-center gap-1 ${playingSongId === song.id ? ' cursor-not-allowed' : ''
                                    }`}
                                onClick={() => handlePlaySong(song.id)}
                                disabled={playingSongId === song.id}
                            >
                                <FaPlay className={playingSongId === song.id ? 'animate-spin' : ''} />
                                {playingSongId === song.id ? 'Playing...' : 'Play'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserViewSingerProfile;
