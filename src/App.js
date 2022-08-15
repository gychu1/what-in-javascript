
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
import {useEffect, useState} from 'react';

function App() {

const [data, setData] = useState("");
const [searchWord, setSearchWord] = useState("");



const handleSubmit = () => {
  console.log('form submitted ✅');
};

useEffect(() => {
  const keyDownHandler = event => {
    console.log('User pressed: ', event.key);

    if (event.key === 'Enter') {
      event.preventDefault();

      handleSubmit();
    }
  };

  document.addEventListener('keydown', keyDownHandler);

  return () => {
    document.removeEventListener('keydown', keyDownHandler);
  };
}, []);


function getMeaning() {
	Axios.get(
	`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
	).then((response) => {
	setData(response.data[0]);
	});
}

function playAudio() {
	let audio = new Audio(data.phonetics[0].audio);
	audio.play();
}

return (
	<div className="App">
	<h1>Dictionary App</h1>

	<div className="searchBox">

		{/* // Taking user input */}
		<input
		type="text"
		placeholder="Enter word to search."
    value={searchWord}
    onChange={(event) => setSearchWord(event.target.value)}
    autoComplete="off"
    
		/>
		<button
		onClick={() => {
			getMeaning();
		}}
		>

		<FaSearch size="20px" />
		</button>
	</div>

	{data && (
		<div className="showResults">
		<h2>
			{data.word}{" "}
			<button
			onClick={() => {
				playAudio();
			}}
			>
			<FcSpeaker size="26px" />
			</button>
		</h2>
		<h4>Parts of speech:</h4>

		
<p>{data.meanings[0].partOfSpeech}</p>


		<h4>Definition:</h4>

		
<p>{data.meanings[0].definitions[0].definition}</p>


		{/* <h4>Example:</h4>

		
<p>{data.meanings[0].definitions[0].example}</p> */}

		</div>
	)}
	</div>
);
}

export default App;
