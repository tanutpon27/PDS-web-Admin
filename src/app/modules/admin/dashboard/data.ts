
export var chartOptions =  {
    series: [
        {
            name: "Parcel",
            data: [90, 55,99,24,78]
        },
        {
            name: "Parcels and Documents",
            data: [53, 32,44,14,78]
        },
        {
            name: "Document",
            data: [53, 32,55,16,18]

        }
    ],
    //colors: ['#ffb3b3', '#ff6666'],
    chart: {
        foreColor: 'var(--fuse-text-secondary)',
        height: '100%',
        type: 'bar',
        toolbar: {
            show: true
        },
        zoom: {
            enabled: false
        }

    },
    plotOptions: {
        bar: {
            horizontal: true,

            dataLabels: {
                position: "top"
            }
        }
    },
    dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
            fontSize: "10px",

        }
    },
    stroke: {
        show: true,
        width: 1,

    },
    xaxis: {
        labels    : {
            style: {
                colors: 'var(--fuse-text-secondary)'
            }
        },
        axisTicks : {
            color: 'var(--fuse-border)'
        },
        categories: ["Wait","Late", "Confirm","Option","Return"]  
    },
    yaxis: {
        labels    : {
            style: {
                colors: 'var(--fuse-text-secondary)'
            }
        },
        axisTicks : {
            color: 'var(--fuse-border)'
        }
    },
};