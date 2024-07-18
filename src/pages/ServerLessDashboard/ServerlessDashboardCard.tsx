import { GoDotFill } from 'react-icons/go'
import { MdStorage } from 'react-icons/md'
import { FaRegMoon } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import {
    Menu,
    MenuButton,
    MenuList,
    // MenuItem,
    // MenuItemOption,
    // MenuGroup,
    // MenuOptionGroup,
    // MenuDivider,
    IconButton,
} from '@chakra-ui/react'

function ServerlessDashboardCard(props: any) {
    return (
        <div className='rounded-[4px] border-2 border-[#0D111536]/20'>
            <div className="p-5">
                <div className="flex justify-between items-center">
                    <div className="font-Inter font-[600] text-[16px]">{props?.title}</div>
                    <div className="">
                        <Menu direction="ltr" flip={true} placement="left-end" strategy="absolute">
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<HiDotsHorizontal />}
                                variant='ghost'
                            />
                            <MenuList className='w-[50%]'>
                                <div className="font-Inter font-[500] text-[10px] text-[#FF4343] text-center cursor-pointer">
                                    Delete Model
                                </div>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
            </div>
            <div className="px-5 flex justify-between items-center mb-4">
                <div className="font-Inter font-[400] text-[12px] text-[#0D1115D1]/80">{props?.deploymentMode}</div>
                <div className="bg-[#0D11151F] p-1 rounded-[4px] border border-[#0D111536]/20 font-Inter font-[500] text-[10px] text-[#0D111585]/50">{props?.scaled}</div>
                <div className="flex justify-between items-center font-Inter font-[400] text-[12px] text-[#0D1115]"> <MdStorage size={22} className='mx-2' /> {props?.machineName}</div>
            </div>
            <div className="border-t border-[#0D111536]/20 bg-[#0D11150A] p-2 px-5 flex justify-between items-center">
                <div className="font-Inter font-[400] text-[8px] text-[#0D1115D1]/80">
                    {props?.deployments} deployment
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center mx-2 font-Inter font-[400] text-[8px] text-[#0D1115D1]/80"><GoDotFill size={14} color='#41B35A' className="mx-1" /> {props?.running}</div>
                    <div className="flex justify-between items-center font-Inter font-[400] text-[8px] text-[#0D1115D1]/80"><FaRegMoon size={14} className="mx-1" /> {props?.sleep}</div>
                </div>
            </div>
        </div>
    )
}

export default ServerlessDashboardCard