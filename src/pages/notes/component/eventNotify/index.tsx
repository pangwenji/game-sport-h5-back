import { marqueedata } from "@/hooks/notes/sports/useSports";
import Marquee from "react-fast-marquee";
import './eventNotify.scss';
import horn from '@/assets/images/sports/svg/horn.svg';
import { useEffect, useState } from "react";
import { getEventAnnouncements } from "@/api/notes";
import { useNavigate } from 'react-router-dom'
import { getEventsAnnouncements } from "@/hooks/useNotes";
import { useNotesStore } from "@/stores/notes";
import { EventItem } from "@/interface";
const EventNotify = () => {
    const navigate = useNavigate();
    let [list, setList] = useState([])
    const goEvents = () => {
        navigate('/event-announcements')
    }
    useEffect(() => {
        let params = {
            userName: localStorage.getItem('userName'),
            channelType: 1,
            languageType: 'CMN'
        }
        getEventsAnnouncements(params).then((response: Array<EventItem>) => {
            setList(response)
        })
    }, [])
    return (
        <div className="announcements" onClick={goEvents}>
            <img src={horn} height={17} width={17} />
            <span className="tip">
                赛事公告：</span>
            <div className="tip-content">
                <Marquee pauseOnHover={true} speed={60} loop={0}>
                    {
                        list && list.map((text, idx) => {
                            return (
                                <span key={idx} className="marquee-text">{text.content}</span>
                            )
                        })
                    }
                </Marquee>
            </div>
        </div>
    )
}

export default EventNotify;