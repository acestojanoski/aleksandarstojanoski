import PropTypes from 'prop-types';

const Loading = ({show, overlay, ...rest}) => {
	return (
		<>
			<div className={`${show && overlay ? 'overlay' : ''}`} />
			<div
				className="container"
				{...rest}
				style={{display: show ? '' : 'none'}}
			>
				<div className="c" />
				<div className="c c2" />
				<div className="c c3" />
				<div className="c c2" />
				<div className="c c3" />
				<div className="c c4" />
				<div className="c c3" />
				<div className="c c4" />
				<div className="c c5" />
			</div>
			<style jsx>{`
				.container {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 60px;
					height: 60px;
					z-index: 1000;
				}

				.c {
					width: 20px;
					height: 20px;
					position: relative;
					float: left;
				}

				.c::before {
					content: '';
					position: absolute;
					bottom: 0;
					right: 0;
					width: 100%;
					height: 100%;
					background: #3498db;
					animation: c 1s infinite;
				}

				.c2::before {
					animation-delay: 0.1s;
				}

				.c3::before {
					animation-delay: 0.1s;
				}

				.c4::before {
					animation-delay: 0.1s;
				}

				.c5::before {
					animation-delay: 0.1s;
				}

				@keyframes c {
					100% {
						width: 0;
						height: 0;
					}
				}

				.overlay {
					position: fixed;
					display: block;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-color: rgba(0, 0, 0, 0.2);
					z-index: 999;
				}
			`}</style>
		</>
	);
};

Loading.propTypes = {
	show: PropTypes.bool,
	overlay: PropTypes.bool,
};

Loading.displayName = 'Loading';
export default Loading;
