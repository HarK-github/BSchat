// hooks/useWalletAuth.ts
import { useEffect } from "react";
import { useSDK } from "@metamask/sdk-react";

export const useWalletAuth = () => {
  const { account, connected } = useSDK();

  useEffect(() => {
    if (connected && account) {
      // Send wallet address to your Node.js backend
      fetch("/api/auth/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: account }),
      })
        .then(res => res.json())
        .then(data => {
          // Store JWT token or session
          localStorage.setItem("authToken", data.token);
        });
    }
  }, [connected, account]);
};