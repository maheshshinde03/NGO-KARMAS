import { TemplateRef } from "@angular/core";

export interface Tab {
  name: string;
  route: string;
  showCreateButton: boolean;
  icon?: string;
  template?: TemplateRef<any> | any;
  is_template?: boolean;
  is_admin?:boolean;
}