import { Divider } from "antd-mobile"
import React, { useEffect } from "react";
import heat_1 from '@/assets/images/sports/svg/heat-1.svg';
import heat_2 from '@/assets/images/sports/svg/heat-2.svg';
import heat_3 from '@/assets/images/sports/svg/heat-3.svg';
import heat_4 from '@/assets/images/sports/svg/heat-4.svg';
import triangle from '@/assets/images/sports/svg/triangle.svg';
import redRectangle from '@/assets/images/sports/svg/red_rectangle.svg';
import *  as eschars from 'echarts';
import orangeRectangle from '@/assets/images/sports/svg/orange_rectangle.svg';
import './panel.scss';
import { chartOption, echarTabOption } from "@/hooks/useData";
import { useHistoryStore } from "@/stores/sports-detail";
import { environment } from "@/interface";
const WeatherPanel: React.FC = () => {

    let { weatherInforMation }: { weatherInforMation: environment } = useHistoryStore.getState()
    const setEcharsAttack = () => {
        let attackHtml = document.getElementById('eschars_attack')
        let attackChar = eschars.init(attackHtml);
        //画环形图
        attackChar.setOption(chartOption())
    }

    const setEcharsDanger = () => {
        let attackHtml = document.getElementById('eschars_danger')
        let attackChar = eschars.init(attackHtml);
        //画环形图
        attackChar.setOption(chartOption())
    }

    const setEcharsBallPossession = () => {
        let attackHtml = document.getElementById('eschars_ballPossession')
        let attackChar = eschars.init(attackHtml);
        //画环形图
        attackChar.setOption(chartOption())
    }

    const setTopProgress = () => {
        let progress = document.getElementById('eschars_top_progress');
        let progressEschars = eschars.init(progress);
        progressEschars.setOption(echarTabOption())

    }

    const setBottomProgress = () => {
        let progress = document.getElementById('eschars_bottom_progress');
        let progressEschars = eschars.init(progress);
        progressEschars.setOption(echarTabOption())
    }


    useEffect(() => {
        setEcharsAttack();
        setEcharsDanger();
        setEcharsBallPossession();
        // 设置进度条
        setTopProgress();
        setBottomProgress()
    }, [])
    return <>

        <div className="data_content">
            <div className="data_content_item">
                <div className="panel_info">
                    <div className="panel_info_box">
                        <img src={heat_1} width={16} height={16} />
                        <span>
                            {
                                weatherInforMation.temperature ? <> {weatherInforMation.temperature}</> : '暂无'
                            }
                        </span>
                    </div>
                    <Divider direction="vertical" />
                    <div className="panel_info_box">
                        <img src={heat_2} width={16} height={16} />
                        <span>
                            {
                                weatherInforMation.humidity ? <> {weatherInforMation.humidity}</> : '暂无'
                            }

                        </span>
                    </div>
                    <Divider direction="vertical" />
                    <div className="panel_info_box">
                        <img src={heat_3} width={16} height={16} />
                        <span>
                            {
                                weatherInforMation.wind ? <> {weatherInforMation.wind}</> : '暂无'
                            }

                        </span>
                    </div>
                    <Divider direction="vertical" />
                    <div className="panel_info_box">
                        <img src={heat_4} width={16} height={16} />
                        <span>
                            {
                                weatherInforMation.pressure ? <> {weatherInforMation.pressure}</> : '暂无'
                            }
                        </span>
                    </div>
                </div>
                <Divider style={{ margin: 0 }} />
                <div className="panel_analysis">
                    {/* 左边 */}
                    <div className="panel_analysis-left">
                        <span className="panel_analysis-left_title">进攻</span>
                        <div className="panel_analysis-left-bottom">
                            <span>56</span>
                            <div className="eschars_attack" id="eschars_attack"></div>
                            <span>74</span>
                        </div>
                    </div>
                    <div className="panel_analysis-left">
                        <span className="panel_analysis-left_title">  危险进攻</span>
                        <div className="panel_analysis-left-bottom">
                            <span>56</span>
                            <div className="eschars_attack" id="eschars_danger"></div>
                            <span>74</span>
                        </div>
                    </div>
                    <div className="panel_analysis-left">
                        <span className="panel_analysis-left_title">控球率</span>
                        <div className="panel_analysis-left-bottom">
                            <span>56</span>
                            <div className="eschars_attack" id="eschars_ballPossession"></div>
                            <span>74</span>
                        </div>
                    </div>
                </div>
                <Divider style={{ margin: 0 }} />
                <div className="panel_form">
                    {/* 左边 */}
                    <div className="panel_form_top">
                        <div className="mark_item" >
                            <div className="mark_item_img">
                                <img src={triangle} width={16} height={16} />
                            </div>
                            <span >5</span>
                        </div>
                        <div className="mark_item">
                            <div className="mark_item_img">
                                <img src={redRectangle} width={16} height={16} />
                            </div>
                            <span>0</span>
                        </div>
                        <div className="mark_item">
                            <div className="mark_item_img">
                                <img src={orangeRectangle} width={16} height={16} />
                            </div>
                            <span>1</span>
                        </div>
                    </div>
                    {/* 中间 */}
                    <div className="panel_form_middle">
                        <div className="panel_form_middle_context">
                            <span>射正球门</span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>7</span>
                                <div className="chars_progress" id="eschars_top_progress"></div>
                                <span>8</span>
                            </div>
                        </div>
                        <div className="panel_form_middle_context" >
                            <span>射偏球门</span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>7</span>
                                <div className="chars_progress" id="eschars_bottom_progress"></div>
                                <span>8</span>
                            </div>
                        </div>
                    </div>
                    {/* 右边 */}
                    <div className="panel_form_top">
                        <div className="mark_item" >
                            <div className="mark_item_img">
                                <img src={orangeRectangle} width={16} height={16} />
                            </div>
                            <span >5</span>
                        </div>
                        <div className="mark_item">
                            <div className="mark_item_img">
                                <img src={redRectangle} width={16} height={16} />
                            </div>
                            <span>0</span>
                        </div>
                        <div className="mark_item">
                            <div className="mark_item_img">
                                <img src={triangle} width={16} height={16} />
                            </div>
                            <span>1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default WeatherPanel;