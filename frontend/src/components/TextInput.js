// frontend/src/components/TextInput.js

import React, { useState } from 'react';
import axios from 'axios';

const TextInput = () => {
  const [inputText, setInputText] = useState('');
  const [ngrams, setNgrams] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the text input to the backend
      const response = await axios.post('http://localhost:5000/api/submit-text', {
        text: inputText,
      });

      // Handle response or update UI as needed
      console.log('Response:', response.data);

      const ngramsResponse = await axios.get('http://localhost:5000/api/get-ngrams');
      const ngramsData = ngramsResponse.data;

      // Update state with fetched ngrams
      setNgrams(ngramsData.ngrams);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Text Input</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text..."
        />
        <button type="submit">Submit</button>
      </form>

      {ngrams.length > 0 && (
        <div>
          <h3>Ngrams:</h3>
          <ul>
            {ngrams.map((ngramPairs, index) => (
              <li key={index}>
                {ngramPairs.map((ngram, ngramIndex) => (
                  <span key={ngramIndex}>
                    {`(${ngram[0]}, ${ngram[1]})`}
                    {ngramIndex < ngramPairs.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TextInput;
