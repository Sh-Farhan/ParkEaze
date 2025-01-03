import { connect } from '@/dbConfig/dbConfig';
import mongoose from 'mongoose';
import { userSchema } from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs/dist/bcrypt';

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const {FullName, AadharCardNumber, PhoneNumber } = reqBody;

        console.log("req body is ", reqBody);

        const db = mongoose.connection.useDb('PayEaze-userdata');
        const User = db.model('users', userSchema); // Rebind schema to the specific database

        // Check if the user already exists
        const user = await User.findOne({ AadharCardNumber });
        if (user) {
            return NextResponse.json({ error: "User already exists!" }, { status: 400 });
        }

        const newUser = new User({
            FullName,
            AadharCardNumber,
            PhoneNumber,
        });

        // Save the user in the database
        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser,
        });
    } catch (error) {
        console.log('Error in user registration:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}