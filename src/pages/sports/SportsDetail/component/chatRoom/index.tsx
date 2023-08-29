import React, { useState } from "react";
import './charRoom.scss'
import { ExclamationCircleOutline, TextDeletionOutline } from "antd-mobile-icons";
import { CapsuleTabs, Input, Swiper } from "antd-mobile";
import happy from '@/assets/images/sports/img/happy.png';
import happyActive from '@/assets/images/sports/img/happy-activation.png'
import send from '@/assets/images/sports/img/send.png';
import vector from '@/assets/images/sports/svg/vector.svg';
import Character from "./character";

const CharRoom: React.FC = () => {
    let [showCharacter, setCharacter] = useState(false);
    let data = Array.from({ length: 10 }).fill({})
    const [happyFace, setHappyFace] = useState(false)


    return (
        <div className="charRoom-main">
            <div className="charRoom-main-header">
                <span>聊个球</span>
                <div className="tips"><ExclamationCircleOutline width={21} height={21} color="orange" /></div>
            </div>
            {/* 显示聊天内容 */}
            <div className="char-content">
                {
                    data.map((res, index) => {
                        return (
                            <div className="chart-list" key={index}>
                                <div className="chart-list-top">
                                    <div>
                                        <img src={vector} width={20} height={20} />
                                    </div>
                                    <div><span>夜夜颜射贾静雯:</span></div>
                                    <span className="order-msg">在APP端晒了一单</span>
                                </div>
                                <div className="chart-list-bottom">
                                    <div>
                                        <span className="top">滚球大/小</span>
                                        <span className="bottom">
                                            投注额:149.00
                                        </span>
                                    </div>
                                    <div>
                                        <span className="top">大7 @1.87</span>
                                        <span className="bottom">
                                            可赢额:132.00
                                        </span>
                                    </div>
                                </div>
                                <div className="auto">
                                    <span className="nick">官方助手:</span>
                                    <span>官方不会通过电话、短信等任何方式索要您的【账号密码、验证码】、或通知您处理【充提、确认到账】等事宜！</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="bottom-input">
                <div className="bottom-input-top" style={{ display: 'flex' }}>
                    <div className="bottom-input-box">
                        <div className="bottom-input_context">
                            <ExclamationCircleOutline width={25} height={25} color="red" style={{ marginLeft: '12px' }} />
                            <Input placeholder='请输入内容' clearable />
                            <div className="send_circle">
                                <img src={send} width={15} height={15} />
                            </div>
                        </div>
                    </div>
                    {/* 笑脸 */}
                    <div className="happy" onClick={() => setCharacter(!showCharacter)}>
                        {
                            showCharacter ? <img src={happyActive} width={32} height={32} /> : <img src={happy} width={32} height={32} />
                        }
                    </div>
                </div>
                {/* 字符输入 */}
                {
                    showCharacter ? (
                        <Character />
                    ) : null
                }
            </div>
        </div>
    )
}

export default CharRoom;