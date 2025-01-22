import HaikuComponent from './Poem.jsx';

const App = () => {
  const poem1 = {
    line1: "Golden sunsets fade",
    line2: "Birds soar high in the cool sky",
    line3: "Night begins its dance",
    likes: 34,
  };
  const author1 = "Emily White";

  const poem2 = {
    line1: "Rain taps on the roof",
    line2: "A lone owl calls through the mist",
    line3: "Footprints in the mud",
    likes: 21,
  };
  const author2 = "David Green";

  const poem3 = {
    line1: "Autumn leaves falling",
    line2: "Whispers of the wind's story",
    line3: "Echoes of the past",
    likes: 50,
  };
  const author3 = "Sarah King";

  return (
    <div className="App gradient-animation bg-gradient-to-b from-blue-950 via-blue-800 to-blue-500 text-white min-h-screen">
      {/* Poems Section */}
      <section className="text-center py-20">
        <h2 className="text-4xl font-bold mb-12 text-shadow text-purple-300">Haiku Poems</h2>
        <div className="flex justify-center gap-8 flex-wrap">
          {/* Display the Haiku Components */}
          <HaikuComponent poem={poem1} author={author1} />
          <HaikuComponent poem={poem2} author={author2} />
          <HaikuComponent poem={poem3} author={author3} />
        </div>
      </section>
    </div>
  );
};

export default App;
