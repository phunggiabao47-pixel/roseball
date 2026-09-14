ROSE FC · VGF REGISTRATION — DÙNG CHO WEBSITE HIỆN TẠI
Website: https://roseballvnsite.vercel.app/

QUAN TRỌNG:
- KHÔNG upload file ZIP vào repo và chờ nó tự chạy.
- Giải nén ZIP, sau đó đưa các file/thư mục BÊN TRONG vào thư mục gốc repo đang deploy website.
- vgf-registration.html phải nằm NGANG HÀNG với index.html và road-to-vgf.html.

Cấu trúc sau khi chép:
/
  index.html
  road-to-vgf.html              <- thay bằng file trong bộ này
  vgf-registration.html         <- file mới
  styles.css                    <- giữ file hiện tại của website
  rose-fc-logo.png              <- giữ logo hiện tại của website
  api/
    vgf-auth.js
    vgf-register.js
  docs/
    roseball-foundation.pdf
    roseball-forward.pdf

Sau khi deploy, trang đăng ký phải mở tại:
https://roseballvnsite.vercel.app/vgf-registration.html

Trang Road to VGF sau khi thay file sẽ có nút:
ĐĂNG KÝ THAM GIA VGF →

MÃ ĐĂNG NHẬP
Mã thành viên mong muốn: Rose2526
Mã này KHÔNG viết trực tiếp vào HTML. Vào Vercel > Project > Settings > Environment Variables và tạo:
ROSE_MEMBER_CODE = Rose2526
ROSE_AUTH_SECRET = một chuỗi bí mật dài bất kỳ, ví dụ tự tạo 32+ ký tự
POWER_AUTOMATE_WEBHOOK_URL = URL webhook Power Automate dùng để ghi dữ liệu vào Excel

Sau khi thêm/sửa Environment Variables, Redeploy project.

EXCEL
File mẫu: ROSE_FC_VGF_REGISTRATION_2026.xlsx
Đặt file trong OneDrive/SharePoint để Power Automate có thể "Add a row into a table".
Table nhận dữ liệu: VGFRegistrationTable
Sheet: PLAYER_REGISTRATION

LƯU Ý PDF VGF
Bộ này chưa có PDF Điều lệ VGF chính thức. Trong vgf-registration.html, nút VGF được để trạng thái chưa có tài liệu.
Khi có PDF chính thức, đặt tại docs/vgf-regulations.pdf và bật link trong HTML.
