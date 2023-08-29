import Panel from "../../Panel"
import OrangeTip from '@/assets/images/sports/svg/orange-tips.svg';
import triangle from '@/assets/images/sports/svg/triangle.svg';
import { Empty, List } from "antd-mobile";
import WeatherPanel from "../../Panel";
const FootBall: React.FC = () => {
    const data = [];
    return (
        <div>
            <WeatherPanel />
            <Panel />
            {
                data.length !== 0 ?
                    <div>
                        <div className="border-line-bottom">
                            <span>文字直播</span>
                            <img src={OrangeTip} width={20} height={20} />
                        </div>
                        <List >
                            {


                                data.map((res, idx) => {
                                    return <List.Item key={idx}>
                                        <div className="box">
                                            <div className="box-left">
                                                <img src={triangle} width={20} height={20} />
                                            </div>
                                            <div className="box-right">
                                                <div className="top">   <img src={triangle} width={20} height={20} /><span>蒂拉佩斯卡保 1973</span></div>
                                                <div className="bottom">本场比赛结束，最终比分为2-2，感谢大家关注，下次再会！</div>
                                            </div>
                                        </div>
                                    </List.Item>
                                })
                            }
                        </List>
                    </div> : <div className="realTime-empty">
                        <Empty />
                    </div>
            }
        </div>
    )
}

export default FootBall;