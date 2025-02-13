export const WELCOME_EMAIL = `
                        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
                        <div style="text-align: center;">
                            <img src="{{logo}}" alt="Heartly Logo" style="max-width: 150px; margin-bottom: 15px;">
                        </div>
                        <h2 style="color: #007bff; text-align: center;">Welcome, {{name}}!</h2>
                        <p style="font-size: 16px; text-align: center;">We're thrilled to have you at <strong>Heartly</strong>! Your account has been successfully created.</p>
                        
                        <div style="background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); text-align: center;">
                            <p style="font-size: 14px; margin: 10px 0;"><strong>Email:</strong> {{email}}</p>
                        </div>

                        <p style="text-align: center; font-size: 16px; margin-top: 20px;">Start exploring now and enjoy our services!</p>

                        <div style="text-align: center; margin-top: 20px;">
                            <a href="https://yourwebsite.com" style="display: inline-block; padding: 12px 24px; background: #007bff; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">Go to Heartly</a>
                        </div>

                        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;">

                        <p style="font-size: 12px; color: #777; text-align: center;">If you did not sign up for Heartly, please ignore this email.</p>
                    </div>
                `


export const LOGO_URL = `https://finexo.in/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ftb3xbyw3%2Fproduction%2Ff1ae2cc3f9fcdcb2fc581ec6960b60c656fb7a70-700x150.png%3Fw%3D700%26auto%3Dformat&w=640&q=75`


export const OTP_VERIFICATION_EMAIL = `
                    <div style="max-width: 600px; margin: 20px auto; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); text-align: center;">
                    <!-- OTP at the top -->
                    <p style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 10px;">Your OTP for email verification:</p>
                    <div style="background: #007bff; color: #ffffff; font-size: 24px; font-weight: bold; padding: 15px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
                        {{otp}}
                    </div>
                    <p style="font-size: 14px; color: #555; margin-bottom: 20px;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
                    
                    <!-- Branding -->
                    <div style="margin-bottom: 20px;">
                        <img src="{{logo}}" alt="Heartly Logo" style="max-width: 150px;">
                    </div>
                    <!-- Greeting & Message -->
                    <h2 style="color: #007bff; margin-bottom: 10px;">Welcome, {{name}} !</h2>
                    <p style="font-size: 16px; color: #333;">Thank you for signing up with <strong>Heartly</strong>! Please verify your email to continue.</p>
                    <!-- Email Info -->
                    <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; font-size: 14px; color: #333; margin: 20px auto; display: inline-block;">
                        <p style="margin: 5px 0;"><strong>Email:</strong> {{email}} </p>
                    </div>
                    <!-- CTA Button -->
                    <div style="margin-top: 20px;">
                        <a href="https://yourwebsite.com" style="display: inline-block; padding: 12px 24px; background: #007bff; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">Verify Now</a>
                    </div>
                    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;">
                    <p style="font-size: 12px; color: #777;">If you did not request this, please ignore this email.</p>
                </div>

            `


            export const PASSWORD_RESET_OTP_EMAIL = `
                    <div style="max-width: 600px; margin: 20px auto; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); text-align: center;">
                    <!-- OTP at the top -->
                    <p style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 10px;">Password Reset OTP:</p>
                    <div style="background: #007bff; color: #ffffff; font-size: 24px; font-weight: bold; padding: 15px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
                        {{otp}}
                    </div>
                    <p style="font-size: 14px; color: #555; margin-bottom: 20px;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
                    
                    <!-- Branding -->
                    <div style="margin-bottom: 20px;">
                        <img src="${"logo"}" alt="Heartly Logo" style="max-width: 150px;">
                    </div>
                    <!-- Greeting & Message -->
                    <h2 style="color: #007bff; margin-bottom: 10px;">Welcome, {{name}}!</h2>
                    <p style="font-size: 16px; color: #333;">Thank you for signing up with <strong>Heartly</strong>! Please verify your email to continue.</p>
                    <!-- Email Info -->
                    <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; font-size: 14px; color: #333; margin: 20px auto; display: inline-block;">
                        <p style="margin: 5px 0;"><strong>Email:</strong> {{email}}</p>
                    </div>
                    <!-- CTA Button -->
                    <div style="margin-top: 20px;">
                        <a href="https://yourwebsite.com" style="display: inline-block; padding: 12px 24px; background: #007bff; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">Verify Now</a>
                    </div>
                    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;">
                    <p style="font-size: 12px; color: #777;">If you did not request this, please ignore this email.</p>
                </div>

            `