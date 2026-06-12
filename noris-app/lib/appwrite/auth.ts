import { ID, type Models } from "appwrite";
import { account, isAppwriteConfigured } from "./config";

export type AppwriteUser = Models.User<Models.Preferences>;

function requireAccount() {
  if (!account || !isAppwriteConfigured) {
    throw new Error(
      "Appwrite is not configured. Set NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID.",
    );
  }
  return account;
}

export async function getCurrentUser(): Promise<AppwriteUser | null> {
  if (!isAppwriteConfigured) {
    return null;
  }

  try {
    return await requireAccount().get();
  } catch {
    return null;
  }
}

export async function signUp(
  email: string,
  password: string,
  name: string,
): Promise<AppwriteUser> {
  const acc = requireAccount();
  await acc.create(ID.unique(), email, password, name);
  await acc.createEmailPasswordSession(email, password);
  return acc.get();
}

export async function signIn(
  email: string,
  password: string,
): Promise<AppwriteUser> {
  const acc = requireAccount();
  await acc.createEmailPasswordSession(email, password);
  return acc.get();
}

export async function signOut(): Promise<void> {
  await requireAccount().deleteSession("current");
}
