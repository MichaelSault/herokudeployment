import React, {useState, useEffect} from 'react'
import axios from 'axios';

const App = function () {
	const [users, setUsers] = useState(null);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	useEffect(() => {
		axios
			.get("http://localhost:5000/getUsers")
			.then((users) => setUsers(users))
			.catch((err) => console.log(err));
	}, []);

	function submitForm() {
		if (username === "") {
			alert("Please fill the username field");
			return;
		}
		if (email === "") {
			alert("Please fill the email field");
			return;
		}
		axios
			.post("http://localhost:5000/newUser", {
				username: username,
				email: email,
			})
			.then(function () {
				alert("Account created successfully");
				window.location.reload();
			})
			.catch(function () {
				alert("Could not create account. Please try again");
			});
	}
	return (
		<>
			<h1>My Project</h1>

			<form onSubmit={submitForm}>
				<input
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					placeholder="Enter your username"
				/>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					placeholder="Enter your email address"
				/>
				<input type="submit" />
			</form>
		</>
	);
};

export default App