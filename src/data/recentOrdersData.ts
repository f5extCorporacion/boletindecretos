import {
  iPhone,
  NightDress,
  CameraLens,
  ArganOil,
  Parfum,

} from 'data/images';

interface RowsProps {
  id: number | string;
  product: { name: string; image: string };
  price: number;
  totalOrder: number;
  inStock: number;
  pending: number;
  canceled: number;
  delevered: number;
  balance: number;
}

export const rows: RowsProps[] = [
  {
    id: '#1001',
    product: { name: 'Camera Lens', image: CameraLens },
    price: 178,
    totalOrder: 325,
    inStock: 1236,
    pending: 170,
    canceled: 5,
    delevered: 150,
    balance: 146660,
  },
  {
    id: '#1002',
    product: { name: 'Black Sleep Dress', image: NightDress },
    price: 14,
    totalOrder: 153,
    inStock: 720,
    pending: 80,
    canceled: 2,
    delevered: 71,
    balance: 46660,
  },
  {
    id: '#1003',
    product: { name: 'Argan Oil', image: ArganOil },
    price: 21,
    totalOrder: 225,
    inStock: 940,
    pending: 120,
    canceled: 3,
    delevered: 102,
    balance: 52438,
  },
  {
    id: '#1004',
    product: { name: 'EAU DE Parfum', image: Parfum },
    price: 32,
    totalOrder: 280,
    inStock: 940,
    pending: 108,
    canceled: 4,
    delevered: 168,
    balance: 94632,
  },
  {
    id: '#1005',
    product: { name: 'iPhone 12', image: iPhone },
    price: 987,
    totalOrder: 450,
    inStock: 850,
    pending: 80,
    canceled: 12,
    delevered: 300,
    balance: 315500,
  }
];
