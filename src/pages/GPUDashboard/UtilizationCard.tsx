import ProgressBar from '@ramonak/react-progress-bar'

function UtilizationCard(props: any) {
    return (
        <div className='flex justify-between items-center mt-2'>
            <div className="w-[15%] font-Inter font-[600] text-[12px] text-[#3f5175]">
                {props.title}
            </div>
            <div className="flex justify-between items-center w-[85%] ">
                <div className="w-full">
                    <ProgressBar isLabelVisible={false} completed={props.progress} bgColor={"#673ab7"} baseBgColor={"#0D11150A"} height={"8px"} />
                </div>
                <div className="mx-2 font-Inter font-[600] text-[12px] text-[#3f5175]">{props.percentage}</div>
            </div>
        </div>
    )
}

export default UtilizationCard  