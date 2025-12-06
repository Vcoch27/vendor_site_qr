'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import VendorInfo from '@/app/components/VendorInfo';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  currency: string;
  short_desc: string;
  detail_desc: string;
  tags: string;
  logo: string;
  media_json: string;
}

interface Vendor {
  team: string;
  contact_name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
}

interface MediaSection {
  images: string[];
  videos: string[];
  description: string;
}

interface MediaData {
  mediaMain?: MediaSection;
  mediaSanXuat?: MediaSection;
  mediaCachSuDung?: MediaSection;
}

// Convert Google Drive URL
function convertGoogleDriveUrl(url: string): string {
  if (!url) return '';
  const previewMatch = url.match(/\/file\/d\/([^\/]+)\/preview/);
  if (previewMatch) {
    return `https://drive.google.com/thumbnail?id=${previewMatch[1]}&sz=w800`;
  }
  const viewMatch = url.match(/\/file\/d\/([^\/]+)\/view/);
  if (viewMatch) {
    return `https://drive.google.com/thumbnail?id=${viewMatch[1]}&sz=w800`;
  }
  return url;
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [media, setMedia] = useState<MediaData>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'main' | 'sanxuat' | 'cachsudung'>('main');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${params.id}`);
        const data = await res.json();

        if (data.product) {
          setProduct(data.product);
          setVendor(data.vendor);

          // Parse media JSON
          if (data.product.media_json) {
            try {
              const mediaData = JSON.parse(data.product.media_json);
              setMedia(mediaData);
            } catch (e) {
              console.error('Parse media error:', e);
            }
          }
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4 sm:mb-6"></div>
            <img
              src="https://res.cloudinary.com/dlkrskgwq/image/upload/v1758866751/storyqrlogo_hx85zz.png"
              alt="Story QR"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
          </div>
          <p className="text-sm sm:text-base text-gray-600 font-medium">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-md w-full">
          <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">😞</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">404</h1>
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">Không tìm thấy sản phẩm</p>
          <a
            href="/"
            className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg transition-all"
          >
            Về trang chủ
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logo */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 mb-4 sm:mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="https://res.cloudinary.com/dlkrskgwq/image/upload/v1758866751/storyqrlogo_hx85zz.png"
                alt="Story QR"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Story QR
                </h1>
                <p className="text-xs text-gray-500">Sản phẩm thông minh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Hero Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden mb-4 sm:mb-6">
          {/* Product Header with Logo */}
          <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-5 sm:p-8 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex flex-col items-center">
              {product.logo && (
                <div className="mb-4 sm:mb-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
                  <img
                    src={convertGoogleDriveUrl(product.logo)}
                    alt={product.name}
                    className="w-28 h-28 sm:w-40 sm:h-40 object-contain"
                  />
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-center px-2">
                {product.name}
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
                  {product.category}
                </span>
                <span className="text-2xl sm:text-3xl font-bold">
                  {product.price} {product.currency}
                </span>
              </div>
              {product.tags && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center px-2">
                  {product.tags.split(',').map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm border border-white/20"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Content */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Short Description */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Mô tả sản phẩm
                </h3>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                {product.short_desc}
              </p>
            </div>

            {/* Detail Description */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Chi tiết</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {product.detail_desc}
              </p>
            </div>

            {/* Media Tabs */}
            {(media.mediaMain || media.mediaSanXuat || media.mediaCachSuDung) && (
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    Thư viện media
                  </h3>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide">
                  {media.mediaMain &&
                    (media.mediaMain.images.length > 0 || media.mediaMain.videos.length > 0) && (
                      <button
                        onClick={() => setActiveTab('main')}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all whitespace-nowrap ${
                          activeTab === 'main'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {media.mediaMain.description}
                      </button>
                    )}
                  {media.mediaSanXuat &&
                    (media.mediaSanXuat.images.length > 0 ||
                      media.mediaSanXuat.videos.length > 0) && (
                      <button
                        onClick={() => setActiveTab('sanxuat')}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all whitespace-nowrap ${
                          activeTab === 'sanxuat'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {media.mediaSanXuat.description}
                      </button>
                    )}
                  {media.mediaCachSuDung &&
                    (media.mediaCachSuDung.images.length > 0 ||
                      media.mediaCachSuDung.videos.length > 0) && (
                      <button
                        onClick={() => setActiveTab('cachsudung')}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all whitespace-nowrap ${
                          activeTab === 'cachsudung'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {media.mediaCachSuDung.description}
                      </button>
                    )}
                </div>

                {/* Tab Content */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  {activeTab === 'main' && media.mediaMain && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {media.mediaMain.images.map((url, idx) => (
                        <div
                          key={idx}
                          className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg"
                        >
                          <img
                            src={convertGoogleDriveUrl(url)}
                            alt=""
                            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ))}
                      {media.mediaMain.videos.map((url, idx) => (
                        <div key={idx} className="rounded-xl shadow-lg overflow-hidden">
                          <video src={url} controls className="w-full" />
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'sanxuat' && media.mediaSanXuat && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {media.mediaSanXuat.images.map((url, idx) => (
                        <div
                          key={idx}
                          className="group relative overflow-hidden rounded-xl shadow-lg"
                        >
                          <img
                            src={convertGoogleDriveUrl(url)}
                            alt=""
                            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ))}
                      {media.mediaSanXuat.videos.map((url, idx) => (
                        <div key={idx} className="rounded-xl shadow-lg overflow-hidden">
                          <video src={url} controls className="w-full" />
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'cachsudung' && media.mediaCachSuDung && (
                    <div className="flex justify-center">
                      <div className="max-w-2xl w-full">
                        {media.mediaCachSuDung.images[0] && (
                          <div className="group relative overflow-hidden rounded-xl shadow-lg">
                            <img
                              src={convertGoogleDriveUrl(media.mediaCachSuDung.images[0])}
                              alt=""
                              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        {media.mediaCachSuDung.videos[0] && (
                          <div className="rounded-xl shadow-lg overflow-hidden">
                            <video
                              src={media.mediaCachSuDung.videos[0]}
                              controls
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vendor Info Section */}
        {vendor && (
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-amber-600 to-orange-600 rounded-full"></div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Thông tin nhà cung cấp
              </h3>
            </div>
            <VendorInfo vendor={vendor} />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 py-4 sm:py-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl">
          <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
            <img
              src="https://res.cloudinary.com/dlkrskgwq/image/upload/v1758866751/storyqrlogo_hx85zz.png"
              alt="Story QR"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
            />
            <p className="text-xs sm:text-sm font-medium text-gray-700">
              Powered by <span className="font-bold text-blue-600">Story QR</span>
            </p>
          </div>
          <p className="text-xs text-gray-500">Sản phẩm thông minh - Kết nối bằng QR Code</p>
        </div>
      </div>
    </div>
  );
}
