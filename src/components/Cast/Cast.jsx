import { useState, useEffect } from 'react';

import { getCastInfo } from 'services/moviesApi';

import s from './Cast.module.scss';

import defaultImage from 'images/defaultImage.jpg';

export default function Cast({ movieId }) {

  const [cast, setCast] = useState([]);

  useEffect(() => {
    getCastInfo(movieId).then(setCast);
  }, [movieId]);
  
  return (
    <ul>
      {cast.map(({ id, profile_path, name, character }) => {

        return (
          <li key={id} className={s.item}>
            <img
              className={s.image}
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500${profile_path}`
                  : defaultImage
              }
              alt={name}
            />

            <p className={s.name}>{name}</p>
            <p className={s.name}>Character: {character}</p>
          </li>
        );
      })}
    </ul>
  );
}
