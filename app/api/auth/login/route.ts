import { NextResponse } from 'next/server';
import { findVendorByEmail } from '@/lib/sheets';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email và mật khẩu là bắt buộc' }, { status: 400 });
    }

    console.log('[Login] Attempting login for:', email);
    const vendor = await findVendorByEmail(email);

    if (!vendor) {
      console.log('[Login] Vendor not found');
      return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
    }

    if (vendor.password !== password) {
      console.log('[Login] Password mismatch');
      return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
    }

    console.log('[Login] Success for:', email);

    return NextResponse.json({
      success: true,
      vendor: {
        vendor_id: vendor.vendor_id,
        team: vendor.team,
        contact_name: vendor.contact_name,
        email: vendor.email,
      },
    });
  } catch (error: any) {
    console.error('[Login] Error:', error?.message || error);
    return NextResponse.json(
      {
        error: 'Lỗi đăng nhập',
        details: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
