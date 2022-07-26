import { Link } from 'gatsby';
import React from 'react';

import slugFromTag from '../utils/slugFromTag';
import urlFromTag from '../utils/urlFromTag';

export default function Tag({ tag }) {
	const tagSlug = slugFromTag(tag);
	return <Link title={tag} to={urlFromTag(tag)}>{`#${tagSlug}`}</Link>;
}
