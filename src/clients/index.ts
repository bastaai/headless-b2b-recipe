import { BastaManagementClient, IBastaManagementClient } from "./basta";

export function getBastaManagementClient(): IBastaManagementClient {
  return new BastaManagementClient(
    process.env.BASTA_MANAGEMENT_API_URI || "",
    process.env.BASTA_MANAGEMENT_KEY || "",
    process.env.BASTA_ACCOUNT_ID || ""
  );
}
