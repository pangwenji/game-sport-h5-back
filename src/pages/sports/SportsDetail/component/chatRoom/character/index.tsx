import { CapsuleTabs, Swiper } from "antd-mobile"
import { TextDeletionOutline } from "antd-mobile-icons"
import tabIcon from '@/assets/images/sports/img/666.png';
import { emoticonProp, generateEmoticon } from "@/utils";
import './character.scss';
let characterData = generateEmoticon();
const Character: React.FC = () => {

    const items = characterData.map((data: emoticonProp | any, index) => (
        <Swiper.Item key={index} className="emoticon_box">
            <div style={{ marginLeft: '23px' }}>

                {
                    data.characters.map((res: any, idx: number) => {
                        return (

                            <div className="emoticon_box_item">
                                {res}
                            </div>

                        )
                    })
                }
            </div>
        </Swiper.Item>
    ))

    return (
        <div>
            <div className="bottom-input-bottom">
                <CapsuleTabs>
                    <CapsuleTabs.Tab title={<span>😀</span>} key='emoticon'>
                        <div className="character-context">
                            <Swiper
                                style={{ height: '100%' }}

                                indicatorProps={{
                                    color: 'white',
                                }}
                                defaultIndex={0}
                            >
                                {items}
                            </Swiper>
                        </div>
                    </CapsuleTabs.Tab>
                    <CapsuleTabs.Tab title={<img src={tabIcon} width={20} height={20} />} key='specialCharacters'>
                        <div className="character-context">
                            <Swiper
                                style={{ height: '100%' }}
                                indicatorProps={{
                                    color: 'white',
                                }}
                                defaultIndex={0}
                            >
                                {items}
                            </Swiper>
                        </div>
                    </CapsuleTabs.Tab>
                    <CapsuleTabs.Tab title={<TextDeletionOutline />} key='arrow'>

                    </CapsuleTabs.Tab>
                </CapsuleTabs>
            </div>
        </div>
    )
}

export default Character;