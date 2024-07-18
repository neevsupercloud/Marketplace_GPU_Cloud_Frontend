import { Button } from '@chakra-ui/react';
import { GoArrowLeft } from "react-icons/go";


const Heading = {
  margin: 0,
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  fontWeight: 700,
  lineHeight: 1.5,
  color: '#3f5175',
  fontSize: '20px'
};

const subHeading = {
    marginTop: "10px",
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    fontWeight: 500,
    lineHeight: 1.5,
    color: '#3f5175',
    fontSize: '15px'
  };
export default function DeployModelConfiguration(props: any) {
  return (
    <div className='p-5 bg-[#f3f5f9] rounded-[8px] border border-[#0D11151A]/10' style={{width:"85%"}}>
      <h2 className="font-Inter font-[600] text-[20px]" style={Heading}>
        Deploy Stable Diffusion XL
      </h2>
      <div className="font-Inter font-[600] text-[16px] my-3" style={subHeading}>
        Review the model configuration below and deploy it in one click.
      </div>
      <div className="my-2">
        <div className="my-2 font-Inter font-[600] text-[16px] text-[#3f5175]">
          Name
        </div>
        <div className="w-full border border-[#0D11151A]/10 rounded-[4px]">
          <input type="text" className="h-[47px] w-full px-5 text-[#3f5175]" value={props?.modelPayload?.title} disabled />
        </div>
      </div>
      {/* Instance Type section */}
      <div className="my-3">
        <div className="font-Inter font-[600] text-[16px] text-[#3f5175]" style={{marginBottom:"5px"}}>
          Instance Type
        </div>
        <div className="bg-[#f3f5f9]  flex justify-between items-center p-5 border border-[#0D11151A]/10 rounded-[4px]">
          <div className="flex justify-between items-center">
            <div className="h-[50px] w-[50px] bg-[#673ab7]">
            <svg xmlns="http://www.w3.org/2000/svg" fill='white' style={{width:"35px",height:"35px",marginLeft:"7px",marginTop:"7px"}} viewBox="0 0 512 512"><path d="M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM64 288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V352c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm56 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" /></svg>
            </div>
            <div className="font-Inter font-[600] text-[16px] text-[#3f5175] mx-3">
              {props?.modelPayload?.machineName}:12x144<br /><span className="font-[400] text-[14px]">1 {props?.modelPayload?.machineName} GPU, 80 GiB VRAM, 12 vCPU, 144 GiB RAM</span>
            </div>
          </div>
          <div className="text-[#3f5175] font-Inter font-[400] text-[14px]">
            <span className="font-[600] text-[14px]">$0.10240</span>/min
          </div>
        </div>
      </div>
      {/* Autoscaling section */}
      <div className="bg-[#0D11150A] p-5 border border-[#0D11151A]/10 rounded-[4px] my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Autoscaling settings here */}
        </div>
      </div>
      <div className="text-[#3f5175]  font-Inter font-[400] text-[14px]">
        All autoscaling settings are configurable after deploying the model.
      </div>
      <div className="my-5 flex flex-col sm:flex-row justify-between items-center">
        <Button
          onClick={() => { props.setActiveTab("DeploymentModel") }}
          variant="solid"
          backgroundColor={"#0D11151A"}
          color={"white"}
          leftIcon={<GoArrowLeft color='white' size={30} />}
         style={{width:"250px"}}
          paddingY={6}
          className='w-full sm:w-[25%] text-[#ffffff] mb-3 sm:mb-0'
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
        <Button
          onClick={() => { props.setActiveTab("DeploymentModelFinal") }}
          variant="solid"
          backgroundColor={"#1952CE"}
          color={"#FFFFFF"}
          style={{width:"130px"}}
          paddingY={6}
          className='w-full sm:w-[12%]'
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
  );
}
