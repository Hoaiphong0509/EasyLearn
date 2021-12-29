import React from 'react';
import TextField from '@mui/material/TextField';
import s from './styles.module.scss';
import useStyles from './useStyles';
import classnames from 'classnames';
import { Button, FormControl } from '@mui/material';
import { useTranslation } from 'react-i18next';

import logo from 'assets/img/logoSymbol.png';
import { Link } from 'react-router-dom';

const Login = () => {
  const c = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classnames(s.root, c.root)}>
      <div className={s.container}>
        <div className={s.slogan}>
          Easy Learn<span className={s.thumb}> | {t('auth.learnToKnow')}</span>
        </div>
        <img src={logo} alt="logo" className={s.logo} />
        <FormControl className={s.formControl}>
          <TextField className={s.textField} label={t('auth.email')} />
          <TextField
            className={s.textField}
            label={t('auth.password')}
            type="password"
          />
          <Button className={s.btnLogin} variant="contained">
            {t('auth.login')}
          </Button>
        </FormControl>
        <div className={s.footer}>
          <Link className={s.link} to="/">
            {t('auth.backToHome')}
          </Link>
          <Link className={s.link} to="/register">
            {t('auth.register')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
