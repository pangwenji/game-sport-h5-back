import React from "react"

const WinAlone: React.FC = () => {
    return <div className="amount">
        {
            [
                { eChart: 'left-circle', title: '胜' },
                { eChart: 'right-circle', title: '平' },
                { eChart: 'right-circle', title: '负' },
            ].map((res, index) => {
                return (

                    <div className="box" key={index}>
                        <div className="chart-name">{res.title}</div>
                        <div className="chart-num">
                            <div className="slot" />
                            <div className="chart-ps-top">当大球赔率<span>1.01</span>时</div>
                            <div className="chart-ps-bottom"><span className="rate">56%</span><span>胜率</span></div>
                        </div>
                        <div className="chart-char">
                            <div className="circle" id={res.eChart}></div>
                        </div>
                    </div>
                )
            })
        }
    </div>
}

export default WinAlone