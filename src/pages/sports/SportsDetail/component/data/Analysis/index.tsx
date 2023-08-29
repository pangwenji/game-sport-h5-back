import React, { useEffect } from "react";
import './analysis.scss';
import *  as eschars from 'echarts';
import { chartOption } from "@/hooks/useAnalysis";
const Analysis: React.FC = () => {

    const render_left_chart = () => {
        let attackHtml = document.getElementById('left-eschars')
        let attackChar = eschars.init(attackHtml);
        attackChar.setOption(chartOption())
    }

    const render_right_chart = () => {
        let attackHtml = document.getElementById('right-eschars')
        let attackChar = eschars.init(attackHtml);
        attackChar.setOption(chartOption())
    }

    const render_E_Char = () => {
        render_left_chart()
        render_right_chart()
    }
    useEffect(() => {
        render_E_Char()
    }, [])
    return (
        <div className="analysis-main">
            <div className="analysis-header">
                <div className="top">
                    <div className="left">球队排名</div>
                    <div className="right">
                        <span>赛果</span>
                        <span style={{ whiteSpace: 'nowrap' }}>胜/平/负</span>
                        <span>进/失</span>
                        <span>积分</span>
                        <span>排名</span>
                    </div>
                </div>
                <div className="bottom">
                    {
                        ['1', '', ''].map((res, index) => {
                            return (

                                <div className="box">
                                    <div className="left">
                                        <img src="https://static.fastbs55.com/data/4473ad60deb751e09045a9ca904c6a5f.png" width={20} height={20} />
                                        <span>本特利绿茵</span>
                                    </div>
                                    <div className="right">
                                        <span>23</span>
                                        <span style={{ whiteSpace: 'nowrap' }}>4/3/17</span>
                                        <span>21/46</span>
                                        <span>16</span>
                                        <span>12</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            {/* 进球分布 */}
            <div className="goalDistribution">进球分布</div>
            <div className="team-row">
                <div className="left">
                    <div className="line"></div>
                    <div><img src="https://static.fastbs55.com/data/4473ad60deb751e09045a9ca904c6a5f.png" width={30} height={30} /></div>
                    <div className="text">本特利绿茵</div>
                </div>
                <div className="right">
                    <div className="text">墨尔本港鲨鱼</div>
                    <div><img src="https://static.fastbs55.com/data/9a9874477c76485ad29f2b1a404d7c7e.png" width={30} height={30} /></div>
                    <div className="line"></div>
                </div>
            </div>
            {/* 历史交锋 */}
            <div className="goalDistribution">历史交锋</div>
            <div className="team-row">
                <div className="left">
                    <div className="line"></div>
                    <div><img src="https://static.fastbs55.com/data/4473ad60deb751e09045a9ca904c6a5f.png" width={30} height={30} /></div>
                    <div className="text">本特利绿茵</div>
                </div>
                <div className="right">
                    <span className="outs">近6场, 0赢 2和 4输</span>
                </div>
            </div>
            <div className="match-item">
                {
                    ['', '', '', ''].map((res, index) => {
                        return (

                            <div className="match-info">
                                <div className="top">
                                    <span className="date">2023-04-29</span>
                                    <div className="status">输</div>
                                </div>
                                <div className="bottom">
                                    <div className="box"><span>墨尔本港</span><img src="https://cdn.sportnanoapi.com/football/team/7a9ffd8c5f911ec3e62f8e717ee47fae.png" width={32} height={32} /></div>
                                    <div className="score">2-1</div>
                                    <div className="box" style={{ justifyContent: 'flex-start' }}><img src="https://cdn.sportnanoapi.com/football/team/5016a715cb2eee1c7938f3170ad7d0ed.png" width={32} height={32} /><span>本特利绿茵</span></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* 对战记录 */}
            <div className="goalDistribution" >对战记录</div>
            <div className="team-row">
                <div className="left">
                    <div className="line"></div>
                    <div><img src="https://static.fastbs55.com/data/4473ad60deb751e09045a9ca904c6a5f.png" width={30} height={30} /></div>
                    <div className="text">本特利绿茵</div>
                </div>
                <div className="right">
                    <div className="text">墨尔本港鲨鱼</div>
                    <div><img src="https://static.fastbs55.com/data/9a9874477c76485ad29f2b1a404d7c7e.png" width={30} height={30} /></div>
                    <div className="line"></div>
                </div>
            </div>
            <div className="e_chart">
                <div className="e_chart_box">
                    <div className="e_chart_content">
                        <div className="top">
                            <div className="title">
                                <span>1贏</span>
                                <span>1输</span>
                                <span>1平</span>
                            </div>
                            <div className="march">
                                <span className="march-text">输</span>
                                <span className="march-text">输</span>
                                <span className="march-text">输</span>
                                <span className="march-text">赢</span>
                                <span className="march-text">平</span>
                                <span className="march-text">平</span>
                            </div>
                        </div>
                        <div className="middle">
                            <div className="core" id="left-eschars"></div>
                        </div>
                        <div className="bottom">
                            <div className="left">
                                <span>胜率 </span>
                                <span className="percent">17%</span>
                            </div>
                            <div className="right">
                                <div className="right-box">
                                    <span>负</span>
                                    <span className="value" style={{ color: '#00a525' }}>50%</span>
                                </div>
                                <div className="right-box">
                                    <span>平</span>
                                    <span className="value" style={{ color: '#888' }}>30%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="e_chart_box" style={{ marginLeft: '10px' }}>

                    <div className="e_chart_content">
                        <div className="top">
                            <div className="title">
                                <span>1贏</span>
                                <span>1输</span>
                                <span>1平</span>
                            </div>
                            <div className="march">
                                <span className="march-text">输</span>
                                <span className="march-text">输</span>
                                <span className="march-text">输</span>
                                <span className="march-text">赢</span>
                                <span className="march-text">平</span>
                                <span className="march-text">平</span>
                            </div>
                        </div>
                        <div className="middle">
                            <div className="core" id="right-eschars"></div>
                        </div>
                        <div className="bottom">
                            <div className="left">
                                <span>胜率 </span>
                                <span className="percent">17%</span>
                            </div>
                            <div className="right">
                                <div className="right-box">
                                    <span>负</span>
                                    <span className="value" style={{ color: '#00a525' }}>50%</span>
                                </div>
                                <div className="right-box">
                                    <span>平</span>
                                    <span className="value" style={{ color: '#888' }}>30%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 两队情况 甲队 */}
            <div className="team-row">
                <div className="left">
                    <div className="line"></div>
                    <div><img src="https://static.fastbs55.com/data/4473ad60deb751e09045a9ca904c6a5f.png" width={30} height={30} /></div>
                    <div className="text">本特利绿茵</div>
                </div>
                <div className="right" />
            </div>
            <div className="match-item">
                {
                    ['', '', ''].map((res, index) => {
                        return (

                            <div className="match-info">
                                <div className="top">
                                    <span className="date">2023-04-29</span><span style={{ marginLeft: '10px' }}>联盟杯</span>
                                    <div className="status">输</div>
                                </div>
                                <div className="bottom">
                                    <div className="box"><span>墨尔本港</span><img src="https://cdn.sportnanoapi.com/football/team/7a9ffd8c5f911ec3e62f8e717ee47fae.png" width={32} height={32} /></div>
                                    <div className="score">2-1</div>
                                    <div className="box" style={{ justifyContent: 'flex-start' }}><img src="https://cdn.sportnanoapi.com/football/team/5016a715cb2eee1c7938f3170ad7d0ed.png" width={32} height={32} /><span>本特利绿茵</span></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* 两队情况  乙队 */}
            <div className="team-row">
                <div className="left">
                    <div className="line" style={{ background: '#2B44B1' }}></div>
                    <div><img src="https://static.fastbs55.com/77deed6cad8261aa0e0d2b9a9dcafb2.png" width={30} height={30} /></div>
                    <div className="text">克雷塔罗</div>
                </div>
                <div className="right" />
            </div>
            <div className="match-item">
                {
                    ['', '', '', ''].map((res, index) => {
                        return (

                            <div className="match-info">
                                <div className="top">
                                    <span className="date">2023-04-29</span><span style={{ marginLeft: '10px' }}>联盟杯</span>
                                    <div className="status">输</div>
                                </div>
                                <div className="bottom">
                                    <div className="box"><span>墨尔本港</span><img src="https://cdn.sportnanoapi.com/football/team/7a9ffd8c5f911ec3e62f8e717ee47fae.png" width={32} height={32} /></div>
                                    <div className="score">2-1</div>
                                    <div className="box" style={{ justifyContent: 'flex-start' }}><img src="https://cdn.sportnanoapi.com/football/team/5016a715cb2eee1c7938f3170ad7d0ed.png" width={32} height={32} /><span>本特利绿茵</span></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Analysis;