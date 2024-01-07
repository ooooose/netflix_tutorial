import React, { useState, useEffect } from 'react';
import { apiClient } from '../axios';
import YouTube from 'react-youtube';
import './Row.scss';

const base_url = 'https://image.tmdb.org/t/p/original';

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>('');

  useEffect(() => {
    async function fetchData() {
      const request = await apiClient.apiGet(fetchUrl);
      console.log(request.data);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      const trailerurl = await apiClient.apiGet(
        `/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
    console.log(trailerUrl);
  };

  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row-posters">
        {/* ポスターコンテンツ */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`Row-poster ${isLargeRow && 'Row-poster-large'}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
