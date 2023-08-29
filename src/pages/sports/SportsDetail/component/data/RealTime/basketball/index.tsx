import ProgressBar from "@/components/progressBar";
import { data } from "@/hooks/useRealTime";
import '../real-time.scss'
const Basketball: React.FC = () => {
    return <div>
        <div className="panel-info">
            <div className="top">

                <div className="left">
                    <span></span>
                    <span className="master">舒适加</span>
                    <span className="ke">ABK 奥里恩</span>
                </div>
                <div className="right">

                    <div>
                        <span className="schedule">Q1</span>
                        <span className="text">23</span>
                        <span className="text">56</span>
                    </div>
                    <div>
                        <span className="schedule">Q2</span>
                        <span className="text">23</span>
                        <span className="text">56</span>
                    </div>
                    <div>
                        <span className="schedule">Q3</span>
                        <span className="text">23</span>
                        <span className="text">56</span>
                    </div>
                    <div>
                        <span className="schedule">Q4</span>
                        <span className="text">23</span>
                        <span className="text">56</span>
                    </div>
                    <div>
                        <span className="schedule">总分</span>
                        <span className="total">23</span>
                        <span className="total">56</span>
                    </div>

                </div>
            </div>
            <div className="bottom">
                {
                    ['', '', ''].map((res, index) => {
                        return (

                            <div className="box">
                                <div className="up">罚球得分</div>
                                <div className="down">
                                    <span>0</span>
                                    <div style={{ width: '60%', height: '8px' }}>
                                        <ProgressBar percent={35} innerBackground={"#D0021B"} ourBackground={"#3270E1"} />
                                    </div>
                                    <span>0</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        {/* 球队统计 */}
        <div className="team">球队统计</div>
        <div className="team-info">
            <div className="left">主队</div>
            <div className="right">客队</div>
        </div>

        {
            data.map((res, index) => {
                return (

                    <div className="team-score">
                        <div className="top">
                            <span className="home">0</span>
                            <span className="name">3分球</span>
                            <span className="away">0</span>
                        </div>
                        <div className="bottom">
                            <div className="bottom-box" >
                                <div style={{ width: '100%', height: '10px' }}>
                                    <ProgressBar percent={res.value} innerBackground={"#D0021B"} ourBackground={"#3270E1"} />
                                </div>
                            </div>
                            <div className="right-box" >
                                <div style={{ width: '100%', height: '10px' }}>
                                    <ProgressBar percent={res.value} innerBackground={"#D0021B"} ourBackground={"#3270E1"} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
}

export default Basketball;