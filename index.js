import { ConfidentialClientApplication } from "@azure/msal-node";

class AzureLogin {
  constructor({ clientId, tenantId, clientSecret, redirectUri, scopes }) {
    this.clientId = clientId;
    this.tenantId = tenantId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.scopes = scopes;

    this.msalConfig = {
      auth: {
        clientId: this.clientId,
        authority: `https://login.microsoftonline.com/${this.tenantId}`,
        clientSecret: this.clientSecret,
      },
    };

    this.clientApp = new ConfidentialClientApplication(this.msalConfig);
  }

  async getAuthUrl() {
    return this.clientApp.getAuthCodeUrl({
      scopes: this.scopes,
      redirectUri: this.redirectUri,
    });
  }

  async getTokenByCode(authCode) {
    const result = await this.clientApp.acquireTokenByCode({
      code: authCode,
      scopes: this.scopes,
      redirectUri: this.redirectUri,
    });
    return result;
  }
}

export default AzureLogin;
