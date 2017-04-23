import React from 'react';
import './dropdown-style';

export default class Dropdown extends React.Component {

	constructor(props, context) {
    super(props, context);
    this.state = {
			isLanguageShow: false
    };
	}

	render() {

		let {
			section,
			activeMod
		} = this.props;

		let activeList = (this.state.isLanguageShow) ? "dropdown-list-show" : "";

		return (
			<div
				className={ `navigation__link ${activeMod} dropdown` }
				onMouseOver={() => {
					this.setState({
						isLanguageShow: true
					});
				}}
				onMouseLeave={() => {
					this.setState({
						isLanguageShow: false
					});
				}}
			>
				{section.title}
        <i className="dropdown-arrow"></i>
        <div className={`dropdown-list ${activeList}`}>
					<ul>
						{
							section.children.map((language) => {
								return (
									<li key={language.title}><a href={language.url}>{language.title}</a></li>
								);
							})
						}
					</ul>
				</div>
			</div>
		);
	}

}