import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '@shared/component/toast/toast.component';
import { ToastService } from './toast.service';

@Injectable({
    providedIn: 'root'
})
export class DataValidationService {
    // List of fields to be excluded from validation
  private excludedFields = ['blank', 'header'];

  constructor(private toastr: ToastService) { }

  validateData(data: any,excludedFields:any): boolean {
    let hasInvalidFields = false;

    for (const key in data) {
      if (data.hasOwnProperty(key) && !excludedFields.includes(key)) {
        const value = data[key];

        // Check for null, undefined, or empty string, excluding specified fields
        if (value === null || value === undefined || value === '') {
          hasInvalidFields = true;
          const formattedFieldName = this.formatFieldName(key);
          this.toastr.open(`Field "${formattedFieldName}" is null, undefined, or empty`, 'error');
        }
      }
    }

    return !hasInvalidFields;
  }

  formatFieldName(fieldName: string): string {
    // Replace underscores or dashes with spaces, and convert camelCase to sentence case
    return fieldName
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert a space before capital letters in camelCase
      .replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }); // Capitalize the first letter of each word
  }
}
