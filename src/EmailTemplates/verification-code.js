export const otpVerification = async (otp) => {
       const result = ` <style>@import url('https://fonts.googleapis.com/css?family=Roboto:300,400.500,600,700,800,900');
    </style><body width="100%"
    style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f5f6fa;box-sizing: border-box;font-family:'Roboto',sans-serif;">
    <center
        style="width: 100%;max-width:620px;margin:0 auto; background-color: rgba(243, 243, 243, 1);padding: 0 20px 20px 20px;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#EDF4FF">
            <tr>
                <td>
                    <table style="width:100%; background-color:#ffffff;">
                        <tbody>
                            <tr>
                                <td style="text-align:center;padding: 30px;">
                                    <h2 style="font-size: 28px; color: black; font-weight: 600; margin-bottom: 20px;">
                                    Verification Code
                                    </h2>
                                    <p style="font-size: 20px;color: #757F8E; font-weight: 400; margin-bottom: 0;">
                                    Enter the below code to verify your account.
                                    </p>
                                    <div style="width: 80%; margin:20px auto; height:auto;padding:15px; border-radius: 4px;
                             background-color: rgba(243, 243, 243, 1); border: 1px solid #B3BAC6">
                                        <p style="font-size: 18px;  color:#757F8E;">
                                        Tu código es:
                                        </p>
                                        <h4
                                            style="letter-spacing: 10px;font-weight: 700;margin:10px 0px; font-size: 32px; color:black;">
                                            ${otp}
                                        </h4>
                                    </div>
                                    <p style="font-size: 20px;color: #757F8E; font-weight: 400; margin-bottom: 8px;">
                                    If you didn't request this code we recommend<br> changing your details
                                    immediately.
                                    Thanks!
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>`;
   
    return result
}