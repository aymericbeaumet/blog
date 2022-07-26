import { Disqus } from 'gatsby-plugin-disqus';
import React from 'react';
import throttle from 'lodash/throttle';

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
		}
	}, 100 /* ms */);

	render() {
		const { load } = this.state;
		return load ? <Disqus {...this.props} /> : null;
	}
}
