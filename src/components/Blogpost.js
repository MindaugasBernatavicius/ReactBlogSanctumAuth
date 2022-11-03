import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Blogpost = () => {
	const { id } = useParams();
	const auth = useContext(AuthContext);
	const [status, setStatus] = useState(null);
	const [initialLoadError, setInitialLoadError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [post, setPost] = useState({ title: undefined, text: undefined });
	const hs = {
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${auth.getToken()}`,
	};
	const url = `https://laravel-1103-api.herokuapp.com/api/posts`;

	useEffect(() => {
		if (id)
			fetch(`${url}/${id}`)
				.then((res) => res.json())
				.then(
					(res) => {
						setPost(res);
						setIsLoaded(true);
					},
					(err) => {
						setInitialLoadError(err);
						setIsLoaded(true);
					}
				);
		else setIsLoaded(true);
	}, [id, url]);

	const createItem = (e) => {
		e.preventDefault();
		fetch(url, { method: "POST", headers: hs, body: JSON.stringify(post) }).then(
			(res) => {
				if (res.status === 200 || res.status === 201) {
					setStatus({ message: res.statusText });
				} else if (res.status === 401) {
					setStatus({ message: res.statusText });
				} else if (res.status === 422) {
					setStatus({ message: res.statusText });
				}
			},
			(err) => {
				setStatus(err);
			}
		);
	};

	const updateItem = (e) => {
		e.preventDefault();
		fetch(`${url}/${id}`, { method: "PUT", headers: hs, body: JSON.stringify(post) }).then(
			(res) => {
				if (res.status === 200) {
					setStatus({ message: res.statusText });
				} else if (res.status === 401) {
					setStatus({ message: res.statusText });
				} else if (res.status === 422) {
					setStatus({ message: res.statusText });
				}
			},
			(err) => {
				setStatus(err);
			}
		);
	};

	if (!isLoaded) {
		return <div>Loading...</div>;
	} else if (initialLoadError) {
		return <div>Error: {initialLoadError.message}</div>;
	} else {
		return (
			<div className="d-flex aligns-items-center justify-content-center">
				<div className="card w-50">
					<div className="card-header">Post {id ? `nr: ${id} edit` : `creation`} page</div>
					<div className="card-body">
						<form onSubmit={(e) => (id ? updateItem(e) : createItem(e))}>
							<div className="my-2 text-danger">{status === null ? "" : status.message}</div>
							<div className="form-group d-grid gap-2">
								<input
									className="form-control"
									onChange={(e) => setPost({ ...post, title: e.target.value })}
									onFocus={() => post.title ?? setPost({ ...post, title: "" })}
									value={post.title ?? "New title"}
								/>
								<textarea
									className="form-control"
									onChange={(e) => setPost({ ...post, text: e.target.value })}
									onFocus={() => post.text ?? setPost({ ...post, text: "" })}
									value={post.text ?? "New text"}
								/>
								<input className="btn btn-primary" type="submit" value="Submit" />
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
};

export default Blogpost;
