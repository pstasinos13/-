import { useMemo, useState } from 'react';

export default function MovieIMDbListDemo() {
  const [imdbLink, setImdbLink] = useState('');
  const [category, setCategory] = useState('movie');
  const [movies, setMovies] = useState([
    {
      title: 'Interstellar',
      year: '2014',
      runtime: '169 min',
      imdb: 'https://www.imdb.com/title/tt0816692/',
      poster:
        'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDUtY2E5MC00MzI2LWEzZmYtZDc1NzQwYzQ2OTQ2XkEyXkFqcGc@._V1_.jpg',
      rating: '8.7',
      genre: 'Sci‑Fi / Adventure / Drama',
      category: 'movie',
    },
    {
      title: 'Heat',
      year: '1995',
      runtime: '170 min',
      imdb: 'https://www.imdb.com/title/tt0113277/',
      poster:
        'https://m.media-amazon.com/images/M/MV5BNDQ3OTYzMDA5NV5BMl5BanBnXkFtZTgwMTU2NzE0MDE@._V1_.jpg',
      rating: '8.3',
      genre: 'Crime / Drama / Thriller',
      category: 'movie',
    },
  ]);

  const previewId = useMemo(() => {
    const match = imdbLink.match(/tt\d+/);
    return match?.[0] ?? '';
  }, [imdbLink]);

  const addMovie = () => {
    if (!previewId) return;

    const newMovie = {
      title: `IMDb Title (${previewId})`,
      year: 'Loading…',
      runtime: 'Loading…',
      imdb: imdbLink,
      poster: 'https://placehold.co/240x360?text=Poster',
      rating: '—',
      genre: 'Fetching from IMDb…',
      category,
    };

    const sortedMovies = [...movies, newMovie].sort((a, b) =>
      a.title.localeCompare(b.title, 'el', { sensitivity: 'base' })
    );

    setMovies(sortedMovies);
    setImdbLink('');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 space-y-3">
          <h1 className="text-4xl font-bold">🎬 Ο Σινεφίλος</h1>
          <p className="text-neutral-400">
            IMDb archive με αναζήτηση και φίλτρο ανά κατηγορία.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 mb-8 space-y-4">
          <div className="grid md:grid-cols-3 gap-3">
            <input
              value={imdbLink}
              onChange={(e) => setImdbLink(e.target.value)}
              placeholder="Paste IMDb link here…"
              className="bg-neutral-950 border border-neutral-700 rounded-2xl px-4 py-3"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-neutral-950 border border-neutral-700 rounded-2xl px-4 py-3"
            >
              <option value="movie">🎞️ Ταινία</option>
              <option value="series">📺 Σειρά</option>
              <option value="cartoon">🧸 Καρτούν / Άνιμε</option>
              <option value="documentary">🎥 Ντοκιμαντέρ</option>
            </select>

            <button
              onClick={addMovie}
              className="bg-white text-black rounded-2xl px-5 py-3 font-medium"
            >
              Add title
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {movies.map((movie) => (
            <div
              key={movie.imdb}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-4 flex gap-4 items-center shadow-lg"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-24 h-36 object-cover rounded-xl bg-neutral-800"
              />

              <div className="flex-1">
                <a
                  href={movie.imdb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-semibold hover:underline cursor-pointer block"
                >
                  {movie.title} ({movie.year})
                </a>

                <div className="mt-2 text-neutral-300">
                  ⭐ {movie.rating} · {movie.runtime}
                </div>

                <div className="mt-1 text-neutral-400">{movie.genre}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
