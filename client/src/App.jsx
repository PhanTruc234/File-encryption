
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { RouterAccount } from "./route/RouterAccount/RouterAccount";
import { UserAuthStore } from "./store/userAuthStore";

const API = "http://localhost:4000";
// Chuyển ArrayBuffer → Base64
// function bufToBase64(buf) {
//   return btoa(String.fromCharCode(...new Uint8Array(buf)));
// }
// // Server trả salt + iv dạng Base64 => FE phải chuyển lại buffer để giải mã.
// function base64ToBuf(b64) {
//   const bin = atob(b64);
//   const arr = new Uint8Array(bin.length);
//   for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
//   return arr.buffer;
// }

// async function deriveKey(password, salt) {
//   const enc = new TextEncoder();
//   const keyMaterial = await crypto.subtle.importKey(
//     "raw",
//     enc.encode(password),
//     { name: "PBKDF2" },
//     false,
//     ["deriveKey"]
//   );

//   return crypto.subtle.deriveKey(
//     { name: "PBKDF2", salt, iterations: 200000, hash: "SHA-256" },
//     keyMaterial,
//     { name: "AES-GCM", length: 256 },
//     false,
//     ["encrypt", "decrypt"]
//   );
// }
// // mã hóa trước khi up
// async function encryptArrayBuffer(ab, password) {
//   const salt = crypto.getRandomValues(new Uint8Array(16));
//   const iv = crypto.getRandomValues(new Uint8Array(12));
//   const key = await deriveKey(password, salt.buffer);
//   const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, ab);
//   return { cipher, salt: salt.buffer, iv: iv.buffer };
// }

// async function decryptArrayBuffer(cipherBuffer, password, saltBuf, ivBuf) {
//   const key = await deriveKey(password, saltBuf);
//   return crypto.subtle.decrypt({ name: "AES-GCM", iv: ivBuf }, key, cipherBuffer);
// }

export default function App() {
  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  // const [isLogged, setIsLogged] = useState(false);
  // const [authMode, setAuthMode] = useState("login");
  // const [file, setFile] = useState(null);
  // const [password, setPassword] = useState("");
  // const [uploaded, setUploaded] = useState([]);
  // const inactivityRef = useRef(null);
  // const [locked, setLocked] = useState(false);

  // useEffect(() => {
  //   UserAuthStore.getState().initializeAuth();
  // }, []);

  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  // const [isLogged, setIsLogged] = useState(false);
  // const [authMode, setAuthMode] = useState("login");
  // const [file, setFile] = useState(null);
  // const [password, setPassword] = useState("");
  // const [uploaded, setUploaded] = useState([]);
  // const inactivityRef = useRef(null);
  // const [locked, setLocked] = useState(false);

  // useEffect(() => {
  //   resetInactivity();
  //   const act = () => resetInactivity();
  //   window.addEventListener("mousemove", act);
  //   window.addEventListener("keydown", act);
  //   return () => {
  //     window.removeEventListener("mousemove", act);
  //     window.removeEventListener("keydown", act);
  //     clearTimeout(inactivityRef.current);
  //   };
  // }, []);

  // function resetInactivity() {
  //   clearTimeout(inactivityRef.current);
  //   inactivityRef.current = setTimeout(() => setLocked(true), 60000);
  // }

  // function unlock() {
  //   setLocked(false);
  //   resetInactivity();
  // }

  // async function handleRegister() {
  //   if (!email.trim() || !pass.trim())
  //     return alert("Hãy nhập email và mật khẩu!");

  //   const res = await axios.post(
  //     `${API}/auth/register`,
  //     { email, password: pass },
  //     { withCredentials: true }
  //   );

  //   if (res.data.ok) {
  //     alert("Đăng ký thành công!");
  //     setAuthMode("login");
  //   } else alert(res.data.error);
  // }

  // async function handleLogin() {
  //   if (!email.trim() || !pass.trim())
  //     return alert("Hãy nhập email và mật khẩu!");

  //   const res = await axios.post(
  //     `${API}/auth/login`,
  //     { email, password: pass },
  //     { withCredentials: true }
  //   );

  //   if (res.data.ok) {
  //     setIsLogged(true);
  //     loadFiles();
  //   } else alert(res.data.error);
  // }

  // async function handleLogout() {
  //   await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
  //   setIsLogged(false);
  //   setUploaded([]);
  // }


  // function loadFiles() {
  //   axios
  //     .get(`${API}/files`, { withCredentials: true })
  //     .then((res) => setUploaded(res.data.files));
  // }

  // async function handleUpload(e) {
  //   e.preventDefault();
  //   if (!file || !password)
  //     return alert("Hãy chọn file và nhập mật khẩu mã hóa!");

  //   const ab = await file.arrayBuffer();
  //   const { cipher, salt, iv } = await encryptArrayBuffer(ab, password);

  //   const fd = new FormData();
  //   fd.append("file", new Blob([new Uint8Array(cipher)]), file.name + ".enc");
  //   fd.append("salt", bufToBase64(salt));
  //   fd.append("iv", bufToBase64(iv));
  //   fd.append("originalName", file.name);

  //   const res = await axios.post(`${API}/upload`, fd, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //     withCredentials: true,
  //   });

  //   if (res.data.ok) {
  //     loadFiles();
  //     alert("Upload thành công!");
  //   }
  // }

  // async function handleDownload(id) {
  //   const meta = await axios.get(`${API}/file/${id}/meta`, { withCredentials: true });
  //   const raw = await axios.get(`${API}/file/${id}/raw`, {
  //     withCredentials: true,
  //     responseType: "arraybuffer",
  //   });

  //   try {
  //     const plain = await decryptArrayBuffer(
  //       raw.data,
  //       password,
  //       base64ToBuf(meta.data.meta.salt),
  //       base64ToBuf(meta.data.meta.iv)
  //     );

  //     const a = document.createElement("a");
  //     a.href = URL.createObjectURL(new Blob([plain]));
  //     a.download = meta.data.meta.originalName;
  //     a.click();
  //   } catch {
  //     alert("Sai mật khẩu giải mã!");
  //   }
  // }

  // async function handleDelete(id) {
  //   if (!confirm("Bạn chắc chắn muốn xóa?")) return;
  //   await axios.delete(`${API}/file/${id}`, { withCredentials: true });
  //   loadFiles();
  // }


  // if (!isLogged && authMode === "login")
  return (
    //     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
    //       <h2 className="text-2xl font-bold mb-4 text-center">🔐 Đăng nhập</h2>

    //       <input
    //         className="border w-full px-3 py-2 rounded mb-3"
    //         placeholder="Email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />

    //       <input
    //         type="password"
    //         className="border w-full px-3 py-2 rounded mb-3"
    //         placeholder="Password"
    //         value={pass}
    //         onChange={(e) => setPass(e.target.value)}
    //       />

    //       <button
    //         onClick={handleLogin}
    //         className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded mb-2"
    //       >
    //         Đăng nhập
    //       </button>

    //       <button
    //         className="text-blue-600 w-full py-2"
    //         onClick={() => setAuthMode("register")}
    //       >
    //         Chưa có tài khoản? Đăng ký ngay →
    //       </button>
    //     </div>
    //   );


    // if (!isLogged && authMode === "register")
    //   return (
    //     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
    //       <h2 className="text-2xl font-bold mb-4 text-center">📝 Đăng ký tài khoản</h2>

    //       <input
    //         className="border w-full px-3 py-2 rounded mb-3"
    //         placeholder="Email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />

    //       <input
    //         type="password"
    //         className="border w-full px-3 py-2 rounded mb-3"
    //         placeholder="Mật khẩu"
    //         value={pass}
    //         onChange={(e) => setPass(e.target.value)}
    //       />

    //       <button
    //         onClick={handleRegister}
    //         className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded mb-2"
    //       >
    //         Tạo tài khoản
    //       </button>

    //       <button
    //         className="text-blue-600 w-full py-2"
    //         onClick={() => setAuthMode("login")}
    //       >
    //         ← Quay lại đăng nhập
    //       </button>
    //     </div>
    //   );


    // if (locked)
    //   return (
    //     <div className="text-center mt-40">
    //       <p className="text-xl text-red-500 mb-4">⛔ Ứng dụng bị khóa do không hoạt động</p>
    //       <button
    //         onClick={unlock}
    //         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    //       >
    //         Mở khóa
    //       </button>
    //     </div>
    //   );


    // return (
    //   <div className="max-w-2xl mx-auto py-10 px-4">
    //     <div className="flex justify-between mb-6">
    //       <h1 className="text-3xl font-bold">🔐 Két Sắt Kỹ Thuật Số</h1>

    //       <button
    //         onClick={handleLogout}
    //         className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
    //       >
    //         Đăng xuất
    //       </button>
    //     </div>

    //     {/* Upload Form */}
    //     <form className="bg-white p-4 rounded shadow mb-6" onSubmit={handleUpload}>
    //       <label className="font-medium">Chọn file:</label>
    //       <input
    //         type="file"
    //         className="block mt-1 mb-4"
    //         onChange={(e) => setFile(e.target.files?.[0])}
    //       />

    //       <label className="font-medium">Mật khẩu giải mã:</label>
    //       <input
    //         type="password"
    //         className="border w-full px-3 py-2 rounded mt-1 mb-4"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />

    //       <button
    //         type="submit"
    //         className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    //       >
    //         Mã hóa & Upload
    //       </button>
    //     </form>

    //     <h2 className="text-xl font-bold mb-3">📁 Danh sách file</h2>

    //     <div className="space-y-3">
    //       {uploaded.map((file) => (
    //         <div
    //           key={file._id}
    //           className="flex justify-between items-center bg-gray-100 p-3 rounded shadow"
    //         >
    //           <div>
    //             <p className="font-medium">{file.originalName}</p>
    //             <p className="text-sm text-gray-500">{file.createdAt.slice(0, 10)}</p>
    //           </div>

    //           <div className="flex gap-3">
    //             <button
    //               onClick={() => handleDownload(file._id)}
    //               className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
    //             >
    //               Tải
    //             </button>

    //             <button
    //               onClick={() => handleDelete(file._id)}
    //               className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    //             >
    //               Xóa
    //             </button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    <>
      <Routes>
        <Route path="/*" element={<RouterAccount />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
