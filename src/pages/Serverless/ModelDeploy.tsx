import { useState } from 'react';
import useApi from '../../store/useApi';

interface ModelDeployProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModelDeploy: React.FC<ModelDeployProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState('');

  const { createModel } = useApi();
  console.log(token);
  
  const handleSubmit = () => {
    const payload = {
      modelID: "meta-llama/Meta-Llama-3-70B",
      modelName: "Whisper",
      secrets: {
        dd: "aA==",
        HF_TOKEN: token,
      },
      config: {
        commodo_07: "07",
        ipsum3: "test1",
        sint_b: "test",
      },
      cpu: "8",
      memory: "32Gi",
      storage: "100Gi"
    };

    createModel(payload)
      .then(response => {
        console.log(response);
        onClose();
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl mb-4">Enter Hugging Face Token</h2>
        <p>
          To access and utilize the specified model from Hugging Face, kindly provide your Hugging Face token. By submitting your token, you acknowledge that you have reviewed and accepted Hugging Face's terms and conditions governing the use of their models.
        </p>
        <a href="https://huggingface.co" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Visit Hugging Face to obtain your token</a>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="mt-4 p-2 border rounded w-full"
          placeholder="Enter your Hugging Face token"
        />
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2">Close</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ModelDeploy;
