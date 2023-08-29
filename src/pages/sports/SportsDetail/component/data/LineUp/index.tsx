import React from "react";
import './line-up.scss'
const LineUp: React.FC = () => {
    let second = Array.from({ length: 4 });
    let three = Array.from({ length: 3 });
    let four = Array.from({ length: 2 })
    let data = Array.from({ length: 7 })
    return (
        <div className="line-up">
            {/* 阵列 */}
            <div className="array">
                <div className="array-top">

                    <div className="main-goalkeeper">
                        <div className="main-title"><img src="https://static.fastbs55.com/2cc38d7879ad8b0c585b935d37b2eb30.png" width={25} height={25} /><span>阵型：4-1-3-2</span></div>
                        <div className="content">
                            <div className="top">
                                <p className="no">1</p>
                                <div className="avatar">
                                    <img src="https://cdn.sportnanoapi.com/football/player/00a5fe8bdff5a390fdf266058729a37d.png" width={32} height={32} />
                                </div>
                            </div>
                            <div className="bottom">
                                <p className="name">佛朗哥·阿尔玛尼</p>
                            </div>
                        </div>
                    </div>
                    <div className="main-first">
                        {
                            second.map((res, index) => {
                                return (
                                    <div className="content">
                                        <div className="top">
                                            <p className="no">1</p>
                                            <div className="avatar">
                                                <img src="https://cdn.sportnanoapi.com/football/player/00a5fe8bdff5a390fdf266058729a37d.png" width={32} height={32} />
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <p className="name">佛朗哥·阿尔玛尼</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="main-second">
                        <div className="content">
                            <div className="top">
                                <p className="no">1</p>
                                <div className="avatar">
                                    <img src="https://cdn.sportnanoapi.com/football/player/52c11d6aa443efbf14b7d935f7dd051b.png" width={32} height={32} />
                                </div>
                            </div>
                            <div className="bottom">
                                <p className="name">佛朗哥·阿尔玛尼</p>
                            </div>
                        </div>
                    </div>
                    {/* 第三行 */}
                    <div className="main-third">
                        {
                            three.map((res, index) => {
                                return (
                                    <div className="content">
                                        <div className="top">
                                            <p className="no">1</p>
                                            <div className="avatar">
                                                <img src="https://cdn.sportnanoapi.com/football/player/00a5fe8bdff5a390fdf266058729a37d.png" width={32} height={32} />
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <p className="name">佛朗哥·阿尔玛尼</p>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="main-four">
                        {
                            four.map((res, index) => {
                                return (
                                    <div className="content">
                                        <div className="top">
                                            <p className="no">1</p>
                                            <div className="avatar">
                                                <img src="https://cdn.sportnanoapi.com/football/player/00a5fe8bdff5a390fdf266058729a37d.png" width={32} height={32} />
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <p className="name">佛朗哥·阿尔玛尼</p>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                {/* 中场 */}
                {/* <div className="array-middle">
                    <div></div>
                </div> */}
                {/* 对方整容 */}
                <div className="array-top">
                    <div className="passenger-third">
                        {
                            ['1', '1', '1'].map((res, index) => {
                                return (
                                    <div className="content">
                                        <div className="top">
                                            <p className="no">1</p>
                                            <div className="avatar">
                                                <img src="https://cdn.sportnanoapi.com/football/player/00a5fe8bdff5a390fdf266058729a37d.png" width={32} height={32} />
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <p className="name">佛朗哥·阿尔玛尼</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="passenger-second">
                        {
                            ['1', '1', '1', '1'].map((res, index) => {
                                return (
                                    <div className="content">
                                        <div className="top">
                                            <p className="no">1</p>
                                            <div className="avatar">
                                                <img src="https://cdn.sportnanoapi.com/football/player/00a5fe8bdff5a390fdf266058729a37d.png" width={32} height={32} />
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <p className="name">佛朗哥·阿尔玛尼</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="passenger-first">
                        {
                            ['1', '1', '1'].map((res, index) => {
                                return (
                                    <div className="content">
                                        <div className="top">
                                            <p className="no">1</p>
                                            <div className="avatar">
                                                <img src="https://cdn.sportnanoapi.com/football/player/00a5fe8bdff5a390fdf266058729a37d.png" width={32} height={32} />
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <p className="name">佛朗哥·阿尔玛尼</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="passenger-goalkeeper">
                        <div className="passenger-title"><img src="https://static.fastbs55.com/data/6fc2402fed0949f3e703e3012737c1b8.png" width={25} height={25} /><span>阵型：3-4-3</span></div>

                        <div className="content">
                            <div className="top">
                                <p className="no">1</p>
                                <div className="avatar">
                                    <img src="https://cdn.sportnanoapi.com/football/player/00a5fe8bdff5a390fdf266058729a37d.png" width={32} height={32} />
                                </div>
                            </div>
                            <div className="bottom">
                                <p className="name">佛朗哥·阿尔玛尼</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="formation">
                <div className="formation-box" >
                    <span>河床</span>
                    <img src="https://static.fastbs55.com/2cc38d7879ad8b0c585b935d37b2eb30.png" width={30} height={30} />
                </div>
                <div className="formation-middle">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIA…LyQ79n046xHVneoD/L+E/bE/uW0VfzUUAAAAASUVORK5CYII=" alt="" /> vs
                </div>
                <div className="formation-box" style={{ justifyContent: 'flex-start' }}>
                    <img src="https://static.fastbs55.com/data/6fc2402fed0949f3e703e3012737c1b8.png" width={30} height={30} />
                    <span>阿韦亚内达竞技足球俱乐部</span>
                </div>
            </div>
            {/* 首发整容 */}
            <div className="firstRoundPlasticSurgery-header">
                <div className="up">
                    <div className="title">首发整容</div>
                </div>
                <div className="down">
                    <div className="left">
                        <div className="left-name">主队</div>
                        <div className="left-score">4-1-3-2</div>
                    </div>
                    <div className="right">
                        <div className="right-score">3-4-3</div>
                        <div className="right-name">客队</div>
                    </div>
                </div>
            </div>
            {

                data.map((res, index) => {
                    return (

                        <div className="list">
                            <div className="list-left">
                                <div className="avatar">
                                    <img src="https://cdn.sportnanoapi.com/football/player/f0cd1645914fea0244f14e8f7d00e09f.png" width={32} height={32} />
                                </div>
                                <span className="score">12</span>
                                <span className="name">佛朗哥·阿尔玛尼</span>
                            </div>
                            <div className="list-right">
                                <span className="name">马蒂亚斯·塔格里亚蒙特</span>
                                <span className="score">13</span>
                                <div className="avatar">
                                    <img src="https://cdn.sportnanoapi.com/football/player/34be71464207c263348074d8d26dfbb5.png" width={32} height={32} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {/* 替补整容 */}
            <div className="substituteLineup-header">
                <div className="up">
                    <div className="title">替补阵容</div>
                </div>
            </div>
            {

                data.map((res, index) => {
                    return (

                        <div className="list">
                            <div className="list-left">
                                <div className="avatar">
                                    <img src="https://cdn.sportnanoapi.com/football/player/f0cd1645914fea0244f14e8f7d00e09f.png" width={32} height={32} />
                                </div>
                                <span className="score">12</span>
                                <span className="name">佛朗哥·阿尔玛尼</span>
                            </div>
                            <div className="list-right">
                                <span className="name">马蒂亚斯·塔格里亚蒙特</span>
                                <span className="score">13</span>
                                <div className="avatar">
                                    <img src="https://cdn.sportnanoapi.com/football/player/34be71464207c263348074d8d26dfbb5.png" width={32} height={32} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {/* 伤病情况 */}
            <div className="injuryAndIllness-header">
                <div className="up">
                    <div className="title">伤病情况</div>
                </div>
            </div>
        </div>
    )
}

export default LineUp;