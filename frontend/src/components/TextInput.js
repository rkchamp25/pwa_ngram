import React, { useState } from 'react';
import axios from 'axios';
import config from './config'; // Import the shared config file

const TextInput = () => {
  const [inputText, setInputText] = useState('');
  const [ngrams, setNgrams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Send the text input to the backend
      const response = await axios.post(config.backendUrl+'/api/submit-text', {
        text: inputText,
      });

      // Handle response or update UI as needed
      console.log('Response:', response.data);

      const ngramsResponse = await axios.get(config.backendUrl+'/api/get-ngrams');
      const ngramsData = ngramsResponse.data;
      
      // Update state with fetched ngrams
      setNgrams(ngramsData.ngrams);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ backgroundColor: isFocused ? '#e0e0e0' : 'white' }} // Change background color
          placeholder="Enter text..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {ngrams.length > 0 && (
        <div>
          <h3>Ngrams (N=2):</h3>
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
