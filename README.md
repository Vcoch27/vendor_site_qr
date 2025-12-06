# Story QR - Vendor Management System 🎯

**Hệ thống quản lý sản phẩm thông minh với mã QR cho nhà cung cấp**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Vcoch27/vendor_site_qr)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

## ✨ Tính năng

### 🔐 Xác thực & Quản lý
- ✅ Đăng ký/Đăng nhập vendor với Google Sheets
- ✅ Dashboard quản lý sản phẩm hiện đại
- ✅ Thông tin vendor với validation

### 📦 Quản lý sản phẩm
- ✅ Thêm/Sửa/Xóa sản phẩm
- ✅ Upload media lên Cloudinary (ảnh + video)
- ✅ 3 loại media sections: Main, Sản xuất, Cách sử dụng
- ✅ Preview realtime trước khi publish

### 📱 QR Code & Chia sẻ
- ✅ Tạo QR code tự động
- ✅ Tải xuống QR (SVG format)
- ✅ In QR code trực tiếp
- ✅ Landing page responsive cho khách hàng

## Setup

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình Google Sheets API

**Chọn 1 trong 2 cách:**

#### Cách 1: Dùng API Key (Đơn giản - Khuyên dùng để test)

- Xem hướng dẫn chi tiết: [SETUP_GOOGLE_API_KEY.md](./SETUP_GOOGLE_API_KEY.md)
- Cần public Google Sheet
- Chỉ cần tạo API Key trên Google Cloud Console

#### Cách 2: Dùng Service Account (Bảo mật - Dùng cho production)

- Xem hướng dẫn chi tiết: [SETUP_GOOGLE_SHEETS.md](./SETUP_GOOGLE_SHEETS.md)
- Không cần public sheet
- Cần tạo Service Account và share sheet

### 3. Cấu hình .env.local

Mở file `.env.local` và điền thông tin:

**Nếu dùng API Key:**

```env
GOOGLE_SHEET_ID=1kJUL05j0WkOjJcseVP5K0dAl36G9JhDOMtP4N4jwgUI
GOOGLE_API_KEY=AIzaSy...your-api-key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dlkrs...
NEXT_PUBLIC_CLOUDINARY_API_KEY=Y7QD...
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=vendor_upload
```

**Nếu dùng Service Account:**

```env
GOOGLE_SHEET_ID=1kJUL05j0WkOjJcseVP5K0dAl36G9JhDOMtP4N4jwgUI
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dlkrs...
NEXT_PUBLIC_CLOUDINARY_API_KEY=Y7QD...
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=vendor_upload
```

### 4. Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## Cấu trúc Google Sheets

### Sheet "Vendors"

- vendor_id
- team
- contact_name
- phone
- email
- address
- note
- password

### Sheet "WebsiteData"

- id (nhập thủ công)
- vendor_id
- slug
- name
- team
- category
- price
- currency
- tags
- short_desc
- detail_desc
- media_json (JSON string với mediaMain, mediaSanXuat, mediaCachSuDung)
- status
- logo

## Sử dụng

1. **Đăng ký vendor mới**: Truy cập `/login` → chọn tab "Đăng ký" → điền form (bao gồm vendor_id)
2. **Đăng nhập**: Nhập email và password đã đăng ký
3. **Thêm sản phẩm**: Dashboard → "Thêm sản phẩm" → điền form (bao gồm ID sản phẩm) và upload media
4. **Upload Media**:
   - mediaMain: nhiều ảnh/video
   - mediaSanXuat: nhiều ảnh/video
   - mediaCachSuDung: CHỈ 1 ảnh HOẶC 1 video
5. **Xem trước sản phẩm**: Click "Xem trước" để mở preview URL
6. **Tạo QR Code**: Click "Tạo QR Code" → Download (SVG) hoặc In

## Preview URL

Sản phẩm có thể xem trước tại: `https://qr-product-site-vcoch27-vcoch27s-projects.vercel.app/product/{id}`

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Google Sheets (google-spreadsheet)
- **Media Storage**: Cloudinary (next-cloudinary)
- **QR Code**: qrcode.react
