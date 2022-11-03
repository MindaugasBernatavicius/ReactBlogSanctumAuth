import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Header = () => {
	const auth = useContext(AuthContext);

	return (
		<nav className="navbar navbar-expand-xl navbar-expand-lg navbar-light bg-light px-5">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/home">
					BetterMedium
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="navbar-collapse collapse" id="navbarNav">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" to="/home">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/posts">
								BlogPosts
							</Link>
						</li>
					</ul>
					{!auth.isLoggedin() ? (
						<ul className="navbar-nav d-flex">
							<li className="nav-item">
								<Link className="nav-link" to="/login">
									Login
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/register">
									Register
								</Link>
							</li>
						</ul>
					) : (
						<ul className="navbar-nav d-flex">
							<li className="nav-item">
								<span className="nav-link mx-4">{`Hello ${auth.getUser().name}`}</span>
							</li>
							<li className="nav-item">
								<Link className="nav-link" onClick={() => auth.logout()}>
									Logout
								</Link>
							</li>
						</ul>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Header;
