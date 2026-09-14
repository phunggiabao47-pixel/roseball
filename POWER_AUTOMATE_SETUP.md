# Rose FC VGF Registration — Power Automate → Excel

## 1. Upload Excel
Upload `ROSE_FC_VGF_REGISTRATION_2026.xlsx` to OneDrive or SharePoint.
The destination table is named `VGFRegistrationTable` on sheet `PLAYER_REGISTRATION`.

## 2. Create a Power Automate flow
Create an Automated/Instant cloud flow with trigger **When an HTTP request is received**.
Use a JSON schema matching this payload:

```json
{
  "registrationId": "RFC-VGF-2026-12345678",
  "fullName": "Phùng Gia Bảo",
  "birthDate": "2008-08-12",
  "primaryPosition": "CF",
  "secondaryPosition": "",
  "shirtNumber": "10",
  "phone": "...",
  "email": "...",
  "joinYear": "2025",
  "agreeVGF": true,
  "vgfTermsVersion": "TBD",
  "agreeFoundation": true,
  "foundationVersion": "1.0",
  "agreeForward": true,
  "forwardVersion": "1.0",
  "submittedAt": "2026-09-14T04:00:00.000Z",
  "status": "Pending",
  "adminNote": ""
}
```

## 3. Add action: Excel Online (Business) → Add a row into a table
Select the uploaded workbook, sheet/table `VGFRegistrationTable`, then map fields:
- Registration ID ← registrationId
- Họ và tên ← fullName
- Ngày sinh ← birthDate
- Vị trí chính ← primaryPosition
- Vị trí phụ ← secondaryPosition
- Số áo mong muốn ← shirtNumber
- Số điện thoại ← phone
- Email ← email
- Năm gia nhập Rose FC ← joinYear
- Đồng ý Điều lệ VGF ← agreeVGF
- VGF Terms Version ← vgfTermsVersion
- Đồng ý Roseball Foundation ← agreeFoundation
- Foundation Version ← foundationVersion
- Đồng ý Roseball Forward ← agreeForward
- Forward Version ← forwardVersion
- Submitted At ← submittedAt
- Trạng thái ← status
- Ghi chú BQL ← adminNote

## 4. Save flow and copy HTTP POST URL
Set that URL as Vercel environment variable `POWER_AUTOMATE_WEBHOOK_URL`.

## 5. Security
Set `ROSE_MEMBER_CODE` in Vercel to the internal member code chosen by Rose FC.
Set `ROSE_AUTH_SECRET` to a long random value (32+ characters).
Never place the real values in browser JavaScript or commit them to GitHub.
