import {useState, useMemo} from 'react';
import useWindowInfiniteScroll from './use-window-infinite-scroll';
import executeFetch from '../utils/execute-fetch';
import env from '../utils/env';

const useRepositories = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const pageInfo = useMemo(() => {
		return (data && data.pageInfo) || {};
	}, [data]);

	const repositories = useMemo(() => {
		return (data && data.repositories) || [];
	}, [data]);

	const loadRepositories = async () => {
		const url = pageInfo.endCursor
			? `${env.GET_GH_REPOS_URL}?cursor=${pageInfo.endCursor}`
			: env.GET_GH_REPOS_URL;

		setLoading(true);

		try {
			const {body} = await executeFetch(url);

			setData({
				...body,
				repositories: repositories.concat(body.repositories),
			});
		} catch (error) {
			setError(error.body || true);
		} finally {
			setLoading(false);
		}
	};

	useWindowInfiniteScroll({
		loading,
		data: repositories,
		handler: loadRepositories,
		hasNextPage: pageInfo.hasNextPage,
	});

	return {
		repositories,
		loading,
		error,
		pageInfo,
	};
};

export default useRepositories;
