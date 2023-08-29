export const chartOption = () => {
    return {
        color: ['#3270E1', '#D0021B', '#c2c2c2'],  //手动设置每个图例的颜色

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
                    { value: 20, name: '差劲' },
                ]
            }
        ]
    }
}