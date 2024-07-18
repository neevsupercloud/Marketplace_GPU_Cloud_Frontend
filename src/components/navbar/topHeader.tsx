import {useLocation} from "react-router-dom";
import {formatRoute, StringMapType} from "../../data.ts";

function TopHeader() {
  const {pathname} = useLocation();

    return (
        <div className="h-full px-4">
            <p className="font-bold text-black text-2xl">{formatRoute[pathname as keyof StringMapType]}</p>
        </div>
    )
}

export default TopHeader