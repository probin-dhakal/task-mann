export const sendToken = (user, statusCode, message, res) =>{

    const token=  user.getJWTToken();
    const options = {
       expires: new Date(Date.now() + 7 * 24 * 60* 60* 1000),
       httpOnly: true,
       sameSite: "None",
       secure: true, 
    }
    res.status(statusCode).cookie("token", token, options).json({
       success: true,
       message: message,
       token,
       user,
    })
}