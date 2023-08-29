import { motion } from "framer-motion"
import singleArrow from '@/assets/images/sports/svg/single-arrow.svg';
import React, { PropsWithChildren } from "react";
import './render-title.scss'
interface IProp {
    doubleArrowFlag: boolean
    title: string
}
const RenderTitle: React.FC<PropsWithChildren<IProp>> = ({ doubleArrowFlag, title }: IProp) => {
    return <div >
        <div className="motion-content">
            <motion.div animate={{ rotate: doubleArrowFlag ? 0 : 180 }} className="motion-div">
                <img src={singleArrow} width={20} height={20} />
            </motion.div>
            <span >{title}</span>
        </div>
    </div>
}

export default RenderTitle