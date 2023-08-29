//赛制
export const match_format: Array<{ label: number | string, value: number | Array<any> }> = [
    //足球
    {
        label: 'footerBall', value: Array.from({ length: 5 }, (_, idx) => Number(`10000${idx + 1}`))
    },

    //篮球
    {
        label: 'basketBall', value: Array.from({ length: 4 }, (_, idx) => Number(`30000${idx + 1}`))
    },
    // //兵乓球
    // { label: 'BO5', value: 1500001 },
    // { label: 'BO7', value: 1500002 },
    // //网球
    // { label: 'BO3', value: 500001 },
    // { label: 'Tennis-BO5', value: 500002 },
    // //羽毛球 
    // { label: '羽毛球-BO3', value: 4700001 },
    // { label: '羽毛球 BO5', value: 4700002 },
    // //排球 
    // { label: 'Volleyball BO5', value: 1300001 },
    // { label: 'Volleyball BO7', value: 1300002 },
    // //冰球 
    // { label: '冰球', value: 200001 },
    // //电子足球 
    // { label: 'E-Soccer 2x4', value: 17700001 },
    // { label: 'E-Soccer 2x6', value: 17700002 },
    // { label: 'E-Soccer 2x9', value: 17700003 },
    // { label: 'E-Soccer 2x5', value: 17700004 },
    // //电子篮球
    // { label: 'E-Basketball 4x6', value: 17800001 },
    // { label: 'E-Basketball 4x5', value: 17800002 },
    // { label: 'E-Basketball 4x4', value: 17800003 },
    // //美式橄榄球 
    // { label: 'Football 4x15', value: 600001 },
    // //斯诺克
    // { label: '', value: 1600001 },
    // { label: '', value: 1600002 },
    // { label: '', value: 1600003 },
    // { label: '', value: 1600004 },
    // { label: '', value: 1600005 },
    // { label: '', value: 1600006 },
    // { label: '', value: 1600007 },
    // { label: '', value: 1600008 },
    // { label: '', value: 1600009 },
    // { label: '', value: 1600010 },
    // { label: '', value: 1600011 },
    // { label: '', value: 1600012 },
    // { label: '', value: 1600013 },
    // { label: '', value: 1600014 },
    // { label: '', value: 1600015 },
    // { label: '', value: 1600016 },
    // { label: '', value: 1600017 },

    // //棒球 
    // { label: '', value: 700001 },
    // { label: '', value: 700002 },
    // //拳击
    // { label: '', value: 1900001 },
    // { label: '', value: 1900002 },
    // { label: '', value: 1900003 },
    // { label: '', value: 1900004 },
    // { label: '', value: 1900005 },
    // { label: '', value: 1900006 },
    // //手球
    // { label: 30, value: 800001 },
    // { label: 25, value: 800002 },
    // { label: 20, value: 800003 },
    // //沙滩排球
    // { label: '', value: 5100001 },
    // { label: '', value: 5100002 },
    // //格斗3
    // { label: '', value: 1800001 },
    // { label: '', value: 1800002 },
    // //橄榄球2X40
    // { label: 40, value: 400001 },
    // //水球 
    // { label: 8, value: 2400001 },
    // //虚拟体育足球赛制
    // { label: '', value: 100100001 },
    // //虚拟体育赛马赛制
    // { label: '', value: 102000001 },
    // //虚拟体育赛狗赛制
    // { label: '', value: 102100001 },
    // //虚拟沙地摩托车赛制
    // { label: '', value: 102200001 },
    // //虚拟摩托车赛制
    // { label: '', value: 102300001 },
    // //F1赛车300km
    // { label: '', value: 9200001 },
    // //板球
    // { label: '', value: 1400001 },
    // { label: '', value: 1400002 },
    // { label: '', value: 1400003 },
    // { label: '', value: 1400004 },
    // //飛鏢 
    // { label: '', value: 2000001 },
    // { label: '', value: 2000002 },
    // { label: '', value: 2000003 },
    // { label: '', value: 2000004 },
    // { label: '', value: 2000005 },
    // { label: '', value: 2000006 },
    // { label: '', value: 2000007 },
    // { label: '', value: 2000008 },

]