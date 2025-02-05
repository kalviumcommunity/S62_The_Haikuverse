import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PoemCard from './Poems/PoemCard'; 
import Users from './components/Users'; 
import AddUser from './components/AddUser'
import UpdateUser from './components/UpdateUser';

function App() {
  return (
    <Router>
      <div className="App gradient-animation bg-gradient-to-b from-blue-950 via-blue-800 to-blue-500 text-white min-h-screen">
        {/* Navigation Bar */}
        <nav className="p-4 bg-blue-900 text-white">
          <ul className="flex space-x-6 justify-center">
            <li>
              <Link to="/" className="text-lg">Home</Link>
            </li>
            <li>
              <Link to="/poems" className="text-lg">Poems</Link>
            </li>
            <li>
              <Link to="/users" className="text-lg">Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={
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
          } />

          {/* Poems Page Route */}
          <Route path="/poems" element={<PoemCard />} />

          {/* Users Page Route */}
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/update-user/:id" element={<UpdateUser />} />
        </Routes>

        {/* Footer Section */}
        <footer className="text-white py-8 mt-12 text-center border-t-4 border-purple-300">
          <p className="text-xl mb-4">Join the Haikuverse and start creating your own haiku poems today!</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
