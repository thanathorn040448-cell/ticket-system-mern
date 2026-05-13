import { Event, Artist } from './types';


export const CATEGORIES = [
  { id: 'all', name: 'ทั้งหมด', icon: 'Globe' },
  { id: 'concert', name: 'คอนเสิร์ต', icon: 'Music' },
];

export const RECOMMENDED_EVENTS: Event[] = [
  {
    id: '0',
    title: 'BODYSLAM: EVERYBODYSLAM 2026',
    image: 'https://mpics.mgronline.com/pics/Images/568000003416601.JPEG',
    date: '25 MAY',
    time: '19:00 เป็นต้นไป',
    location: 'Rajamangala Stadium, Bangkok',
    price: 1500,
    status: 'AVAILABLE',
    category: 'concert',
    zones: [
      { name: 'VIP ZONE (฿5,500)', type: 'VIP', rows: 4, cols: 12, price: 5500 },
      { name: 'GOLD ZONE (฿3,500)', type: 'GOLD', rows: 6, cols: 14, price: 3500 },
      { name: 'SILVER ZONE (฿1,500)', type: 'SILVER', rows: 8, cols: 16, price: 1500 },
    ]
  },
  {
    id: '1',
    title: 'Ink Waruntorn: Close Up',
    image: 'https://p-u.popcdn.net/attachments/images/000/019/554/large/InkWaruntorn_2.jpg?1568631578auto=format&fit=crop&q=80&w=800',
    date: '25 MAY',
    time: '19:00 เป็นต้นไป',
    location: 'Impact Arena, Muang Thong Thani',
    price: 1500,
    status: 'SOLD_OUT',
    category: 'concert',
    zones: [
      { name: 'FRONT ROW (฿4,500)', type: 'VIP', rows: 2, cols: 10, price: 4500 },
      { name: 'MIDDLE ROW (฿2,500)', type: 'GOLD', rows: 4, cols: 12, price: 2500 },
      { name: 'BACK ROW (฿1,500)', type: 'SILVER', rows: 6, cols: 14, price: 1500 },
    ]
  },
  {
    id: '2',
    title: 'Three Man Down Live',
    image: 'https://s.isanook.com/jo/0/ud/482/2413237/threemandown-tn-png.png?ip/crop/w1200h700/q80/webp',
    date: '10 JUN',
    time: '20:00 เป็นต้นไป',
    location: 'Voice Space',
    price: 1200,
    status: 'AVAILABLE',
    category: 'concert',
    zones: [
      { name: 'STANDING A (฿2,500)', type: 'VIP', rows: 5, cols: 10, price: 2500 },
      { name: 'STANDING B (฿1,200)', type: 'GOLD', rows: 8, cols: 12, price: 1200 },
    ]
  },
  {
    id: '3',
    title: 'Polycat: 80s Night',
    image: 'https://image.thepeople.co/uploads/2019/08/POLYCAT_Website_1200x628.jpg?x-image-process=style/lg',
    date: '15 JUL',
    time: '19:00',
    location: 'BCC Hall Central Ladprao',
    price: 1800,
    status: 'AVAILABLE',
    category: 'concert',
    zones: [
      { name: 'RETRO VIP (฿3,800)', type: 'VIP', rows: 3, cols: 12, price: 3800 },
      { name: 'RETRO GOLD (฿2,800)', type: 'GOLD', rows: 5, cols: 14, price: 2800 },
      { name: 'RETRO SILVER (฿1,800)', type: 'SILVER', rows: 7, cols: 16, price: 1800 },
    ]
  },
  {
    id: '4',
    title: 'Tilly Birds: It Is Only Once',
    image: 'https://admin.adaddictth.com/files/interview/tilly%20birds/TBS2_Hires.jpg',
    date: '20 AUG',
    time: '18:30',
    location: 'Thunder Dome',
    price: 2200,
    status: 'HOT_TICKETS',
    category: 'concert',
    zones: [
      { name: 'ZONE A (฿4,200)', type: 'VIP', rows: 4, cols: 10, price: 4200 },
      { name: 'ZONE B (฿3,200)', type: 'GOLD', rows: 6, cols: 12, price: 3200 },
      { name: 'ZONE C (฿2,200)', type: 'SILVER', rows: 8, cols: 14, price: 2200 },
    ]
  },
  {
    id: '5',
    title: 'P9D',
    image: 'https://cms.dmpcdn.com/musicarticle/2022/09/26/0140e640-3d4d-11ed-9675-817e10841b57_webp_original.jpg',
    date: '32 DEC',
    time: '25:00',
    location: 'Namek Planet',
    price: 9999,
    status: 'HOT_TICKETS',
    category: 'concert',
    zones: [
      { name: 'ZONE A (฿4,200)', type: 'VIP', rows: 4, cols: 10, price: 4200 },
      { name: 'ZONE B (฿3,200)', type: 'GOLD', rows: 6, cols: 12, price: 3200 },
      { name: 'ZONE C (฿2,200)', type: 'SILVER', rows: 8, cols: 14, price: 2200 },
    ]
  },
];

export const TRENDING_ARTISTS: Artist[] = [
  { id: '1', name: 'Bowkylion', image: 'https://admin.adaddictth.com/files/ADclusive/BOEKYLION/001.jpg' },
  { id: '2', name: 'Polycat', image: 'https://image.thepeople.co/uploads/2019/08/POLYCAT_Website_1200x628.jpg?x-image-process=style/lg' },
  { id: '3', name: 'Tilly Birds', image: 'https://admin.adaddictth.com/files/interview/tilly%20birds/TBS2_Hires.jpg' },
  { id: '4', name: 'Violette Wautier', image: 'https://www.thai2music.com/uploads/artists/photo_cover/_optimized/artist_artist_photo_cover_152_1749816431_w800.webp' },
  { id: '5', name: 'The Toys', image: 'https://mellowpop.mcot.net/uploads/article/article_5d354f303c4e2.jpg' },
  { id: '6', name: 'Safeplanet', image: 'https://cdn.prod.website-files.com/649174dcab676e52a64ce81a/6492a377b45c012e44fa348c_Safeplanet_04-2048x1365.jpeg' },
];
