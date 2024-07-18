import { GoDotFill } from "react-icons/go";
import generativeai from "../../asset/preview2.webp";

export default function ModelsCards(props: any) {
    return (
        <div 
            className={`relative border ${props.selectedModelId == props.id ? "border-[#1952CE]" : "border-[#0D11151A]/10"} rounded-[5px] p-4 flex flex-col justify-center items-start shadow-md`} 
            onClick={() => { props.setSelectedModelId(props.id); props.setModelPayload(props) }}
            style={{ 
                borderLeft: "4px solid #8a3ffc", 
                transition: "transform 0.3s, box-shadow 0.3s", 
                cursor: "pointer",
                height: '140px'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
            }}
        >
            <div className="absolute inset-0 bg-black opacity-30 rounded-[5px]"></div>
            <div className="absolute inset-0 rounded-[5px] bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${generativeai})` }}></div>
            <div className="relative z-10 flex justify-start items-center">
                <img src={props.icon} alt="" className="w-[30px] h-[30px]" />
                <div className="mx-2 font-Inter font-[600] text-[16px] text-white">
                    {props.title}
                </div>
            </div>
            <div className="relative z-10 my-2 font-Inter font-[600] text-[12px] text-white">
                {props.source}
            </div>
            <div className="relative z-10 flex justify-start items-center font-Inter font-[400] text-[14px] text-white">
                {props.version}&nbsp;{props.machineName ? <GoDotFill size={8} /> : null}&nbsp;{props.machineName ? props.machineName : null}&nbsp;{props.use ? <GoDotFill size={8} /> : null}&nbsp;{props.use ? props.use : null}&nbsp;{props.modalInfo ? <GoDotFill size={8} /> : null}&nbsp;{props.modalInfo ? props.modalInfo : null}
            </div>
        </div>
    );
}
