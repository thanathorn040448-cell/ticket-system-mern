export interface Zone {
  name: string;
  type: 'VIP' | 'GOLD' | 'SILVER';
  rows: number;
  cols: number;
  price: number;
}

export interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: number;
  status?: 'AVAILABLE' | 'SOLD_OUT' | 'SELLING_FAST' | 'EARLY_BIRD' | 'HOT_TICKETS';
  category: string;
  zones?: Zone[];
}

export interface Artist {
  id: string;
  name: string;
  image: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'VIP' | 'GOLD' | 'SILVER';
  price: number;
  status: 'available' | 'selected' | 'sold';
}
