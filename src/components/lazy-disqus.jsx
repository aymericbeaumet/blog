import { Disqus } from 'gatsby-plugin-disqus';
import throttle from 'lodash/throttle';
import React from 'react';

// LazyDisqus is a thin wrapper around the Disques component that lazy load
// when more than 80% of the page has been scrolled.
export default class LazyDisqus extends React.Component {
	constructor(props) {
		super(props);
		this.state = { load: false };
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll); // eslint-disable-line no-undef
		this.onScroll();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll); // eslint-disable-line no-undef
	}

	onScroll = throttle(() => {
		const bottom = window.pageYOffset + window.innerHeight; // eslint-disable-line no-undef
		const total = window.document.documentElement.scrollHeight; // eslint-disable-line no-undef
		const pct = bottom / total;

		if (pct > 0.8) {
			this.setState({ load: true });
			window.removeEventListener('scroll', this.onScroll); // eslint-disable-line no-undef
		}
	}, 100 /* ms */);

	render() {
		const { load } = this.state;
		return load ? <Disqus {...this.props} /> : null;
	}
}
