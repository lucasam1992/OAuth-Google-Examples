import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { googleAuth } from "../auth/googleAuth";

const googleClient = new OAuth2Client(
    googleAuth.clientId,
    googleAuth.clientSecret,
    googleAuth.redirectURL
)

// Obtem URL de autorização
export async function auth(req: Request, res: Response) {
    const authorizeUrl = googleClient.generateAuthUrl({
        access_type: "online",
        prompt: "consent",
        scope: ["https://www.googleapis.com/auth/userinfo.profile"],
    });
    
    return res.status(200).redirect(authorizeUrl);
}

export async function authCallback(req: Request, res: Response) {
    const { code } = req.query;
    
    if (!code) {
      return res.status(401).json({ message: "error" });
    }
  
    const accessToken = await googleClient.getToken(code.toString());
    const tokenInfo = await googleClient.getTokenInfo(
      accessToken.tokens.access_token ?? ""
    );
  
    googleClient.setCredentials(accessToken.tokens);
    const response = await googleClient.request({
      url: "https://www.googleapis.com/oauth2/v1/userinfo",
    });

    // console.log(accessToken);
  
    res.status(200).json(response);
  }