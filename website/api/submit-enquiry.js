import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS Headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle Options preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    email,
    phone,
    company,
    budget,
    timeline,
    message,
    fileData,
    fileName,
    fileSize
  } = req.body;

  if (!name || !email || !phone || !company || !message) {
    return res.status(400).json({ error: 'Name, email, phone, company, and message are required' });
  }

  const budgetLabels = {
    under_10k: 'Under ₹10,000',
    '10k_25k': '₹10,000 - ₹25,000',
    '25k_50k': '₹25,000 - ₹50,000',
    over_50k: '₹50,000+ (Custom SaaS / System)'
  };
  const budgetDisplay = budgetLabels[budget] || budget || 'Not specified';

  const timelineLabels = {
    urgent: 'Urgent (< 2 weeks)',
    '1month': '1 Month',
    '2_3months': '2-3 Months',
    flexible: 'Flexible / Long-term'
  };
  const timelineDisplay = timelineLabels[timeline] || timeline || 'Not specified';
  const companyDisplay = company || 'Not specified';

  // Fallback for missing local credentials during development
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('\n⚠️  [API DEV WARNING] SMTP Credentials (EMAIL_USER & EMAIL_PASS) are missing in environment variables.');
    console.log('📬 [API DEV] Logging Enquiry details:');
    console.log(`- From Name: ${name}`);
    console.log(`- From Email: ${email}`);
    console.log(`- From Phone: ${phone}`);
    console.log(`- Company: ${companyDisplay}`);
    console.log(`- Budget: ${budgetDisplay}`);
    console.log(`- Timeline: ${timelineDisplay}`);
    console.log(`- Message: ${message}`);
    if (fileData) {
      console.log(`- Attached File: ${fileName} (${(fileSize / 1024).toFixed(1)} KB)`);
    } else {
      console.log('- Attached File: None');
    }
    console.log('==================================================\n');

    return res.status(200).json({
      success: true,
      message: 'Enquiry received! (Dev mode fallback: email logged to console)'
    });
  }

  // Create SMTP Transporter with Gmail Service using environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailUser = process.env.EMAIL_USER;

  try {
    // 1. Email to Soham (Admin inquiry notification)
    const adminMailOptions = {
      from: `"${name}" <${emailUser}>`,
      to: emailUser,
      replyTo: email,
      subject: `🚀 New Project Inquiry: ${name}`,
      text: `Hello Soham,\n\nYou have received a new project inquiry from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${companyDisplay}\nBudget: ${budgetDisplay}\nTimeline: ${timelineDisplay}\nMessage: ${message}\n\nAttachment: ${fileName ? `${fileName} (${(fileSize / 1024).toFixed(1)} KB)` : 'None'}\n\nPlease respond to the client soon.`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 25px; color: #1e293b; background-color: #f8fafc; border-radius: 12px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; border-bottom: 3px solid #06b6d4;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 600;">🚀 New Project Inquiry</h2>
            <p style="margin: 5px 0 0; font-size: 13px; opacity: 0.8;">Soham Pawar Systems Registry Alert</p>
          </div>
          <div style="padding: 20px; background: #ffffff; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="font-size: 15px; margin-top: 0;">You have received a new inquiry from your portfolio website:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; width: 150px; color: #475569; border-bottom: 1px solid #f1f5f9;">Name:</td>
                <td style="padding: 10px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Email:</td>
                <td style="padding: 10px 0; color: #06b6d4; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Phone:</td>
                <td style="padding: 10px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Company:</td>
                <td style="padding: 10px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${companyDisplay}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Estimated Budget:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #10B981;">${budgetDisplay}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Project Timeline:</td>
                <td style="padding: 10px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${timelineDisplay}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Attachment:</td>
                <td style="padding: 10px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">
                  ${fileName ? `<span style="color: #3b82f6; font-family: monospace;">📁 ${fileName} (${(fileSize / 1024).toFixed(1)} KB)</span>` : '<span style="color: #94a3b8;">None</span>'}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; vertical-align: top; color: #475569; padding-top: 10px;">Message:</td>
                <td style="padding: 10px 0; color: #334155; white-space: pre-wrap; line-height: 1.5; padding-top: 10px;">${message}</td>
              </tr>
            </table>
            <div style="margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 15px;">
              This notification was dispatched automatically by your Vercel Serverless Email Engine.
            </div>
          </div>
        </div>
      `,
      attachments: fileData ? [
        {
          filename: fileName || 'project-brief.pdf',
          path: fileData
        }
      ] : []
    };

    // 2. Email to Client (Motivational, inspiring and professional thank you)
    const clientMailOptions = {
      from: `"Soham Pawar" <${emailUser}>`,
      to: email,
      subject: `✨ Project Inquiry Received - Soham Pawar`,
      text: `Hello ${name},\n\nThank you for reaching out and submitting your project details! I have successfully received your information.\n\n"The best way to predict the future is to invent it." — Alan Kay\n\nI am thrilled at the prospect of collaborating with you. As a systems developer and AI integration specialist, my goal is to translate your vision into a robust, high-performance reality. Whether it is building intelligent backend architectures, deploying secure AWS systems, or setting up n8n webhooks, we will engineer something state-of-the-art together.\n\nI will review your requirements and respond with a detailed technical roadmap within the next 24 hours. In the meantime, feel free to connect with me on LinkedIn at https://www.linkedin.com/in/sohampawar7030/.\n\nLet's build something remarkable!\n\nBest regards,\nSoham Pawar\nSystems Architect & Associate AI/ML Engineer\nPune, India`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; color: #1e293b; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px 30px; text-align: center; border-bottom: 3px solid #06b6d4;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px; font-weight: 600;">SOHAM PAWAR</h1>
            <span style="color: #06b6d4; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; display: block; margin-top: 5px;">Systems Architect &amp; Associate AI/ML Engineer</span>
          </div>
          
          <!-- Body Content -->
          <div style="padding: 30px 40px; line-height: 1.6;">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 600;">Hello ${name},</h2>
            <p style="font-size: 15px; color: #475569; margin-bottom: 20px;">
              Thank you for reaching out and submitting your project inquiry! I have successfully received your message and detailed parameters.
            </p>
            
            <!-- Motivational Quote Block -->
            <div style="background-color: #f8fafc; border-left: 4px solid #06b6d4; padding: 18px 20px; margin: 25px 0; border-radius: 0 8px 8px 0; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);">
              <p style="margin: 0; font-style: italic; color: #1e293b; font-size: 15px; line-height: 1.5;">
                "The best way to predict the future is to invent it."
              </p>
              <span style="display: block; text-align: right; font-size: 12px; color: #64748b; font-weight: bold; margin-top: 6px;">— Alan Kay</span>
            </div>
            
            <p style="font-size: 15px; color: #475569; margin-bottom: 20px;">
              I am genuinely excited about the possibility of working together. In today's digital environment, engineering scalable database models, automating manual bottlenecks with smart AI agents (n8n/LLMs), and designing secure cloud architectures are what turn standard web concepts into highly efficient business operations.
            </p>
            
            <p style="font-size: 15px; color: #475569; margin-bottom: 25px;">
              I will review your requirements personally and respond with a **technical roadmap draft** and a **baseline budget assessment** within the next <strong>24 hours</strong>.
            </p>
            
            <!-- Call to Action Link -->
            <div style="text-align: center; margin: 35px 0;">
              <a href="https://www.linkedin.com/in/sohampawar7030/" target="_blank" style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25); display: inline-block; transition: all 0.2s;">
                Connect With Me On LinkedIn
              </a>
            </div>
            
            <p style="font-size: 14px; color: #64748b; margin-top: 35px; border-top: 1px solid #f1f5f9; padding-top: 20px; font-style: italic; text-align: center;">
              "Let's build something remarkable."
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 25px 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            This is an automated confirmation of your enquiry submission.<br>
            Pune, Maharashtra, India • <a href="mailto:sohampawar1030@gmail.com" style="color: #06b6d4; text-decoration: none;">sohampawar1030@gmail.com</a>
          </div>
        </div>
      `,
    };

    // Send both emails in parallel to speed up API response time
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return res.status(200).json({ success: true, message: 'Enquiry emails sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to process inquiry and send emails.' });
  }
}
