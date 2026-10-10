import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '@shared/_http/dashboard.service';
import { passengerData, serviceData, shipData } from '@shared/configs/dashboard-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { WebsocketService } from '@shared/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})

export class AdminDashboardComponent implements OnInit {

  primary_color = localStorage.getItem('primary_color') || '#43B9B2';
  secondary_color = localStorage.getItem('secondary_color') || '#C280D2';
  tertiary_color = '#FD7E40'
  subs: any;
  TotalSaleChart = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Total Request", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart1 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Complete Request", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart2 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "In-Progress Request", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart3 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Rejected Request", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  ProjectData = { "series": [10, 10, 10, 10], "chart": { "type": "donut", "height": 240 }, "plotOptions": { "pie": { "expandOnClick": false, "startAngle": -90, "endAngle": 90, "offsetY": 10, "donut": { "size": "75%", "labels": { "show": true, "name": { "offsetY": -10 }, "value": { "offsetY": -50 }, "total": { "show": true, "fontSize": "12px", "fontFamily": "Outfit", "fontWeight": 400, "label": "", "color": "#9B9B9B" } } }, "customScale": 1, "offsetX": 0 } }, "grid": { "padding": { "bottom": -120 } }, "legend": { "show": false }, "dataLabels": { "enabled": false }, "colors": ["#43B9B2", "#C280D2", "#FD7E40", "#F4F5F8"], "responsive": [{ "breakpoint": 1870, "options": { "chart": { "height": 250 } } }, { "breakpoint": 1780, "options": { "chart": { "height": 240 } } }, { "breakpoint": 1740, "options": { "plotOptions": { "pie": { "expandOnClick": false, "startAngle": -90, "endAngle": 90, "offsetY": 10, "donut": { "size": "70%", "labels": { "show": true, "name": { "offsetY": -50 }, "value": { "offsetY": -30 } } } } } } }] }
  private modalRef?: NgbModalRef;
  DashboardData: RowData;
  DashboardDetailsData: any;
  dashboardHeader: any;

  @ViewChild('DashboardDataModal', { static: true }) DashboardDataModal!: TemplateRef<NgbModal>;


  constructor(private modalService: NgbModal, private websocketService: WebsocketService, public router: Router, private loaderService: LoaderService, private dashService: DashboardService) {

  }

  ngOnInit(): void {
    this.subs = new Subscription();
    this.getAllDashboardData();
    // this.PMSSocket();
  }

  getAllDashboardData() {
    this.loaderService.showLoader();
    this.subs.add(this.dashService.getAdminDashboardData().subscribe({
      next: (value) => {
        this.DashboardDetailsData = value.data;
        this.loaderService.hideLoader();
      }, error: () => {
        this.loaderService.hideLoader();
      }
    }))
  }

  dashboardClick(chartType: any) {
    switch (chartType) {
      case 'case1':
        this.DashboardData = JSON.parse(JSON.stringify(shipData))
        this.DashboardData.data = this.DashboardDetailsData.getallVoyageData;
        this.dashboardHeader = "Total Ships"
        if(this.DashboardDetailsData.getallVoyageData && this.DashboardDetailsData.getallVoyageData.length > 0)
        this.openModal()
        break;
      case 'case2':
        this.DashboardData = JSON.parse(JSON.stringify(shipData))
        this.DashboardData.data = this.DashboardDetailsData.getUpcommingVoyageData;
        this.dashboardHeader = "Upcoming Arrivals"
        if(this.DashboardDetailsData.getUpcommingVoyageData && this.DashboardDetailsData.getUpcommingVoyageData.length > 0)
        this.openModal()
        break;
      case 'case3':
        this.DashboardData = JSON.parse(JSON.stringify(serviceData))
        this.DashboardData.data = this.DashboardDetailsData.getAllService;
        this.dashboardHeader = "Service Request"
        if(this.DashboardDetailsData.getAllService && this.DashboardDetailsData.getAllService.length > 0)
        this.openModal()
        break;
      case 'case4':
        this.DashboardData = JSON.parse(JSON.stringify(passengerData))
        this.DashboardData.data = this.DashboardDetailsData.passangerData;
        this.dashboardHeader = "Passenger Count"
        if(this.DashboardDetailsData.passangerData && this.DashboardDetailsData.passangerData.length > 0)
        this.openModal()
        break;
    }
  }

  openModal() {
    this.modalRef = this.modalService.open(this.DashboardDataModal, { centered: true, backdrop: 'static', fullscreen: true, size: 'xl' });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

}
