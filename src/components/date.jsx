import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
import React from 'react';

export default function DateComponent({ date, until } = {}) {
	const ddate = date ? new Date(date) : null;
	const duntil = until ? new Date(until) : null;

	if (ddate && duntil) {
		const dateYear = ddate.getFullYear();
		const untilYear = duntil.getFullYear();
		const duration = Math.max(untilYear - dateYear, 1);
		return (
			<time dateTime={ddate} title={`${duration} ${duration !== 1 ? 'years' : 'year'}`}>
				{`${format(ddate, 'yyyy')}–${format(duntil, 'yyyy')}`}
			</time>
		);
	}

	if (ddate) {
		if (ddate.getMonth() === 0 && ddate.getDate() === 1) {
			const year = ddate.getUTCFullYear().toString();
			return (
				<time dateTime={year} title={`Started in ${year}`}>
					{year}
				</time>
			);
		}

		const diffDays = differenceInDays(new Date(), ddate);
		const label =
			diffDays === 0 // eslint-disable-line
				? 'Today'
				: diffDays === 1 // eslint-disable-line
				? 'Yesterday'
				: diffDays < 7 // eslint-disable-line
				? `${diffDays} days ago`
				: diffDays < 14
				? 'A week ago'
				: format(ddate, 'yyyy MMM do');
		return (
			<time dateTime={ddate} title={format(ddate, "'Published on' PPPP")}>
				{label}
			</time>
		);
	}

	return null;
}
