import * as echarts from 'echarts'
export const chartOption = () => {
    return {
        color: ['#3270E1', '#D0021B'],  //手动设置每个图例的颜色

        series: [ //系列列表
            {
                type: 'pie',   //类型 pie表示饼图
                center: ['50%', '50%'], //设置饼的原心坐标 不设置就会默认在中心的位置
                radius: ['50%', '90%'],  //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
                itemStyle: {  //图形样式
                    normal: { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                        label: {  //饼图图形上的文本标签
                            show: false  //平常不显示
                        },
                        labelLine: {     //标签的视觉引导线样式
                            show: false  //平常不显示
                        }
                    },

                },
                data: [
                    { value: 80, name: '正常' },
                    { value: 50, name: '一般' },
                ]
            }
        ]
    }
}



export const echarTabOption = (val = 10, all = 20) => {
    return {
        grid: {
            left: '-8%',
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
                barWidth: 18,
                data: [val],
                label: {
                    show: false,
                    //position    : 'middle',
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
                    barBorderRadius: 9,
                },
                zlevel: 1
            },
            {
                name: '进度条背景',
                type: 'bar',
                barGap: '-100%',
                barWidth: 18,
                data: [all],
                color: '#3270E1',//柱条颜色
                itemStyle: {
                    normal: {
                        barBorderRadius: 9,
                        borderColor: '#FEFEFE',
                    }
                }
            }
        ]
    };
}