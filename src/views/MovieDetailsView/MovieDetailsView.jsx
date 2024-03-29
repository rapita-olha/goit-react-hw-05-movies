import {
  useParams,
  useLocation,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';

import { getFilmById } from 'services/moviesApi';

import ButtonGoBack from 'components/ButtonGoBack/ButtonGoBack';
import MovieCard from 'components/MovieCard/MovieCard';

import s from './MovieDetailsView.module.scss';

const Cast = lazy(() =>
  import('../../components/Cast/Cast'),
);
const Reviews = lazy(() =>
  import('../../components/Reviews/Reviews'),
);
const Trailer = lazy(() =>
  import('../../components/Trailer/Trailer'),
);

export default function MovieDetailsView() {
  const [movieDetails, setMovieDetails] = useState(null);
  
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];

  const location = useLocation();
  const { url } = useRouteMatch();
  
  useEffect(() => {
    getFilmById(movieId).then(setMovieDetails);
  }, [movieId]);
  
  if (!movieDetails) {
    return <></>;
  }

  return (
    <div className={s.box}>
      <ButtonGoBack />
      <MovieCard movieDetails={movieDetails} />
      <hr />
      <div className={s.boxAdditional}>
        <h2 className={s.title}>Additional information</h2>

        <ul>
          <li>
            <NavLink
              to={{
                pathname: url + '/cast',
                state: { ...location.state, id: movieId },
              }}
              className={s.link}
              activeClassName={s.link_active}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: url + '/reviews',
                state: { ...location.state, id: movieId },
              }}
              className={s.link}
              activeClassName={s.link_active}
            >
              Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: url + '/trailer',
                state: { ...location.state, id: movieId },
              }}
              className={s.link}
              activeClassName={s.link_active}
            >
              Trailer
            </NavLink>
          </li>
        </ul>
      </div>

      <Suspense fallback={<h2>Loading in movie card...</h2>}>
        <Switch>
          <Route exact path={`${url}/cast`}>
            <Cast movieId={movieId} />
          </Route>

          <Route exact path={`${url}/reviews`}>
            <Reviews movieId={movieId} />
          </Route>

          <Route exact path={`${url}/trailer`}>
            <Trailer movieId={movieId} />
          </Route>

        </Switch>
      </Suspense>
    </div>
  );
}