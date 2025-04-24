'use client';

import { useState } from 'react';
import { IoMic, IoMicOff } from 'react-icons/io5';  // Import the mic icons
import { startListening, stopListening } from '../../utils/speechRecognition';

export default function VoiceInput({ onSubmit }) {
  const [listening, setListening] = useState(false);

  const handleResult = (transcript) => {
    // Automatically trigger the submit after speech recognition
    onSubmit(transcript);
  };

  const handleEnd = () => {
    setListening(false);
  };

  const handleMicClick = () => {
    if (listening) {
      stopListening();
    } else {
      try {
        startListening({ onResult: handleResult, onEnd: handleEnd });
        setListening(true);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={handleMicClick}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
      >
        {/* Show either mic on or off depending on the state */}
        {listening ? (
          <IoMicOff className="text-gray-500 text-2xl" />
        ) : (
          <IoMic className="text-gray-500 text-2xl" />
        )}
      </button>
    </div>
  );
}
