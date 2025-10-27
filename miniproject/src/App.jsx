/**
 * NetflixClone.jsx
 * Single-file React component (default export) that demonstrates a Netflix-like UI.
 * Features:
 * - Responsive header with logo, search, profile
 * - Hero banner
 * - Multiple horizontally scrollable rows (click-and-drag + arrow buttons)
 * - Movie cards with hover effects and "Play" / "More" actions
 * - Modal to show details (with optional YouTube trailer embed placeholder)
 * - Simple filter/search
 *
 * How to use:
 * 1. Create a React app (Vite or Create React App) and enable Tailwind CSS.
 * 2. Copy this file into /src/components/NetflixClone.jsx
 * 3. Import and render <NetflixClone /> in your App.jsx
 *
 * Tailwind setup (brief):
 * - Install Tailwind and add to your CSS per Tailwind docs.
 * - Ensure index.css contains the Tailwind directives.
 *
 * This component uses no external data sources so it works offline. You can
 * replace `MOVIES` with real API calls (TMDB) later.
 */

import React, { useEffect, useRef, useState } from "react";

const MOVIES = [
  {
    id: 1,
    title: "Midnight Runner",
    overview:
      "When night falls a lone runner discovers a secret that will change his life forever.",
    backdrop:
      "https://images.unsplash.com/photo-1505682634904-d7c20b7f4b82?auto=format&fit=crop&w=1400&q=60",
    poster:
      "https://images.unsplash.com/photo-1517604931442-7f4549f0c7d1?auto=format&fit=crop&w=600&q=60",
    year: 2024,
    rating: "8.2",
  },
  {
    id: 2,
    title: "Ocean Whisper",
    overview:
      "A marine biologist follows a haunting melody under the sea and uncovers a forgotten civilization.",
    backdrop:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=60",
    poster:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=60",
    year: 2023,
    rating: "7.5",
  },
  {
    id: 3,
    title: "Neon Nights",
    overview:
      "A neon-lit heist story where loyalties and illusions blur in the city that never sleeps.",
    backdrop:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=60",
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=600&q=60",
    year: 2022,
    rating: "8.0",
  },
  {
    id: 4,
    title: "Starlit Garden",
    overview:
      "Two strangers build a rooftop garden and find out the stars have plans for them.",
    backdrop:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=60",
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=600&q=60",
    year: 2025,
    rating: "7.9",
  },
  // duplicate a few to fill rows
  {
    id: 5,
    title: "Desert Echoes",
    overview: "A caravan crosses the desert carrying more than trade.",
    backdrop:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=60",
    poster:
      "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?auto=format&fit=crop&w=600&q=60",
    year: 2021,
    rating: "7.1",
  },
  {
    id: 6,
    title: "City of Timber",
    overview: "A detective tracks a clue through an impossible wooden maze.",
    backdrop:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1400&q=60",
    poster:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=60",
    year: 2020,
    rating: "6.9",
  },
];

function Header({ onSearch }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-red-500 font-bold text-2xl">Netflick</div>
          <nav className="hidden md:flex gap-4 text-sm text-gray-200">
            <a className="hover:text-white">Home</a>
            <a className="hover:text-white">TV Shows</a>
            <a className="hover:text-white">Movies</a>
            <a className="hover:text-white">My List</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <input
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search"
            className="hidden sm:inline-block bg-gray-800 text-sm px-3 py-1 rounded"
          />
          <button className="text-sm px-3 py-1 bg-red-600 rounded-md">Sign In</button>
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=60"
            alt="profile"
            className="w-8 h-8 rounded"
          />
        </div>
      </div>
    </header>
  );
}

function Hero({ movie, onPlay }) {
  if (!movie) return null;
  return (
    <section
      className="relative h-[55vh] md:h-[70vh] flex items-end"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.85)), url(${movie.backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl mx-auto p-8 text-white">
        <h1 className="text-3xl md:text-5xl font-extrabold">{movie.title}</h1>
        <p className="max-w-2xl mt-4 text-sm md:text-base text-gray-200">{movie.overview}</p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onPlay(movie)}
            className="bg-white text-black px-6 py-2 rounded font-semibold"
          >
            Play
          </button>
          <button className="bg-gray-700/60 px-4 py-2 rounded">More Info</button>
        </div>
      </div>
    </section>
  );
}

function Row({ title, items, onOpen }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir === "left" ? -ref.current.offsetWidth : ref.current.offsetWidth, behavior: "smooth" });
  };

  // Drag-to-scroll
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let isDown = false;
    let startX;
    let scrollLeft;

    const onMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.classList.add("cursor-grabbing");
    };
    const onMouseLeave = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };
    const onMouseUp = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5; // scroll-fast
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mx-4 md:mx-0 mb-2">
        <h2 className="text-white font-semibold">{title}</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="bg-black/60 text-white p-2 rounded">
            ◀
          </button>
          <button onClick={() => scroll("right")} className="bg-black/60 text-white p-2 rounded">
            ▶
          </button>
        </div>
      </div>

      <div ref={ref} className="flex gap-3 overflow-x-auto no-scrollbar px-4 md:px-0">
        {items.map((m) => (
          <div
            key={m.id}
            className="min-w-[150px] md:min-w-[200px] hover:scale-105 transform transition relative rounded overflow-hidden cursor-pointer"
            onClick={() => onOpen(m)}
          >
            <img src={m.poster} alt={m.title} className="w-full h-40 object-cover" />
            <div className="p-2 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 left-0 right-0 text-white text-sm">
              <div className="font-semibold">{m.title}</div>
              <div className="text-xs text-gray-300">{m.year} · {m.rating}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Modal({ movie, onClose }) {
  if (!movie) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#111] max-w-4xl w-full rounded overflow-hidden">
        <div className="relative">
          <img src={movie.backdrop} alt={movie.title} className="w-full h-56 object-cover" />
          <button onClick={onClose} className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded">Close</button>
        </div>
        <div className="p-4 text-white">
          <h3 className="text-2xl font-bold">{movie.title}</h3>
          <p className="mt-2 text-sm text-gray-300">{movie.overview}</p>
          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 bg-white text-black rounded">Play</button>
            <button className="px-4 py-2 bg-gray-800 rounded">Add to List</button>
          </div>

          <div className="mt-4">
            {/* Trailer placeholder - replace with real YouTube embed when available */}
            <div className="aspect-video bg-black/60 flex items-center justify-center text-gray-400">Trailer Placeholder</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NetflixClone() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [heroMovie, setHeroMovie] = useState(MOVIES[0]);

  useEffect(() => {
    // rotate hero every 6 seconds
    const t = setInterval(() => {
      setHeroMovie((prev) => {
        const idx = MOVIES.findIndex((m) => m.id === prev.id);
        return MOVIES[(idx + 1) % MOVIES.length];
      });
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const onOpen = (movie) => setSelected(movie);
  const onClose = () => setSelected(null);

  const filtered = MOVIES.filter(
    (m) => m.title.toLowerCase().includes(query.toLowerCase()) || m.overview.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Header onSearch={setQuery} />

      <main className="pt-20">
        <Hero movie={heroMovie} onPlay={onOpen} />

        <div className="max-w-7xl mx-auto px-4 md:px-0 pb-12">
          <Row title="Trending Now" items={filtered} onOpen={onOpen} />
          <Row title="Because you watched" items={MOVIES} onOpen={onOpen} />
          <Row title="Top Picks" items={MOVIES.slice().reverse()} onOpen={onOpen} />
        </div>
      </main>

      <footer className="text-gray-400 text-sm p-6 text-center">Made with ❤️ — Demo Netflix clone UI</footer>

      <Modal movie={selected} onClose={onClose} />
    </div>
  );
}
