# Hướng dẫn lấy Google API Key (Cách đơn giản)

## Bước 1: Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Vào menu → "APIs & Services" → "Library"
4. Tìm "Google Sheets API" và click "Enable"

## Bước 2: Tạo API Key

1. Vào menu → "APIs & Services" → "Credentials"
2. Click "Create Credentials" → chọn "API Key"
3. API Key sẽ được tạo ra, copy nó
4. (Optional) Click vào API Key để đặt tên và restrict nó chỉ dùng cho Google Sheets API

## Bước 3: Public Google Sheet

**QUAN TRỌNG**: Sheet phải được share công khai để API Key có thể đọc được.

1. Mở Google Sheet: https://docs.google.com/spreadsheets/d/1kJUL05j0WkOjJcseVP5K0dAl36G9JhDOMtP4N4jwgUI/edit
2. Click nút "Share" ở góc trên bên phải
3. Click "Change to anyone with the link"
4. Chọn quyền "Viewer" (hoặc "Editor" nếu cần ghi dữ liệu)
5. Click "Done"

## Bước 4: Cập nhật .env.local

```env
GOOGLE_SHEET_ID=1kJUL05j0WkOjJcseVP5K0dAl36G9JhDOMtP4N4jwgUI
GOOGLE_API_KEY=AIzaSy...your-api-key-here
```

**Lưu ý**:

- Cách này đơn giản nhưng sheet phải public
- Nếu muốn bảo mật hơn, dùng Service Account (xem SETUP_GOOGLE_SHEETS.md)

## Xong!

Restart server: `npm run dev`
