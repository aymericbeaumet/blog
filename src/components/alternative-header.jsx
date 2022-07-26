import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';

import * as classes from './alternative-header.module.scss';
import Contact from './contact';

export default function AlternativeHeaderStaticQuery() {
	return (
		<StaticQuery
			query={graphql`
				query {
					site {
						siteMetadata {
							email
							menu {
								name
								url
							}
						}
					}
				}
			`}
			render={(data) => <AlternativeHeader data={data} />}
		/>
	);
}

class AlternativeHeader extends React.Component {
	static toggleId = 'alternative_menu_toggle';

	constructor() {
		super();
		this.state = { isVisible: false };
	}

	componentDidMount() {
		window.addEventListener('keydown', this.onKeyDown); // eslint-disable-line no-undef
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.onKeyDown); // eslint-disable-line no-undef
		this.setVisibility(false);
	}

	setVisibility(isVisible) {
		// Update React state
		this.setState({ isVisible });
		// Disable scrolling while the menu is visible (meh, dirty hack)
		document.body.style.overflow = isVisible ? 'hidden' : ''; // eslint-disable-line no-undef
	}

	onCheckboxChange = (event) => {
		this.setVisibility(!!event.target.checked);
	};

	onClick = () => {
		this.setVisibility(false);
	};

	onKeyDown = (event) => {
		if (event.keyCode === 27) {
			this.setVisibility(false);
		}
	};

	render() {
		const { data } = this.props;
		const { isVisible } = this.state; // use to propagate mouse/keyboard dismiss
		return (
			<nav className={classes.AlternativeHeader}>
				<input
					type="checkbox"
					checked={isVisible}
					onChange={this.onCheckboxChange}
					id={AlternativeHeader.toggleId}
				/>

				<label htmlFor={AlternativeHeader.toggleId} className={classes.toggle}>
					<FontAwesomeIcon width="32px" height="32px" icon={faBars} />
					<FontAwesomeIcon width="32px" height="32px" icon={faTimes} />
				</label>

				<label htmlFor={AlternativeHeader.toggleId} className={classes.menu}>
					<ul className={classes.entries}>
						<li className={classes.contact}>
							<Contact />
						</li>
						<li>
							<Link to="/" onClick={this.onClick}>
								Home
							</Link>
						</li>
						{data.site.siteMetadata.menu.map(({ name, url }) => (
							<li key={name}>
								<Link to={url} onClick={this.onClick}>
									{name}
								</Link>
							</li>
						))}
					</ul>
				</label>
			</nav>
		);
	}
}
