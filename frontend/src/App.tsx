import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// const FormContainer = styled.div`  
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `;

// const StyledInput = styled.input`  
//   margin: 10px 0;
//   width: 50%;
// `;

// const StyledTextArea = styled.textarea` 
//   margin: 10px 0;
//   width: 50%;
//   height: 100px;
// `;


const MyComponent: React.FC = () => {
  const modelNames: string[] = [
    "microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract-fulltext",
    "hogehoge"
  ];

  const [modelName, setModel] = useState<string>(modelNames[0]);
  const [sentence, setSentence] = useState<string>("[MASK] is a tumor suppressor gene.");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const submitForm = async () => {
    setIsLoading(true);
    const result = await axios.post('http://localhost:8000/process',
      {
        model_name: modelName,
        sentence: sentence
      }
    );
    setResponse(result.data);
    console.log(result.data);
    console.log(response);
    setIsLoading(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.metaKey) {
      submitForm();
    }
  }

  const resetForm = () => {
    setModel("");
    setSentence("");
  }

  return (
    <div className="py-6 container">
      <div className="columns is-centered">
        <div className="column is-two-thirds">
          <h1 className="title">LLM playground</h1>
          <div className="field">
            <label className="label">Model Name</label>
              <input
                className="input"
                type="text"
                list="model-names"
                value={modelName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setModel(e.target.value)}
                placeholder="model name"
              />
              <datalist id="model-names">
                {modelNames.map((name, index) => <option key={index} value={name} />)}
              </datalist>
          </div>
          <div className="field">
            <label className="label">Sentence</label>
            <div className='control'>
              <textarea
                className="textarea"
                value={sentence}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSentence(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="sentence"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className='button is-link'
                onClick={submitForm}
                disabled={isLoading}>
                {isLoading ? "waiting" : "submit (cmd + enter)"}
              </button>
              <button
                className="button is-danger ml-2"
                onClick={resetForm}
                disabled={isLoading}>
                reset
              </button>
            </div>
          </div>
          {isLoading ? <p>Loading...</p> : response && <p>Response:<br></br> {JSON.stringify(response)}</p>}
        </div>
      </div>
    </div>
  );
}; 

export default MyComponent;
