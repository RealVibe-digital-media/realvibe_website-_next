import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/portfolio/db';
import Contact from '@/models/Contact';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { name, mobile, message, service } = body;

        if (!name || !mobile || !message || !service) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // 1. Save to MongoDB
        await Contact.create({
            name,
            mobile,
            message,
            service
        });

        // 2. Send Email
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER, // Needs to be set in .env
                    pass: process.env.EMAIL_PASS, // Needs to be set in .env
                },
            });

            const mailOptions = {
                from: '"Portfolio Contact" <noreply@realvibe.in>',
                to: 'amul.sharma@realvibe.in',
                subject: `New Contact Inquiry: ${service} - ${name}`,
                text: `
New Inquiry Received:

Name: ${name}
Mobile: ${mobile}
Service: ${service}
Message:
${message}

Date: ${new Date().toLocaleString()}
                `,
                html: `
                    <h2>New Inquiry Received</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Mobile:</strong> ${mobile}</p>
                    <p><strong>Service:</strong> ${service}</p>
                    <p><strong>Message:</strong></p>
                    <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
                        ${message.replace(/\n/g, '<br>')}
                    </blockquote>
                    <p><small>Date: ${new Date().toLocaleString()}</small></p>
                `,
            };

            // Only attempt to send if credentials are present
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                await transporter.sendMail(mailOptions);
            } else {
                console.log('Email credentials missing, logging email content:', mailOptions);
            }

        } catch (emailError) {
            console.error('Failed to send email:', emailError);
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// Always run at request time (never executed during `next build`).
export const dynamic = 'force-dynamic';
