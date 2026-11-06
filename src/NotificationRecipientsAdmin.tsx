import React, { useCallback, useEffect, useMemo, useState } from "react";
import { generateClient } from "aws-amplify/api";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  NotificationListRole,
  NotificationRecipient,
} from "./emailNotificationTypes";
import {
  createNotificationRecipient,
  deleteNotificationRecipient,
  recipientsByRole,
  updateNotificationRecipient,
} from "./emailNotificationGraphql";

const role = NotificationListRole.NEW_REQUEST;

const NotificationRecipientsAdmin: React.FC = () => {
  const [items, setItems] = useState<NotificationRecipient[]>([]);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadedOnce, setLoadedOnce] = useState(false);
  const graphqlClient = useMemo(() => generateClient(), []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result: any = await graphqlClient.graphql({
        query: recipientsByRole,
        variables: { role, limit: 500 },
        authMode: "userPool",
      });
      setItems(result.data?.recipientsByRole?.items ?? []);
    } catch (err) {
      console.error("Error loading notification recipients:", err);
    } finally {
      setLoading(false);
      setLoadedOnce(true);
    }
  }, [graphqlClient]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await graphqlClient.graphql({
        query: createNotificationRecipient,
        variables: {
          input: {
            role,
            email: email.trim(),
            displayName: displayName.trim() || null,
            enabled,
          },
        },
        authMode: "userPool",
      });
      setEmail("");
      setDisplayName("");
      setEnabled(true);
      await load();
    } catch (err) {
      console.error("Error creating recipient:", err);
    }
  };

  const toggleEnabled = async (item: NotificationRecipient) => {
    try {
      await graphqlClient.graphql({
        query: updateNotificationRecipient,
        variables: {
          input: { id: item.id, enabled: !item.enabled },
        },
        authMode: "userPool",
      });
      await load();
    } catch (err) {
      console.error("Error updating recipient:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await graphqlClient.graphql({
        query: deleteNotificationRecipient,
        variables: { input: { id } },
        authMode: "userPool",
      });
      await load();
    } catch (err) {
      console.error("Error deleting recipient:", err);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Notification recipients
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Admins and vetters. Emailed when a new request is submitted and in the
        weekly reminder for requests still NEW after 7 days.
      </Typography>
      <List dense>
        {items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={item.email}
              secondary={
                (item.displayName ? `${item.displayName} · ` : "") +
                (item.enabled ? "enabled" : "disabled")
              }
            />
            <Button size="small" onClick={() => toggleEnabled(item)}>
              {item.enabled ? "Disable" : "Enable"}
            </Button>
          </ListItem>
        ))}
        {loadedOnce && !loading && items.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No recipients yet.
          </Typography>
        )}
      </List>
      <Box component="form" onSubmit={handleAdd} sx={{ mt: 2 }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="dense"
        />
        <TextField
          label="Display name (optional)"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
          }
          label="Enabled"
        />
        <Button type="submit" variant="contained" color="primary">
          Add recipient
        </Button>
      </Box>
    </Box>
  );
};

export default NotificationRecipientsAdmin;
