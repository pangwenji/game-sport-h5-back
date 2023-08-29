import React from 'react';
import './event-announcements.scss';
import { List } from 'antd-mobile'
import { useNotesStore } from '@/stores/notes';
import { formTime } from '@/hooks/useNotes';
import Customer from '@/components/customer';
import { LeftOutline } from "antd-mobile-icons";
import { useNavigate } from 'react-router-dom'
const EventAnnouncements: React.FC = () => {
    let { eventsList } = useNotesStore.getState();
    let navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    return <div className='event-announcements'>
        <div className='event-header'>
            <div className='arrowLeft' onClick={() => goBack()}><LeftOutline /> </div>
            <span>赛事公告</span>
            <div className='right-customer'>  <Customer /></div>
        </div>
        <>
            {
                eventsList.length > 0 ? (

                    <List >
                        {
                            eventsList.map((even, index) => {
                                return (
                                    <List.Item key={even.id
                                    }>
                                        <div className='evens-content'>
                                            <span className='title'>{even.title}</span>
                                            <span className='time'>{formTime(even.publishTime)}</span>
                                        </div>
                                        <div className='content'>
                                            {even.content}
                                        </div>
                                    </List.Item>
                                )
                            })
                        }
                    </List>
                ) : <div>没有数据</div>
            }
        </>
    </div>
}

export default EventAnnouncements;