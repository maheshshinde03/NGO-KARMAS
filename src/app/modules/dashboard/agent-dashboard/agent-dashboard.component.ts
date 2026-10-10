import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '@shared/_http/dashboard.service';
import { NotificationService } from '@shared/_http/notification.service';
import { shipData } from '@shared/configs/dashboard-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { currentUser } from '@shared/utils/current-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrl: './agent-dashboard.component.scss'
})
export class AgentDashboardComponent {

  subs: any;
  voyageDashboard: any;
  voyageDashboardDetails: any;
  invoiceDashboard: any;
  DashboardDetailsData: any;
  dashboardHeader: any;
  private modalRef?: NgbModalRef;
  DashboardData: RowData;
  agent_id = currentUser().agent_id;
  primary_color = localStorage.getItem('primary_color') || '#43B9B2';
  secondary_color = localStorage.getItem('secondary_color') || '#C280D2';
  tertiary_color = '#FD7E40'
  TotalSaleChart = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Total Request", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalRequestAssigneTONgo = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Total Request Assigned To NGO", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalRequestCompletedTONgo = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Completed Requests BY (NGOs)", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalRequestRejetedTONgo = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Rejected Requests By (NGOs)", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart1 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Complete Request", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart2 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Pending Request", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalReqNgoPending = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "NGO Approval Pending", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }

  TotalSaleChart3 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Rejected Request", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  ProjectData = { "series": [65, 55, 40, 30], "chart": { "type": "donut", "height": 240 }, "plotOptions": { "pie": { "expandOnClick": false, "startAngle": -90, "endAngle": 90, "offsetY": 10, "donut": { "size": "75%", "labels": { "show": true, "name": { "offsetY": -10 }, "value": { "offsetY": -50 }, "total": { "show": true, "fontSize": "12px", "fontFamily": "Outfit", "fontWeight": 400, "label": "", "color": "#9B9B9B" } } }, "customScale": 1, "offsetX": 0 } }, "grid": { "padding": { "bottom": -120 } }, "legend": { "show": false }, "dataLabels": { "enabled": false }, "colors": ["#43B9B2", "#C280D2", "#FD7E40", "#F4F5F8"], "responsive": [{ "breakpoint": 1870, "options": { "chart": { "height": 250 } } }, { "breakpoint": 1780, "options": { "chart": { "height": 240 } } }, { "breakpoint": 1740, "options": { "plotOptions": { "pie": { "expandOnClick": false, "startAngle": -90, "endAngle": 90, "offsetY": 10, "donut": { "size": "70%", "labels": { "show": true, "name": { "offsetY": -50 }, "value": { "offsetY": -30 } } } } } } }] }


  TotalSaleChart4 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Karma's Admin Aprroval", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart5 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Ngo Approval Pending", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart6 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Actives User", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart7 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "In Actives User", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart8 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Blocks user", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }


  TotalSaleChart9 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Total NGOs ", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart10 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "New Request NGOS ", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart11 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Actives NGOS", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart12 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "In Actives NGOS", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart13 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Non Regi with darpan", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart14 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Regi with darpan", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart15 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Regi with darpan", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }


  TotalSaleChart16 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Total IP Tracking", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart17 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "IP ID Gererate", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart18 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Active ID", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart19 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Deactive ID", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }


  TotalSaleChart20 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Total IP Tracking", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart21 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "IP ID Gererate", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart22 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Active ID", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }
  TotalSaleChart23 = { "series": [{ "data": [30, 20, 25, 15, 35, 38, 49, 38, 45, 35, 55, 57] }], "chart": { "width": 180, "height": 120, "type": "line", "toolbar": { "show": false }, "offsetY": 10, "dropShadow": { "enabled": false } }, "grid": { "show": false }, "colors": ["#43B9B2"], "stroke": { "width": 2, "curve": "smooth" }, "labels": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], "markers": { "size": 0 }, "xaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false }, "tooltip": { "enabled": false } }, "yaxis": { "axisBorder": { "show": false }, "axisTicks": { "show": false }, "labels": { "show": false } }, "legend": { "show": false }, "tooltip": { "marker": { "show": false }, "x": { "show": false }, "y": { "show": false, "labels": { "show": false } } }, "responsive": [{ "breakpoint": 1790, "options": { "chart": { "width": 150 } } }, { "breakpoint": 1660, "options": { "chart": { "width": 120 } } }, { "breakpoint": 1520, "options": { "chart": { "width": 100 } } }, { "breakpoint": 1500, "options": { "chart": { "width": 200, "height": 130, "offsetX": 20, "offsetY": 20 } } }, { "breakpoint": 1340, "options": { "chart": { "width": 170, "height": 120 } } }, { "breakpoint": 1270, "options": { "chart": { "width": 170, "height": 100 } } }, { "breakpoint": 1200, "options": { "chart": { "width": 180, "height": 120, "offsetX": -10 } } }, { "breakpoint": 992, "options": { "chart": { "width": 130, "height": 120, "offsetX": 10 } } }, { "breakpoint": 976, "options": { "chart": { "width": 180, "height": 120, "offsetX": 40 } } }, { "breakpoint": 768, "options": { "chart": { "width": 180, "height": 120, "offsetX": 0 } } }, { "breakpoint": 380, "options": { "chart": { "width": 110, "height": 120, "offsetX": 0 } } }], "name": "Deactive ID", "percentage": "3.4%", "class1": "danger", "class2": "primary", "price": " 0", "icon": "Product-discount", "des": "20% since Last Month", "icon2": "arrow-up-right" }


  taskSummaryNGOResponse: any;
  recentRequestAll: any;
  recentRequestAllForNgo: any;
  rewardCountDash: any;
  isNgoLogin: boolean = false;
  notificationsData: any[];
  countNotifcation: any;
  @ViewChild('DashboardDataModal', { static: true }) DashboardDataModal!: TemplateRef<NgbModal>;

  constructor(private modalService: NgbModal, private dashService: DashboardService, private loaderService: LoaderService, private notificationService: NotificationService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.subs = new Subscription();
    // this.getAllVoyage()
    // this.getAllVoyageDetails()
    // this.getAllInvoices()
    if (currentUser().ngo_id) {
      this.isNgoLogin = true;
    } else {
      this.isNgoLogin = false;
    }

    this.getAllDashboardData();
    this.getNotifications();

  }

  // getAllVoyage() {
  //   this.subs.add(this.dashService.getVoyageDashboardAgent(this.agent_id).subscribe({
  //     next: (value) => {
  //       this.voyageDashboard = value.data
  //       this.TotalSaleChart.price = this.voyageDashboard.total_arrived_port_call_current_month ?? 0
  //       this.TotalSaleChart1.price = this.voyageDashboard.total_departed_port_call_current_month ?? 0
  //       this.TotalSaleChart2.price = this.voyageDashboard.total_schedule_port_call_current_month ?? 0
  //       this.TotalSaleChart3.price = this.voyageDashboard.JOB_NOT_CREATED ?? 0
  //     }
  //   }))
  // }

  // getAllVoyageDetails() {
  //   this.loaderService.showLoader();
  //   this.subs.add(this.dashService.getVoyageDetailsDashboardAgent(this.agent_id).subscribe({
  //     next: (value) => {
  //       this.loaderService.hideLoader();
  //       this.voyageDashboardDetails = value.data;
  //     }, error: () => {
  //       this.loaderService.hideLoader();
  //     }

  //   }))
  // }

  // getAllInvoices() {
  //   this.loaderService.showLoader();
  //   this.subs.add(this.dashService.getInvoiceDashboardAgent(this.agent_id).subscribe({
  //     next: (value) => {
  //       this.loaderService.hideLoader();
  //       this.invoiceDashboard = value.data;
  //       this.ProjectData.series = [Number(this.invoiceDashboard?.total_tax_invoice), Number(this.invoiceDashboard?.total_performa_invoice), Number(this.invoiceDashboard?.remaining_invoice)]
  //     }, error: () => {
  //       this.loaderService.hideLoader();
  //     }
  //   }))
  // }

  getAllDashboardData() {
    if (this.isNgoLogin) {
      this.loaderService.showLoader();
      this.subs.add(this.dashService.getAgentDashboardDataForNgo(currentUser().ngo_id).subscribe({
        next: (value) => {
          this.DashboardDetailsData = value.data;
          this.TotalSaleChart.price = value?.data?.total_request_global ?? 0;
          this.TotalRequestAssigneTONgo.price = value?.data?.total_request_assigned_to_ngo ?? 0;
          this.TotalRequestCompletedTONgo.price = value?.data?.total_ngo_request_completed ?? 0;
          this.TotalRequestRejetedTONgo.price = value?.data?.total_ngo_request_rejected ?? 0;


          this.TotalSaleChart1.price = value?.data?.total_request_approved_status ?? 0;
          this.TotalSaleChart2.price = value?.data?.total_request_pending_status ?? 0;
          this.TotalReqNgoPending.price = value?.data?.total_request_pending_status ?? 0;
          this.TotalSaleChart3.price = value?.data?.total_request_rejected ?? 0;
          this.TotalSaleChart4.price = value?.data?.total_request_admin ?? 0;
          this.TotalSaleChart5.price = value?.data?.total_request_ngo_approval_pending ?? 0;



          this.recentRequestAll = value?.data?.recentRequestAll
          this.loaderService.hideLoader();
        }, error: () => {
          this.loaderService.hideLoader();
        }
      }));

      this.subs.add(this.dashService.getNgoRequestDashboardData(currentUser().ngo_id).subscribe({
        next: (value) => {
          this.recentRequestAllForNgo = value?.data;
          this.loaderService.hideLoader();
        }, error: () => {
          this.loaderService.hideLoader();
        }
      }));

      this.subs.add(this.dashService.getNgoRequestDashboardDataGetNgoCount(null).subscribe({
        next: (value) => {
          let TaskSummaryNGO = [
            {
              task: "Total NGOs",
              icon: "Category",
              class: "secondary",
              number: Number(value.data.total_ngo),
            },
            {
              task: "Blacklisted NGOs",
              icon: "Pie",
              class: "danger",
              number: Number(value.data.total_ngo_blacklisted),
            },
            {
              task: "Non-Blacklisted NGOs",
              icon: "Pie",
              class: "primary",
              number: Number(value.data.total_ngo_not_blacklisted),
            },
            {
              task: "Darpan Registered NGOs",
              icon: "Document",
              class: "tertiary",
              number: Number(value.data.total_ngo_darpan_registered),
            },
            {
              task: "Non-Darpan Registered NGOs",
              icon: "Document",
              class: "tertiary",
              number: Number(value.data.total_ngo_non_darpan_registered),
            },
            {
              task: "Completed Requests (NGOs)",
              icon: "Pie",
              class: "success",
              number: Number(value.data.total_ngo_request_completed),
            },
            {
              task: "Rejected Requests (NGOs)",
              icon: "Pie",
              class: "danger",
              number: Number(value.data.total_ngo_request_rejected),
            },
          ];

          if (this.isNgoLogin) {
            // TaskSummaryNGO = TaskSummaryNGO.filter(item =>
            //   // item.task !== "Rejected Requests (NGOs)" &&
            //   item.task !== "Blacklisted NGOs"
            // );
          }
          this.taskSummaryNGOResponse = TaskSummaryNGO;
          this.loaderService.hideLoader();
        }, error: () => {
          this.loaderService.hideLoader();
        }
      }));


      // this.subs.add(this.dashService.getNgoRequestDashboardDataGetNgoCount(currentUser().ngo_id).subscribe({
      //   next: (value) => {
      //     // this.recentRequestAllForNgo = value?.data;
      //     debugger
      //     this.loaderService.hideLoader();
      //   }, error: () => {
      //     this.loaderService.hideLoader();
      //   }
      // }));

      // this.subs.add(this.dashService.getNgoRequestDashboardDataGetRequestCount(currentUser().ngo_id).subscribe({
      //   next: (value) => {
      //     // this.recentRequestAllForNgo = value?.data;
      //     this.loaderService.hideLoader();
      //   }, error: () => {
      //     this.loaderService.hideLoader();
      //   }
      // }));
      //  this.subs.add(this.dashService.getNgoRequestDashboardDataGetUserCount(currentUser().ngo_id).subscribe({
      //   next: (value) => {
      //     // this.recentRequestAllForNgo = value?.data;
      //     debugger
      //     this.loaderService.hideLoader();
      //   }, error: () => {
      //     this.loaderService.hideLoader();
      //   }
      // }));
    } else {
      this.loaderService.showLoader();
      this.subs.add(this.dashService.getAgentDashboardData(this.agent_id).subscribe({
        next: (value) => {
          this.DashboardDetailsData = value.data;
          this.TotalSaleChart.price = value?.data?.total_request_global ?? 0;
          this.TotalSaleChart1.price = value?.data?.total_request_approved_status ?? 0;
          this.TotalSaleChart2.price = value?.data?.total_request_pending_status ?? 0;
          this.TotalReqNgoPending.price = value?.data?.total_request_pending_status ?? 0;
          this.TotalSaleChart3.price = value?.data?.total_request_rejected ?? 0;
          this.TotalSaleChart4.price = value?.data?.total_request_admin ?? 0;
          this.TotalSaleChart5.price = value?.data?.total_request_ngo_approval_pending ?? 0;

          const TaskSummaryNGO = [
            {
              task: "Total NGOs",
              icon: "Category",
              class: "secondary",
              number: Number(value.data.total_ngo),
            },
            {
              task: "Blacklisted NGOs",
              icon: "Pie",
              class: "danger",
              number: Number(value.data.total_ngo_blacklisted),
            },
            {
              task: "Non-Blacklisted NGOs",
              icon: "Pie",
              class: "primary",
              number: Number(value.data.total_ngo_not_blacklisted),
            },
            {
              task: "Darpan Registered NGOs",
              icon: "Document",
              class: "tertiary",
              number: Number(value.data.total_ngo_darpan_registered),
            },
            {
              task: "Non-Darpan Registered NGOs",
              icon: "Document",
              class: "tertiary",
              number: Number(value.data.total_ngo_non_darpan_registered),
            },
            {
              task: "Completed Requests (NGOs)",
              icon: "Pie",
              class: "success",
              number: Number(value.data.total_ngo_request_completed),
            },
            {
              task: "Rejected Requests (NGOs)",
              icon: "Pie",
              class: "danger",
              number: Number(value.data.total_ngo_request_rejected),
            },
          ];
          this.taskSummaryNGOResponse = TaskSummaryNGO;
          this.recentRequestAll = value?.data?.recentRequestAll
          this.loaderService.hideLoader();


          this.subs.add(this.dashService.getRewardCountDashboard().subscribe({
            next: (value) => {
              this.rewardCountDash = value?.data;
              this.loaderService.hideLoader();
            }, error: () => {
              this.loaderService.hideLoader();
            }
          }));
        }, error: () => {
          this.loaderService.hideLoader();
        }
      }));
    }
  }

  // dashboardClick(chartType: any) {
  //   switch (chartType) {
  //     case 'case1':
  //       this.DashboardData = JSON.parse(JSON.stringify(shipData))
  //       this.DashboardData.data = this.DashboardDetailsData.voyageArrivedAgent;
  //       this.dashboardHeader = "Ships Arrived"
  //       if (this.DashboardDetailsData.voyageArrivedAgent && this.DashboardDetailsData.voyageArrivedAgent.length > 0)
  //         this.openModal()
  //       break;
  //     case 'case2':
  //       this.DashboardData = JSON.parse(JSON.stringify(shipData))
  //       this.DashboardData.data = this.DashboardDetailsData.voyageDelayedAgent;
  //       this.dashboardHeader = "Ships Delayed"
  //       if (this.DashboardDetailsData.voyageDelayedAgent && this.DashboardDetailsData.voyageDelayedAgent.length > 0)
  //         this.openModal()
  //       break;
  //     case 'case3':
  //       this.DashboardData = JSON.parse(JSON.stringify(shipData))
  //       this.DashboardData.data = this.DashboardDetailsData.voyageScheduledAgent;
  //       this.dashboardHeader = "Ships Scheduled"
  //       if (this.DashboardDetailsData.voyageScheduledAgent && this.DashboardDetailsData.voyageScheduledAgent.length > 0)
  //         this.openModal()
  //       break;
  //     case 'case4':
  //       this.DashboardData = JSON.parse(JSON.stringify(shipData))
  //       this.DashboardData.data = this.DashboardDetailsData.voyageJobNotCreated;
  //       this.dashboardHeader = "Job Id Not Created"
  //       if (this.DashboardDetailsData.voyageJobNotCreated && this.DashboardDetailsData.voyageJobNotCreated.length > 0)
  //         this.openModal()
  //       break;
  //   }
  // }

  // openModal() {
  //   this.modalRef = this.modalService.open(this.DashboardDataModal, { centered: true, backdrop: 'static', fullscreen: true, size: 'xl' });
  // }

  // closeModal() {
  //   if (this.modalRef) {
  //     this.modalRef.close();
  //   }
  // }

  getNotifications() {
    this.subs.add(this.notificationService.getAllUnreadNGONotification().subscribe({
      next: (value) => {
        console.log('value = ', value);
        this.notificationsData = value.data;
        this.countNotifcation = this.notificationsData?.length;
        // Reverse the notifications array
        const reversedNotifications = [...this.notificationsData].reverse();

        // Get the latest 3 notifications
        const latestThreeNotifications = reversedNotifications.slice(0, 3);
        this.notificationsData = latestThreeNotifications;
      }
    }))
  }

  sanitizeImage(url: string): SafeUrl {
    // return this.sanitizer.bypassSecurityTrustUrl(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
