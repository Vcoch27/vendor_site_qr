'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    vendor_id: '',
    team: '',
    contact_name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const url = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin ? { email: formData.email, password: formData.password } : formData;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      if (isLogin) {
        // Lưu vendor info vào localStorage
        localStorage.setItem('vendor', JSON.stringify(data.vendor));
        router.push('/dashboard');
      } else {
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        setIsLogin(true);
      }
    } catch (err) {
      setError('Có lỗi xảy ra');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/20">
              <img
                src="https://res.cloudinary.com/dlkrskgwq/image/upload/v1758866751/storyqrlogo_hx85zz.png"
                alt="Story QR"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Story QR Vendor
            </span>
          </h1>
          <p className="text-blue-200/70">Quản lý sản phẩm của bạn</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20'
              }`}
            >
              Đăng ký
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-red-100 p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Vendor ID"
                  required
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:bg-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={formData.vendor_id}
                  onChange={(e) => setFormData({ ...formData, vendor_id: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Tên team"
                  required
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:bg-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={formData.team}
                  onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Tên liên hệ"
                  required
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:bg-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={formData.contact_name}
                  onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  required
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:bg-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:bg-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  required
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:bg-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Ghi chú"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:bg-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </>
            )}

            <input
              type="password"
              placeholder="Mật khẩu"
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:bg-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <a href="/" className="text-blue-300 hover:text-blue-200 text-sm transition-colors">
              ← Quay lại trang chủ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
