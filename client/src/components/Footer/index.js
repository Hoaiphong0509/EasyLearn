import React from 'react';
import { Link } from 'react-router-dom';

import { Facebook, GitHub } from '@mui/icons-material';

import s from './styles.module.scss';

const Footer = () => (
  <footer className={s.root}>
    <span>Nguyễn Hoài Phong ©</span>
    <div>
      <Link className={s.social} to="https://www.facebook.com/hp0509/">
        <Facebook />
      </Link>
      <Link className={s.social} to="https://github.com/Hoaiphong0509">
        <GitHub />
      </Link>
    </div>
  </footer>
);

export default Footer;
