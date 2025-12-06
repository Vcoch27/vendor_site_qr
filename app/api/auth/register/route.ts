import { NextResponse } from 'next/server';
import { addVendor, findVendorByEmail } from '@/lib/sheets';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.email || !data.password) {
      return NextResponse.json({ error: 'Email và mật khẩu là bắt buộc' }, { status: 400 });
    }

    console.log('[Register] Attempting registration for:', data.email);

    // Check if email already exists
    const existing = await findVendorByEmail(data.email);
    if (existing) {
      return NextResponse.json({ error: 'Email đã được đăng ký' }, { status: 400 });
    }

    await addVendor(data);

    return NextResponse.json({
      success: true,
      message: 'Đăng ký thành công',
    });
  } catch (error: any) {
    console.error('[Register] Error:', error?.message || error);
    return NextResponse.json(
      {
        error: 'Lỗi đăng ký',
        details: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
