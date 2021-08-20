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
      aria-label={
        theme === DARK ? 'Switch to light theme' : 'Switch to dark theme'
      }
      className="bg-transparent border-none cursor-pointer text-[16px] p-0 inline-flex items-center text-gray-100 hover:text-blue-200 transition-colors duration-200"
      onClick={themeSwitcher}
      data-testid="hello-darkness"
    >
      {theme === DARK ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2em"
          height="1.2em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93a9.93 9.93 0 0 0 7.07-2.929a10.007 10.007 0 0 0 2.583-4.491a1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343a7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483a10.027 10.027 0 0 0 2.89 7.848a9.972 9.972 0 0 0 7.848 2.891a8.036 8.036 0 0 1-1.484 2.059z"
            fill="currentColor"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2em"
          height="1.2em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 512 512"
        >
          <path
            d="M256 387c-8.5 0-15.4 6.9-15.4 15.4v46.2c0 8.5 6.9 15.4 15.4 15.4s15.4-6.9 15.4-15.4v-46.2c0-8.5-6.9-15.4-15.4-15.4z"
            fill="currentColor"
          ></path>
          <path
            d="M256 48c-8.5 0-15.4 6.9-15.4 15.4v46.2c0 8.5 6.9 15.4 15.4 15.4s15.4-6.9 15.4-15.4V63.4c0-8.5-6.9-15.4-15.4-15.4z"
            fill="currentColor"
          ></path>
          <path
            d="M125 256c0-8.5-6.9-15.4-15.4-15.4H63.4c-8.5 0-15.4 6.9-15.4 15.4s6.9 15.4 15.4 15.4h46.2c8.5 0 15.4-6.9 15.4-15.4z"
            fill="currentColor"
          ></path>
          <path
            d="M448.6 240.6h-46.2c-8.5 0-15.4 6.9-15.4 15.4s6.9 15.4 15.4 15.4h46.2c8.5 0 15.4-6.9 15.4-15.4s-6.9-15.4-15.4-15.4z"
            fill="currentColor"
          ></path>
          <path
            d="M152.5 344.1c-4.1 0-8 1.6-10.9 4.5l-32.7 32.7c-2.9 2.9-4.5 6.8-4.5 10.9s1.6 8 4.5 10.9c2.9 2.9 6.8 4.5 10.9 4.5 4.1 0 8-1.6 10.9-4.5l32.7-32.7c6-6 6-15.8 0-21.8-2.9-2.9-6.8-4.5-10.9-4.5z"
            fill="currentColor"
          ></path>
          <path
            d="M359.5 167.9c4.1 0 8-1.6 10.9-4.5l32.7-32.7c2.9-2.9 4.5-6.8 4.5-10.9s-1.6-8-4.5-10.9c-2.9-2.9-6.8-4.5-10.9-4.5-4.1 0-8 1.6-10.9 4.5l-32.7 32.7c-2.9 2.9-4.5 6.8-4.5 10.9s1.6 8 4.5 10.9c2.9 2.9 6.8 4.5 10.9 4.5z"
            fill="currentColor"
          ></path>
          <path
            d="M130.7 108.9c-2.9-2.9-6.8-4.5-10.9-4.5-4.1 0-8 1.6-10.9 4.5-2.9 2.9-4.5 6.8-4.5 10.9 0 4.1 1.6 8 4.5 10.9l32.7 32.7c2.9 2.9 6.8 4.5 10.9 4.5 4.1 0 8-1.6 10.9-4.5 2.9-2.9 4.5-6.8 4.5-10.9s-1.6-8-4.5-10.9l-32.7-32.7z"
            fill="currentColor"
          ></path>
          <path
            d="M370.4 348.6c-2.9-2.9-6.8-4.5-10.9-4.5-4.1 0-8 1.6-10.9 4.5-6 6-6 15.8 0 21.8l32.7 32.7c2.9 2.9 6.8 4.5 10.9 4.5 4.1 0 8-1.6 10.9-4.5 2.9-2.9 4.5-6.8 4.5-10.9s-1.6-8-4.5-10.9l-32.7-32.7z"
            fill="currentColor"
          ></path>
          <path
            d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96z"
            fill="currentColor"
          ></path>
        </svg>
      )}
    </button>
  );
}
