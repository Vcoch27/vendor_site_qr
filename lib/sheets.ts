import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const API_KEY = process.env.GOOGLE_API_KEY;
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

// Khởi tạo Google Sheet document
async function getDoc() {
  // Option 1: Sử dụng API Key (đơn giản, chỉ cần public sheet)
  if (API_KEY && !CLIENT_EMAIL) {
    const doc = new GoogleSpreadsheet(SHEET_ID, { apiKey: API_KEY });
    await doc.loadInfo();
    return doc;
  }

  // Option 2: Sử dụng Service Account (secure hơn)
  if (CLIENT_EMAIL && PRIVATE_KEY) {
    const serviceAccountAuth = new JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    return doc;
  }

  throw new Error(
    'Cần config GOOGLE_API_KEY hoặc GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_PRIVATE_KEY trong .env.local'
  );
}

// === VENDORS SHEET ===

export async function getVendors() {
  const doc = await getDoc();
  const sheet = doc.sheetsByTitle['Vendors'];
  const rows = await sheet.getRows();

  return rows.map((row) => ({
    vendor_id: row.get('vendor_id'),
    team: row.get('team'),
    contact_name: row.get('contact_name'),
    phone: row.get('phone'),
    email: row.get('email'),
    address: row.get('address'),
    note: row.get('note'),
    password: row.get('password'),
  }));
}

export async function addVendor(data: {
  vendor_id: string;
  team: string;
  contact_name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  password: string;
}) {
  const doc = await getDoc();
  const sheet = doc.sheetsByTitle['Vendors'];
  await sheet.addRow(data);
}

export async function findVendorByEmail(email: string) {
  const vendors = await getVendors();
  return vendors.find((v) => v.email === email);
}

// === WEBSITEDATA SHEET ===

export async function getWebsiteData(vendorId?: string) {
  const doc = await getDoc();
  const sheet = doc.sheetsByTitle['WebsiteData'];
  const rows = await sheet.getRows();

  const data = rows.map((row) => ({
    id: row.get('id'),
    vendor_id: row.get('vendor_id'),
    slug: row.get('slug'),
    name: row.get('name'),
    team: row.get('team'),
    category: row.get('category'),
    price: row.get('price'),
    currency: row.get('currency'),
    tags: row.get('tags'),
    short_desc: row.get('short_desc'),
    detail_desc: row.get('detail_desc'),
    media_json: row.get('media_json'),
    status: row.get('status'),
    logo: row.get('logo'),
  }));

  if (vendorId) {
    return data.filter((item) => item.vendor_id === vendorId);
  }

  return data;
}

export async function addWebsiteData(data: {
  id: string;
  vendor_id: string;
  slug: string;
  name: string;
  team: string;
  category: string;
  price: string;
  currency: string;
  tags: string;
  short_desc: string;
  detail_desc: string;
  media_json: string;
  status: string;
  logo: string;
}) {
  const doc = await getDoc();
  const sheet = doc.sheetsByTitle['WebsiteData'];
  await sheet.addRow(data);
}
