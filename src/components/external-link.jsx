import React from 'react';

export default function ExternalLink(props) {
	const { children, rel = 'nofollow noopener noreferrer', ...rest } = props;
	return (
		<a target="_blank" rel={rel} {...rest}>
			{children}
		</a>
	);
}
