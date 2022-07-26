import React from 'react';

import Timer from '../images/timer.svg';
import * as classes from './duration.module.scss';

export default function Duration({ timeToRead, wordCount, timeToWatch } = {}) {
	// we check timeToWatch first as it should be preferred to timeToRead when both are available
	if (typeof timeToWatch === 'number') {
		return (
			<time
				className={classes.Duration}
				dateTime={`${timeToWatch}m`}
				title={`Estimated watch of ${timeToWatch} ${timeToWatch !== 1 ? 'minutes' : 'minute'}`}
			>
				<Timer />
				{`${timeToWatch} min watch`}
			</time>
		);
	}

	if (typeof timeToRead === 'number') {
		const suffix = typeof wordCount?.words === 'number' ? ` (${wordCount?.words} words)` : '';
		return (
			<time
				className={classes.Duration}
				dateTime={`${timeToRead}m`}
				title={`Estimated read of ${timeToRead} ${
					timeToRead !== 1 ? 'minutes' : 'minute'
				}${suffix}`}
			>
				<Timer />
				{`${timeToRead} min read`}
			</time>
		);
	}

	return null;
}
