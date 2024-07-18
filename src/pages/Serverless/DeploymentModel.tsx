import { Button} from '@chakra-ui/react'
import Spinner from '../../components/Spinner-loader';
import AliceCarousel from 'react-alice-carousel';
import ModelsCards from './ModelsCards';
import 'react-alice-carousel/lib/alice-carousel.css';
import { DeployModels } from "../../data.json"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAlert from '../../store/useAlert';
import './DeploymentModel.css'
import filter from '../../asset/icons8-filter-50.png'

export default function DeploymentModel(props: any) {


    const Heading = {
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        lineHeight: '1.5',
        fontWeight: '700',
        fontSize: '20px',
        color: 'rgb(63, 81, 117)'
    };
    const paragraphStyle = {
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        lineHeight: '1.5',
        fontWeight: '500',
        fontSize: '15px',
        color: 'rgb(63, 81, 117)'
    };


    const navigate = useNavigate();
    const { errorToast } = useAlert();


    const [data] = React.useState(DeployModels);
    const [filteredList, setFilteredList] = React.useState(data);
    const [searchText, setSearchText] = React.useState("");
    const [uniqueGroupBy, setUniqueGroupBy] = React.useState<string[]>([]);
    const [selectedModelId, setSelectedModelId] = React.useState(Number);

   

    React.useEffect(() => {
        if (data?.length > 0) {
            const tempUniqueGroupBy = [...new Set(data.map(item => item.groupName))];
            setUniqueGroupBy(tempUniqueGroupBy)
        }
    }, [data])

    React.useEffect(() => {
        if (data?.length > 0) {
            if (searchText?.length > 0) {
                let updatedList = [...data];
                // Include all elements which includes the search query
                const filtered = updatedList.filter(item => {
                    const titleMatch = item?.title?.toLowerCase()?.includes(searchText.toLowerCase());
                    const versionMatch = item?.version?.toLowerCase()?.includes(searchText.toLowerCase());
                    const machineNameMatch = item?.machineName?.toLowerCase()?.includes(searchText.toLowerCase());
                    return titleMatch || versionMatch || machineNameMatch;
                });
                console.log("filtered :", filtered);

                setFilteredList(filtered)
            } else {
                setFilteredList(data);
            }
        }
    }, [searchText, data])

    if (!data) return <Spinner />

    return (
        <div className="deploy-model-style" >
            <h2 className="font-Inter font-[600] text-[20px]" style={Heading}>
                Deploy Model
            </h2>
            <div className="w-full flex flex-col justify-center items-center bg-[#f3f5f9] p-5 mt-5 py-10 rounded-[4px] border border-[#0D11151A]/10">
                <div className="font-Inter font-[500] text-[20px] text-[#0D1115] my-3" style={Heading}>
                    You have not deployed any endpoints yet.
                </div>
                <div className="font-Inter font-[400] text-[14px] text-[#0D1115]/70" style={paragraphStyle}>
                    Quickly deploy an open source model from <span className="underline">our library</span>  or <span className="underline">deploy your own model </span> in just a few commands.
                </div>
            </div>
            <div className="p-2 font-Inter font-[600] text-[20px]" style={Heading}>
                Model Library
            </div>
            <div className="p-2" style={paragraphStyle}>
                Browse our library of open source models that are ready to deploy behind an API endpoint in seconds.
            </div>
            <div className="mx-2 my-2 flex flex-col md:flex-row justify-center items-center gap-3">
                <div className="w-full rounded-[4px]">
                    <input
                        type="text"
                        style={{
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                            borderRadius: "10px",
                            border: "none",
                            outline: "none" // Remove outline using CSS
                        }}
                        className="h-[47px] w-full px-5 bg-[#f3f5f9]"
                        placeholder='Find a model by name, model ID, or deployment ID'
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                </div>
                <div className="w-full md:w-auto">
                    <Button
                        onClick={() => {
                            if (!selectedModelId) {
                                errorToast("Please select a Model first")
                            } else {
                                props.setActiveTab("DeployModelConfiguration")
                            }
                        }}
                        variant="solid"
                        color={"white"}
                        paddingY={6}
                        className='w-full'

                        sx={{
                            backgroundImage: 'linear-gradient(to left, #B52CF6, #4A91F7)',
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                            '&:hover': {
                                backgroundImage: 'linear-gradient(to left, #B52CF6, #4A91F7)',
                                color: "white"
                            }
                        }}

                        _hover={{
                            bg: "white",
                            color: "white",
                            transform: "translateY(-2px)", // Move the button slightly upwards on hover
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
                        }}
                    >
                        Deploy a Model
                    </Button>

                </div>
            </div>
            <div className="mx-2 mt-5 flex flex-col md:flex-row justify-start items-center gap-6">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img src={filter} alt="filter icon" style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)', pointerEvents: 'none', width: "22px", height: "22px" }} />
                    <select
                        id=""   
                        className="select-style-filter font-semibold" // Apply font weight using Tailwind CSS utility class
                        onChange={(e) => navigate(`/serverless/modal-view/${e.target.value}`)}
                        style={{ outline: "none", cursor: "pointer", paddingLeft: "30px" }} // Adjust paddingLeft to accommodate the icon
                    >
                        <option value="" className="" style={{ marginRight: "-200px", color: "#3f5175" }}>Filter By</option>
                        {
                            uniqueGroupBy.map((group, i) => {
                                return (
                                    <option key={i} value={group.split(' ').join('-')} className="">{group}</option>
                                )
                            })
                        }
                    </select>
                </div>



                <div className="border-r-2 border-[#0D11151A] h-[44px] "></div>
                <div className="w-full md:w-[85%]">
                    <AliceCarousel
                        autoPlayStrategy='default'
                        mouseTracking
                        keyboardNavigation={true}
                        items={
                            uniqueGroupBy.map((group, i) => {
                                return (
                                    <div
                                        key={i}
                                        className={`h-[50px] w-[90%] border border-[#0D11151A] bg-[#f3f5f9] rounded-[10px] flex justify-center items-center cursor-pointer`}
                                        style={{ boxShadow: "3px 2px 4px rgba(0, 0, 0, 0.3)", width: "88%", height: "44px" }}
                                        onClick={() => navigate(`/serverless/modal-view/${group.split(' ').join('-')}`)}
                                    >
                                        {group}
                                    </div>
                                )
                            })
                        }
                        responsive={{
                            0: { items: 1 },
                            600: { items: 2 },
                            1024: { items: 3 },
                        }}
                        disableDotsControls={true}
                        disableButtonsControls={true}
                    />
                </div>
            </div>

            {uniqueGroupBy?.length > 0 ?
                uniqueGroupBy?.map((group, i) => {
                    return (
                        filteredList.filter((filter) => { return filter.groupName === group }).length > 0 ?
                            <div key={i} className="mx-2 my-5 mt-10">
                                <div className="font-Inter font-[600] text-[20px] text-[#3f5175]">
                                    {group}
                                </div>
                                <div className="my-2 container max-w-8xl h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {filteredList.filter((filter) => { return filter.groupName === group }).map((items, i2) => {
                                        return (
                                            <div key={i2}>
                                                <ModelsCards {...items} selectedModelId={selectedModelId} setSelectedModelId={setSelectedModelId} setModelPayload={props.setModelPayload} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            :
                            null
                    )
                })
                :
                null
            }
        </div>
    );
}


{/* <div className="w-full md:w-[85%] flex justify-center items-center gap-3 flex-wrap">
    {uniqueGroupBy.map((group, i) => (
        <button
            key={i}
            className="h-[47px] px-4 border border-[#0D11151A]/10 bg-[#0D11151A]/10 rounded-[4px] flex justify-center items-center cursor-pointer"
            onClick={() => navigate(`/serverless/modal-view/${group.split(' ').join('-')}`)}
        >
            {group}
        </button>
    ))}
</div> */}
