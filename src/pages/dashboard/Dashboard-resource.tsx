import React from 'react';

type DashboardResourceProps = {
  totalCpu: number;
  totalStorage: number;
  gpuCount: number;
  totalVRam: number; // Add this prop
};

const DashboardResource: React.FC<DashboardResourceProps> = ({  totalStorage, gpuCount }) => {
  const subHeading = {
    margin: 0,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    lineHeight: 1.5,
    fontWeight: 700,
    fontSize: '22px',
    color: 'rgb(63, 81, 117)',
  };

  const subHeadingStyles = {
    margin: '0px',
    fontSize: '13px',
    textTransform: 'uppercase' as 'uppercase',
    color: 'rgba(34, 51, 84, 0.5)',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    fontWeight: 400,
    lineHeight: 1.5,
  };

  const sub_subHeadingStyles = {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    lineHeight: 7.5,
    fontSize: '22px',
    fontWeight: 700,
    color: 'rgb(34, 51, 84)',
  };

  const headingContent = {
    fontSize: '14px',
    color: 'rgba(34, 51, 84, 0.7)',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    fontWeight: 400,
    lineHeight: 1.75,
  };

  return (
    <div>
      <div className="resourcecontainer" style={{ width: "100%" }}>
        <div className="resource-details p-6 max-w-lg mx-auto rounded-xl space-y-4 md:ml-0">
          <h1 className="text-2xl font-bold text-gray-900" style={subHeading}>Resources</h1>
          <p className="text-gray-700" style={headingContent}>Monitor your GPU, vCPU, storage, and endpoint usage.</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="col-span-1">
              <h2 className="text-xl font-semibold" style={subHeadingStyles}>GPUs</h2>
              <p className="text-gray-500" style={sub_subHeadingStyles}>{gpuCount}</p>
            </div>
            <div className="col-span-1">
              <h2 className="text-xl font-semibold" style={subHeadingStyles}>Storage</h2>
              <p className="text-gray-500" style={sub_subHeadingStyles}>{totalStorage} GB</p>
            </div>
            <div className="col-span-1">
              <h2 className="text-xl font-semibold" style={subHeadingStyles}>VCPU</h2>
              <p className="text-gray-500" style={sub_subHeadingStyles}>Null</p>
            </div>
            <div className="col-span-1">
              <h2 className="text-xl font-semibold" style={subHeadingStyles}>VRAM</h2>
              <p className="text-gray-500" style={sub_subHeadingStyles}>Null</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardResource;
