import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
} from '@chakra-ui/react'


const Heading = {
    marginLeft: "5px",
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    lineHeight: 1.5,
    fontWeight: 700,
    fontSize: '20px',
    color: 'rgb(63, 81, 117)',
};
const sub_Heading = {
    marginLeft: "1px",
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    lineHeight: 1.5,
    fontWeight: 500,
    fontSize: '16px',
    color: 'rgb(63, 81, 117)',
    // marginBottom: "10px"
};
function EditTemplateModal(props: any) {
    return (
        <div>
        <Modal blockScrollOnMount={true} isOpen={props.isOpen} size={"3xl"} isCentered={true} onClose={props.onClose}>
            <ModalOverlay bg='none' backdropFilter='auto' backgroundColor="#0D1115D1" backdropBlur='5px' />
            <ModalContent>
                <ModalHeader style={Heading}>Edit Template</ModalHeader>
                <ModalBody>
                    <div className="mx-2 my-5">
                        <div className="my-2 font-Inter font-[600] text-[16px] text-[#0D1115]/70" style={sub_Heading}>
                            Container Image
                        </div>
                        <div className="w-full">
                            <input type="text" value={"neevcloud/pytorch:2.0.1-py3.10-cuda11.8.0-devel-ubuntu22.04"} className="px-2 h-[44px] w-full border border-[#0D11151A]/10 rounded-[4px]" />
                        </div>
                    </div>
                        <div className="mx-2 my-5">
                            <div className="my-2 font-Inter font-[600] text-[16px] text-[#0D1115]/70" style={sub_Heading}>
                                Container Start Command
                            </div>
                            <div className="w-full">
                                <input type="text" className="h-[44px] w-full border border-[#0D11151A]/10 rounded-[4px] px-2" placeholder='This overrides the CMD in the Docker container' />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="mx-2 w-[45%]">
                                <div className="my-2 font-Inter font-[600] text-[16px] text-[#0D1115]/70" style={sub_Heading}>
                                    Storage
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between items-center border border-[#0D11151A]/10 rounded-[4px] px-2 focus-within:border-black">
                                        <input type="text" className="h-[44px] w-full outline-none" placeholder='20'  />
                                        <div className="" style={sub_Heading}>
                                            GB
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mx-2 w-[45%]">
                                <div className="my-2 font-Inter font-[600] text-[16px] text-[#0D1115]/70" style={sub_Heading}>
                                    RAM
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between items-center border border-[#0D11151A]/10 rounded-[4px] px-2 focus-within:border-black">
                                        <input type="text" className="h-[44px] w-full outline-none" placeholder='20' />
                                        <div className="" style={sub_Heading}>
                                            GB
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="mx-2 w-[45%]">
                                <div className="my-2 font-Inter font-[600] text-[16px] text-[#0D1115]/70" style={sub_Heading}>
                                    Expose HTTP Ports (Max 10)
                                </div>
                                <div className="w-full">
                                    <input type="text" className="h-[44px] w-full border border-[#0D11151A]/10 rounded-[4px] px-2" placeholder='8888' />
                                </div>
                            </div>
                            <div className="mx-2 w-[45%]">
                                <div className="my-2 font-Inter font-[600] text-[16px] text-[#0D1115]/70" style={sub_Heading}>
                                    Expose TCP Ports
                                </div>
                                <div className="w-full">
                                    <input type="text" className="h-[44px] w-full border border-[#0D11151A]/10 rounded-[4px] px-2" placeholder='22  ' />
                                </div>
                            </div>
                        </div>
                        </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={props.onClose}>
                            Cancel
                        </Button>
                        <Button
                            backgroundColor={"#1952CE"}
                            variant="solid"
                            color={"white"}
                            borderRadius={"4px"}
                            _hover={{ bg: "#8ca9e7", color: "black" }}
                            sx={{ background: "linear-gradient(to left, rgb(181, 44, 246), rgb(74, 145, 247))" }}
                            marginX={"5px"}
                            padding={"10px"}
                            className='font-Inter'
                            onClick={props.onClose}
                        >
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default EditTemplateModal