import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log the message to server console for debugging
    console.log('Contact form submission received:', { name, email, message });

    // Try to send email via nodemailer
    let emailSent = false;

    if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
      try {
        // Create transporter using environment variables
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD, // Use app password for Gmail
          },
        });

        // Email content
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'poorav.software.dev@gmail.com',
          subject: `Portfolio Contact: Message from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p>Sent via portfolio contact form</p>
          `,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (emailError) {
        console.error('Failed to send email via nodemailer:', emailError);
        // Continue to respond with success even if email fails
      }
    }

    if (!emailSent) {
      // Email wasn't sent via nodemailer, but we still got the data
      console.log(`Email not sent via nodemailer (likely missing env vars), but message stored. Name: ${name}, Email: ${email}`);
    }

    return NextResponse.json(
      {
        message: 'Message received successfully!',
        emailSent
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing email request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}