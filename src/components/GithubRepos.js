import react, {useState} from 'react';
import Loading from './Loading';
import apiCall from '../utils/api-call';
import env from '../utils/env';
import useWindowInfiniteScroll from '../hooks/use-window-infinite-scroll';

const GithubRepos = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const pageInfo = (data && data.pageInfo) || {};
	const repositories = (data && data.repositories) || [];

	const loadRepositories = () => {
		const url = pageInfo.endCursor
			? `${env.GET_GH_REPOS_URL}?cursor=${pageInfo.endCursor}`
			: env.GET_GH_REPOS_URL;

		setLoading(true);

		apiCall(url)
			.then(
				({body}) => {
					setData({
						...body,
						repositories: repositories.concat(body.repositories),
					});
				},
				({body}) => setError(body || true)
			)
			.finally(() => setLoading(false));
	};

	useWindowInfiniteScroll(loadRepositories, pageInfo.hasNextPage, [
		repositories,
	]);

	if (error) {
		return (
			<div className="columns is-centered has-text-centered">
				<div className="column">
					<p>
						Not able to fetch repositories. Please try again later.
					</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<Loading show={loading && !pageInfo.endCursor} overlay={true} />
			<div className="columns has-text-centered is-centered is-vcentered">
				<div className="column is-three-quarters">
					<div className="columns is-multiline">
						{repositories.map((repository) => {
							const {
								name,
								url,
								description,
								primaryLanguage,
							} = repository;

							return (
								<div key={name} className="column is-half repo">
									<h2 className="subtitle has-text-weight-bold">
										<a href={url}>{name}</a>
										<span
											className={`tag ${
												primaryLanguage
													? ''
													: 'is-hidden'
											}`}
											style={{
												backgroundColor:
													primaryLanguage &&
													primaryLanguage.color,
											}}
										>
											{primaryLanguage &&
												primaryLanguage.name}
										</span>
									</h2>
									<p>{description}</p>
								</div>
							);
						})}
						{loading && pageInfo.endCursor ? (
							<div className="column is-full">
								<p>Loading...</p>
							</div>
						) : null}
					</div>
				</div>
				<style jsx>{`
					.column {
						margin-bottom: 3rem;
					}

					.tag {
						color: #ffffff;
					}

					.repo:hover {
						background-color: #efefef;
					}
				`}</style>
			</div>
		</>
	);
};

GithubRepos.displayName = 'GithubRepos';
export default GithubRepos;
