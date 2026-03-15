import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    
    if (!scriptUrl) {
      return NextResponse.json(
        { error: 'Google Apps Script URL not configured' },
        { status: 500 }
      );
    }

    // Forward the request to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        name: data.name,
        phone: data.phone,
        category: data.category,
        timestamp: data.timestamp,
      }),
    });

    return NextResponse.json(
      { status: 'success', message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form', details: String(error) },
      { status: 500 }
    );
  }
}
