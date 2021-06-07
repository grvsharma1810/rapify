import "./sign-up.css";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
	const { signup } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const formSubmit = async (event) => {
        setIsLoading(true);
		event.preventDefault();
		event.stopPropagation();
		if (!event.target.checkValidity()) {
			event.target.classList.add("was-validated");
		} else {
			const name = event.target[0].value;
			const avatarUrl = event.target[1].value;
			const email = event.target[2].value;
			const password = event.target[3].value;
			await signup({ name, email, password, avatarUrl });
		}
        setIsLoading(false);
	};

	return (
		<div className="flex h-center">
			<form
				className="form needs-validation"
				noValidate
				onSubmit={(event) => formSubmit(event)}
			>
				<div className="form-row">
					<p className="form-field">
						<label htmlFor="name">Stage Name</label>
						<input
							id="name"
							type="text"
							placeholder="Stage Name"
							name="name"
							required
						/>
						<span className="error-msg">
							Please enter valid name
						</span>
						<span className="success-msg">Looks Good</span>
					</p>
				</div>
				<div className="form-row">
					<p className="form-field">
						<label htmlFor="avatarUrl">Avatar URL</label>
						<input
							id="avatarUrl"
							type="url"
							placeholder="Avatar Url"
							name="avatarUrl"
						/>
						<span className="error-msg">
							Please enter valid url
						</span>
						<span className="success-msg">Looks Good</span>
					</p>
				</div>
				<div className="form-row">
					<p className="form-field">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							placeholder="Email"
							name="email"
							required
						/>
						<span className="error-msg">
							Please enter valid email
						</span>
						<span className="success-msg">Looks Good</span>
					</p>
				</div>
				<div className="form-row">
					<p className="form-field">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							placeholder="Password"
							autoComplete="true"
							required
						/>
						<span className="error-msg">
							Please enter valid password
						</span>
						<span className="success-msg">Looks Good</span>
					</p>
				</div>
				<div>
					{!isLoading && (
						<button className="btn-solid primary">Sign Up</button>
					)}
					{isLoading && (
						<button className="btn-solid secondary">
							Signing Up...
						</button>
					)}
					<button
						type="button"
						onClick={() => navigate("/login")}
						className="btn-link primary"
					>
						Already have an account ? Log In
					</button>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
