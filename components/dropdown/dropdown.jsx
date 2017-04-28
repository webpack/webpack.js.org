import React from 'react';

export default class Dropdown extends React.Component {

	constructor(props, context) {
    super(props, context);
    this.state = {
		isLanguageShow: false,
		defaultLanguage: 'english',
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
				<img className="dropdown-language" src={require("../../assets/language/" + this.state.defaultLanguage + ".png")}/>
				<i className="dropdown-arrow"></i>
				<div className={`dropdown-list ${activeList}`}>
					<ul>
						{
							section.children.map((language) => {
								return (
									<li key={language.title}>
										<a href={language.url}>
											<img src={require("../../assets/language/" + language.title + ".png")}/>
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

}