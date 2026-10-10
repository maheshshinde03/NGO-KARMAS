import {
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
    ApexLegend,
    ApexResponsive,
    ApexStroke,
    ApexXAxis,
    ApexYAxis,
    ApexFill,
    ApexDataLabels,
    ApexAxisChartSeries,
    ApexMarkers,
    ApexTheme,
    ApexTitleSubtitle,
    ApexAnnotations,
    ApexGrid
} from "ng-apexcharts";


export type ChartOptions = {
    series?: ApexAxisChartSeries;
    chart?: ApexChart;
    xaxis?: ApexXAxis;
    stroke?: ApexStroke;
    tooltip?: string[] | boolean;
    dataLabels?: ApexDataLabels;
    yaxis?: ApexYAxis;
    legend?: ApexLegend;
    labels?: string[];
    shared?: boolean;
    plotOptions?: ApexPlotOptions;
    fill?: ApexFill;
    responsive?: ApexResponsive[];
    pieseries?: ApexNonAxisChartSeries;
    title?: ApexTitleSubtitle;
    theme?: ApexTheme;
    colors?: string[];
    markers?: ApexMarkers;
    annotations?: ApexAnnotations;
    grid?: ApexGrid;
    formatter?: Function;
}

let primary_color = localStorage.getItem('primary_color') || '#43B9B2';
let secondary_color = localStorage.getItem('secondary_color') || '#C280D2';
let light_color = '#F4F5F8'
let tertiary_color = '#FD7E40'

function orderCommonOption(data:any) {
    return {
      series: [
        {
          data: data.orderYseries,
        },
      ],
      chart: {
        width: 180,
        height: 120,
        type: "line",
        toolbar: {
          show: false,
        },
        offsetY: 10,
        dropShadow: {
          enabled: false,
        },
      },
      grid: {
        show: false,
      },
      colors: data.color,
      stroke: {
        width: 2, 
        curve: "smooth",
      },
      labels: data.label,
      markers: {
        size: 0,
      },
      xaxis: {
        // type: 'datetime',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        marker: {
          show: false,
        },
        x: {
          show: false,
        },
        y: {
          show: false,
          labels: {
            show: false,
          },
        },
      },
      responsive: [
        {
          breakpoint: 1790,
          options: {
            chart: {
              width: 150,
            },
          },
        },
        {
          breakpoint: 1660,
          options: {
            chart: {
              width: 120,
            },
          },
        },
        {
          breakpoint: 1520,
          options: {
            chart: {
              width: 100,
            },
          },
        },
        {
          breakpoint: 1500,
          options: {
            chart: {
              width: 200,
              height: 130,
              offsetX: 20,
              offsetY: 20,
            },
          },
        },
        {
          breakpoint: 1340,
          options: {
            chart: {
              width: 170,
              height: 120,
            },
          },
        },
        {
          breakpoint: 1270,
          options: {
            chart: {
              width: 170,
              height: 100,
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            chart: {
              width: 180,
              height: 120,
              offsetX: -10,
            },
          },
        },
        {
          breakpoint: 992,
          options: {
            chart: {
              width: 130,
              height: 120,
              offsetX: 10,
            },
          },
        },
        {
          breakpoint: 976,
          options: {
            chart: {
              width: 180,
              height: 120,
              offsetX: 40,
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              width: 180,
              height: 120,
              offsetX: 0,
            },
          },
        },
        {
          breakpoint: 380,
          options: {
            chart: {
              width: 110,
              height: 120,
              offsetX: 0,
            },
          },
        },
      ],
      name: data.name,
      percentage:data.percentage,
      class1:data.class1,
      class2:data.class2,
      price:data.price,
      icon:data.icon,
      des:data.des,
      icon2:data.icon2
    }; 
}

export const Chart1 = {
    color: [primary_color],
    dropshadowColor: primary_color,
    label: [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec"
    ],
    orderYseries: [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57],
    name: 'Total Request',
    percentage:'3.4%',
    class1:'danger',
    class2:'primary',
    price:'12,463',
    icon:'Product-discount',
    des:'20% since Last Month',
    icon2:'arrow-up-right'
};

export const TotalSale: ChartOptions | any = orderCommonOption(Chart1);

export const Chart2 = {
  color: [secondary_color],
  dropshadowColor: secondary_color,
  label: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep","oct", "nov", "dec"],
  orderYseries: [30, 20, 28, 20, 28, 17, 50, 45, 63,52,66,30],
    name: 'New NGO',
    percentage:'4.5%',
    class1:'success',
    class2:'secondary',
    price:'51,325',
    icon:'order-product',
    des:'14% since Last Month',
    icon2:'arrow-down-right'

}

export const Neworders: ChartOptions | any = orderCommonOption(Chart2);

export const Chart3 = {
  color: [tertiary_color],
  dropshadowColor: tertiary_color,
  label: [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ],
  orderYseries: [55, 30, 40, 35, 50, 35, 32, 10, 60, 15, 20, 30],
   name: 'Users',
    percentage:'2.3%',
    class1:'danger',
    class2:'tertiary',
    price:'32,587',
    icon:'delivery-van',
    des:'10% since Last Month',
    icon2:'arrow-up-right'
  };

  export const OrderDelivery: ChartOptions | any = orderCommonOption(Chart3);

  export const categoryChart:ChartOptions | any ={
    chart: {
      height: 280,
      type: "radialBar",
      offsetX: -8,
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: 90,
        endAngle: -320,
        dataLabels: {
          show: true,
          hollow: {
            margin: 5,
            size: "50%",
            background: "#FDFDFF",
            image: undefined,
            imageWidth: 150,
            imageHeight: 150,
            imageOffsetX: 0,
            imageOffsetY: 0,
            imageClipped: true,
            position: "front",
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 3,
              opacity: 0.1,
            },
          },
          value: {
            color: "var(--light-font)",
            fontSize: "22px",
            fontFamily: "Outfit",
            fontWeight: "500",
            // color: "var(--body-font-color)",
          },
          total: {
            show: true,
            label: "Total Overview",
            color: "var(--light-font)",
            fontSize: "13px",
            fontFamily: "Outfit",
            fontWeight: "400",
            formatter: function (w:string) {
              return "68%";
            }
          },
        },
        track: {
          background: "var(--light-color)",
          strokeWidth: "90%",
          startAngle: -100,
          endAngle: 100,
        },
      },
    },
    colors: [
      primary_color,
      secondary_color,
      tertiary_color,
    ],
    stroke: {
      lineCap: "round",
    },
    series: [70, 55, 40],
    responsive: [
      {
        breakpoint: 1830,
        options: {
          chart: {
            height: 260,
            offsetX: 2,
            offsetY: 10,
          },
        },
      },
      {
        breakpoint: 1700,
        options: {
          chart: {
            height: 240,
          },
        },
      },
      {
        breakpoint: 1630,
        options: {
          chart: {
            height: 220,
          },
        },
      },
      {
        breakpoint: 1530,
        options: {
          chart: {
            height: 200,
          },
        },
      },
      {
        breakpoint: 1500,
        options: {
          chart: {
            height: 273,
            offsetX: 0,
            offsetY: 0,
          },
        },
      },
      {
        breakpoint: 1340,
        options: {
          chart: {
            height: 300,
            offsetX: 0,
            offsetY: 0,
          },
        },
      },
      {
        breakpoint: 1270,
        options: {
          chart: {
            height: 245,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 280,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 290,
          },
        },
      },
      {
        breakpoint: 500,
        options: {
          chart: {
            height: 250,
          },
          plotOptions: {
            radar: {
              size: 50,
            },
          },
        },
      },
      {
        breakpoint: 375,
        options: {
          chart: {
            height: 220,
          },
        },
      },
    ],
  }

  export const SalesSummary2:ChartOptions |any = {
    series: [
      {
        name: "Revenue",
        data: [
          23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 23, 11, 22, 27, 13, 22, 37,
          21, 44, 22, 30, 23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 23, 11, 22,
          27, 13, 22, 37, 21, 44, 22, 30
        ],
      },
    ],
    chart: {
      type: "bar",
      height: 270,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
      },
    },
    colors: "var(--light-color)",
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        'Jan', '', '','Feb', '', '','','Mar', '','','','Apr','','','May', '', '', '', 'Jun','','', '','','Jul','','','','Aug','','','','Sept','','','Oct','','','Nov','','','','Dec','',''
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      opacity: 0.7,
    },
    tooltip: {
      enabled: false,
    },
    states: {
      normal: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
        },
      },
    },
    responsive: [
      {
        breakpoint: 405,
        options: {
          chart: {
            // height: 150,
          },
        },
      },
    ],
  }

  export const SalesSummary1 :ChartOptions |any = {
    series: [
      {
        name: "Earning",
        type: "area",
        data: [13 ,18, 23, 28, 33, 38, 43, 48, 43, 38, 33, 28, 23, 18, 13, 20, 27, 34, 41, 48, 55, 62, 69, 76, 69, 62, 55, 48, 41, 34, 27, 20, 18, 16, 14, 12, 10, 8, 16, 24, 32, 40, 32, 24, 16],
      },
      {
        name: "Refunds",
        type: "area",
        data: [48, 43, 38, 33, 28, 23, 18, 13, 18, 23, 28, 33, 38, 43, 48, 43, 38, 33, 28, 23, 18, 13, 8, 3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 43, 38, 33, 28, 23 ,20, 18, 16, 14, 12, 10],
      },
    ],
    chart: {
      height: 268,
      type: "line",
      offsetY: 10,
      stacked: false,
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: [0, 0],
        top: 5,
        left: 0,
        blur: 10,
        color: ['#43B9B2'],
        opacity: 0.4,
      },
    },
    stroke: {
      width: [2, 2],
      curve: "straight",
      dashArray: [ 0, 3],
    },
    grid: {
      show: true,
      strokeDashArray: 2,
      position: "back", 
      borderColor: 'rgba(106, 113, 133, 0.30)',
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    colors: [primary_color, secondary_color],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 0],
      },
    },
    labels: ['Jan', '', '','Feb', '', '','','Mar', '','','','Apr','','','May', '', '', '', 'Jun','','', '','','Jul','','','','Aug','','','','Sept','','','Oct','','','Nov','','','','Dec','',''],
    annotations: {
      points: [
        {
          x: 'Jan',
          y: 13,
          marker: {
            size: 5,
            fillColor: primary_color, // Choose the color you want
            strokeWidth: 0,
          },  
        },
        {
          x: 'Mar',
          y: 48,
          marker: {
            size: 5,
            fillColor: primary_color, // Choose the color you want
            strokeWidth: 0,
          },  
        },
        {
          x: 'May',
          y: 13,
          marker: {
            size: 5,
            fillColor: primary_color, // Choose the color you want
            strokeWidth: 0,
          },  
        },
        {
          x: 'Jul',
          y: 76,
          marker: {
            size: 5,
            fillColor: primary_color, // Choose the color you want
            strokeWidth: 0,
          },  
        },
        {
          x: 'Sept',
          y: 20,
          marker: {
            size: 5,
            fillColor: primary_color, // Choose the color you want
            strokeWidth: 0,
          },  
        },
        {
          x: 'Nov',
          y: 8,
          marker: {
            size: 5,
            fillColor: primary_color, // Choose the color you want
            strokeWidth: 0,
          },  
        },
        {
          x: 'Dec',
          y: 40,
          marker: {
            size: 5,
            fillColor: primary_color, // Choose the color you want
            strokeWidth: 0,
          },  
        },
      ],
    },
    xaxis: {
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    yaxis: {
      min: 0,
      tickAmount: 6,
      tickPlacement: "between",
    },
    tooltip: {
      shared: false,
      intersect: false,
    },
    responsive: [
      {
        breakpoint: 1380,
        options: {
          chart: {
            height: 310,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
  }