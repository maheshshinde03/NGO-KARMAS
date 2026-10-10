import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request-ngo-popup',
  templateUrl: './request-ngo-popup.component.html',
  styleUrl: './request-ngo-popup.component.scss'
})
export class RequestNgoPopupComponent {

  subs: any;

  searchText: string = '';
  requestNgoList: any[] = []; // Stores selected NGOs in required format
  ngos :any = [];
  filteredNgos = [...this.ngos];

  constructor(
    private ngoMasterservice: NgoControllerService,
    public dialogRef: MatDialogRef<RequestNgoPopupComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllNgo();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllNgo() {
    this.subs.add(this.ngoMasterservice.getAllNgo().subscribe({
      next: (value) => {
        this.ngos = value.data;
        this.filteredNgos = [...this.ngos];
        // this.ngoDetailsData.data = value.data;
      }
    }))
  }

  filterNgos() {
    this.filteredNgos = this.ngos.filter((ngo:any) => ngo.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  isNgoSelected(ngo_id: number): boolean {
    return this.requestNgoList.some(item => item.ngo_id === ngo_id);
  }

  toggleSelection(ngo: any) {
    const index = this.requestNgoList.findIndex(item => item.ngo_id === ngo.ngo_id);
    if (index === -1) {
      // Add to requestNgoList
      this.requestNgoList.push({
        Request_Ngo_Id: '',
        RequestId: '',
        ngo_id: ngo.ngo_id,
        Reason: '',
        AssignedDate: '',
        ApprovalDate: ''
      });
    } else {
      // Remove from requestNgoList
      this.requestNgoList.splice(index, 1);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
