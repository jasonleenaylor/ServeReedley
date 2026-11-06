import React, { useEffect, useMemo, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
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
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{
    severity: "success" | "error";
    message: string;
  } | null>(null);
  const graphqlClient = useMemo(() => generateClient(), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const result: any = await graphqlClient.graphql({
          query: getAppEmailSettings,
          variables: { id: DEFAULT_EMAIL_SETTINGS_ID },
          authMode: "userPool",
        });
        if (cancelled) return;
        const settings = result.data?.getAppEmailSettings;
        if (settings?.fromAddress) {
          setFromAddress(settings.fromAddress);
          setExists(true);
        }
      } catch (err) {
        console.error("Error loading email settings:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [graphqlClient]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAddress.trim()) return;
    setSaving(true);
    setStatus(null);
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
      setStatus({ severity: "success", message: "Saved." });
    } catch (err) {
      console.error("Error saving email settings:", err);
      setStatus({
        severity: "error",
        message: "Save failed. Check the browser console for details.",
      });
    } finally {
      setSaving(false);
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
          onChange={(e) => {
            setFromAddress(e.target.value);
            setStatus(null);
          }}
          required
          fullWidth
          margin="dense"
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || saving}
          sx={{ mt: 1 }}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
        {status && (
          <Alert severity={status.severity} sx={{ mt: 1 }}>
            {status.message}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default EmailSettingsAdmin;
