import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';

import Logo from '../images/aymeric-beaumet-logo.svg';
import CategoryLink from './category-link';
import Contact from './contact';
import * as classes from './header.module.scss';

export default function HeaderStaticQuery() {
	return (
		<StaticQuery
			query={graphql`
				query {
					site {
						siteMetadata {
							author
							menu {
								name
								url
								categorySlug
							}
						}
					}
				}
			`}
			render={(data) => <Header data={data} />}
		/>
	);
}

function Header({ data }) {
	const {
		site: {
			siteMetadata: { author, menu },
		},
	} = data;
	return (
		<header className={classes.Header}>
			<nav role="navigation">
				<ul>
					<li className={classes.logo} key="logo">
						<Link to="/" activeClassName={classes.active} title={author}>
							<Logo />
						</Link>
					</li>
					{menu.map(({ name, url, categorySlug }) => (
						<li key={name}>
							<CategoryLink to={url} activeClassName={classes.active} categorySlug={categorySlug}>
								{name}
							</CategoryLink>
						</li>
					))}
				</ul>
			</nav>
			<nav className={classes.contact}>
				<Contact />
			</nav>
		</header>
	);
}
