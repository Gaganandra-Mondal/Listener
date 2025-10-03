import { FaPause, FaPlay, FaForward, FaBackward, FaVolumeOff, FaVolumeUp } from "react-icons/fa";
import Draggable from "react-draggable";
import { useRef } from "react";

const FloatingPlayer = ({ theme, control, setControl, mute, setMute, onClose }) => {
  const nodeRef = useRef(null); // ✅ prevent findDOMNode usage

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} className="fixed bottom-4 right-4 z-[9999] cursor-move">
        <div
          className={`bg-${theme.background} text-${theme.text} rounded-xl shadow-lg p-3 w-80`}
        >
          {/* Top bar with close */}
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-sm">Now Playing</h4>
            <button onClick={onClose} className="text-xs px-2 py-1 rounded bg-gray-700">
              ✕
            </button>
          </div>

          {/* Track info */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-red-600 to-red-900"></div>
            <div className="min-w-0">
              <h4 className={`text-${theme.text} font-semibold text-sm truncate`}>
                Midnight Symphony
              </h4>
              <p className="text-gray-400 text-xs truncate">Orchestral Beats</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <button className="text-lg">
              <FaBackward />
            </button>
            <button
              onClick={() => setControl(!control)}
              className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white text-lg shadow-md"
            >
              {control ? <FaPause /> : <FaPlay />}
            </button>
            <button className="text-lg">
              <FaForward />
            </button>
          </div>

          {/* Volume */}
          <div className="flex justify-center">
            {mute ? (
              <FaVolumeOff className="cursor-pointer" onClick={() => setMute(!mute)} />
            ) : (
              <FaVolumeUp className="cursor-pointer" onClick={() => setMute(!mute)} />
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default FloatingPlayer;
