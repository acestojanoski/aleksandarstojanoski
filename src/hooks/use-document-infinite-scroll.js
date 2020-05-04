import {useEffect} from 'react';

const useDocumentInfiniteScroll = (
	handler,
	hasNextPage,
	dependencyArray = []
) => {
	const handleScroll = () => {
		const scrollEnd =
			document.documentElement.offsetHeight +
				document.documentElement.scrollTop >=
			document.documentElement.scrollHeight;

		if (scrollEnd && hasNextPage) {
			handler();
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [...dependencyArray]);
};

export default useDocumentInfiniteScroll;
