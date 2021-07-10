import { THEME, THEME_LOCAL_STORAGE_KEY } from '../constants/theme';
import PropTypes from 'prop-types';
import { useLocalStorage } from 'react-use';
import { useEffect } from 'react';

const { DARK, LIGHT } = THEME;

HelloDarkness.propTypes = {
  theme: PropTypes.oneOf([DARK, LIGHT]),
  switchTheme: PropTypes.func,
};

HelloDarkness.defaultProps = {
  theme: LIGHT,
};
export default function HelloDarkness() {
  const [theme, setTheme] = useLocalStorage(
    THEME_LOCAL_STORAGE_KEY,
    THEME.LIGHT
  );
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === THEME.DARK) {
      document.documentElement.classList.add(THEME.DARK);
    } else {
      document.documentElement.classList.remove(THEME.DARK);
    }
  };
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const switchTheme = (theme) => {
    setTheme(theme);
  };
  const themeSwitcher = () => switchTheme(theme === DARK ? LIGHT : DARK);
  return (
    <button
      className="bg-transparent border-none cursor-pointer"
      onClick={themeSwitcher}
      data-testid="hello-darkness"
    >
      {theme === DARK ? '🌙' : '☀️'}
    </button>
  );
}
