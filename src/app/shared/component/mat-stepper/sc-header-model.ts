import { TemplateRef } from "@angular/core";

export interface Step {
    label: string;
    template: TemplateRef<any> | any;
    valid?: boolean;
  }