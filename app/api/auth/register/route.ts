import { NextResponse } from 'next/server';
import { addVendor, findVendorByEmail } from '@/lib/sheets';

export async function POST(request: Request) {
  try {
    const data = await request.json();

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
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Lỗi đăng ký' }, { status: 500 });
  }
}
