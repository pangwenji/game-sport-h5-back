import { CapsuleTabs, Dropdown, Empty, Popup } from "antd-mobile"
import { FileOutline } from "antd-mobile-icons"
import { useState } from "react";

const FileOutLine: React.FC = () => {
    const tempalteList = []
    const [visable, setVisible] = useState(false);
    const [isTabs, setTabs] = useState(false);
    const [time, setTime] = useState(0);
    const [date, setTimeChange] = useState('今日');
    const timeChange = (e: string) => {
        switch (e) {
            case 'today':
                setTimeChange('今日')
                break;
            case 'yesterday':
                setTimeChange('昨日')
                break;
            case 'seven':
                setTimeChange('7天内')
                break;
        }
    }

    return (
        <div>
            <div className="main-right">
                <FileOutline width={23.78} height={23.78} color="#ffffff" onClick={() => setVisible(true)} />
            </div>
            {/* 左侧 */}
            <Popup
                visible={visable}
                onMaskClick={() => {
                    setVisible(false)
                }}
                position='right'
                bodyStyle={{ width: '88vw' }}
            >
                <div className="popup-header">
                    <span >BB体育</span>
                </div>
                <div className="popup-header-content">
                    {
                        isTabs ?
                            <div>
                                <div className="tab-menu">
                                    <div className={isTabs ? 'capsule_in_active' : 'capsule'} onClick={() => setTabs(false)}>未结算<span>0</span></div>
                                    <div className={isTabs ? 'capsule' : 'capsule_in_active'} onClick={() => setTabs(true)}>已结算<span></span></div>
                                    <Dropdown >
                                        <Dropdown.Item key='sorter' title={`${date}${time}`}>
                                            <div className="sorter-menu">
                                                <CapsuleTabs className="sorter-menu-content" onChange={(e) => timeChange(e)}>
                                                    <CapsuleTabs.Tab title='今日' key='today' />
                                                    <CapsuleTabs.Tab title='昨天' key='yesterday' />
                                                    <CapsuleTabs.Tab title='7天' key='seven' />
                                                </CapsuleTabs>
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown>
                                </div>
                                <div className="tab-menu-content">
                                    <div className="metering">
                                        <span>总计 0 单</span>
                                        <span>投注额 0 单</span>
                                        <span>输赢 0 单</span>
                                    </div>
                                    {
                                        tempalteList.length > 0 ? <div>有数据</div> :
                                            <div className="data-empty">

                                                <Empty />
                                                <span >暂无数据</span>
                                            </div>
                                    }
                                </div>
                            </div> :
                            <div>
                                <div className="tab-menu">
                                    <div className={isTabs ? 'capsule_in_active' : 'capsule'} onClick={() => setTabs(false)}>未结算<span>0</span></div>
                                    <div className={isTabs ? 'capsule' : 'capsule_in_active'} onClick={() => setTabs(true)}>已结算<span></span></div>
                                </div>
                                <div className="tab-menu-content">
                                    {
                                        tempalteList.length > 0 ? <div>有数据</div> :
                                            <div className="data-empty">
                                                <Empty />
                                                <span>暂无数据</span>
                                            </div>
                                    }
                                </div>
                            </div>
                    }
                </div>
            </Popup>
        </div>
    )
}

export default FileOutLine;