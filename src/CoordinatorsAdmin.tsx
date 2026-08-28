import React, { useCallback, useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Coordinator } from "./emailNotificationTypes";
import {
  createCoordinator,
  deleteCoordinator,
  listCoordinators,
  updateCoordinator,
} from "./emailNotificationGraphql";

const CoordinatorsAdmin: React.FC = () => {
  const [items, setItems] = useState<Coordinator[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enabled, setEnabled] = useState(true);
  const graphqlClient = generateClient();

  const load = useCallback(async () => {
    try {
      const result: any = await graphqlClient.graphql({
        query: listCoordinators,
        variables: { limit: 500 },
        authMode: "userPool",
      });
      setItems(result.data?.listCoordinators?.items ?? []);
    } catch (err) {
      console.error("Error loading coordinators:", err);
    }
  }, [graphqlClient]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    try {
      await graphqlClient.graphql({
        query: createCoordinator,
        variables: {
          input: {
            name: name.trim(),
            email: email.trim(),
            enabled,
          },
        },
        authMode: "userPool",
      });
      setName("");
      setEmail("");
      setEnabled(true);
      await load();
    } catch (err) {
      console.error("Error creating coordinator:", err);
    }
  };

  const toggleEnabled = async (item: Coordinator) => {
    try {
      await graphqlClient.graphql({
        query: updateCoordinator,
        variables: {
          input: { id: item.id, enabled: !item.enabled },
        },
        authMode: "userPool",
      });
      await load();
    } catch (err) {
      console.error("Error updating coordinator:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await graphqlClient.graphql({
        query: deleteCoordinator,
        variables: { input: { id } },
        authMode: "userPool",
      });
      await load();
    } catch (err) {
      console.error("Error deleting coordinator:", err);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Coordinators (vetted-request email)
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Assign coordinators to teams below. When a request is vetted, emails go
        to coordinators linked to teams matching the request need types.
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
              primary={`${item.name} (${item.email})`}
              secondary={item.enabled ? "enabled" : "disabled"}
            />
            <Button size="small" onClick={() => toggleEnabled(item)}>
              {item.enabled ? "Disable" : "Enable"}
            </Button>
          </ListItem>
        ))}
      </List>
      <Box component="form" onSubmit={handleAdd} sx={{ mt: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="dense"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          Add coordinator
        </Button>
      </Box>
    </Box>
  );
};

export default CoordinatorsAdmin;
