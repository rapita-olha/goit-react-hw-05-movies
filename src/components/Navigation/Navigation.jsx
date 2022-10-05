import { NavLink } from 'react-router-dom';

import s from './Navigation.module.scss';

export default function Navigation() {
  return (
    <>
      <nav className={s.nav}>
        <NavLink
          exact
          to="/"
          className={s.link}
          activeClassName={s.link_active}
        >
          Home
        </NavLink>

        <NavLink
          to="/movies"
          className={s.link}
          activeClassName={s.link_active}
        >
          Movies
        </NavLink>
      </nav>

      <hr />
    </>
  );
}
