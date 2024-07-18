import { Button } from '@chakra-ui/react';
import { GoArrowLeft } from 'react-icons/go';
import ModelsCards from './ModelsCards';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { DeployModels } from "../../data.json";

function ModalView() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [data] = React.useState(DeployModels);
    const [selectedFilter, setSelectedFilter] = React.useState("");

    React.useEffect(() => {
        let SelectedFilter = slug?.split("-") || "";

        if (SelectedFilter?.length > 1 && SelectedFilter?.length == 2) {
            setSelectedFilter(SelectedFilter[0] + " " + SelectedFilter[1]);
        } else if (SelectedFilter?.length > 2 && SelectedFilter?.length == 3) {
            setSelectedFilter(SelectedFilter[0] + " " + SelectedFilter[1] + " " + SelectedFilter[2]);
        } else if (SelectedFilter?.length > 3 && SelectedFilter?.length == 4) {
            setSelectedFilter(SelectedFilter[0] + " " + SelectedFilter[1] + " " + SelectedFilter[2] + " " + SelectedFilter[3]);
        }
    }, [slug]);

    return (
        <div className='bg-[#f3f5f9] p-5'>
            <div className="flex justify-between items-center">
                <h2 className='font-Inter font-[600] text-[28px] text-[#3f5175] mx-2 my-2'>{selectedFilter}</h2>
                <div className="w-[40%] flex justify-end">
                    <Button
                        onClick={() => { navigate("/serverless/deploy-model") }}
                        // variant="solid"
                        backgroundColor={"#0D11151A"}
                        // color={"rgba(13, 17, 21, 0.3)"}
                        // _hover={{ bg: "#8ca9e7", color: "black" }}
                        leftIcon={<GoArrowLeft color='rgba(13, 17, 21, 0.3)' size={30} />}
                        // paddingY={6}
                        // className='w-[50%] text-[#0D11154D]'
                        variant="solid"
                        color={"white"}
                        width={"250px"}
                        paddingY={6}
                        className='w-full'
                        style={{}}
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
                        Return to Model Library
                    </Button>
                </div>
            </div>
            <div className="bg-[#f3f5f9] p-5 my-5">
                {data.filter((filter) => { return filter.groupName == selectedFilter }).length > 0 ?
                    <div className="mx-2 my-5">
                        <div className="font-Inter font-[600] text-[20px]" style={{color:"#3f5175"}}>
                            {data.filter((filter) => { return filter.groupName == selectedFilter }).length} {selectedFilter}
                        </div>
                        <div className="my-3 container max-w-8xl h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {data.filter((filter) => { return filter.groupName == selectedFilter }).map((items) => {
                                return (
                                    <div key={items.id} className="col-span-1">
                                        <ModelsCards {...items} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    :
                    <div className="">No Data Available</div>
                }
            </div>
        </div>
    );
}

export default ModalView;
