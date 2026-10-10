import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TotalProject } from '@shared/data/dashboard/project/project-chart';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { currentUser } from '@shared/utils/current-user';

@Component({
  selector: 'app-total-project',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './total-project.component.html',
  styleUrl: './total-project.component.scss'
})
export class TotalProjectComponent implements OnChanges {
  @Input() isScorer: boolean = false;
  @Input() isNgoLogin: boolean = false;
  @Input() data: any;

  total: number = 0;
  top: number = 0;
  active: number = 0;
  losing: number = 0;
  blocked: number = 0;

  // ProjectData: any = {
  //   series: [0],
  //   chart: {
  //     type: 'donut',
  //     height: 240,
  //   },
  //   labels: [],
  //   legend: {
  //     position: "bottom"
  //   },
  //   dataLabels: {
  //     enabled: true
  //   },
  //   // colors: ["#1E90FF", "#28a745", "#ffc107", "#dc3545", "#6f42c1"]
  //   colors: [
  //     "#1E3A8A", // Navy Blue (base / primary)
  //     "#2563EB", // Bright Blue (accent)
  //     "#3B82F6", // Smooth Sky Blue
  //     "#0EA5E9", // Cyan
  //     "#38BDF8", // Light Aqua
  //     "#1D4ED8", // Deep Royal Blue
  //     "#172554"  // Very Dark Navy (for depth)
  //   ]


  // };

  // ProjectData: any = {
  //   series: [44, 30, 20, 10], // example values (replace with your data)
  //   chart: {
  //     type: 'donut',
  //     height: 260,
  //     toolbar: { show: false },
  //     animations: {
  //       enabled: true,
  //       easing: "easeinout",
  //       speed: 800,
  //       animateGradually: { enabled: true, delay: 200 },
  //       dynamicAnimation: { enabled: true, speed: 350 }
  //     }
  //   },
  //   labels: ["Planning", "In Progress", "Completed", "Pending"], // example labels
  //   legend: {
  //     position: "bottom",
  //     horizontalAlign: "center",
  //     fontSize: "14px",
  //     labels: {
  //       colors: "#6B7280" // slate-500 for clean look
  //     },
  //     markers: {
  //       width: 12,
  //       height: 12,
  //       radius: 12
  //     }
  //   },
  //   dataLabels: {
  //     enabled: false
  //   },
  //   plotOptions: {
  //     pie: {
  //       expandOnClick: false,
  //       donut: {
  //         size: "75%",
  //         labels: {
  //           show: true,
  //           name: {
  //             show: true,
  //             fontSize: "14px",
  //             fontWeight: 500,
  //             offsetY: -5,
  //             color: "#6B7280"
  //           },
  //           value: {
  //             show: true,
  //             fontSize: "20px",
  //             fontWeight: 700,
  //             offsetY: -25,
  //             color: "#1E3A8A"
  //           },
  //           total: {
  //             show: true,
  //             label: "Total",
  //             fontSize: "14px",
  //             fontWeight: 500,
  //             color: "#9CA3AF",
  //             formatter: (w: any) => {
  //               return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
  //             }
  //           }
  //         }
  //       }
  //     }
  //   },
  //   stroke: {
  //     width: 2,
  //     colors: ["#fff"]
  //   },
  //   tooltip: {
  //     y: {
  //       formatter: (val: number) => `${val}`
  //     }
  //   },
  //   // Professional Navy gradient palette
  //   colors: [
  //     "#1E3A8A", // Navy Blue (base / primary)
  //     "#2563EB", // Bright Blue (accent)
  //     "#3B82F6", // Smooth Sky Blue
  //     "#0EA5E9", // Cyan
  //     "#38BDF8", // Light Aqua
  //     "#1D4ED8", // Deep Royal Blue
  //     "#172554"  // Very Dark Navy
  //   ]
  // };

  primary_color = localStorage.getItem('primary_color') || '#43B9B2';  // Teal
  secondary_color = localStorage.getItem('secondary_color') || '#C280D2'; // Purple
  tertiary_color = '#FD7E40'; // Orange
  light_color = '#F4F5F8'; // Light Neutral

  ProjectData: any = {
    series: [44, 30, 20, 10],
    chart: {
      type: "donut",
      height: 280,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeout",
        speed: 1000,
        animateGradually: { enabled: true, delay: 200 },
        dynamicAnimation: { enabled: true, speed: 400 }
      }
    },
    labels: ["Planning", "In Progress", "Completed", "Pending"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      labels: { colors: "#4B5563" },
      markers: { width: 14, height: 14, radius: 12, offsetX: -2 }
    },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        expandOnClick: true,
        donut: {
          size: "73%",
          labels: {
            show: true,
            name: { show: true, fontSize: "15px", fontWeight: 500, offsetY: 20, color: "#6B7280" },
            value: { show: true, fontSize: "26px", fontWeight: 700, color: "#111827", offsetY: -10, formatter: (val: number) => `${val}%` },
            total: {
              show: true,
              label: "Total",
              fontSize: "13px",
              fontWeight: 400,
              color: "#9CA3AF",
              formatter: (w: any) => w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0)
            }
          }
        }
      }
    },
    stroke: { width: 3, colors: ["#fff"] },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val: number, opts: any) => `${opts.w.globals.labels[opts.seriesIndex]}: ${val}`
      }
    },
    colors: [this.primary_color, this.secondary_color, this.tertiary_color, this.light_color],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: [
          "#5AD0C8", // lighter teal
          "#D9A0E0", // lighter purple
          "#FEA06C", // lighter orange
          "#F4F5F8"  // neutral
        ],
        stops: [0, 100]
      }
    },
    dropShadow: { enabled: true, top: 4, left: 2, blur: 6, opacity: 0.2 }
  };


  // ProjectData=TotalProject;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.updateChart();
    }
  }

  updateChart() {
    if (currentUser().ngo_id) {
      this.isNgoLogin = true;
    } else {
      this.isNgoLogin = false;
    }
    if (this.isScorer) {
      // 🎯 Scorers
      this.total = Number(this.data?.score_zero_total_scorers_count ?? 0);
      this.top = Number(this.data?.score_top_scorers_this_month ?? 0);
      this.active = Number(this.data?.score_top_active_scorers ?? 0);
      this.losing = Number(this.data?.score_losing_scorers_count ?? 0);

      this.ProjectData.series = [this.total, this.top, this.active];
      this.ProjectData.labels = ["Total", "Top", "Active", "Losing"];
    } else {
      // 👤 Users
      this.total = Number(this.data?.user_total_count ?? 0);
      this.top = Number(this.data?.user_new_month_user ?? 0);
      this.active = Number(this.data?.user_total_active ?? 0);
      // this.losing = this.total - this.active; // inactive
      // this.blocked = Number(this.data?.user_total_blacklisted ?? 0);

      if (this.isNgoLogin) {
        this.ProjectData.series = [this.total, this.top, this.active];
        this.ProjectData.labels = ["Total", "New", "Active"]
      } else {
        this.ProjectData.series = [this.total, this.top, this.active, this.losing, this.blocked];
        this.ProjectData.labels = ["Total", "New", "Active", "Inactive", "Blocked"];
      }


    }
  }
}
