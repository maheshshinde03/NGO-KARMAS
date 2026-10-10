import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  formConfig = [
    {
      name: "free_form_note_id",
      placeholder: "Free Form Note Id",
      label: "test",
      type: "text",
      value: "",
      required: true,
      disable: false,
      minLength: 5,
      maxLength: 50,
    },
    {
      name: "note",
      placeholder: "Note",
      label: "test1",
      type: "text",
      value: "",
      disable: false,
    }
  ];

  handleSubmit(event: any) {
    let formData = JSON.parse(JSON.stringify(event["formValue"]))
  }

}
