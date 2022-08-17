import React from 'react';

export default function Utterances() {
	return (
		<section
			style={{ width: '100%' }}
			ref={(element) => {
				if (!element) {
					return;
				}
				const scriptElement = document.createElement('script'); // eslint-disable-line
				scriptElement.setAttribute('src', 'https://utteranc.es/client.js');
				scriptElement.setAttribute('repo', 'aymericbeaumet/comments');
				scriptElement.setAttribute('issue-term', 'pathname');
				scriptElement.setAttribute('theme', 'github-light');
				scriptElement.setAttribute('crossorigin', 'anonymous');
				scriptElement.setAttribute('async', 'true');
				element.replaceChildren(scriptElement);
			}}
		/>
	);
}
