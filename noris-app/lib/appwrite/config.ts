import { Account, Client } from "appwrite";

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
};

export const isAppwriteConfigured = Boolean(
  appwriteConfig.endpoint && appwriteConfig.projectId,
);

let client: Client | null = null;
let account: Account | null = null;

if (isAppwriteConfigured) {
  client = new Client()
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!);
  account = new Account(client);
}

export { client, account };
