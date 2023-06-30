import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledInput = styled.input`  
  margin: 10px 0;
  width: 50%;
`;

const StyledTextArea = styled.textarea` 
  margin: 10px 0;
  width: 50%;
  height: 100px;
`;


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
    <FormContainer>
      <StyledInput
        list="model-names"
        value={modelName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setModel(e.target.value)}
        placeholder="model name"
      />
      <datalist id="model-names">
        {modelNames.map((name, index) => <option key={index} value={name} />)}
      </datalist>
      <StyledTextArea
        value={sentence}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSentence(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="sentence"
      />
      <button
        onClick={submitForm}
        disabled={isLoading}>
        {isLoading ? "waiting" : "submit (cmd + enter)"}
      </button>
      <button
        onClick={resetForm}
        disabled={isLoading}>
        reset
      </button>
      {response && <div>{JSON.stringify(response)}</div> }
    </FormContainer>
  );
}; 

export default MyComponent;