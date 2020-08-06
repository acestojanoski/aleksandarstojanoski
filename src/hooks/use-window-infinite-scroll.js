import {useEffect, useCallback} from 'react';

const useWindowInfiniteScroll = ({handler, hasNextPage, loading, data}) => {
	const handleScroll = useCallback(() => {
		const scrollEnd =
			window.innerHeight + document.documentElement.scrollTop >=
			document.documentElement.scrollHeight - 5;

		if (scrollEnd && hasNextPage && !loading) {
			handler();
		}
	}, [loading, hasNextPage]);

	useEffect(() => {
		handler();
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll, data]);
};

export default useWindowInfiniteScroll;
