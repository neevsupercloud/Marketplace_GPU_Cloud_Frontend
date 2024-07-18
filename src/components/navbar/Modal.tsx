import React, { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { useQuery } from '../../store/api';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectName: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [projectName, setProjectName] = useState('');
  const { auth, setCurrOrg } = useStore(); // Access auth from the store
  const { _post_raw } = useQuery();
  const { currOrg } = useStore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth) {
        console.error('Authentication token is not available');
        return;
      }

      try {
        console.log('Fetching user data with token:', auth);
        const response = await fetch('https://api.neevcloud.com/api/v1/me', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${auth}`, // Pass the access token in the header
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('User Data:', data);
          setCurrOrg(data.org.slug);
          console.log(currOrg)

          // Update state or handle user data as needed
        } else {
          console.error('Failed to fetch user data', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, [auth, setCurrOrg]);

  const handleSave = async () => {
    if (!auth) {
      console.error('Authentication token is not available');
      return;
    }

    try {
      const response = await _post_raw('https://api.neevcloud.com/api/v1/orgs', {
        displayname: projectName,
      }, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${auth}`, // Pass the access token in the header
          'Content-Type': 'application/json',
        },
      });

      if (response && typeof response === 'object' && 'ok' in response) {
        const typedResponse = response as Response; // Narrowing the type

        if (typedResponse.ok) {
          const responseData = await typedResponse.json();
          console.log('Organization created successfully');
          console.log("fe", responseData);
          setCurrOrg(responseData.orgSlug);
          onSave(projectName);

          // Fetch user data again after organization creation
          const userResponse = await fetch('https://api.neevcloud.com/api/v1/me', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${auth}`, // Pass the access token in the header
              'Content-Type': 'application/json',
            },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            console.log('User Data:', userData);
            setCurrOrg(userData.org.slug);
            console.log(currOrg);
            // Perform a hard refresh after all successful operations
            window.location.reload();
          } else {
            console.error('Failed to fetch user data', userResponse.statusText);
          }
        } else {
          console.error('Failed to create organization', typedResponse);
        }
      } else {
        console.error('Unexpected response format', response);
      }
    } catch (error) {
      console.error('Error creating organization', error);
    }

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4 text-[#3f5175]" style={{ fontWeight: 600 }}>Enter Organization Name</h2>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Organization Name"
          style={{
            outline: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            borderRadius: '5px',
            padding: '10px',
            width: '100%',
            boxSizing: 'border-box',
            marginBottom: '20px',
          }}
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            style={{ background: '#673ab7', borderRadius: '10px' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            style={{ background: 'linear-gradient(to left, rgb(181, 44, 246), rgb(74, 145, 247))', borderRadius: '10px' }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
