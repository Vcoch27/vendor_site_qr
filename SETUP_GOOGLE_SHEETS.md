# Hướng dẫn Setup Google Sheets API

## Bước 1: Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Vào menu → "APIs & Services" → "Library"
4. Tìm "Google Sheets API" và click "Enable"

## Bước 2: Tạo Service Account

1. Vào menu → "APIs & Services" → "Credentials"
2. Click "Create Credentials" → chọn "Service Account"
3. Điền thông tin:
   - Service account name: `vendor-site-service`
   - Service account ID: tự động generate
   - Click "Create and Continue"
4. Skip phần "Grant this service account access to project"
5. Click "Done"

## Bước 3: Tạo Key cho Service Account

1. Click vào Service Account vừa tạo
2. Chọn tab "Keys"
3. Click "Add Key" → "Create new key"
4. Chọn "JSON" → Click "Create"
5. File JSON sẽ được download về máy

## Bước 4: Lấy thông tin từ file JSON

Mở file JSON vừa download, sẽ có dạng:

```json
{
  "type": "service_account",
  "project_id": "your-project",
  "private_key_id": "xxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYour-Private-Key\n-----END PRIVATE KEY-----\n",
  "client_email": "vendor-site-service@your-project.iam.gserviceaccount.com",
  "client_id": "xxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

Copy 2 giá trị:

- `client_email` → dùng cho `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → dùng cho `GOOGLE_PRIVATE_KEY`

## Bước 5: Share Google Sheet

1. Mở Google Sheet: https://docs.google.com/spreadsheets/d/1kJUL05j0WkOjJcseVP5K0dAl36G9JhDOMtP4N4jwgUI/edit
2. Click nút "Share" ở góc trên bên phải
3. Paste `client_email` vào ô email (ví dụ: `vendor-site-service@your-project.iam.gserviceaccount.com`)
4. Chọn quyền "Editor"
5. Click "Send" (bỏ check "Notify people")

## Bước 6: Cập nhật .env.local

```env
GOOGLE_SHEET_ID=1kJUL05j0WkOjJcseVP5K0dAl36G9JhDOMtP4N4jwgUI
GOOGLE_SERVICE_ACCOUNT_EMAIL=vendor-site-service@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
```

**LƯU Ý**:

- `private_key` phải giữ nguyên format với `\n` trong chuỗi
- Phải wrap trong dấu ngoặc kép
- Phải có cả `-----BEGIN PRIVATE KEY-----` và `-----END PRIVATE KEY-----`

## Xong!

Chạy `npm run dev` và test thử đăng ký/đăng nhập.
