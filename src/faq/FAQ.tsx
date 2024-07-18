import React from 'react';
import { Button, Box, Tooltip, useClipboard } from "@chakra-ui/react";
import { BiCopy } from 'react-icons/bi';

const faqData = [
  {
    os: "Ubuntu / CentOS",
    steps: [
      "Open your terminal.",
      "Generate the SSH key using the following command:",
      {
        command: "ssh-keygen -t rsa -b 2048 -f ~/path/to/sshkey.pem"
      },
      "Set the permissions of the SSH key using:",
      {
        command: "chmod 400 ~/path/to/sshkey.pem"
      }
    ]
  },
  {
    os: "macOS",
    steps: [
      "Open your terminal.",
      "Generate the SSH key using the following command:",
      {
        command: "ssh-keygen -t rsa -b 2048 -f ~/path/to/sshkey.pem"
      },
      "Set the permissions of the SSH key using:",
      {
        command: "chmod 400 ~/path/to/sshkey.pem"
      }
    ]
  },
  {
    os: "Windows (using Git Bash or WSL)",
    subCommands: [
      {
        subOs: "Git Bash",
        steps: [
          "Open Git Bash.",
          "Generate the SSH key using the following command:",
          {
            command: "ssh-keygen -t rsa -b 2048 -f /c/path/to/sshkey.pem"
          },
          "Set the permissions of the SSH key using:",
          {
            command: "chmod 400 /c/path/to/sshkey.pem"
          }
        ]
      },
      {
        subOs: "WSL (Ubuntu/Debian/etc.)",
        steps: [
          "Open your WSL terminal.",
          "Generate the SSH key using the following command:",
          {
            command: "ssh-keygen -t rsa -b 2048 -f /mnt/c/path/to/sshkey.pem"
          },
          "Set the permissions of the SSH key using:",
          {
            command: "chmod 400 /mnt/c/path/to/sshkey.pem"
          }
        ]
      }
    ]
  }
];

const FAQ: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold  mb-6" style={{ color: "#3f5175" }}>FAQ</h1>
      <h2 className="font-bold  mb-6" style={{ color: "#3f5175" }}>SSH Key Permissions</h2>
      <div className="space-y-6">
        {faqData.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#3f5175" }}>{item.os}</h2>
            {item.subCommands ? (
              <div className="ml-4 space-y-4">
                {item.subCommands.map((subItem, subIndex) => (
                  <div key={subIndex}>
                    <h3 className="text-xl font-medium mb-2" style={{ color: "#3f5175" }}>{subItem.subOs}</h3>
                    <div className="space-y-2">
                      {subItem.steps.map((step, stepIndex) => (
                        typeof step === 'string' ? (
                          <p key={stepIndex} className="text-gray-700" style={{ color: "#3f5175", fontWeight: step.includes("Open") ? 700 : 400 }}>
                            {step}
                          </p>
                        ) : (
                          <CodeBlock key={stepIndex} command={step.command} />
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {item.steps.map((step, stepIndex) => (
                  typeof step === 'string' ? (
                    <p key={stepIndex} className="text-gray-700" style={{ color: "#3f5175", fontWeight: step.includes("Open") ? 700 : 400 }}>
                      {step}
                    </p>
                  ) : (
                    <CodeBlock key={stepIndex} command={step.command} />
                  )
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CodeBlock: React.FC<{ command: string }> = ({ command }) => {
  const { hasCopied, onCopy } = useClipboard(command);

  return (
    <Box position="relative" className="bg-gray-100 p-4 rounded-lg shadow-md">
      <pre className="text-sm font-mono" style={{ color: "#3f5175" }}>{command}</pre>
      <Tooltip label={hasCopied ? "Copied" : "Copy to clipboard"} closeOnClick={false}>
        <Button 
          size="sm" 
          position="absolute" 
          top="2" 
          right="2" 
          onClick={onCopy}
          bg="gray-200"
          _hover={{ bg: 'gray-300' }}
          leftIcon={<BiCopy />}
        >
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Tooltip>
    </Box>
  );
};

export default FAQ;
