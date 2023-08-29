import { NavLink, Navigation, Routes } from 'react-router-dom';
import { BankOutlined } from '@ant-design/icons';
import './tabs.scss';
import { useLocation } from 'react-router-dom'
const Tabs: React.FC = () => {
    let location = useLocation();
    let tarRoutes = ['/square', '/sports', '/games', '/notes', '/mine']
    return (
        <>
            {
                tarRoutes.includes(location.pathname) ? (
                    <footer>
                        <NavLink to='/square' className='tabItem' >
                            <BankOutlined />
                            <span>广场</span>
                        </NavLink>

                        <NavLink to='/games' className='tabItem'>
                            <BankOutlined />
                            <span>游戏</span>
                        </NavLink>

                        <NavLink to='/sports' className='tabItem'>
                            <BankOutlined />
                            <span>体育</span>
                        </NavLink>

                        <NavLink to='/notes' className='tabItem'>
                            <BankOutlined />
                            <span>注单</span>
                        </NavLink>

                        <NavLink to='/mine' className='tabItem'>
                            <BankOutlined />
                            <span>我的</span>
                        </NavLink>
                    </footer>
                ) : null
            }
        </>
    )
}

export default Tabs;