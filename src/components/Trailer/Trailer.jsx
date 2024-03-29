import { useState, useEffect } from 'react';

import { getTrailerVideo } from 'services/moviesApi';

export default function Trailer({ movieId }) {
  const [trailer, setTrailer] = useState([]);

  useEffect(() => {
    getTrailerVideo(movieId).then(setTrailer);
  }, [movieId]);

  return (
    <>
      {trailer.map(({ id, key, name }) => (
        <iframe
          key={id}
          src={`https://www.youtube.com/embed/${key}`}
          title={name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          // width="560"
          // height="315"
        ></iframe>
      ))}
    </>
  );
}
