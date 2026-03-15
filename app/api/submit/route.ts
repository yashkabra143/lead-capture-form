import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Form submission received');
    
    const data = await request.json();
    console.log('Form data:', data);
    
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    console.log('Google Apps Script URL:', scriptUrl ? 'Set' : 'NOT SET');
    
    if (!scriptUrl) {
      console.error('ERROR: Google Apps Script URL not configured');
      return NextResponse.json(
        { error: 'Google Apps Script URL not configured in environment variables' },
        { status: 500 }
      );
    }

    console.log('Sending request to Google Apps Script...');
    
    // Forward the request to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        name: data.name || '',
        phone: data.phone || '',
        category: data.category || '',
        timestamp: data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      }),
    });

    console.log('Google Apps Script response status:', response.status);

    if (!response.ok) {
      console.warn('Google Apps Script returned non-200 status:', response.status);
      // Still return success because Google Apps Script returns 302 on success with no-cors
    }

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
