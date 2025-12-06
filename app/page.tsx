import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-8 animate-fade-in">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20">
              <img
                src="https://res.cloudinary.com/dlkrskgwq/image/upload/v1758866751/storyqrlogo_hx85zz.png"
                alt="Story QR"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
          </div>

          {/* Hero Text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-slide-up px-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Story QR
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-3 sm:mb-4 animate-slide-up delay-100 px-4">
            Quản lý sản phẩm thông minh
          </p>

          <p className="text-base sm:text-lg text-blue-200/80 mb-8 sm:mb-12 max-w-2xl mx-auto animate-slide-up delay-200 px-4">
            Kết nối khách hàng với sản phẩm của bạn qua mã QR chuyên nghiệp. Dễ dàng quản lý, chia
            sẻ và theo dõi hiệu quả.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center animate-slide-up delay-300 px-4 w-full max-w-md mx-auto">
            <Link
              href="/login"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 text-center"
            >
              <span className="relative z-10">Đăng nhập / Đăng ký</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
            </Link>

            <a
              href="#features"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
            >
              Tìm hiểu thêm
            </a>
          </div>

          {/* Features */}
          <div
            id="features"
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-20 animate-fade-in delay-500 px-4"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-white mb-2">Quản lý dễ dàng</h3>
              <p className="text-blue-200/70">Thêm, sửa, xóa sản phẩm chỉ với vài cú click</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-white mb-2">Giao diện đẹp</h3>
              <p className="text-blue-200/70">
                Hiển thị sản phẩm chuyên nghiệp, thu hút khách hàng
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Nhanh chóng</h3>
              <p className="text-blue-200/70">Tạo QR code và chia sẻ ngay lập tức</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 text-center text-blue-200/50 text-xs sm:text-sm px-4">
        <p>© 2025 Story QR. Sản phẩm thông minh cho doanh nghiệp hiện đại.</p>
      </div>
    </div>
  );
}
