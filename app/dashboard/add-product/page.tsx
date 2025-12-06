'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';

interface Vendor {
  vendor_id: string;
  team: string;
}

interface MediaItem {
  images: string[];
  videos: string[];
  description: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    slug: '',
    name: '',
    category: '',
    price: '',
    currency: 'VND',
    tags: '',
    short_desc: '',
    detail_desc: '',
    status: 'active',
    logo: '',
  });

  const [mediaMain, setMediaMain] = useState<MediaItem>({
    images: [],
    videos: [],
    description: 'Ảnh chính + Video giới thiệu',
  });

  const [mediaSanXuat, setMediaSanXuat] = useState<MediaItem>({
    images: [],
    videos: [],
    description: 'Quy trình sản xuất (ảnh + video demo)',
  });

  const [mediaCachSuDung, setMediaCachSuDung] = useState<MediaItem>({
    images: [],
    videos: [],
    description: 'Hướng dẫn sử dụng (ảnh + video demo)',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const vendorData = localStorage.getItem('vendor');
    if (!vendorData) {
      router.push('/login');
      return;
    }
    setVendor(JSON.parse(vendorData));
  }, [router]);

  const handleUploadSuccess = (result: any, field: 'main' | 'sanxuat' | 'cachsudung' | 'logo') => {
    const url = result.info.secure_url;
    const resourceType = result.info.resource_type;

    if (field === 'logo') {
      setFormData((prev) => ({ ...prev, logo: url }));
      return;
    }

    if (field === 'main') {
      if (resourceType === 'image') {
        setMediaMain((prev) => ({ ...prev, images: [...prev.images, url] }));
      } else {
        setMediaMain((prev) => ({ ...prev, videos: [...prev.videos, url] }));
      }
    } else if (field === 'sanxuat') {
      if (resourceType === 'image') {
        setMediaSanXuat((prev) => ({ ...prev, images: [...prev.images, url] }));
      } else {
        setMediaSanXuat((prev) => ({ ...prev, videos: [...prev.videos, url] }));
      }
    } else if (field === 'cachsudung') {
      // Chỉ cho phép 1 ảnh HOẶC 1 video
      if (resourceType === 'image') {
        setMediaCachSuDung((prev) => ({ ...prev, images: [url], videos: [] }));
      } else {
        setMediaCachSuDung((prev) => ({ ...prev, videos: [url], images: [] }));
      }
    }
  };

  const removeMedia = (
    field: 'main' | 'sanxuat' | 'cachsudung',
    type: 'images' | 'videos',
    index: number
  ) => {
    if (field === 'main') {
      const newMedia = { ...mediaMain };
      newMedia[type].splice(index, 1);
      setMediaMain(newMedia);
    } else if (field === 'sanxuat') {
      const newMedia = { ...mediaSanXuat };
      newMedia[type].splice(index, 1);
      setMediaSanXuat(newMedia);
    } else if (field === 'cachsudung') {
      setMediaCachSuDung({ images: [], videos: [], description: mediaCachSuDung.description });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendor) return;

    setLoading(true);

    try {
      const media_json = JSON.stringify({
        mediaMain,
        mediaSanXuat,
        mediaCachSuDung,
      });

      const productData = {
        ...formData,
        vendor_id: vendor.vendor_id,
        team: vendor.team,
        media_json,
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        throw new Error('Thêm sản phẩm thất bại');
      }

      alert('Thêm sản phẩm thành công!');
      router.push('/dashboard');
    } catch (error) {
      alert('Có lỗi xảy ra: ' + error);
    } finally {
      setLoading(false);
    }
  };

  if (!vendor) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Thêm sản phẩm mới</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Quay lại
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">ID Sản phẩm *</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Slug *</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Tên sản phẩm *</label>
              <input
                type="text"
                required
                className="w-full p-3 border rounded"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Danh mục *</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">
                  Tags (cách nhau bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Giá *</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Đơn vị tiền tệ</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Mô tả ngắn *</label>
              <textarea
                required
                rows={3}
                className="w-full p-3 border rounded"
                value={formData.short_desc}
                onChange={(e) => setFormData({ ...formData, short_desc: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Mô tả chi tiết *</label>
              <textarea
                required
                rows={5}
                className="w-full p-3 border rounded"
                value={formData.detail_desc}
                onChange={(e) => setFormData({ ...formData, detail_desc: e.target.value })}
              />
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-bold mb-2">Logo</label>
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result) => handleUploadSuccess(result, 'logo')}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Upload Logo
                  </button>
                )}
              </CldUploadWidget>
              {formData.logo && (
                <div className="mt-2">
                  <img src={formData.logo} alt="Logo" className="w-32 h-32 object-cover rounded" />
                </div>
              )}
            </div>

            {/* Media Main */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-2">Media Chính (Ảnh + Video giới thiệu)</h3>
              <p className="text-sm text-gray-600 mb-4">
                Đã upload: {mediaMain.images.length} ảnh, {mediaMain.videos.length} video
              </p>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Mô tả Media Chính</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded"
                  value={mediaMain.description}
                  onChange={(e) => setMediaMain({ ...mediaMain, description: e.target.value })}
                  placeholder="VD: Ảnh chính + Video giới thiệu"
                />
              </div>
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result) => handleUploadSuccess(result, 'main')}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-4"
                  >
                    + Upload Ảnh/Video
                  </button>
                )}
              </CldUploadWidget>

              {/* Preview uploaded media */}
              {(mediaMain.images.length > 0 || mediaMain.videos.length > 0) && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 max-h-96 overflow-y-auto">
                  <p className="text-sm font-bold text-gray-700 mb-3">
                    Media đã upload ({mediaMain.images.length} ảnh, {mediaMain.videos.length}{' '}
                    video):
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {mediaMain.images.map((url, idx) => (
                      <div key={`img-${idx}`} className="relative">
                        <img
                          src={url}
                          alt=""
                          className="w-full h-32 object-cover rounded border-2 border-blue-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeMedia('main', 'images', idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-7 h-7 text-sm font-bold hover:bg-red-700"
                        >
                          X
                        </button>
                        <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Ảnh {idx + 1}
                        </span>
                      </div>
                    ))}
                    {mediaMain.videos.map((url, idx) => (
                      <div key={`vid-${idx}`} className="relative">
                        <video
                          src={url}
                          className="w-full h-32 object-cover rounded border-2 border-purple-300"
                          controls
                        />
                        <button
                          type="button"
                          onClick={() => removeMedia('main', 'videos', idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-7 h-7 text-sm font-bold hover:bg-red-700"
                        >
                          X
                        </button>
                        <span className="absolute bottom-1 left-1 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                          Video {idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Media San Xuat */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Media Quy trình sản xuất</h3>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Mô tả Quy trình sản xuất</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded"
                  value={mediaSanXuat.description}
                  onChange={(e) =>
                    setMediaSanXuat({ ...mediaSanXuat, description: e.target.value })
                  }
                  placeholder="VD: Quy trình sản xuất (ảnh + video demo)"
                />
              </div>

              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result) => handleUploadSuccess(result, 'sanxuat')}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Upload Ảnh/Video
                  </button>
                )}
              </CldUploadWidget>

              {/* Preview uploaded media */}
              {(mediaSanXuat.images.length > 0 || mediaSanXuat.videos.length > 0) && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 max-h-96 overflow-y-auto">
                  <p className="text-sm font-bold text-gray-700 mb-3">
                    Media đã upload ({mediaSanXuat.images.length} ảnh, {mediaSanXuat.videos.length}{' '}
                    video):
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {mediaSanXuat.images.map((url, idx) => (
                      <div key={`img-${idx}`} className="relative">
                        <img
                          src={url}
                          alt=""
                          className="w-full h-32 object-cover rounded border-2 border-blue-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeMedia('sanxuat', 'images', idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-7 h-7 text-sm font-bold hover:bg-red-700"
                        >
                          X
                        </button>
                        <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Ảnh {idx + 1}
                        </span>
                      </div>
                    ))}
                    {mediaSanXuat.videos.map((url, idx) => (
                      <div key={`vid-${idx}`} className="relative">
                        <video
                          src={url}
                          className="w-full h-32 object-cover rounded border-2 border-purple-300"
                          controls
                        />
                        <button
                          type="button"
                          onClick={() => removeMedia('sanxuat', 'videos', idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-7 h-7 text-sm font-bold hover:bg-red-700"
                        >
                          X
                        </button>
                        <span className="absolute bottom-1 left-1 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                          Video {idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Media Cach Su Dung - CHỈ 1 ẢNH HOẶC 1 VIDEO */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Hướng dẫn sử dụng (1 ảnh HOẶC 1 video)</h3>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Mô tả Hướng dẫn sử dụng</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded"
                  value={mediaCachSuDung.description}
                  onChange={(e) =>
                    setMediaCachSuDung({ ...mediaCachSuDung, description: e.target.value })
                  }
                  placeholder="VD: Hướng dẫn sử dụng (ảnh + video demo)"
                />
              </div>

              {mediaCachSuDung.images.length === 0 && mediaCachSuDung.videos.length === 0 && (
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                  onSuccess={(result) => handleUploadSuccess(result, 'cachsudung')}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-4"
                    >
                      + Upload Ảnh hoặc Video
                    </button>
                  )}
                </CldUploadWidget>
              )}

              {/* Preview uploaded media */}
              {(mediaCachSuDung.images.length > 0 || mediaCachSuDung.videos.length > 0) && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-sm font-bold text-gray-700 mb-3">Media đã upload:</p>
                  {mediaCachSuDung.images[0] && (
                    <div className="relative inline-block">
                      <img
                        src={mediaCachSuDung.images[0]}
                        alt=""
                        className="w-64 h-48 object-cover rounded border-2 border-blue-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeMedia('cachsudung', 'images', 0)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-7 h-7 text-sm font-bold hover:bg-red-700"
                      >
                        X
                      </button>
                      <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Ảnh
                      </span>
                    </div>
                  )}
                  {mediaCachSuDung.videos[0] && (
                    <div className="relative inline-block">
                      <video
                        src={mediaCachSuDung.videos[0]}
                        className="w-64 h-48 object-cover rounded border-2 border-purple-300"
                        controls
                      />
                      <button
                        type="button"
                        onClick={() => removeMedia('cachsudung', 'videos', 0)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-7 h-7 text-sm font-bold hover:bg-red-700"
                      >
                        X
                      </button>
                      <span className="absolute bottom-1 left-1 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                        Video
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="border-t pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Đang lưu...' : 'Lưu sản phẩm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
