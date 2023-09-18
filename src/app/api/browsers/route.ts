import { NextRequest, NextResponse } from 'next/server';

const browsers = [
  { id: 1, label: 'Firefox' },
  { id: 2, label: 'Google Chrome' },
  { id: 3, label: 'Microsoft Edge' },
  { id: 4, label: 'Safari' },
  { id: 5, label: 'Opera' },
];

export type BrowserType = (typeof browsers)[number];

export async function GET(req: Request) {
  try {
    const request = new NextRequest(req);
    const searchTerm = request.nextUrl.searchParams.get('s');
    if (!searchTerm)
      return NextResponse.json(
        { message: 'No browsers found' },
        { status: 404 }
      );
    const filteredBrowsers = browsers.filter((br) =>
      br.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredBrowsers.length === 0)
      return NextResponse.json(
        { message: 'No browsers found' },
        { status: 404 }
      );
    return NextResponse.json(filteredBrowsers);
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
