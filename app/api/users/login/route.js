import { connect } from '@/dbConfig/dbConfig';
import { userSchema } from '@/models/userModel';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Connect to the database
connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { AadharCardNumber, PhoneNumber } = reqBody;

    console.log("Request body:", reqBody);

    // Switch the connection to the specific database
    const db = mongoose.connection.useDb('PayEaze-userdata');  // Use specific database
    const User = db.model('users', userSchema); // Bind the User model to this database

    // Query the user using the existing User model bound to the correct DB
    const user = await User.findOne({ AadharCardNumber });
    console.log("Queried Aadhar:", AadharCardNumber);
    console.log("User from database:", user);

    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }
    console.log("User exists, proceeding to password validation.");


    // Generate JWT token
    const tokenData = {
      id: user._id,
      Aadhar: user.AadharCardNumber,
      PhoneNumber: user.PhoneNumber,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

    console.log("Token generated:", token);

    // Create the response with a token
    const res = NextResponse.json({
      message: "Logged in Successfully",
      success: true,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
    });

    console.log("Response with token ready.");
    return res;
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}