import React from 'react';
import DeploymentModel from './DeploymentModel';
import DeployModelConfiguration from './DeployModelConfiguration';
import DeploymentModelFinal from './DeploymentModelFinal';

export default function Serverless() {

    const [activeTab, setActiveTab] = React.useState("DeploymentModel");
    const [modelPayload, setModelPayload] = React.useState({})

    console.log("activeTab :", activeTab);

    return (
        <div className={`p-5 bg-[#f3f5f9]`} style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
            {activeTab === "DeploymentModelFinal" ?
                <div className="flex justify-between items-center">
                    <h2 className='font-Inter font-[600] text-[28px] text-[#0D1115] mx-2 my-2'>Deploy Model</h2>
                </div>
                :
                null
            }
            {
                activeTab === "DeploymentModel" ?
                    <DeploymentModel setActiveTab={setActiveTab} setModelPayload={setModelPayload} />
                    : activeTab === "DeployModelConfiguration" ?

                        <DeployModelConfiguration setActiveTab={setActiveTab} modelPayload={modelPayload} />
                        :
                        <DeploymentModelFinal modelPayload={modelPayload} /* setActiveTab={setActiveTab} */ /* setActiveSubTab={setActiveSubTab} */ />
            }

        </div >
    )
}