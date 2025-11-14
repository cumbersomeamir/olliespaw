import { NextResponse } from 'next/server';
import { findUserByEmailOrMobile } from '@/models/User';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, mobileNumber, countryCode, password } = body;

    // Validate that either email or mobileNumber is provided
    if (!email && !mobileNumber) {
      return NextResponse.json(
        { error: 'Email or mobile number is required' },
        { status: 400 }
      );
    }

    // Validate password
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Find user by email or mobile number
    const user = await findUserByEmailOrMobile(
      email ? email.toLowerCase().trim() : null,
      mobileNumber || null
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password (In production, you should compare hashed passwords using bcrypt)
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        success: true, 
        message: 'Sign in successful',
        user: userWithoutPassword 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Signin error:', error);
    
    return NextResponse.json(
      { error: 'Failed to sign in. Please try again.' },
      { status: 500 }
    );
  }
}

