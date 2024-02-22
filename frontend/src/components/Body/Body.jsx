import "./Body.css";
import { useState } from "react";
import axios from "axios";
const Body = () => {
	// Initialisation of variable word that will store the value of the input field
	var [word, Setword] = useState("");
	Setword = (e) => {
		word = e.target.value;
		console.log(word);
	};
	// Request to backend
	async function sendRequest() {
		axios
			.post("https://devsnest-task.onrender.com/fetchResult", { word })
			.then((res) => {
				console.log(res.data);
			});
	}

	return (
		<div className='body-container'>
			<div>
				<input
					type='text'
					className='body-input'
					placeholder='Fasttrack'
					onChange={Setword}
				/>
				<button className='body-btn' onClick={sendRequest}>
					Submit
				</button>
			</div>
			<div>
				Press Ctrl+Shift+I on Windows <br></br>or Cmnd+Shift+I on Mac to see
				result
			</div>
		</div>
	);
};

export default Body;
