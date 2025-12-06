import { NextRequest, NextResponse } from 'next/server';
import { getWebsiteData } from '@/lib/sheets';
import { getVendors } from '@/lib/sheets';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Get all products
    const products = await getWebsiteData();
    const product = products.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json({ error: 'Sản phẩm không tồn tại' }, { status: 404 });
    }

    // Get vendor info
    const vendors = await getVendors();
    const vendor = vendors.find((v) => v.vendor_id === product.vendor_id);

    return NextResponse.json({
      product,
      vendor: vendor || null,
    });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json({ error: 'Lỗi lấy thông tin sản phẩm' }, { status: 500 });
  }
}
