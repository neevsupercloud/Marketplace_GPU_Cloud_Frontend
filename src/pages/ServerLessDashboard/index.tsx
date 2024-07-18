import { Button} from '@chakra-ui/react'
import React from 'react'
import Spinner from '../../components/Spinner-loader';
import { useStore } from "../../store";
import useApi from '../../store/useApi';
import { useQuery } from '../../store/api';
import { useNavigate } from 'react-router-dom';
import notfound from '../../asset/404.svg'

function ServerLessDashboard() {

    const { allModels, setAllModels, currOrg/* , currModel, setCurrModel */ } = useStore();
    const { getModels } = useApi();
    const { project_slug } = useQuery();
    const navigate = useNavigate();

    React.useEffect(() => {
        getModels().then(m => setAllModels(m));
    }, [project_slug, currOrg]);

    const headingContent = {
        fontSize: '14px',
        color: 'rgba(34, 51, 84, 0.7)',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        fontWeight: 600,
        lineHeight: 1.75
    };
    const headingStyle = {
        fontSize: '25 px',
        color: 'rgba(34, 51, 84, 0.7)',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        fontWeight: 700,
        lineHeight: 1.75
    };
    

    if (!allModels) return <Spinner />

    console.log("allModels :", allModels);


    return (
        <div className='p-5 bg-[#f2f5f9] min-h-full'>
            <div className="flex justify-between items-center">
                <h2 className='font-Inter font-[600] text-[28px] text-[#0D1115] mx-5' style={headingStyle}>Dashboard</h2>
                <Button


                    style={{
                        backgroundImage: 'linear-gradient(to left, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))',
                        width: "135px",
                        transition: "transform 0.3s",
                    }}
                    onClick={() => { navigate("/serverless/deploy-model") }}
                    width={"80px"}
                    marginTop={"10px"}
                    variant="solid"
                    color={"white"}
                    borderRadius={"7px"}
                    _hover={{
                        bg: "white",
                        color: "white",
                        transform: "translateY(-2px)", // Move the button slightly upwards on hover
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
                    }}
                    marginX={"18px"}
                    padding={"20px"}
                    className='font-Inter'
                >
                    Deploy a Model
                </Button>
            </div>
            <div className=" p-5 rounded-[8px] my-5bg-[#f2f5f9]" style={{ display: "flex", justifyContent: "center", backgroundColor: "#f2f5f9" }} >
                {/* <div className="mx-5 my-5 container max-w-8xl h-full grid grid-cols-4 gap-3">
                    {ServerlessDashboardCardData.map((items) => {
                        return (
                            <ServerlessDashboardCard {...items} />
                        )   
                    })
                    }
                </div> */}
                <div className=" p-5 rounded-[8px] my-5bg-[#f2f5f9]" style={{ display: "flex", justifyContent: "center", backgroundColor: "#f2f5f9", marginTop: "70px", flexDirection: "column" }}>
                    <img src={notfound} style={{ height: "200px", width: "200px",opacity:"0.5",marginLeft:"60px"}}></img>

                    <p style={headingContent}>Hey! You are good to go to deploy your first model..</p>
                    <div style={{ display: "flex", justifyContent: "center",marginTop:"12px" }}>
                        {/* <Button
                      
                            onClick={() => { navigate("/serverless/deploy-model") }}
                            variant="solid"
                            backgroundColor={"#673ab7"}
                            color={"white"}
                            // paddingX={10}
                            _hover={{ bg: "#8ca9e7", color: "white" }}
                            paddingY={2}
                            className='w-[13%] mx-10'
                        // isDisabled={!props.enabled}
                        >
                            Deploy
                        </Button> */}
                        <Button


                            style={{
                                backgroundImage: 'linear-gradient(to left, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))',
                                width: "135px",
                                transition: "transform 0.3s",
                            }}
                            onClick={() => { navigate("/serverless/deploy-model") }}
                            width={"80px"}
                            marginTop={"10px"}
                            variant="solid"
                            color={"white"}
                            borderRadius={"7px"}
                            _hover={{
                                bg: "white",
                                color: "white",
                                transform: "translateY(-2px)", // Move the button slightly upwards on hover
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
                            }}
                            marginX={"18px"}
                            padding={"20px"}
                            className='font-Inter'
                        >
                            Deploy
                        </Button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ServerLessDashboard