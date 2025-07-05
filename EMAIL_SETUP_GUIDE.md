# EmailJS Setup Guide for Cubit Packaging

This guide will help you set up EmailJS to receive all form submissions from your website at `cubitpackaging@gmail.com`.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Connect Gmail Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail**
4. Click **Connect Account** and authorize with `cubitpackaging@gmail.com`
5. Give your service a name (e.g., "Cubit Gmail Service")
6. Note the **Service ID** (you'll need this later)

## Step 3: Create Email Templates

### Template 1: Quote Form Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Template ID: `template_quote_req`
4. Subject: `New Quote Request from {{from_name}}`
5. Content:
```
QUOTE REQUEST FROM WEBSITE
==========================

Contact Information:
- Name: {{from_name}}
- Email: {{from_email}}
- Company: {{company}}

Project Details:
- Packaging Type: {{packaging_type}}
- Quantity: {{quantity}}
- Message: {{message}}

Submission Details:
- Date: {{submission_date}}
- Time: {{submission_time}}

Reply to: {{reply_to}}

---
This email was sent from the Cubit Packaging website quote form.
```

### Template 2: Rush Order Template

1. Create another template
2. Template ID: `template_rush_order`
3. Subject: `🚀 URGENT: Rush Order Request from {{from_name}}`
4. Content:
```
🚀 RUSH ORDER REQUEST 🚀
========================

Contact Information:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Company: {{company}}

Packaging Specifications:
- Type: {{packaging_type}}
- Quantity: {{quantity}}
- Dimensions: {{dimensions}}
- Colors: {{colors}}
- Material: {{material}}
- Finish: {{finish_options}}

Timeline:
- Deadline: {{deadline}}
- Urgency Level: {{urgency_level}}

Project Details:
- Description: {{project_description}}
- Special Requirements: {{special_requirements}}
- Files Attached: {{files_count}}

Submission Details:
- Date: {{submission_date}}
- Time: {{submission_time}}

Reply to: {{reply_to}}

⚠️ This is a RUSH ORDER - Please prioritize this request!

---
This email was sent from the Cubit Packaging website rush order form.
```

## Step 4: Get Your Public Key

1. Go to **Account** in your EmailJS dashboard
2. Copy your **Public Key**

## Step 5: Update Configuration

Update the file `utils/emailConfig.js` with your actual credentials:

```javascript
export const EMAIL_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID_HERE',        // From Step 2
  publicKey: 'YOUR_PUBLIC_KEY_HERE',        // From Step 4
  
  templates: {
    quoteForm: 'template_quote_req',        // From Step 3
    rushOrder: 'template_rush_order'        // From Step 3
  },
  
  recipientEmail: 'cubitpackaging@gmail.com',
  
  settings: {
    replyTo: 'noreply@cubitpackaging.com',
    fromName: 'Cubit Packaging Website'
  }
}
```

## Step 6: Test the Setup

1. Start your development server: `npm run dev`
2. Go to your website and fill out the quote form
3. Check your `cubitpackaging@gmail.com` inbox for the email
4. Test the rush order form as well

## Step 7: Set Up Email Filters (Optional)

To organize incoming emails:

1. In Gmail, go to Settings > Filters and Blocked Addresses
2. Create filters for:
   - Subject contains "Quote Request" → Label: "Website Quotes"
   - Subject contains "URGENT: Rush Order" → Label: "Rush Orders", Mark as Important

## Troubleshooting

### Common Issues:

1. **Emails not arriving**: Check spam folder first
2. **Service ID error**: Make sure you're using the correct Service ID from EmailJS
3. **Template not found**: Verify template IDs match exactly
4. **Gmail authentication**: Re-authorize if needed

### Testing:

- Use the browser console to see EmailJS logs
- Check the EmailJS dashboard for sending statistics
- Test with a different email first to avoid spam issues

## Security Notes

- The public key is safe to use in frontend code
- Never expose your private key in client-side code
- EmailJS handles the secure sending process

## Monthly Limits

- Free tier: 200 emails/month
- If you need more, consider upgrading to a paid plan

---

Once setup is complete, all form submissions will be automatically sent to `cubitpackaging@gmail.com`! 