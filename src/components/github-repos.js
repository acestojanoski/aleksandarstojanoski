import React from 'react';
import Loading from './loading';
import useRepositories from '../hooks/use-repositories';

const GithubRepos = () => {
	const {error, loading, repositories, pageInfo} = useRepositories();

	if (error) {
		return (
			<div className="columns is-centered has-text-centered">
				<div className="column">
					<p>Unable to fetch repositories. Please try again later.</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<Loading overlay show={loading && !pageInfo.endCursor} />
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
								<div className="spinner" />
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

					.spinner {
						margin: 0 auto;
					}
				`}</style>
			</div>
		</>
	);
};

GithubRepos.displayName = 'GithubRepos';
export default GithubRepos;
