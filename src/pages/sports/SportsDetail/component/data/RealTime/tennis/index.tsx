import React from "react"
import './tennis.scss'
const Tennis: React.FC = () => {
    return <div className="tennis">
        <div className="panel">
            <div className="top">
                <div className="left">
                    <div className="slot" />
                    <div className="name-top">卢卡.范.阿切 (法国)</div>
                    <div className="name-right">亚历克斯.莫尔坎 (斯洛伐克)</div>
                </div>
                <div className="right">
                    <div className="item">
                        <span className="name">盘</span>
                        <span>0</span>
                        <span>1</span>
                    </div>
                    <div className="item">
                        <span className="name">局</span>
                        <span>0</span>
                        <span>1</span>
                    </div>
                    <div className="item">
                        <span className="name">分</span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="left">4-6 1-1 </div>
                <div className="right">
                    <span>总分:</span>
                    5-7(12)
                </div>
            </div>
        </div>
    </div>
}

export default Tennis