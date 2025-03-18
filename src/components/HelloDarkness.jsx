import { THEME, THEME_LOCAL_STORAGE_KEY } from '../constants/theme';
import PropTypes from 'prop-types';
import { useLocalStorage } from 'react-use';
import { useEffect } from 'react';
import Tooltip from './Tooltip/Tooltip';

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
    <Tooltip
      content={
        theme === DARK ? 'Switch to light theme' : 'Switch to dark theme'
      }
    >
      <button
        aria-label={
          theme === DARK ? 'Switch to light theme' : 'Switch to dark theme'
        }
        className="bg-transparent border-none cursor-pointer text-[16px] p-0 inline-flex items-center text-gray-100 hover:text-blue-200 transition-colors duration-200"
        onClick={themeSwitcher}
        data-testid="hello-darkness"
      >
        {theme === DARK ? (
          <span className="inline-flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.742 13.045a8.086 8.086 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.026 8.026 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.936 9.936 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1 1 0 0 0-1.224-1.224Zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.952 7.952 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.973 9.973 0 0 0 7.848 2.891 8.037 8.037 0 0 1-1.484 2.059Z"
                fill="currentColor"
              />
            </svg>
          </span>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 18.14a.722.722 0 0 0-.722.722v2.166a.722.722 0 0 0 1.444 0v-2.166a.722.722 0 0 0-.722-.721ZM12 2.25a.722.722 0 0 0-.722.722v2.166a.722.722 0 0 0 1.444 0V2.972A.722.722 0 0 0 12 2.25ZM5.86 12a.722.722 0 0 0-.723-.722H2.972a.722.722 0 0 0 0 1.444h2.165A.722.722 0 0 0 5.86 12ZM21.028 11.278h-2.165a.722.722 0 0 0 0 1.444h2.165a.722.722 0 0 0 0-1.444ZM7.148 16.13a.72.72 0 0 0-.51.21l-1.533 1.534a.72.72 0 1 0 1.022 1.022l1.532-1.533a.724.724 0 0 0-.51-1.233ZM16.852 7.87a.72.72 0 0 0 .51-.21l1.533-1.533a.72.72 0 0 0 .211-.511.72.72 0 0 0-.722-.722.72.72 0 0 0-.51.21L16.34 6.639a.72.72 0 0 0-.211.51.72.72 0 0 0 .722.722ZM6.127 5.105a.72.72 0 0 0-.511-.211.72.72 0 0 0-.722.722.72.72 0 0 0 .21.51L6.638 7.66a.72.72 0 0 0 .511.211.72.72 0 0 0 .722-.722.72.72 0 0 0-.21-.51L6.126 5.105ZM17.363 16.34a.72.72 0 1 0-1.022 1.022l1.532 1.533a.72.72 0 0 0 1.022 0 .72.72 0 0 0 0-1.021l-1.532-1.533ZM12 7.5c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </Tooltip>
  );
}
