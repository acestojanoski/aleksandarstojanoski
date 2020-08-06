import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import env from '../utils/env';

const IndexPage = () => {
	return (
		<>
			<Head>
				<title>Aleksandar Stojanoski</title>
			</Head>
			<Layout>
				<section className="hero">
					<div className="hero-body">
						<div className="columns is-centered is-vcentered is-mobile">
							<div className="column">
								<h1 className="title">Aleksandar Stojanoski</h1>
							</div>
							<div className="column">
								<h2 className="subtitle">
									Full Stack Developer
								</h2>
							</div>
							<div className="column">
								<span className="icon">
									<a href={env.GITHUB_URL}>
										<FontAwesomeIcon icon={faGithub} />
									</a>
								</span>
								<span className="icon">
									<a href={env.LINKEDIN_URL}>
										<FontAwesomeIcon icon={faLinkedin} />
									</a>
								</span>
								<span className="icon">
									<a href={`mailto:${env.EMAIL}`}>
										<FontAwesomeIcon icon={faEnvelope} />
									</a>
								</span>
							</div>
						</div>
					</div>
				</section>
				<style jsx>{`
					.hero {
						height: calc(100vh - 3.25rem);
					}

					.columns {
						height: 100%;
						flex-direction: column;
					}

					.column {
						flex-grow: 0;
						text-align: center;
					}

					.icon {
						font-size: 30px;
						margin: 0 10px;
					}
				`}</style>
			</Layout>
		</>
	);
};

IndexPage.displayName = 'IndexPage';
export default IndexPage;
