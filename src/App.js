import { Switch, Route } from 'react-router';
import { lazy, Suspense } from 'react';

import Navigation from 'components/Navigation/Navigation';

import './App.scss';

const HomeView = lazy(() =>
  import('./views/HomeView/HomeView'),
);
const MoviesView = lazy(() =>
  import('./views/MoviesView/MoviesView'),
);
const MovieDetailsView = lazy(() =>
  import(
    './views/MovieDetailsView/MovieDetailsView'
  ),
);
const NotFoundView = lazy(() =>
  import(
    './views/NotFoundView/NotFoundView'
  ),
);

function App() {
  return (
    <div className="App">
      <h1 className="visually-hidden">Movies</h1>
      <Navigation />

      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>

          <Route path="/movies/:slug">
            
            <MovieDetailsView />
          </Route>

          <Route path="/movies/">
            <MoviesView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;