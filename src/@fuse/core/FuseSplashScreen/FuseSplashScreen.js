import { memo } from 'react';

function FuseSplashScreen() {
	return (
		<div id="fuse-splash-screen" style={{ backgroundColor: "#f5e4bd", backgroundImage: "url('/assets/images/custom/loading_background.jpg')", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
			<div className="center">
				<div className="logo" style={{ marginBottom: 4 }}>
					<img width="128" src="assets/images/logos/Thurayas%20box%20-%20Logo%20only.svg" alt="logo" />
					{/* LOADING SCREEN 2 */}
				</div>
				<div className="spinner-wrapper">
					<div className="spinner">
						<div className="inner">
							<div className="gap" />
							<div className="left">
								<div className="half-circle" />
							</div>
							<div className="right">
								<div className="half-circle" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(FuseSplashScreen);
