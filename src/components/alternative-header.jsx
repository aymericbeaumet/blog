import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as classes from './alternative-header.module.scss';
import Contact from './contact';

export default () => (
	<StaticQuery
		query={graphql`
			query {
				site {
					siteMetadata {
						email
						menu {
							name
							url
							categorySlug
						}
					}
				}
			}
		`}
		render={(data) => <AlternativeHeader data={data} />}
	/>
);

class AlternativeHeader extends React.Component {
	static toggleId = 'alternative_menu_toggle';

	state = { isVisible: false };

	componentDidMount() {
		window.addEventListener('keydown', this.dismissHandler); // eslint-disable-line no-undef
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.dismissHandler); // eslint-disable-line no-undef
	}

	set isVisible(isVisible) {
		// Update React state
		this.setState({ isVisible });
		// Disable scrolling while the menu is visible (meh, dirty hack)
		document.body.style.overflow = isVisible ? 'hidden' : ''; // eslint-disable-line no-undef
	}

	toggleOnChangeHandler = (event) => {
		if (event && event.target) {
			this.isVisible = !!event.target.checked;
		}
	};

	dismissHandler = (event = {}) => {
		const isClickEvent = event.type === 'click';
		const isEscapeEvent = event.type === 'keydown' && event.keyCode === 27;
		if (isClickEvent || isEscapeEvent) {
			this.isVisible = false;
		}
	};

	render() {
		const {
			constructor: { toggleId },
			dismissHandler,
			props: {
				data: {
					site: {
						siteMetadata: { menu },
					},
				},
			},
			state: { isVisible },
			toggleOnChangeHandler,
		} = this;
		return (
			<nav className={classes.AlternativeHeader}>
				<input type="checkbox" checked={isVisible} onChange={toggleOnChangeHandler} id={toggleId} />
				<label htmlFor={toggleId} className={classes.toggle}>
					<FontAwesomeIcon width="32px" height="32px" icon={faBars} />
					<FontAwesomeIcon width="32px" height="32px" icon={faTimes} />
				</label>
				<div className={classes.menu} onClick={dismissHandler}>
					<ul className={classes.entries}>
						<li>
							<nav className={classes.contact}>
								<Contact />
							</nav>
						</li>
						<li>
							<Link to="/">Home</Link>
						</li>
						{menu.map(({ name, url }) => (
							<li key={name}>
								<Link to={url}>{name}</Link>
							</li>
						))}
					</ul>
				</div>
			</nav>
		);
	}
}
