import React, {useState} from 'react';
import {useRouter} from 'next/router';
import routesConfig from '../constants/routes-config';
import PropTypes from 'prop-types';

const activeClass = 'is-active';

const Layout = ({children}) => {
	const router = useRouter();
	const [burgerActive, setBurgerActive] = useState('');

	const toggleMenu = () => {
		setBurgerActive(!burgerActive);
	};

	const routeTo = (url) => () => {
		router.push(url, url);
	};

	const burgerActiveClass = burgerActive ? activeClass : '';

	return (
		<div className="container">
			<nav className="navbar has-shadow">
				<div className="navbar-brand">
					<a className="navbar-item" onClick={routeTo('/')}>
						Aleksandar Stojanoski
					</a>
					<a
						role="button"
						className={`navbar-burger burger ${burgerActiveClass}`}
						data-target="main-navigation"
						aria-label="menu"
						aria-expanded="false"
						onClick={toggleMenu}
					>
						<span aria-hidden="true" />
						<span aria-hidden="true" />
						<span aria-hidden="true" />
					</a>
				</div>
				<div
					id="main-navigation"
					className={`navbar-menu ${burgerActiveClass}`}
				>
					<div className="navbar-end">
						{routesConfig.map((route) => {
							const routeActive = router.route === route.path;
							const routeActiveClass = routeActive
								? activeClass
								: '';

							return (
								<a
									key={route.label}
									className={`navbar-item ${routeActiveClass}`}
									onClick={routeTo(route.path)}
								>
									{route.label}
								</a>
							);
						})}
					</div>
				</div>
			</nav>

			{children}

			<style jsx>{`
				.container {
					height: 100vh;
				}
			`}</style>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.element,
	]),
};

Layout.displayName = 'Layout';

export default Layout;
