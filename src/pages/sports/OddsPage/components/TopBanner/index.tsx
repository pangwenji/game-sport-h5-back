import React, { useEffect, useMemo, useRef } from 'react';
import SliderItem from './SliderItem';
// import "keen-slider/keen-slider.min.css";
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useUserStore } from '@/stores/user/useUserStore';
import { useSportsContext } from '../../context/SportsProvider';
import { Swiper } from 'antd-mobile';
import { AuthStatus } from '../../../../AuthLayout';
import { getMemberWalletBalanceApi } from '@/api/user';

import { Switch } from 'antd-mobile';

import './styles.scss';

export function generateSlides(length = 10, sig = 0): Array<{ src: string; alt: string }> {
    return Array.from({ length }).map((value, index) => {
        index = sig || index;

        return {
            src: `https://source.unsplash.com/random/800x450?sig=${index}`,
            alt: `Image ${index + 1}`,
        };
    });
}

export default function TopSlider() {
    const navigate = useNavigate();
    let { userName } = useRouteLoaderData('root') as { userName: string | null };

    const [contextValue] = useSportsContext();
    const { lists } = contextValue;

    const token = useUserStore((state) => state.token);
    const locale = useUserStore((state) => state.locale);

    const [userWalletInfo, setUserWalletInfo] = React.useState<any>({});

    useEffect(() => {
        if (userName) {
            getMemberWalletBalanceApi({
                userName: userName,
                channelType: 1,
            }).then((res) => {
                setUserWalletInfo(res.data)
            });
        }
    }, [userName]);

    const goCharge = () => {
        navigate('/charge');
    };

    const login = () => {
        navigate('/login');
    };

    const filteredList = useMemo(() => {
        return lists.slice(0, 3);
    }, [lists]);

    const onSwitchChange = (checked: boolean) => {
        localStorage.setItem('locale', checked ? 'CMN' : 'VIE');
        locale.setLocale(checked ? 'CMN' : 'VIE');
        setTimeout(() => {
            window.location.reload();
        });
    };

    return (
        <div className="top-banner" style={{ height: '254px' }}>
            <div className="notice">
                <div className="tip-title">
                    {
                        <Swiper autoplay loop autoplayInterval={1000} direction="vertical" indicator={() => null} style={{ '--height': '20px' }}>
                            {notice.map((color, index) => (
                                <Swiper.Item key={index}>【谨防诈骗】请勿向陌生电话提供账号密码、验证码</Swiper.Item>
                            ))}
                        </Swiper>
                    }
                </div>
                <div className="switch-language">
                    <Switch
                        checked={locale.value === 'CMN' ? true : false}
                        uncheckedText={<div style={{ fontSize: '12px' }}>VIE</div>}
                        checkedText={<div style={{ fontSize: '12px' }}>中文</div>}
                        onChange={onSwitchChange}
                        style={{
                            '--checked-color': '#00b578',
                            '--height': '20px',
                            '--width': '40px',
                        }}
                    />
                </div>
            </div>
            <div className="sport-head-wrap">
                <div className="sport-head">
                    <AuthStatus />

                    <div className="money-top">
                        <div className="coins">
                            <div className="title-bi-item">
                                <img className="wallet-icon" src="https://m.bebo5555.com/spa/sport-h5/7ed843974729f46816ee7430bcfe7bb8.svg" />
                                <b className="balance-number">{userWalletInfo?.totalAvailableAmount}</b>
                                <img className="wallet-refresh" src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/svgexport-3.svg" />
                            </div>
                        </div>
                        {!localStorage.getItem('userName') && (
                            <div
                                className="btn-main"
                                onClick={() => {
                                    login();
                                }}
                            >
                                登陆
                            </div>
                        )}

                        <div
                            className="btn-main"
                            onClick={() => {
                                goCharge();
                            }}
                        >
                            充值
                        </div>
                    </div>
                    <div className="kefu-icon">
                        <img src="https://s3.ap-southeast-1.amazonaws.com/superspace.click/kefu.png" />
                    </div>
                </div>
            </div>

            <div className="banner-swiper-container">
                {filteredList.length > 0 && (
                    <Swiper
                        autoplay
                        loop
                        autoplayInterval={5000}
                        indicator={(total, current) => (
                            <div className="custom-indicator">
                                {Array.from(new Array(total).keys()).map((number) => {
                                    return <div key={number} className={number === current ? 'swiper-pagination-bullet active' : 'swiper-pagination-bullet'}></div>;
                                })}
                            </div>
                        )}
                    >
                        {filteredList.map((item, index) => {
                            return (
                                <Swiper.Item key={index}>
                                    <SliderItem sportItem={item} />
                                </Swiper.Item>
                            );
                        })}
                    </Swiper>
                )}
            </div>
        </div>
    );
}

let notice = [
    {
        name: '【活动】至尊凉夏争霸赛，万元奖金等着您！',
    },
    {
        name: '【活动】取款刮刮乐，奖励大放送，100%有奖！',
    },
    {
        name: '【重要】请勿相信聊天室内广告内容',
    },
    {
        name: '【温馨提示】请勿使用他人的银行卡或USDT进行充值',
    },
    {
        name: '【谨防诈骗】请勿向陌生电话提供账号密码、验证码',
    },
    {
        name: '【温馨提示】推荐使用「个人USDT钱包」的建议',
    },
];
