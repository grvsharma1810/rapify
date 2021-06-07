import "./login.css";
import { useAuth } from "../../providers/AuthProvider";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
	const { login, googleLogin } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const formSubmit = async (event) => {
        setIsLoading(true);
		event.preventDefault();
		event.stopPropagation();
		if (!event.target.checkValidity()) {
			event.target.classList.add("was-validated");
		} else {
			const email = event.target[0].value;
			const password = event.target[1].value;
			await login(email, password);
		}
        setIsLoading(false);
	};

	const googleLoginSuccess = async (response) => {
		try {
			await googleLogin(response.tokenId);
		} catch (error) {
			console.log(error);
		}
	};

	const googleLoginFailure = async (err) => {
		console.log(err);
	};

	return (
		<div className="flex flex-column v-center">
			<GoogleLogin
				clientId="610798857220-1val8saqk48u1qhluiiq2avvuksijstp.apps.googleusercontent.com"
				onSuccess={googleLoginSuccess}
				onFailure={googleLoginFailure}
				cookiePolicy={"single_host_origin"}
			/>
			<form
				className="form needs-validation mt-1"
				noValidate
				onSubmit={(event) => formSubmit(event)}
			>
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
						<button className="btn-solid primary">Login</button>
					)}
					{isLoading && (
						<button className="btn-solid secondary">
							Validating Inputs...
						</button>
					)}
					<button
						type="button"
						onClick={() => navigate("/signup")}
						className="btn-link primary"
					>
						New to rapify ? Create an account.{" "}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
