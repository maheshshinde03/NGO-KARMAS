import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TapToTopComponent } from '@shared/component/tap-to-top/tap-to-top.component';
import { LoaderComponent } from '@shared/component/loader/loader.component';
import { TableComponent } from '@shared/component/table/table.component';
import { ToastComponent } from '@shared/component/toast/toast.component';
import { ToastService } from '@shared/services/toast.service';
import { InputComponent } from '@shared/component/input/input.component';
import { PipeModule } from '@shared/pipe/pipe.module';
import { ExcelService } from '@shared/services/excel-export.service';
import { SpinnerComponent } from '@shared/component/spinner/spinner.component';
import { LoaderService } from '@shared/services/loader.service';
import { MatDialogModule } from '@angular/material/dialog';
import { EcommerceComponent } from '@shared/component/ecommerce/ecommerce.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        TapToTopComponent,
        LoaderComponent,
        TableComponent,
        ToastComponent,
        InputComponent,
        SpinnerComponent,
        EcommerceComponent,
        MatDialogModule,
        PipeModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        TapToTopComponent,
        SpinnerComponent,
        LoaderComponent,
        TableComponent,
        EcommerceComponent,
        ToastComponent
    ],
    providers: [ToastService,ExcelService,LoaderService],
})
export class SharedImportsModule { }
