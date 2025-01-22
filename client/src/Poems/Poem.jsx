/* eslint-disable react/prop-types */
import { useState } from "react";
const HaikuComponent = ({ poem, author }) => {
  const [likes, setLikes] = useState(poem.likes);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="bg-blue-800 p-6 rounded-lg shadow-lg max-w-xs w-full text-white">
      <h2 className="text-xl font-semibold text-purple-400 mb-4">{author}</h2>
      <p className="text-lg text-center mb-4">{poem.line1}</p>
      <p className="text-lg text-center mb-4">{poem.line2}</p>
      <p className="text-lg text-center mb-4">{poem.line3}</p>
      <div className="flex justify-between items-center">
        <button 
          className="bg-purple-400 text-white py-1 px-3 rounded-full hover:bg-purple-500" 
          onClick={handleLike}
        >
          Like {likes}
        </button>
        <button className="text-gray-300 hover:text-white">Comment</button>
      </div>
    </div>
  );
};

export default HaikuComponent;
