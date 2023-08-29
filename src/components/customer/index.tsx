import { Popup } from "antd-mobile"
import { useState, PropsWithChildren } from "react"
import listen from '@/assets/images/sports/svg/listenMusic.svg'
import './customer.scss'
const Customer: React.FC = ({ }) => {
    const [visible, setVisible] = useState(false)
    return (
        <div>
            <div onClick={() => setVisible(!visible)}><img src={listen} width={20} height={20} /></div>
            <Popup
                visible={visible}
                onMaskClick={() => setVisible(false)}
                onClose={() => setVisible(false)}
                bodyStyle={{
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    // minHeight: '20vh',
                }}
            >
                <div className='customer'>
                    <div className="box">
                        主线客服一
                    </div>
                    <div className="box">
                        次线客服一
                    </div>
                    <div className="box" onClick={() => setVisible(false)}>
                        取消
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default Customer;