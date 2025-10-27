import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const API_KEY = 'your_tmdb_api_key_here';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const AppContainer = styled.div`
  background: #000;
  min-height: 100vh;
  color: white;
  font-family: Arial, sans-serif;
`;

const GlobalStyles = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #141414;
  padding: 20px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
`;

const Logo = styled.img`
  width: 100px;
`;

const NavLinks = styled.div`
  a {
    color: white;
    margin: 0 15px;
    text-decoration: none;
    font-size: 1rem;
  }
`;

const Container = styled.div`
  padding: 80px 20px;
`;

const Row = styled.div`
  display: flex;
  overflow-x: auto;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-left: 20px;
`;

const Card = styled.div`
  width: 200px;
  margin: 10px;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const Video = styled.video`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;

const MovieCard = ({ movie }) => (
  <Link to={`/movie/${movie.id}`}>
    <Card>
      <Poster src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
    </Card>
  </Link>
);

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Title>Popular Movies</Title>
      <Row>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Row>
    </Container>
  );
};

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Title>Top Rated Movies</Title>
      <Row>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Row>
    </Container>
  );
};

const TVShows = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`)
      .then((response) => setShows(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Title>Popular TV Shows</Title>
      <Row>
        {shows.map((show) => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </Row>
    </Container>
  );
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!movie) return <Container>Loading...</Container>;

  return (
    <Container>
      <h2>{movie.title}</h2>
      <Poster src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <Video controls>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Video>
    </Container>
  );
};

const Profile = () => (
  <Container>
    <h2>User Profile</h2>
    <p>Manage your account settings here.</p>
  </Container>
);

function App() {
  return (
    <Router>
      <GlobalStyles>
        <AppContainer>
          <Nav>
            <Link to="/">
              <Logo
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
              />
            </Link>
            <NavLinks>
              <Link to="/">Home</Link>
              <Link to="/movies">Movies</Link>
              <Link to="/tv">TV Shows</Link>
              <Link to="/profile">Profile</Link>
            </NavLinks>
          </Nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv" element={<TVShows />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </AppContainer>
      </GlobalStyles>
    </Router>
  );
}

export default App;