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
          width="16"
          height="16"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.742 13.045C20.0643 13.225 19.3662 13.3161 18.665 13.316C16.53 13.316 14.525 12.486 13.019 10.98C12.0301 9.98533 11.3191 8.74884 10.9569 7.39378C10.5948 6.03871 10.5941 4.61239 10.955 3.25698C11.0001 3.08752 10.9998 2.90918 10.9542 2.73985C10.9086 2.57053 10.8192 2.41618 10.6951 2.29229C10.571 2.16839 10.4165 2.07931 10.2471 2.03397C10.0777 1.98863 9.8994 1.98864 9.73 2.03398C8.03316 2.48617 6.48507 3.37661 5.241 4.61598C1.343 8.51398 1.343 14.859 5.241 18.759C6.16753 19.6907 7.26964 20.4294 8.48354 20.9323C9.69745 21.4352 10.999 21.6924 12.313 21.689C13.6266 21.6927 14.9279 21.4357 16.1415 20.9329C17.3551 20.4301 18.4569 19.6916 19.383 18.76C20.6233 17.5157 21.5142 15.9668 21.966 14.269C22.0109 14.0996 22.0105 13.9214 21.9649 13.7522C21.9193 13.583 21.8301 13.4287 21.7062 13.3048C21.5823 13.1809 21.428 13.0916 21.2588 13.0461C21.0896 13.0005 20.9114 13.0001 20.742 13.045V13.045ZM17.97 17.346C17.229 18.0911 16.3475 18.6818 15.3767 19.084C14.4058 19.4862 13.3649 19.6918 12.314 19.689C11.2628 19.6916 10.2215 19.4858 9.25033 19.0834C8.27916 18.6811 7.39739 18.0902 6.656 17.345C3.538 14.226 3.538 9.14998 6.656 6.03098C7.25851 5.42915 7.9541 4.9284 8.716 4.54798C8.60448 5.98704 8.80496 7.43322 9.30373 8.78767C9.8025 10.1421 10.5878 11.3729 11.606 12.396C12.6268 13.4174 13.8573 14.2048 15.2123 14.704C16.5673 15.2032 18.0146 15.4021 19.454 15.287C19.0715 16.0476 18.5706 16.7426 17.97 17.346V17.346Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18.1406C11.6016 18.1406 11.2782 18.464 11.2782 18.8624V21.0281C11.2782 21.4265 11.6016 21.7499 12 21.7499C12.3985 21.7499 12.7219 21.4265 12.7219 21.0281V18.8624C12.7219 18.464 12.3985 18.1406 12 18.1406V18.1406Z"
            fill="currentColor"
          />
          <path
            d="M12 2.25006C11.6016 2.25006 11.2782 2.5735 11.2782 2.97194V5.13756C11.2782 5.536 11.6016 5.85944 12 5.85944C12.3985 5.85944 12.7219 5.536 12.7219 5.13756V2.97194C12.7219 2.5735 12.3985 2.25006 12 2.25006V2.25006Z"
            fill="currentColor"
          />
          <path
            d="M5.85936 12C5.85936 11.6015 5.53592 11.2781 5.13749 11.2781H2.97186C2.57342 11.2781 2.24999 11.6015 2.24999 12C2.24999 12.3984 2.57342 12.7218 2.97186 12.7218H5.13749C5.53592 12.7218 5.85936 12.3984 5.85936 12V12Z"
            fill="currentColor"
          />
          <path
            d="M21.0281 11.2781H18.8625C18.4641 11.2781 18.1406 11.6015 18.1406 12C18.1406 12.3984 18.4641 12.7218 18.8625 12.7218H21.0281C21.4266 12.7218 21.75 12.3984 21.75 12C21.75 11.6015 21.4266 11.2781 21.0281 11.2781V11.2781Z"
            fill="currentColor"
          />
          <path
            d="M7.14841 16.1298C6.95622 16.1298 6.77341 16.2048 6.63747 16.3407L5.10466 17.8735C4.96872 18.0094 4.89372 18.1923 4.89372 18.3844C4.89372 18.5766 4.96872 18.7594 5.10466 18.8954C5.2406 19.0313 5.42341 19.1063 5.6156 19.1063C5.80779 19.1063 5.9906 19.0313 6.12654 18.8954L7.65935 17.3626C7.9406 17.0813 7.9406 16.6219 7.65935 16.3407C7.52341 16.2048 7.3406 16.1298 7.14841 16.1298V16.1298Z"
            fill="currentColor"
          />
          <path
            d="M16.8516 7.87036C17.0437 7.87036 17.2266 7.79536 17.3625 7.65942L18.8953 6.12661C19.0312 5.99067 19.1062 5.80786 19.1062 5.61567C19.1062 5.42349 19.0312 5.24067 18.8953 5.10474C18.7594 4.9688 18.5766 4.8938 18.3844 4.8938C18.1922 4.8938 18.0094 4.9688 17.8734 5.10474L16.3406 6.63755C16.2047 6.77349 16.1297 6.9563 16.1297 7.14849C16.1297 7.34067 16.2047 7.52349 16.3406 7.65942C16.4766 7.79536 16.6594 7.87036 16.8516 7.87036V7.87036Z"
            fill="currentColor"
          />
          <path
            d="M6.12654 5.10474C5.9906 4.9688 5.80779 4.8938 5.6156 4.8938C5.42341 4.8938 5.2406 4.9688 5.10466 5.10474C4.96872 5.24067 4.89372 5.42349 4.89372 5.61567C4.89372 5.80786 4.96872 5.99067 5.10466 6.12661L6.63747 7.65942C6.77341 7.79536 6.95622 7.87036 7.14841 7.87036C7.3406 7.87036 7.52341 7.79536 7.65935 7.65942C7.79529 7.52349 7.87029 7.34067 7.87029 7.14849C7.87029 6.9563 7.79529 6.77349 7.65935 6.63755L6.12654 5.10474V5.10474Z"
            fill="currentColor"
          />
          <path
            d="M17.3625 16.3407C17.2266 16.2048 17.0437 16.1298 16.8516 16.1298C16.6594 16.1298 16.4766 16.2048 16.3406 16.3407C16.0594 16.6219 16.0594 17.0813 16.3406 17.3626L17.8734 18.8954C18.0094 19.0313 18.1922 19.1063 18.3844 19.1063C18.5766 19.1063 18.7594 19.0313 18.8953 18.8954C19.0312 18.7594 19.1062 18.5766 19.1062 18.3844C19.1062 18.1923 19.0312 18.0094 18.8953 17.8735L17.3625 16.3407V16.3407Z"
            fill="currentColor"
          />
          <path
            d="M12 7.5C9.52031 7.5 7.5 9.52031 7.5 12C7.5 14.4797 9.52031 16.5 12 16.5C14.4797 16.5 16.5 14.4797 16.5 12C16.5 9.52031 14.4797 7.5 12 7.5Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
