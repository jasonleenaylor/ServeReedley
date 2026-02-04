import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Message as MessageIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { Authenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import type {
  ClothingInventory,
  InventoryMessage,
  CreateInventoryMessageInput,
  UpdateInventoryMessageInput,
} from './API';
import {
  listClothingInventories,
  listInventoryMessages,
} from './graphql/queries';
import {
  createClothingInventory,
  updateClothingInventory,
  deleteClothingInventory,
  createInventoryMessage,
  updateInventoryMessage,
} from './graphql/mutations';
import {
  ClothingCategory,
  getSizesForCategory,
  getAllCategories,
  getCategoryLabel,
} from './inventorySizes';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`inventory-tabpanel-${index}`}
      aria-labelledby={`inventory-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const ClothingInventoryPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const client = useMemo(() => generateClient(), []);

  // State
  const [inventory, setInventory] = useState<ClothingInventory[]>([]);
  const [messages, setMessages] = useState<InventoryMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [categoryTabValue, setCategoryTabValue] = useState(0);

  // Dialog state
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  // Form state (for Post Message dialog)
  const [newMessage, setNewMessage] = useState('');

  // Quantity input: which cell is being edited and its current text value
  const [editingQuantity, setEditingQuantity] = useState<{
    category: ClothingCategory;
    size: string;
    value: string;
  } | null>(null);

  // Snackbar state
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Fetch data
  const fetchInventory = useCallback(async () => {
    try {
      const result = await client.graphql({
        query: listClothingInventories,
        variables: { limit: 1000 },
        authMode: 'userPool',
      });
      const items = result.data?.listClothingInventories?.items ?? [];
      setInventory(items.filter((x): x is ClothingInventory => x != null));
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setSnackbar({ open: true, message: 'Error loading inventory', severity: 'error' });
    }
  }, [client]);

  const fetchMessages = useCallback(async () => {
    try {
      const result = await client.graphql({
        query: listInventoryMessages,
        variables: { limit: 100 },
        authMode: 'userPool',
      });
      const items = result.data?.listInventoryMessages?.items ?? [];
      setMessages(items.filter((x): x is InventoryMessage => x != null));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [client]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchInventory(), fetchMessages()]);
      setLoading(false);
    };
    loadData();
  }, [fetchInventory, fetchMessages]);

  // Handlers
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCategoryTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCategoryTabValue(newValue);
  };

  const handleIncrement = async (category: ClothingCategory, size: string) => {
    const existing = inventory.find(
      (i) => i.category === category && i.size === size
    );
    try {
      if (existing) {
        await client.graphql({
          query: updateClothingInventory,
          variables: {
            input: {
              id: existing.id,
              quantity: existing.quantity + 1,
              lastUpdated: new Date().toISOString(),
            },
          },
          authMode: 'userPool',
        });
      } else {
        await client.graphql({
          query: createClothingInventory,
          variables: {
            input: {
              category,
              size,
              quantity: 1,
              lastUpdated: new Date().toISOString(),
            },
          },
          authMode: 'userPool',
        });
      }
      setSnackbar({ open: true, message: 'Quantity updated', severity: 'success' });
      fetchInventory();
    } catch (error) {
      console.error('Error updating quantity:', error);
      setSnackbar({ open: true, message: 'Error updating quantity', severity: 'error' });
    }
  };

  const handleDecrement = async (category: ClothingCategory, size: string) => {
    const existing = inventory.find(
      (i) => i.category === category && i.size === size
    );
    if (!existing || existing.quantity <= 0) return;
    try {
      if (existing.quantity === 1) {
        await client.graphql({
          query: deleteClothingInventory,
          variables: { input: { id: existing.id } },
          authMode: 'userPool',
        });
      } else {
        await client.graphql({
          query: updateClothingInventory,
          variables: {
            input: {
              id: existing.id,
              quantity: existing.quantity - 1,
              lastUpdated: new Date().toISOString(),
            },
          },
          authMode: 'userPool',
        });
      }
      setSnackbar({ open: true, message: 'Quantity updated', severity: 'success' });
      fetchInventory();
    } catch (error) {
      console.error('Error updating quantity:', error);
      setSnackbar({ open: true, message: 'Error updating quantity', severity: 'error' });
    }
  };

  const handleQuantityChange = async (
    category: ClothingCategory,
    size: string,
    newQuantity: number
  ) => {
    const existing = inventory.find(
      (i) => i.category === category && i.size === size
    );
    try {
      if (newQuantity <= 0) {
        if (existing) {
          await client.graphql({
            query: deleteClothingInventory,
            variables: { input: { id: existing.id } },
            authMode: 'userPool',
          });
        }
      } else if (existing) {
        await client.graphql({
          query: updateClothingInventory,
          variables: {
            input: {
              id: existing.id,
              quantity: newQuantity,
              lastUpdated: new Date().toISOString(),
            },
          },
          authMode: 'userPool',
        });
      } else {
        await client.graphql({
          query: createClothingInventory,
          variables: {
            input: {
              category,
              size,
              quantity: newQuantity,
              lastUpdated: new Date().toISOString(),
            },
          },
          authMode: 'userPool',
        });
      }
      setSnackbar({ open: true, message: 'Quantity updated', severity: 'success' });
      fetchInventory();
    } catch (error) {
      console.error('Error updating quantity:', error);
      setSnackbar({ open: true, message: 'Error updating quantity', severity: 'error' });
    }
  };

  const handlePostMessage = async (authorName: string) => {
    if (!newMessage.trim()) return;

    const input: CreateInventoryMessageInput = {
      content: newMessage.trim(),
      authorId: 'current-user',
      authorName,
      resolved: false,
    };
    try {
      await client.graphql({
        query: createInventoryMessage,
        variables: { input },
        authMode: 'userPool',
      });
      setNewMessage('');
      setMessageDialogOpen(false);
      setSnackbar({ open: true, message: 'Message posted', severity: 'success' });
      fetchMessages();
    } catch (error) {
      console.error('Error posting message:', error);
      setSnackbar({ open: true, message: 'Error posting message', severity: 'error' });
    }
  };

  const handleResolveMessage = async (message: InventoryMessage, resolverName: string) => {
    const input: UpdateInventoryMessageInput = {
      id: message.id,
      resolved: true,
      resolvedBy: resolverName,
      resolvedAt: new Date().toISOString(),
    };
    try {
      await client.graphql({
        query: updateInventoryMessage,
        variables: { input },
        authMode: 'userPool',
      });
      setSnackbar({ open: true, message: 'Message resolved', severity: 'success' });
      fetchMessages();
    } catch (error) {
      console.error('Error resolving message:', error);
      setSnackbar({ open: true, message: 'Error resolving message', severity: 'error' });
    }
  };

  // Category sub-tab: selected category and its rows (one per size)
  const categories = getAllCategories();
  const selectedCategory = categories[categoryTabValue] ?? categories[0];
  const categoryRows = getSizesForCategory(selectedCategory).map((size) => {
    const item = inventory.find(
      (i) => i.category === selectedCategory && i.size === size
    );
    return { size, item: item ?? null, quantity: item?.quantity ?? 0 };
  });

  // Separate active and resolved messages
  const activeMessages = messages.filter(m => !m.resolved);
  const resolvedMessages = messages.filter(m => m.resolved);

  // Render one category row for mobile (size, qty input, +/-, notes; no edit/delete)
  const renderMobileCategoryRow = (row: { size: string; item: ClothingInventory | null; quantity: number }) => {
    const isEditing =
      editingQuantity?.category === selectedCategory &&
      editingQuantity?.size === row.size;
    const displayValue = isEditing ? editingQuantity!.value : String(row.quantity);
    return (
      <Card key={row.size} sx={{ mb: 1 }}>
        <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="subtitle2">{row.size}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={() => handleDecrement(selectedCategory, row.size)}
                disabled={row.quantity <= 0}
                aria-label="Decrease quantity"
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <TextField
                type="number"
                size="small"
                value={displayValue}
                onChange={(e) => {
                  const v = e.target.value;
                  if (isEditing) {
                    setEditingQuantity((prev) =>
                      prev ? { ...prev, value: v } : null
                    );
                  } else {
                    setEditingQuantity({
                      category: selectedCategory,
                      size: row.size,
                      value: v,
                    });
                  }
                }}
                onFocus={() =>
                  setEditingQuantity({
                    category: selectedCategory,
                    size: row.size,
                    value: String(row.quantity),
                  })
                }
                onBlur={(e) => {
                  const input = e.target as HTMLInputElement;
                  const num = Math.max(
                    0,
                    parseInt(input.value, 10) || 0
                  );
                  setEditingQuantity(null);
                  if (num !== row.quantity) {
                    handleQuantityChange(selectedCategory, row.size, num);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                inputProps={{
                  min: 0,
                  'aria-label': `Quantity for size ${row.size}`,
                }}
                sx={{ width: 56 }}
              />
              <IconButton
                size="small"
                onClick={() => handleIncrement(selectedCategory, row.size)}
                aria-label="Increase quantity"
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          {row.item?.notes && (
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
              {row.item.notes}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Authenticator hideSignUp>
      {({ user }) => (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Clothing Inventory
          </Typography>

          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="Inventory" />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Messages
                  {activeMessages.length > 0 && (
                    <Chip label={activeMessages.length} size="small" color="primary" />
                  )}
                </Box>
              }
            />
          </Tabs>

          {/* Inventory Tab */}
          <TabPanel value={tabValue} index={0}>
            {isMobile ? (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  value={String(categoryTabValue)}
                  label="Category"
                  onChange={(e: SelectChangeEvent<string>) =>
                    setCategoryTabValue(Number(e.target.value))
                  }
                >
                  {categories.map((cat, idx) => (
                    <MenuItem key={cat} value={String(idx)}>
                      {getCategoryLabel(cat)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Tabs
                value={categoryTabValue}
                onChange={handleCategoryTabChange}
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
              >
                {categories.map((cat, idx) => (
                  <Tab key={cat} label={getCategoryLabel(cat)} id={`category-tab-${idx}`} />
                ))}
              </Tabs>
            )}

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : categoryRows.length === 0 ? (
              <Alert severity="info">No sizes defined for this category.</Alert>
            ) : isMobile ? (
              <Box>
                {categoryRows.map(renderMobileCategoryRow)}
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Size</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="center">Adjust</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categoryRows.map((row) => {
                      const isEditing =
                        editingQuantity?.category === selectedCategory &&
                        editingQuantity?.size === row.size;
                      const displayValue = isEditing
                        ? editingQuantity!.value
                        : String(row.quantity);
                      return (
                        <TableRow key={row.size}>
                          <TableCell>{row.size}</TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              size="small"
                              value={displayValue}
                              onChange={(e) => {
                                const v = e.target.value;
                                if (isEditing) {
                                  setEditingQuantity((prev) =>
                                    prev ? { ...prev, value: v } : null
                                  );
                                } else {
                                  setEditingQuantity({
                                    category: selectedCategory,
                                    size: row.size,
                                    value: v,
                                  });
                                }
                              }}
                              onFocus={() =>
                                setEditingQuantity({
                                  category: selectedCategory,
                                  size: row.size,
                                  value: String(row.quantity),
                                })
                              }
                              onBlur={(e) => {
                                const input = e.target as HTMLInputElement;
                                const num = Math.max(
                                  0,
                                  parseInt(input.value, 10) || 0
                                );
                                setEditingQuantity(null);
                                if (num !== row.quantity) {
                                  handleQuantityChange(
                                    selectedCategory,
                                    row.size,
                                    num
                                  );
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  (e.target as HTMLInputElement).blur();
                                }
                              }}
                              inputProps={{
                                min: 0,
                                'aria-label': `Quantity for size ${row.size}`,
                              }}
                              sx={{ width: 72 }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDecrement(selectedCategory, row.size)
                              }
                              disabled={row.quantity <= 0}
                              aria-label="Decrease quantity"
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleIncrement(selectedCategory, row.size)
                              }
                              aria-label="Increase quantity"
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          {/* Messages Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<MessageIcon />}
                onClick={() => setMessageDialogOpen(true)}
              >
                Post Message
              </Button>
            </Box>

            <Typography variant="h6" gutterBottom>
              Active Messages ({activeMessages.length})
            </Typography>
            {activeMessages.length === 0 ? (
              <Alert severity="info" sx={{ mb: 3 }}>No active messages</Alert>
            ) : (
              <Box sx={{ mb: 3 }}>
                {activeMessages.map(msg => (
                  <Card key={msg.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="body1">{msg.content}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Posted by {msg.authorName} on {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Unknown'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        startIcon={<CheckIcon />}
                        onClick={() => handleResolveMessage(msg, user?.signInDetails?.loginId || 'Unknown')}
                      >
                        Resolve
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            )}

            <Typography variant="h6" gutterBottom>
              Resolved Messages ({resolvedMessages.length})
            </Typography>
            {resolvedMessages.length === 0 ? (
              <Alert severity="info">No resolved messages</Alert>
            ) : (
              <Box>
                {resolvedMessages.map(msg => (
                  <Card key={msg.id} sx={{ mb: 2, opacity: 0.7 }}>
                    <CardContent>
                      <Typography variant="body1" sx={{ textDecoration: 'line-through' }}>
                        {msg.content}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Posted by {msg.authorName} • Resolved by {msg.resolvedBy} on{' '}
                        {msg.resolvedAt ? new Date(msg.resolvedAt).toLocaleDateString() : 'Unknown'}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </TabPanel>

          {/* Post Message Dialog */}
          <Dialog open={messageDialogOpen} onClose={() => setMessageDialogOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Post Message</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={3}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                sx={{ mt: 2 }}
                placeholder="Enter your message about inventory concerns..."
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setMessageDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => handlePostMessage(user?.signInDetails?.loginId || 'Unknown')}
                variant="contained"
                disabled={!newMessage.trim()}
              >
                Post
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar for notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      )}
    </Authenticator>
  );
};

export default ClothingInventoryPage;
