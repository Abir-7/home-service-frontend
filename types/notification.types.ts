export interface WorkAlert {
  id: string;
  title: string;
  time: string;
  canReject: boolean;

  // Service details (shown in View modal)
  serviceType: string;
  serviceSubtype: string;
  date: string;
  location: string;

  // Customer details
  customerName: string;
  customerPhone: string;
  totalCost: number;
}
