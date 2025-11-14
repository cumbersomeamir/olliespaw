import { NextResponse } from 'next/server';
import { createUser } from '@/models/User';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, countryCode, mobileNumber, email, password } = body;

    // Validate required fields
    if (!firstName || !lastName || !mobileNumber || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Create user
    const result = await createUser({
      firstName,
      lastName,
      countryCode: countryCode || '+91',
      mobileNumber,
      email: email.toLowerCase().trim(),
      password, // In production, you should hash this password using bcrypt
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Account created successfully',
        userId: result.userId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.message === 'User already exists with this email or mobile number') {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}

