import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import AlbumsSection from './components/Section/AlbumsSection';
import { fetchNewAlbums, fetchTopAlbums } from './api/albums';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <AlbumsSection title="Top Albums" loadAlbums={fetchTopAlbums} initialShowGrid />
      <AlbumsSection
        title="New Albums"
        loadAlbums={fetchNewAlbums}
        initialShowGrid={false}
      />
    </div>
  );
}

export default App;
