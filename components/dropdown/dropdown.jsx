import React from 'react';

export default class Dropdown extends React.Component {
	state = {
		active: false
  };

	render() {
		let { className = '', items = [] } = this.props;
		let activeMod = this.state.active ? "dropdown__list--active" : "";

		return (
			<div
				className={ `dropdown ${className}` }
				onMouseOver={ this._toggle.bind(this, true) }
				onMouseLeave={ this._toggle.bind(this, false) }>
				<img
          className="dropdown__language"
          src={ items[0].image } />

				<i className="dropdown__arrow" />

				<div className={ `dropdown__list ${activeMod}` }>
					<ul>
						{
							items.map(item => {
								return (
									<li key={ item.title }>
										<a href={ item.url }>
                      <span>{ item.title }</span>
											<img src={ item.image } />
										</a>
									</li>
								);
							})
						}
					</ul>
				</div>
			</div>
		);
	}

  /**
   * Toggle visibility of dropdown items
   *
   * @param {bool} state - Whether to display or hide the items
   */
  _toggle(state = false) {
    this.setState({
      active: state
    });
  }
}
