import { Component } from 'react';
import Link from '../Link/Link';
import './SidebarItem.scss';
import list2Tree from '../../utilities/list2Tree';
import ChevronRightIcon from '../../styles/icons/chevron-right.svg';
import BarIcon from '../../styles/icons/vertical-bar.svg';
import PropTypes from 'prop-types';

const block = 'sidebar-item';

export default class SidebarItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    anchors: PropTypes.array,
    url: PropTypes.string,
    currentPage: PropTypes.string
  }
  state = {
    open: this._isOpen(this.props)
  };

  renderAnchors(anchors) {
    return (
      <ul className={`${block}__anchors`}>
        {anchors.map((anchor) => (
          <li
            key={this._generateAnchorURL(anchor)}
            className={`${block}__anchor`}
            title={anchor.title}
          >
            <a href={this._generateAnchorURL(anchor)}>{anchor.title}</a>
            {anchor.children && this.renderAnchors(anchor.children)}
          </li>
        ))}
      </ul>
    );
  }

  scrollTop(event) {
    if (!event.metaKey) {
        window.scrollTo(0, 0);
    }
  }

  render() {
    let {title, anchors = []} = this.props;
    let openMod = this.state.open ? `${block}--open` : '';
    let disabledMod = anchors.length == 0 ? `${block}--disabled` : '';

    const filteredAnchors = anchors.filter(anchor => anchor.level > 1);
    const tree = list2Tree(filteredAnchors);

    return (
      <div className={`${block} ${openMod} ${disabledMod}`}>
        {anchors.length > 0 ? (
          <ChevronRightIcon
            width={15}
            height={17}
            fill="#175d96"
            className={`${block}__toggle`}
            onClick={this._toggle.bind(this)} />
        ) : (
          <BarIcon className={`${block}__toggle`} width={15} height={17} fill="#175d96" />
        )}

        <Link
          key={this.props.url}
          className={`${block}__title`}
          to={this.props.url}
          onClick={this.scrollTop}>
          {title}
        </Link>

        {anchors.length > 0 ? this.renderAnchors(tree) : null}
      </div>
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if ( nextProps.currentPage !== this.props.currentPage ) {
      this.setState({
        open: this._isOpen(nextProps)
      });
    }
  }

  /**
   * Checks whether the item should be expanded
   *
   * @param {object} props - The current props
   */
  _isOpen(props) {
    return RegExp(`${props.currentPage}/?$`).test(props.url);
  }

  /**
   * Toggles the open state (expanded/collapsed)
   *
   * @param {object} e - Click event
   */
  _toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  /**
   * Generate the url for the given [anchor] depending on the current page
   *
   * @param {object} anchor - The anchor object containing its id
   * @returns {string}
   */
  _generateAnchorURL(anchor) {
    let {url} = this.props;
    return anchor.id ? `${url}#${anchor.id}` : url;
  }
}
