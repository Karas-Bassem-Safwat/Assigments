export const otpEmailTemplate = (otp) => `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 30px;">
  <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 30px; text-align: center;">
    <h2 style="color: #333333; margin-bottom: 10px;">Verify your email</h2>
    <p style="color: #666666; font-size: 14px; margin-bottom: 25px;">
      Use the code below to verify your email address.
    </p>
    <div style="background-color: #f0f0f5; border-radius: 6px; padding: 15px; margin-bottom: 25px;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #222222;">
        ${otp}
      </span>
    </div>
    <p style="color: #999999; font-size: 13px;">
      This code expires in 5 minutes. If you didn't request this, you can ignore this email.
    </p>
  </div>
</div>
`;

export const resetPasswordEmailTemplate = (otp) => `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 30px;">
  <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 30px; text-align: center;">
    <h2 style="color: #333333; margin-bottom: 10px;">Reset your password</h2>
    <p style="color: #666666; font-size: 14px; margin-bottom: 25px;">
      Use the code below to reset your password.
    </p>
    <div style="background-color: #f0f0f5; border-radius: 6px; padding: 15px; margin-bottom: 25px;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #222222;">
        ${otp}
      </span>
    </div>
    <p style="color: #999999; font-size: 13px;">
      This code expires in 5 minutes. If you didn't request this, you can ignore this email.
    </p>
  </div>
</div>
`;

export const updateEmailTemplate = (otp) => `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 30px;">
  <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 30px; text-align: center;">
    <h2 style="color: #333333; margin-bottom: 10px;">Confirm your new email</h2>
    <p style="color: #666666; font-size: 14px; margin-bottom: 25px;">
      Use the code below to confirm your new email address.
    </p>
    <div style="background-color: #f0f0f5; border-radius: 6px; padding: 15px; margin-bottom: 25px;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #222222;">
        ${otp}
      </span>
    </div>
    <p style="color: #999999; font-size: 13px;">
      This code expires in 5 minutes. If you didn't request this, you can ignore this email.
    </p>
  </div>
</div>
`;
