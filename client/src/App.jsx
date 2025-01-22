function App() {
  return (
    <div className="App gradient-animation bg-gradient-to-b from-blue-950 via-blue-800 to-blue-500 text-white min-h-screen">
      {/* Full-Screen Landing Section */}
      {/* <p className="text-2xl"> XYZ</p> */}
      <section className="h-screen w-full flex items-center justify-center section-padding">
        <div className="bg-opacity-50 w-full h-full flex items-center justify-center text-center text-white px-6 md:px-12 overlay-bg rounded-container">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow text-purple-300">The Haikuverse</h1>
            <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto">
              The Haikuverse is a website that creates haiku poems by randomly generating three lines. Users can edit these poems by selecting from a collection of randomly generated words. Users can create, edit, save, share, and explore poems in a vibrant community.
            </p>
            <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto">
              The platform allows for creativity by enabling users to choose words from a curated list to modify the generated haiku. Users can also interact with each other poems by liking, commenting, and viewing other creations in the Haikuverse community.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="text-center py-20">
        <h2 className="text-4xl font-bold mb-12 text-shadow text-purple-300">Features</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Feature Box 1 */}
          <div className="bg-blue-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-2xl font-semibold mb-4 text-purple-400">Generates Haiku Poems</h3>
            <p className="text-lg">Automatically generates 3-line haiku poems, creating unique combinations each time.</p>
          </div>

          {/* Feature Box 2 */}
          <div className="bg-blue-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-2xl font-semibold mb-4 text-purple-400">Editable Poems</h3>
            <p className="text-lg">Users can select words from a collection of randomly generated options to change the poem content.</p>
          </div>

          {/* Feature Box 3 */}
          <div className="bg-blue-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-2xl font-semibold mb-4 text-purple-400">Save Poems</h3>
            <p className="text-lg">Users can save their favorite poems for later viewing.</p>
          </div>

          {/* Feature Box 4 */}
          <div className="bg-blue-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-2xl font-semibold mb-4 text-purple-400">Explore Community Poems</h3>
            <p className="text-lg">Discover poems created by other users and explore the Haikuverse community.</p>
          </div>

          {/* Feature Box 5 */}
          <div className="bg-blue-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-2xl font-semibold mb-4 text-purple-400">Engage with Poems</h3>
            <p className="text-lg">Like and comment on poems shared by others, building a creative and collaborative space.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-white py-8 mt-12 text-center border-t-4 border-purple-300">
        <p className="text-xl mb-4">Join the Haikuverse and start creating your own haiku poems today!</p>
      </footer>
    </div>
  );
}

export default App;