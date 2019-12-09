const log = console.log;
// parsing data

async function getData() {
    const ylabel = [];
    const xlabel = [];

    const response = await fetch("GLB.Ts+dSSt.csv");
    const table = await response.text();
    const datatable = table.split('\n').slice(2);
    datatable.forEach(elt => {
        const rows = elt.split(",");
        const year = rows[0];
        xlabel.push(year);
        const temp = rows[1];
        ylabel.push(temp);

    });
    return { ylabel, xlabel }
};
//chart option 
let options = {
    chart: {
        height: 400,
        width: '98%',
        background: 'lightGray',
        type: 'bar'
    },
    //bars
    fill: {
        // colors: ['#333', '#255']
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
            colorStops: []
        }
    },
    title: {
        text: 'Average temp',
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 10,
        floating: false,
        style: {
            fontSize: '16px',
            color: '#263238'
        }
    },
    dataLabels: {
        enabled: false,


    },


}



//graphing with apexcharts.js

async function init() {
    const { ylabel, xlabel } = await getData();
    machart = document.querySelector('#myChart');
    options.series = [{

        name: 'Average tempurature',
        data: ylabel,
        colors: ['#F44336']
    }, ];
    options.xaxis = {
        categories: xlabel,
        labels: {
            show: true,
            rotate: -90,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: true,
            minHeight: undefined,
            maxHeight: 120,
            style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                cssClass: 'apexcharts-xaxis-label',
            },
        }
    };
    let chart = new ApexCharts(machart, options);

    //rendering
    chart.render();

};

init();

{}