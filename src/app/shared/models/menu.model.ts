export interface Menu {
    path?: string;
    title: string;
    type: 'link' | 'sub'; // Define types based on your data
    icon?: string;
    level?: number;
    active?: boolean;
    badge?: boolean;
    children?: Menu[];
  }
  