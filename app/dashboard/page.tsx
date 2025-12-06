'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

interface Vendor {
  vendor_id: string;
  team: string;
  contact_name: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  currency: string;
  short_desc: string;
  status: string;
  logo: string;
}

// Convert Google Drive link to direct image URL
function convertGoogleDriveUrl(url: string): string {
  if (!url) return '';

  // Nếu là link preview: /file/d/FILE_ID/preview -> thumbnail
  const previewMatch = url.match(/\/file\/d\/([^\/]+)\/preview/);
  if (previewMatch) {
    return `https://drive.google.com/thumbnail?id=${previewMatch[1]}&sz=w400`;
  }

  // Nếu là link view: /file/d/FILE_ID/view -> thumbnail
  const viewMatch = url.match(/\/file\/d\/([^\/]+)\/view/);
  if (viewMatch) {
    return `https://drive.google.com/thumbnail?id=${viewMatch[1]}&sz=w400`;
  }

  // Nếu đã là link thumbnail hoặc link khác, giữ nguyên
  return url;
}

export default function DashboardPage() {
  const router = useRouter();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [showQR, setShowQR] = useState<string | null>(null);

  useEffect(() => {
    // Kiểm tra đăng nhập
    const vendorData = localStorage.getItem('vendor');
    if (!vendorData) {
      router.push('/login');
      return;
    }

    const v = JSON.parse(vendorData);
    setVendor(v);

    // Load products
    loadProducts(v.vendor_id);
  }, [router]);

  const loadProducts = async (vendorId: string) => {
    try {
      const res = await fetch(`/api/products?vendor_id=${vendorId}`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Load products error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('vendor');
    router.push('/login');
  };

  const downloadQR = (productId: string) => {
    const canvas = document.getElementById(`qr-${productId}`) as HTMLCanvasElement;
    if (canvas) {
      const svg = canvas.querySelector('svg');
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `qr-product-${productId}.svg`;
        link.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  const printQR = (productId: string) => {
    const qrElement = document.getElementById(`qr-${productId}`);
    if (qrElement) {
      const printWindow = window.open('', '', 'width=600,height=600');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print QR Code</title></head><body>');
        printWindow.document.write(qrElement.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  if (!vendor) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-5 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-lg flex-shrink-0">
              <img
                src="https://res.cloudinary.com/dlkrskgwq/image/upload/v1758866751/storyqrlogo_hx85zz.png"
                alt="Story QR"
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate">
                Story QR
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                <span className="font-medium">👋 {vendor.contact_name}</span>
                <span className="hidden sm:inline text-gray-400 mx-2">•</span>
                <span className="hidden sm:inline text-blue-600">{vendor.team}</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Đăng xuất</span>
            <span className="sm:hidden">Thoát</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Danh sách sản phẩm</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Quản lý và chia sẻ sản phẩm của bạn
            </p>
          </div>
          <Link
            href="/dashboard/add-product"
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm sm:text-base font-bold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <span className="text-lg sm:text-xl">+</span>
            <span>Thêm sản phẩm</span>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 sm:p-12 text-center border border-blue-100">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">📦</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Chưa có sản phẩm nào
            </h3>
            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
              Hãy thêm sản phẩm đầu tiên của bạn!
            </p>
            <Link
              href="/dashboard/add-product"
              className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg transition-all"
            >
              + Thêm ngay
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-100 hover:border-blue-300"
              >
                {/* Product Image */}
                {product.logo && (
                  <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 h-48 sm:h-56">
                    <img
                      src={convertGoogleDriveUrl(product.logo)}
                      alt={product.name}
                      className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }}
                    />
                  </div>
                )}

                {/* Product Info */}
                <div className="p-4 sm:p-6">
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2 sm:mb-3">
                      {product.short_desc}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {product.price} {product.currency}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <a
                      href={`https://qr-product-site-vcoch27-vcoch27s-projects.vercel.app/product/${product.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                    >
                      👁️ Xem trước
                    </a>

                    <button
                      onClick={() => setShowQR(showQR === product.id ? null : product.id)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                    >
                      {showQR === product.id ? '🔽 Ẩn QR' : '📱 Tạo QR Code'}
                    </button>

                    {showQR === product.id && (
                      <div className="mt-3 sm:mt-4 p-3 sm:p-5 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl sm:rounded-2xl border border-blue-200">
                        <div
                          id={`qr-${product.id}`}
                          className="flex justify-center mb-3 sm:mb-4 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl shadow-inner"
                        >
                          <QRCodeSVG
                            value={`https://qr-product-site-vcoch27-vcoch27s-projects.vercel.app/product/${product.id}`}
                            size={window.innerWidth < 640 ? 160 : 200}
                            level="H"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => downloadQR(product.id)}
                            className="flex-1 px-2 sm:px-3 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:shadow-lg transition-all"
                          >
                            💾 Tải xuống
                          </button>
                          <button
                            onClick={() => printQR(product.id)}
                            className="flex-1 px-3 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                          >
                            🖨️ In QR
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
