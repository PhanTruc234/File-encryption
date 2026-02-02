# 🔐 File Encryption Application  
### Ứng dụng mã hóa tập tin với nhiều cơ chế bảo mật hiện đại

## 📌 Giới thiệu
Trong bối cảnh dữ liệu số ngày càng quan trọng, việc bảo vệ tập tin cá nhân và thông tin người dùng trước các nguy cơ như truy cập trái phép, rò rỉ dữ liệu hay tấn công mạng là yêu cầu cấp thiết.

Dự án này xây dựng **ứng dụng mã hóa tập tin phía client**, kết hợp nhiều cơ chế bảo mật hiện đại nhằm đảm bảo:
- Dữ liệu được bảo vệ ngay từ phía người dùng
- Server không thể đọc nội dung tập tin
- Xác thực người dùng an toàn và chặt chẽ

---

## 🎯 Mục tiêu hệ thống
- Mã hóa nội dung tập tin trước khi gửi lên server
- Server không nắm giữ khóa giải mã (Zero-Knowledge)
- Bảo vệ mật khẩu và OTP bằng thuật toán băm an toàn
- Xác thực người dùng bằng JWT theo chuẩn hiện đại
- Đáp ứng kiến thức và yêu cầu môn **An toàn & Bảo mật Thông tin**

---

## 🧱 Kiến trúc tổng thể
- Người dùng nhập mật khẩu
- **PBKDF2 (SHA-256)** sinh khóa AES từ mật khẩu
- **AES-256-GCM** mã hóa nội dung tập tin phía client
- Server chỉ lưu trữ **file đã mã hóa**
- Khóa giải mã **không được lưu trên server**

➡️ Hệ thống tuân theo mô hình **Client-side Encryption** và **Zero-Knowledge Server**

---

## 🔐 Các cơ chế bảo mật sử dụng

### 🔹 AES-256-GCM (Mã hóa tập tin)
- Mã hóa nội dung tập tin với khóa 256-bit
- GCM tích hợp xác thực dữ liệu (Authentication Tag)
- Đảm bảo tính **bí mật** và **toàn vẹn**
- Chống chỉnh sửa và giả mạo file

---

### 🔹 PBKDF2 (SHA-256)
- Sinh khóa AES từ mật khẩu người dùng
- Sử dụng salt ngẫu nhiên và số vòng lặp lớn
- Chống brute-force và dictionary attack
- Không dùng mật khẩu trực tiếp làm khóa mã hóa

---

### 🔹 bcrypt (Mật khẩu & OTP)
- Hash mật khẩu người dùng
- Hash mã OTP xác thực
- Có salt tự động
- Tốn thời gian tính toán, chống brute-force
- Chỉ hash, **không thể giải mã**

---

### 🔹 RSA cho JWT (RS256)
- RSA được sử dụng để **ký và xác thực JWT**
- Private key: ký JWT
- Public key: xác thực JWT
- Đảm bảo token không bị giả mạo
- Không sử dụng RSA để mã hóa dữ liệu

---

### 🔹 JWT (Xác thực phiên)
- Quản lý phiên đăng nhập
- Xác thực API request
- Không cần lưu session phía server
- Phù hợp với hệ thống web hiện đại

---

### 🔹 AES Response Encryption
- AES được dùng để **mã hóa dữ liệu phản hồi từ server**
- Server mã hóa thông tin user trước khi trả về client
- Client giải mã để sử dụng
- Mục đích: che dữ liệu nhạy cảm
- Không dùng cho trao đổi khóa và không thay thế HTTPS

---

## 🔄 Quy trình hoạt động

### 📌 Quy trình mã hóa file
1. Người dùng đăng nhập và nhận JWT (RS256)
2. Nhập mật khẩu
3. PBKDF2 sinh khóa AES
4. AES-256-GCM mã hóa tập tin
5. File đã mã hóa được gửi lên server

### 📌 Quy trình giải mã file
1. Người dùng xác thực JWT
2. Nhập mật khẩu
3. PBKDF2 sinh lại khóa AES
4. AES-256-GCM giải mã tập tin
5. Sai mật khẩu → giải mã thất bại

---

## ⭐ Ưu điểm của hệ thống
- Mã hóa đầu cuối (End-to-End Encryption)
- Server không thể đọc dữ liệu người dùng
- Mật khẩu và OTP được bảo vệ an toàn
- Áp dụng đúng chuẩn kiến thức ATBMTT
- Có tính thực tế và dễ mở rộng

---

## 🚀 Hướng phát triển
- Xác thực đa yếu tố (2FA)
- Quản lý khóa nâng cao
- Audit log và cảnh báo bảo mật
- Lưu trữ phân tán

---

## 👨‍🎓 Thông tin sinh viên
- **Lê Đức Duy** – 23010772  
- **Phan Minh Trúc** – 23010818  

Môn học: **An toàn & Bảo mật Thông tin**

---

## 📌 Ghi chú
Dự án mang tính học thuật, phục vụ nghiên cứu và học tập trong lĩnh vực An toàn Thông tin.
