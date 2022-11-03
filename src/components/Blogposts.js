import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function BlogPosts() {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("https://laravel-1103-api.herokuapp.com/api/posts")
			.then((res) => res.json())
			.then(
				(res) => {
					setPosts(res);
					setIsLoaded(true);
				},
				(err) => {
					setError(err);
					setIsLoaded(true);
				}
			);
	}, []);

	const deletePost = (id, e) => {
		fetch("https://laravel-1103-api.herokuapp.com/api/posts/" + id, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${auth.getToken()}`,
			},
		}).then(
			(res) => {
				if (res.status === 200) {
					const remaining = posts.filter((p) => id !== p.id);
					setPosts(remaining);
				} else if (res.status === 401) {
					setError({ message: res.statusText });
				}
			},
			(err) => {
				setError(err);
				setIsLoaded(true);
			}
		);
	};

	if (!isLoaded) {
		return <div>Loading...</div>;
	} else if (error) {
		return <div>Error: {error.message}</div>;
	} else {
		return (
			<table className="table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Text</th>
						<th>
							<span className="float-end mx-1">Actions</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{posts.map((post) => (
						<tr key={post.id}>
							<td className="col-lg-3">{post.title}</td>
							<td className="col-lg-7 overflow-hidden" style={{ minWidth: "200px", maxHeight: "5px" }}>
								{post.text}
							</td>
							<td className="col-lg-2" style={{ minWidth: "200px" }}>
								<button
									onClick={(e) => navigate(`/posts/${post.id}`)}
									className="float-end btn btn-warning mx-1"
								>
									Edit
								</button>
								<button
									onClick={(e) => deletePost(post.id, e)}
									className="float-end btn btn-danger mx-1"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
					<tr>
						<td colSpan="3"></td>
					</tr>
					<tr>
						<td colSpan="3" className="border border-3 border-start-0 border-bottom-0 border-end-0">
							<button
								onClick={(e) => navigate(`/posts/create`)}
								className="btn btn btn-success float-end mx-1"
							>
								Add new post
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default BlogPosts;
