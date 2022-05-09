import React from 'react';

export default function ExternalLink(props) {
	const { children, license = false, rel = 'nofollow noopener noreferrer', ...rest } = props;
	const relWithLicense = license ? `${rel} license` : rel;
	return (
		<a rel={relWithLicense} {...rest}>
			{children}
		</a>
	);
}
