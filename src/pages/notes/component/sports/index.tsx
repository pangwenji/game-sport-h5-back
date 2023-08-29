import React, { useEffect, useState } from "react";
import './sports.scss'
import { CapsuleTabs, Dropdown, Empty, } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";
import UnSettle from "./unSettle";
import Settle from "./settle";
import { useNotesStore } from "@/stores/notes";
import { getPassSevenDate, getYesTodayDate } from "@/hooks/useNotes";
enum TabsTitle {
    TODAY = 'today',
    YESTERDAY = 'yesterday',
    SEVEN = 'seven'
}
const Sports: React.FC = () => {
    let { active } = useNotesStore.getState()
    const [actives, setActive] = useState('unSettle');
    useEffect(() => {
        setActive(active)
    }, [active])
    return <div className="sport">
        {
            actives === 'settle' ? <Settle /> : <UnSettle />
        }
    </div>
}

export default Sports;