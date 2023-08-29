import * as echarts from 'echarts'
export const echarTabOption = (val = 10, all = 20) => {
    return {
        grid: {
            left: '-16%',
            top: '0',
            right: '0',
            bottom: '0',
            containLabel: true,
            width: '100%'
        },
        xAxis: {
            type: 'value',
            splitLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
        },
        yAxis: {
            show: false,
            type: 'category',
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
                color: 'black',
                fontSize: 17
            },
        },
        series: [
            {
                name: '/' + all,
                type: 'bar',
                barWidth: 9,
                data: [val],
                label: {
                    show: false,
                    position: 'middle',
                    offset: [20, 2],
                    formatter: '{c}{a}',
                    color: '#fff',
                    fontSize: 15
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            { offset: 0, color: '#D0021B' },                   //柱图渐变色
                            { offset: 1, color: '#D0021B' },                   //柱图渐变色
                        ]
                    ),
                    // barBorderRadius: 9,
                    barBorderTopRightRadius: 3,
                    barBorderBottomRightRadius: 3
                },
                zlevel: 1
            },

        ]
    };
}

export const echarScoreProgressOption = (val = 10, all = 20) => {
    return {
        grid: {
            left: '-7%',
            width: '100%'
        },
        xAxis: {
            type: 'value',
            splitLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
        },
        yAxis: {
            show: false,
            type: 'category',
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
                color: 'black',
                fontSize: 17
            },
        },
        series: [
            {
                type: 'bar',
                name: '已完成',
                stack: '总量',
                barMaxWidth: 18,
                label: {
                    show: false,
                    position: 'inside',
                    formatter: '{c}%'
                },
                itemStyle: {
                    barBorderRadius: [10, 0, 0, 10],
                },
                data: [val]
            },

            {
                type: 'bar',
                name: '/' + all,
                stack: '总量',
                color: '#3270E1',//柱条颜色
                barMaxWidth: 18,
                label: {
                    show: false,
                    color: '#aaa',
                    position: 'inside',
                    formatter: '{c}%'
                },
                showBackground: true,
                backgroundStyle: {
                    color: '#eee',
                    barBorderRadius: [10, 10, 10, 10]
                },
                itemStyle: {
                    color: '#eee',
                    barBorderRadius: [0, 10, 10, 0],

                },
                silent: true,
                data: [all]
            }

        ]
    };
}

export const echarScoreRightProgressOption = (val = 10, all = 20) => {

    return {
        grid: {
            left: '-7%',
            width: '100%'
        },
        xAxis: {
            type: 'value',
            splitLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
        },
        yAxis: {
            show: false,
            type: 'category',
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
                color: 'black',
                fontSize: 17
            },
        },
        series: [
            {
                type: 'bar',
                name: '已完成',
                stack: '总量',
                barMaxWidth: 18,
                label: {
                    show: false,
                    position: 'inside',
                    formatter: '{c}%'
                },
                itemStyle: {
                    barBorderRadius: [10, 0, 0, 10],
                },
                data: [val]
            },

            {
                type: 'bar',
                name: '/' + all,
                stack: '总量',
                color: '#3270E1',//柱条颜色
                barWidth: 18,
                label: {
                    show: false,
                    color: '#aaa',
                    position: 'inside',
                    formatter: '{c}%'
                },
                showBackground: true,
                backgroundStyle: {
                    color: '#eee',
                    barBorderRadius: [10, 10, 10, 10]
                },
                itemStyle: {
                    color: '#eee',
                    barBorderRadius: [0, 10, 10, 0],

                },
                silent: true,
                data: [all]
            }

        ]
    };

}

export const data = [
    { name: '3-分球', master: 10, ke: 20, value: 12 },
    { name: '2-分球', master: 4, ke: 14, value: 2 },
    { name: '罚球命中率%', master: 10, ke: 20, value: 3 },
    { name: '本节犯规数', master: 10, ke: 20, value: 5 },
    { name: '剩余暂停数', master: 10, ke: 20, value: 6 },

]