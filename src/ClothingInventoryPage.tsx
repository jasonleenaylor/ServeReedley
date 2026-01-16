import React, { useState, useEffect, useCallback } from 'react';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  SelectChangeEvent,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Message as MessageIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { Authenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import {
  ClothingCategory,
  CLOTHING_CATEGORY_LABELS,
  getSizesForCategory,
  getAllCategories,
  getCategoryLabel,
} from './inventorySizes';

// GraphQL operations will be auto-generated after amplify push
// For now, we'll define them inline
const listClothingInventory = /* GraphQL */ `
  query ListClothingInventory(
    $filter: ModelClothingInventoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClothingInventories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category
        size
        quantity
        location
        notes
        lastUpdated
        createdAt
      }
      nextToken
    }
  }
`;

const createClothingInventory = /* GraphQL */ `
  mutation CreateClothingInventory($input: CreateClothingInventoryInput!) {
    createClothingInventory(input: $input) {
      id
      category
      size
      quantity
      location
      notes
      lastUpdated
      createdAt
    }
  }
`;

const updateClothingInventory = /* GraphQL */ `
  mutation UpdateClothingInventory($input: UpdateClothingInventoryInput!) {
    updateClothingInventory(input: $input) {
      id
      category
      size
      quantity
      location
      notes
      lastUpdated
      createdAt
    }
  }
`;

const deleteClothingInventory = /* GraphQL */ `
  mutation DeleteClothingInventory($input: DeleteClothingInventoryInput!) {
    deleteClothingInventory(input: $input) {
      id
    }
  }
`;

const listInventoryMessages = /* GraphQL */ `
  query ListInventoryMessages(
    $filter: ModelInventoryMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInventoryMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        authorId
        authorName
        resolved
        resolvedBy
        resolvedAt
        createdAt
      }
      nextToken
    }
  }
`;

const createInventoryMessage = /* GraphQL */ `
  mutation CreateInventoryMessage($input: CreateInventoryMessageInput!) {
    createInventoryMessage(input: $input) {
      id
      content
      authorId
      authorName
      resolved
      resolvedBy
      resolvedAt
      createdAt
    }
  }
`;

const updateInventoryMessage = /* GraphQL */ `
  mutation UpdateInventoryMessage($input: UpdateInventoryMessageInput!) {
    updateInventoryMessage(input: $input) {
      id
      content
      authorId
      authorName
      resolved
      resolvedBy
      resolvedAt
      createdAt
    }
  }
`;

// Types
interface InventoryItem {
  id: string;
  category: ClothingCategory;
  size: string;
  quantity: number;
  location?: string;
  notes?: string;
  lastUpdated?: string;
  createdAt?: string;
}

interface InventoryMessage {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt?: string;
}

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
  const client = generateClient();

  // State
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [messages, setMessages] = useState<InventoryMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [filterCategory, setFilterCategory] = useState<ClothingCategory | ''>('');
  
  // Dialog state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  
  // Form state
  const [formCategory, setFormCategory] = useState<ClothingCategory | ''>('');
  const [formSize, setFormSize] = useState('');
  const [formQuantity, setFormQuantity] = useState(0);
  const [formNotes, setFormNotes] = useState('');
  const [newMessage, setNewMessage] = useState('');
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState<{open: boolean; message: string; severity: 'success' | 'error'}>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Fetch data
  const fetchInventory = useCallback(async () => {
    try {
      const result = await client.graphql({
        query: listClothingInventory,
        variables: { limit: 1000 },
      }) as { data: { listClothingInventories: { items: InventoryItem[] } } };
      setInventory(result.data.listClothingInventories.items || []);
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
      }) as { data: { listInventoryMessages: { items: InventoryMessage[] } } };
      setMessages(result.data.listInventoryMessages.items || []);
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

  const handleFilterChange = (event: SelectChangeEvent<ClothingCategory | ''>) => {
    setFilterCategory(event.target.value as ClothingCategory | '');
  };

  const handleAddClick = () => {
    setFormCategory('');
    setFormSize('');
    setFormQuantity(0);
    setFormNotes('');
    setAddDialogOpen(true);
  };

  const handleEditClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setFormCategory(item.category);
    setFormSize(item.size);
    setFormQuantity(item.quantity);
    setFormNotes(item.notes || '');
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const handleAddSubmit = async () => {
    if (!formCategory || !formSize) return;
    
    try {
      await client.graphql({
        query: createClothingInventory,
        variables: {
          input: {
            category: formCategory,
            size: formSize,
            quantity: formQuantity,
            notes: formNotes || null,
            lastUpdated: new Date().toISOString(),
          },
        },
      });
      setAddDialogOpen(false);
      setSnackbar({ open: true, message: 'Item added successfully', severity: 'success' });
      fetchInventory();
    } catch (error) {
      console.error('Error adding item:', error);
      setSnackbar({ open: true, message: 'Error adding item', severity: 'error' });
    }
  };

  const handleEditSubmit = async () => {
    if (!selectedItem) return;
    
    try {
      await client.graphql({
        query: updateClothingInventory,
        variables: {
          input: {
            id: selectedItem.id,
            quantity: formQuantity,
            notes: formNotes || null,
            lastUpdated: new Date().toISOString(),
          },
        },
      });
      setEditDialogOpen(false);
      setSnackbar({ open: true, message: 'Item updated successfully', severity: 'success' });
      fetchInventory();
    } catch (error) {
      console.error('Error updating item:', error);
      setSnackbar({ open: true, message: 'Error updating item', severity: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItem) return;
    
    try {
      await client.graphql({
        query: deleteClothingInventory,
        variables: {
          input: { id: selectedItem.id },
        },
      });
      setDeleteDialogOpen(false);
      setSnackbar({ open: true, message: 'Item deleted successfully', severity: 'success' });
      fetchInventory();
    } catch (error) {
      console.error('Error deleting item:', error);
      setSnackbar({ open: true, message: 'Error deleting item', severity: 'error' });
    }
  };

  const handlePostMessage = async (authorName: string) => {
    if (!newMessage.trim()) return;
    
    try {
      await client.graphql({
        query: createInventoryMessage,
        variables: {
          input: {
            content: newMessage,
            authorId: 'current-user', // This should come from auth context
            authorName: authorName,
            resolved: false,
          },
        },
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
    try {
      await client.graphql({
        query: updateInventoryMessage,
        variables: {
          input: {
            id: message.id,
            resolved: true,
            resolvedBy: resolverName,
            resolvedAt: new Date().toISOString(),
          },
        },
      });
      setSnackbar({ open: true, message: 'Message resolved', severity: 'success' });
      fetchMessages();
    } catch (error) {
      console.error('Error resolving message:', error);
      setSnackbar({ open: true, message: 'Error resolving message', severity: 'error' });
    }
  };

  // Filter inventory by category
  const filteredInventory = filterCategory
    ? inventory.filter(item => item.category === filterCategory)
    : inventory;

  // Sort inventory by category then size
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.size.localeCompare(b.size);
  });

  // Separate active and resolved messages
  const activeMessages = messages.filter(m => !m.resolved);
  const resolvedMessages = messages.filter(m => m.resolved);

  // Render inventory item for mobile
  const renderMobileCard = (item: InventoryItem) => (
    <Card key={item.id} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          {getCategoryLabel(item.category)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {item.size}
        </Typography>
        <Typography variant="h6" color="primary">
          Qty: {item.quantity}
        </Typography>
        {item.notes && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            {item.notes}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <IconButton size="small" onClick={() => handleEditClick(item)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={() => handleDeleteClick(item)} color="error">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Filter by Category</InputLabel>
                <Select
                  value={filterCategory}
                  label="Filter by Category"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {getAllCategories().map(cat => (
                    <MenuItem key={cat} value={cat}>{getCategoryLabel(cat)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddClick}
              >
                Add Item
              </Button>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : sortedInventory.length === 0 ? (
              <Alert severity="info">No inventory items found. Add your first item!</Alert>
            ) : isMobile ? (
              // Mobile view - cards
              <Box>
                {sortedInventory.map(renderMobileCard)}
              </Box>
            ) : (
              // Desktop view - table
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell>Notes</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedInventory.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{getCategoryLabel(item.category)}</TableCell>
                        <TableCell>{item.size}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell>{item.notes || '-'}</TableCell>
                        <TableCell align="center">
                          <IconButton size="small" onClick={() => handleEditClick(item)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleDeleteClick(item)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
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

          {/* Add Item Dialog */}
          <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Add Inventory Item</DialogTitle>
            <DialogContent>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formCategory}
                  label="Category"
                  onChange={(e) => {
                    setFormCategory(e.target.value as ClothingCategory);
                    setFormSize('');
                  }}
                >
                  {getAllCategories().map(cat => (
                    <MenuItem key={cat} value={cat}>{getCategoryLabel(cat)}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Size</InputLabel>
                <Select
                  value={formSize}
                  label="Size"
                  onChange={(e) => setFormSize(e.target.value)}
                  disabled={!formCategory}
                >
                  {formCategory && getSizesForCategory(formCategory).map(size => (
                    <MenuItem key={size} value={size}>{size}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={formQuantity}
                onChange={(e) => setFormQuantity(parseInt(e.target.value) || 0)}
                sx={{ mt: 2 }}
                inputProps={{ min: 0 }}
              />

              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={2}
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                sx={{ mt: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
              <Button 
                onClick={handleAddSubmit} 
                variant="contained"
                disabled={!formCategory || !formSize}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>

          {/* Edit Item Dialog */}
          <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Inventory Item</DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Category:</strong> {selectedItem && getCategoryLabel(selectedItem.category)}
              </Typography>
              <Typography variant="body1">
                <strong>Size:</strong> {selectedItem?.size}
              </Typography>

              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={formQuantity}
                onChange={(e) => setFormQuantity(parseInt(e.target.value) || 0)}
                sx={{ mt: 2 }}
                inputProps={{ min: 0 }}
              />

              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={2}
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                sx={{ mt: 2 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEditSubmit} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
            <DialogTitle>Delete Item?</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this item?
              </Typography>
              {selectedItem && (
                <Typography sx={{ mt: 1 }}>
                  <strong>{getCategoryLabel(selectedItem.category)}</strong> - Size: {selectedItem.size}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

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
