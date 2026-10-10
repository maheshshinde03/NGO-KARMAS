// import { GoogleChartType } from "ng2-google-charts";

let primary_color = localStorage.getItem('primary_color') || '#43B9B2';
let secondary_color = localStorage.getItem('secondary_color') || '#C280D2';

export var areaChart1: any = {
    chartType: 'AreaChart',
    dataTable: [
        ['Year', 'Sales', 'Expenses'],
        ['2020', 1000, 400],
        ['2021', 1170, 460],
        ['2022', 660, 1120],
        ['2023', 1030, 540]
    ],
    options: {
        title: 'Company Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 },
        width: '100%',
        height: 400,
        colors: [primary_color, secondary_color],
        backgroundColor: 'transparent'
    },
};



export var areaChart2: any = {
    chartType: 'AreaChart',
    dataTable: [
        ['Year', 'Cars', 'Trucks', 'Drones', 'Segways'],
        ['2020', 100, 400, 2000, 400],
        ['2021', 500, 700, 530, 800],
        ['2022', 2000, 1000, 620, 120],
        ['2023', 120, 201, 2501, 540]
    ],
    options: {
        title: 'Company Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 },
        width: '100%',
        height: 400,
        colors: [primary_color, secondary_color, "#51bb25", "#f8d62b"],
        backgroundColor: 'transparent'
    },
};

export var columnChart1: any = {
    chartType: 'ColumnChart',
    dataTable: [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2018", 1e3, 400, 250],
        ["2019", 1170, 460, 300],
        ["2020", 660, 1120, 400],
        ["2021", 1030, 540, 450]
    ],
    options: {
        chart: {
            title: "Company Performance",
            subtitle: "Sales, Expenses, and Profit: 2021-2017"
        },
        bars: "vertical",
        vAxis: {
            format: "decimal"
        },
        height: 400,
        width: '100%',
        colors: [primary_color, secondary_color, "#51bb25"],
    },
};

export var columnChart2: any = {
    chartType: 'BarChart',
    dataTable: [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2018", 1e3, 400, 250],
        ["2019", 1170, 460, 300],
        ["2020", 660, 1120, 400],
        ["2021", 1030, 540, 450]
    ],
    options: {
        chart: {
            title: "Company Performance",
            subtitle: "Sales, Expenses, and Profit: 2021-2017"
        },
        bars: "horizontal",
        vAxis: {
            format: "decimal"
        },
        height: 400,
        width: '100%',
        colors: [primary_color, secondary_color, "#51bb25"],

    },
};

export const lineChart = {
    chartType:'LineChart',
    dataTable: [
        ['Month', 'Guardians of the Galaxy', 'The Avengers', 'Transformers: Age of Extinction'],
        [1, 37.8, 80.8, 41.8],
        [2, 30.9, 10.5, 32.4],
        [3, 40.4, 57, 25.7],
        [4, 11.7, 18.8, 10.5],
        [5, 20, 17.6, 10.4],
        [6, 8.8, 13.6, 7.7],
        [7, 7.6, 12.3, 9.6],
        [8, 12.3, 29.2, 10.6],
        [9, 16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11, 5.3, 7.9, 4.7],
        [12, 6.6, 8.4, 5.2],
    ],
    options: {
        chart: {
            title: 'Box Office Earnings in First Two Weeks of Opening',
            subtitle: 'in millions of dollars (USD)'
        },
        vAxis: { ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90,], },
        colors: [primary_color, secondary_color, "#51bb25"],
        height: 500,
        width: '100%',
    }
}

export var comboChart: any = {
    chartType: 'ComboChart',
    dataTable: [
        ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua', 'Rwanda', 'Average'],
        ["2004/05", 165, 938, 522, 998, 450, 614.6],
        ["2005/06", 135, 1120, 599, 1268, 288, 682],
        ["2006/07", 157, 1167, 587, 807, 397, 623],
        ["2007/08", 139, 1110, 615, 968, 215, 609.4],
        ["2008/09", 136, 691, 629, 1026, 366, 569.6]
    ],
    options: {
        title: 'Monthly Coffee Production by Country',
        vAxis: { title: 'Cups' },
        hAxis: { title: 'Month' },
        seriesType: 'bars',
        series: { 5: { type: 'line' } },
        height: 500,
        fullWidth: true,
        colors: [primary_color, secondary_color, "#51bb25",
            "#a927f9",
            "#f8d62b"
        ],
    },
};

export var ganttChart: any = {
    height: 275,
    gantt: {
        criticalPathEnabled: false, // Critical path arrows will be the same as other arrows.
        arrow: {
            angle: 100,
            width: 5,
            color: '#51bb25',
            radius: 0
        },

        palette: [
            {
                "color": primary_color,
                "dark": secondary_color,
                "light": "#047afb"
            }
        ]

    }
};

export var barChart2: any = {
    chartType: 'BarChart',
    dataTable: [
        ["Element", "Density", {
            role: "style"
        }],
        ["Copper", 10, "#a927f9"],
        ["Silver", 12, "#f8d62b"],
        ["Gold", 14, "#EBA31D"],
        ["Platinum", 16, "color:#307EF3"]
    ],
    options: {
        title: "Density of Precious Metals, in g/cm^3",
        width: '100%',
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
        backgroundColor: 'transparent'
    },
};


export var wordtree: any = {
    chartType: 'wordtree',
    dataTable: [
        ['Phrases'],
        ['cats are better than dogs'],
        ['cats eat kibble'],
        ['cats are better than hamsters'],
        ['cats are awesome'],
        ['cats are people too'],
        ['cats eat mice'],
        ['cats meowing'],
        ['cats in the cradle'],
        ['cats eat mice'],
        ['cats in the cradle lyrics'],
        ['cats eat kibble'],
        ['cats for adoption'],
        ['cats are family'],
        ['cats eat mice'],
        ['cats are better than kittens'],
        ['cats are evil'],
        ['cats are weird'],
        ['cats eat mice']
    ],
    options: {
        format: 'implicit',
        word: 'cats'
    }
}

export var pieChart3: any = {
    chartType: 'PieChart',
    dataTable: [
        ['Language', 'Speakers (in millions)'],
        ['Assamese', 13],
        ['Bengali', 83],
        ['Bodo', 1.4],
        ['Dogri', 2.3],
        ['Gujarati', 46],
        ['Hindi', 300],
        ['Kannada', 38],
        ['Kashmiri', 5.5],
        ['Konkani', 5],
        ['Maithili', 20],
        ['Malayalam', 33],
        ['Manipuri', 1.5],
        ['Marathi', 72],
        ['Nepali', 2.9],
        ['Oriya', 33],
        ['Punjabi', 29],
        ['Sanskrit', 0.01],
        ['Santhali', 6.5],
        ['Sindhi', 2.5],
        ['Tamil', 61],
        ['Telugu', 74],
        ['Urdu', 52]
    ],
    options: {
        title: 'Indian Language Use',
        legend: 'none',
        width: '100%',
        height: 300,
        pieSliceText: 'label',
        slices: {
            4: { offset: 0.2 },
            12: { offset: 0.3 },
            14: { offset: 0.4 },
            15: { offset: 0.5 },
        },
        colors: ["#dc3545", primary_color, secondary_color, "#51bb25", "#a927f9", "#f8d62b", "#dc3545", primary_color, "#f8d62b", "#51bb25", primary_color, secondary_color, "#51bb25", primary_color, "#a927f9", "#f8d62b", primary_color, primary_color, "#a927f9", secondary_color, primary_color, "#51bb25"]
    }
}

export var pieChart4: any = {
    chartType: 'PieChart',
    dataTable: [
        ['Task', 'Hours per Day'],
        ['Work', 5],
        ['Eat', 10],
        ['Commute', 15],
        ['Watch TV', 20],
        ['Sleep', 25]
    ],

    options: {
        title: 'My Daily Activities',
        is3D: true,
        width: '100%',
        height: 300,
        colors: ["#f8d62b", "#a927f9", "#51bb25", secondary_color, primary_color, ,]
    }
}

export var pieChart1: any = {
    chartType: 'PieChart',
    dataTable: [
        ['Task', 'Hours per Day'],
        ['Work', 5],
        ['Eat', 10],
        ['Commute', 15],
        ['Watch TV', 20],
        ['Sleep', 25]
    ],
    options: {
        title: 'My Daily Activities',
        width: "100%",
        height: 300,
        colors: ["#f8d62b", "#51bb25", "#a927f9", secondary_color, primary_color,]
    }
}

export var pieChart2: any = {
    chartType: 'PieChart',
    dataTable: [
        ['Task', 'Hours per Day'],
        ['Work', 2],
        ['Eat', 2],
        ['Commute', 11],
        ['Watch TV', 2],
        ['Sleep', 7]
    ],
    options: {
        title: 'My Daily Activities',
        width: '100%',
        height: 300,
        colors: ["#f8d62b", "#a927f9", "#51bb25", primary_color, secondary_color,]
    }
} 