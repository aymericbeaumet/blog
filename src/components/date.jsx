import React from 'react';
import format from 'date-fns/format';

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
		return (
			<time dateTime={ddate} title={format(ddate, 'PPPP')}>
				{format(ddate, 'yyyy MMM do')}
			</time>
		);
	}

	return null;
}
