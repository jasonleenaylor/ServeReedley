import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  createAppEmailSettings,
  DEFAULT_EMAIL_SETTINGS_ID,
  getAppEmailSettings,
  updateAppEmailSettings,
} from "./emailNotificationGraphql";

const EmailSettingsAdmin: React.FC = () => {
  const [fromAddress, setFromAddress] = useState("");
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const graphqlClient = generateClient();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result: any = await graphqlClient.graphql({
          query: getAppEmailSettings,
          variables: { id: DEFAULT_EMAIL_SETTINGS_ID },
          authMode: "userPool",
        });
        const settings = result.data?.getAppEmailSettings;
        if (settings?.fromAddress) {
          setFromAddress(settings.fromAddress);
          setExists(true);
        }
      } catch (err) {
        console.error("Error loading email settings:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [graphqlClient]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAddress.trim()) return;
    try {
      if (exists) {
        await graphqlClient.graphql({
          query: updateAppEmailSettings,
          variables: {
            input: {
              id: DEFAULT_EMAIL_SETTINGS_ID,
              fromAddress: fromAddress.trim(),
            },
          },
          authMode: "userPool",
        });
      } else {
        await graphqlClient.graphql({
          query: createAppEmailSettings,
          variables: {
            input: {
              id: DEFAULT_EMAIL_SETTINGS_ID,
              fromAddress: fromAddress.trim(),
            },
          },
          authMode: "userPool",
        });
        setExists(true);
      }
    } catch (err) {
      console.error("Error saving email settings:", err);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Email sender (SES)
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Verified SES identity used as the From address for system emails.
      </Typography>
      <Box component="form" onSubmit={handleSave}>
        <TextField
          label="From address"
          type="email"
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
          required
          fullWidth
          margin="dense"
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 1 }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EmailSettingsAdmin;
