'use client';

interface VendorInfoProps {
  vendor: {
    team: string;
    contact_name: string;
    phone: string;
    email: string;
    address: string;
    note?: string;
  };
}

export default function VendorInfo({ vendor }: VendorInfoProps) {
  return (
    <div className="w-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-300 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Header with Logo and Building Icon */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-xl p-2 shadow-md">
            <img
              src="https://res.cloudinary.com/dlkrskgwq/image/upload/v1758866751/storyqrlogo_hx85zz.png"
              alt="Story QR"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-900">Liên hệ nhà cung cấp</h3>
            <p className="text-xs text-amber-700">Đối tác tin cậy của Story QR</p>
          </div>
        </div>
        <svg
          className="w-8 h-8 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>

      {/* Content Grid */}
      <div className="space-y-4">
        {/* Team Name - Highlighted */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-amber-200">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            <span className="font-bold text-amber-900 text-lg">{vendor.team}</span>
          </div>
        </div>

        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Contact Name */}
          <div className="bg-white/40 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-semibold text-amber-800">Người liên hệ</span>
            </div>
            <span className="text-sm text-gray-800 font-medium">{vendor.contact_name}</span>
          </div>

          {/* Phone */}
          <div className="bg-white/40 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-xs font-semibold text-amber-800">Điện thoại</span>
            </div>
            <a
              href={`tel:${vendor.phone}`}
              className="text-sm text-blue-600 hover:text-blue-800 font-semibold hover:underline"
            >
              {vendor.phone}
            </a>
          </div>

          {/* Email */}
          <div className="bg-white/40 rounded-lg p-3 md:col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-xs font-semibold text-amber-800">Email</span>
            </div>
            <a
              href={`mailto:${vendor.email}`}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline break-all"
            >
              {vendor.email}
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white/40 rounded-lg p-3">
          <div className="flex items-start gap-2 mb-1">
            <svg className="w-4 h-4 text-amber-700 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <span className="text-xs font-semibold text-amber-800 block mb-1">Địa chỉ</span>
              <span className="text-sm text-gray-800">{vendor.address}</span>
            </div>
          </div>
        </div>

        {/* Note */}
        {vendor.note && (
          <div className="pt-4 mt-2 border-t-2 border-amber-200">
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-amber-700 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <span className="text-xs font-semibold text-amber-800 block mb-1">Ghi chú</span>
                <span className="italic text-sm text-gray-600">{vendor.note}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
