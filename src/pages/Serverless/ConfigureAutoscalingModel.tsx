import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    // ModalCloseButton,
    // Text,
    Button,
} from '@chakra-ui/react'
import Slider from 'rc-slider';

export default function ConfigureAutoscalingModel(props: any) {

    // const [replicas, setReplicas] = React.useState(0)
    return (
        <div className=''>
            <Modal blockScrollOnMount={true} isOpen={props.isOpen} size={"3xl"} isCentered={true} onClose={props.onClose}>
                <ModalOverlay bg='none'
                    backdropFilter='auto'
                    backgroundColor="#0D1115D1"
                    backdropBlur='5px' />
                <ModalContent>
                    <ModalHeader>Configure autoscaling</ModalHeader>
                    <ModalBody>
                        <div className="flex justify-start items-center w-full">
                            <div className=''>
                                Configure the autoscaling settings for
                            </div>
                            <div className='mx-1'>
                                deployment-1 qk9ykd3
                            </div>
                            <div className='mx-2'>
                                Learn more
                            </div>
                        </div>
                        <div className="border border-[#0D11151A]/10 p-2 my-5">
                            <div className="my-2">
                                Replicas
                            </div>
                            <div className="my-2">
                                Set the min and max number of replicas. We’ll autoscale based on traffic.
                            </div>
                            <Slider
                                className='h-full w-[95%] text-center rc-slider text-[16px] font-Inter font-[600] mx-4 my-8'
                                keyboard={true}
                                dots
                                min={0}
                                range={true}
                                defaultValue={[0, 1]}
                                max={10}
                                allowCross={false}
                                marks={
                                    {
                                        0: "0",
                                        1: "",
                                        2: "",
                                        3: "",
                                        4: "",
                                        5: "5",
                                        6: "",
                                        7: "",
                                        8: "",
                                        9: "",
                                        10: "10",
                                    }
                                }
                                startPoint={2}
                                onChange={(index) => {
                                    console.log("index", index);
                                    // setGpuCount(Number(index));
                                    // setReplicas(Number(index));
                                }}
                                trackStyle={{
                                    // backgroundColor: "#1952CE85",
                                    backgroundColor: "#1952CE",
                                    // opacity: "52%"
                                }}
                                dotStyle={{
                                    backgroundColor: "#1952CE",
                                    border: "none",
                                }}
                                activeDotStyle={{
                                    backgroundColor: "#1952CE",
                                    border: "none"
                                }}
                                railStyle={{
                                    backgroundColor: "#1952CE85",
                                    opacity: "52%"
                                }}
                                handleStyle={{
                                    border: "none",
                                    backgroundColor: "#1952CE",
                                }}
                            />
                        </div>
                        <div className="p-3 border border-[#0D11151A]/10 flex justify-between items-center rounded-[4px]">
                            <div className="">
                                <div className="">Autoscaling window</div>
                                <div className="">Timeframe of traffic considered for scaling decisions</div>
                            </div>
                            <div className="flex justify-between items-center w-[30%] p-2 border border-[#0D11151A]/10 rounded-[4px]">
                                <div className="">60</div>
                                <div className="">seconds</div>
                            </div>
                        </div>
                        <div className="p-3 border border-[#0D11151A]/10 flex justify-between items-center rounded-[4px]">
                            <div className="">
                                <div className="">Scale down delay</div>
                                <div className="">Waiting period before scaling down any active replica</div>
                            </div>
                            <div className="flex justify-between items-center w-[30%] p-2 border border-[#0D11151A]/10 rounded-[4px]">
                                <div className="">900</div>
                                <div className="">seconds</div>
                            </div>
                        </div>
                        <div className="my-5 p-3 border border-[#0D11151A]/10 flex justify-between items-center rounded-[4px]">
                            <div className="">
                                <div className="">Concurrency target</div>
                                <div className="">Number of requests per replica before scaling up</div>
                            </div>
                            <div className="flex justify-between items-center w-[30%] p-2 border border-[#0D11151A]/10 rounded-[4px]">
                                <div className="">1</div>
                                <div className="">requests</div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' onClick={props.onClose}>Update</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
