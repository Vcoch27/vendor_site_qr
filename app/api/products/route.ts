import { NextResponse } from 'next/server';
import { getWebsiteData, addWebsiteData } from '@/lib/sheets';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get('vendor_id');

    const data = await getWebsiteData(vendorId || undefined);

    return NextResponse.json({ products: data });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json({ error: 'Lỗi lấy dữ liệu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await addWebsiteData(data);

    return NextResponse.json({
      success: true,
      message: 'Thêm sản phẩm thành công',
    });
  } catch (error) {
    console.error('Add product error:', error);
    return NextResponse.json({ error: 'Lỗi thêm sản phẩm' }, { status: 500 });
  }
}
