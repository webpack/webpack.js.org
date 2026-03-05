import { useState, useEffect } from 'react';
import './SidebarItem.scss';
import list2Tree from '../../utilities/list2Tree';
import ChevronRightIcon from '../../styles/icons/chevron-right.svg';
import BarIcon from '../../styles/icons/vertical-bar.svg';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const block = 'sidebar-item';

/**
 * Checks whether the item should be expanded
 *
 * @param {object} props - The current props
 */
function _isOpen(props) {
  return RegExp(`${props.currentPage}/?$`).test(props.url);
}

export default function SidebarItem({ title, anchors = [], url, currentPage }) {
  const [open, setOpen] = useState(() => _isOpen({ currentPage, url }));

  useEffect(() => {
    setOpen(_isOpen({ currentPage, url }));
  }, [currentPage, url]);

  function scrollTop(event) {
    // there're two cases
    // 1. location.pathname or location.hash changes which will be handled by useEffect in Page.jsx
    // 2. location.pathname and location.hash doesn't change at all
    if (window.location.hash !== '') {
      // case 1
      return;
    }
    if (!event.metaKey && !event.ctrlKey) {
      // case 2
      window.scrollTo(0, 0);
    }
  }

  /**
   * Toggles the open state (expanded/collapsed)
   *
   * @param {object} e - Click event
   */
  function _toggle() {
    setOpen(!open);
  }

  /**
   * Generate the url for the given [anchor] depending on the current page
   *
   * @param {object} anchor - The anchor object containing its id
   * @returns {string}
   */
  function _generateAnchorURL(anchor) {
    return anchor.id ? `${url}#${anchor.id}` : url;
  }

  function renderAnchors(anchors) {
    return (
      <ul className={`${block}__anchors`}>
        {anchors.map((anchor) => (
          <li
            key={_generateAnchorURL(anchor)}
            className={`${block}__anchor`}
            title={anchor.title}
          >
            <NavLink to={_generateAnchorURL(anchor)}>{anchor.title2}</NavLink>
            {anchor.children && renderAnchors(anchor.children)}
          </li>
        ))}
      </ul>
    );
  }

  const openMod = open ? `${block}--open` : '';
  const disabledMod = anchors.length === 0 ? `${block}--disabled` : '';

  const filteredAnchors = anchors.filter((anchor) => anchor.level > 1);
  const tree = list2Tree(title, filteredAnchors);

  return (
    <div className={`${block} ${openMod} ${disabledMod}`}>
      {anchors.length > 0 ? (
        <ChevronRightIcon
          width={15}
          height={17}
          fill="#175d96"
          className={`${block}__toggle`}
          onClick={_toggle}
        />
      ) : (
        <BarIcon
          className={`${block}__toggle`}
          width={15}
          height={17}
          fill="#175d96"
        />
      )}

      <NavLink
        end
        key={url}
        className={`${block}__title`}
        to={url}
        onClick={scrollTop}
      >
        {title}
      </NavLink>

      {anchors.length > 0 ? renderAnchors(tree) : null}
    </div>
  );
}

SidebarItem.propTypes = {
  title: PropTypes.string,
  anchors: PropTypes.array,
  url: PropTypes.string,
  currentPage: PropTypes.string,
};
