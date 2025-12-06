import { NextResponse } from 'next/server';
import { findVendorByEmail } from '@/lib/sheets';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const vendor = await findVendorByEmail(email);

    if (!vendor || vendor.password !== password) {
      return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      vendor: {
        vendor_id: vendor.vendor_id,
        team: vendor.team,
        contact_name: vendor.contact_name,
        email: vendor.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Lỗi đăng nhập' }, { status: 500 });
  }
}
