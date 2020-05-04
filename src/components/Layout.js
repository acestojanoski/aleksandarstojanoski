import react, {useState} from 'react';
import {useRouter} from 'next/router';
import routes from '../constants/routes';

const Layout = ({children}) => {
	const router = useRouter();
	const [burgerActive, setBurgerActive] = useState('');

	const toggleMenu = () => {
		setBurgerActive(!burgerActive);
	};

	const routeTo = (url) => {
		router.push(url, url);
	};

	const activeClass = 'is-active';

	return (
		<div className="container">
			<nav className="navbar has-shadow">
				<div className="navbar-brand">
					<a className="navbar-item" onClick={() => routeTo('/')}>
						Aleksandar Stojanoski
					</a>
					<a
						role="button"
						className={`navbar-burger burger ${
							burgerActive ? activeClass : ''
						}`}
						data-target="main-navigation"
						aria-label="menu"
						aria-expanded="false"
						onClick={toggleMenu}
					>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>
				<div
					id="main-navigation"
					className={`navbar-menu ${burgerActive ? activeClass : ''}`}
				>
					<div className="navbar-end">
						{routes.map((route) => {
							const routeActive = router.route === route.path;

							return (
								<a
									key={route.label}
									className={`navbar-item ${
										routeActive ? activeClass : ''
									}`}
									onClick={() => routeTo(route.path)}
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

Layout.displayName = 'Layout';
export default Layout;
