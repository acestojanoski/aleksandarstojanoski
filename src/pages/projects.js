import React from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import GithubRepos from '../components/github-repos';

const ProjectsPage = () => {
	return (
		<>
			<Head>
				<title>Aleksandar Stojanoski - Projects</title>
			</Head>
			<Layout>
				<section className="section">
					<h1 className="title has-text-centered">Projects</h1>
					<GithubRepos />
				</section>
				<style jsx>{`
					.title {
						margin-bottom: 3rem;
					}
				`}</style>
			</Layout>
		</>
	);
};

ProjectsPage.displayName = 'ProjectsPage';
export default ProjectsPage;
