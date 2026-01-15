# Clothing Inventory System - Phase 1 Implementation Plan

## Overview

This document outlines the implementation tasks for Phase 1 of the Clothing Inventory System. Each task includes checkboxes to track completion status.

---

## Phase 1 Tasks

### 1. Backend: GraphQL Schema & Data Models

- [ ] **1.1** Add `ClothingInventory` type to GraphQL schema
  - Fields: id, category, size, quantity, location, notes, lastUpdated, createdAt
  - Category enum: CHILDRENS_SOCKS, CHILDRENS_UNDERWEAR, KIDS_SHOES, DIAPERS
  
- [ ] **1.2** Add `InventoryMessage` type to GraphQL schema
  - Fields: id, content, authorId, authorName, resolved, resolvedBy, resolvedAt, createdAt

- [ ] **1.3** Enhance existing `TeamMember` type in GraphQL schema
  - Add new fields: lastDonation, donationNotes
  - No new model needed - reuses existing TeamMember with breezeId

- [ ] **1.4** Create GraphQL queries
  - `listClothingInventory` - List all inventory items (with filtering)
  - `getClothingInventory` - Get single inventory item
  - `listInventoryMessages` - List messages (filter by resolved status)
  - `listTeamMembers` (existing) - Filter by lastDonation to show donors

- [ ] **1.5** Create GraphQL mutations
  - `createClothingInventory` - Add new inventory item
  - `updateClothingInventory` - Update inventory item (quantity, notes, etc.)
  - `deleteClothingInventory` - Remove inventory item
  - `createInventoryMessage` - Post new message
  - `resolveInventoryMessage` - Mark message as resolved
  - `updateTeamMember` (existing) - Update donation info (lastDonation, donationNotes)

- [ ] **1.6** Run `amplify push` to deploy schema changes

- [ ] **1.7** Generate TypeScript types from updated schema

### 2. Frontend: Inventory Management Page

- [ ] **2.1** Create new route `/inventory` in App.tsx

- [ ] **2.2** Create `ClothingInventoryPage.tsx` component
  - Main container for inventory management

- [ ] **2.3** Implement inventory list view
  - Display all inventory items in a table/grid
  - Show category, size, quantity columns
  - Support filtering by category
  - Support sorting by category/size/quantity

- [ ] **2.4** Implement "Add Inventory Item" dialog
  - Category dropdown (Children's Socks, Children's Underwear, Kids Shoes, Diapers)
  - Size dropdown (dynamically populated based on category)
  - Quantity input
  - Notes textarea

- [ ] **2.5** Implement "Edit Inventory Item" dialog
  - Pre-populate fields with existing values
  - Allow editing quantity and notes

- [ ] **2.6** Implement "Delete Inventory Item" confirmation
  - Confirmation dialog before deletion

- [ ] **2.7** Add navigation link to inventory page
  - Add to main navigation menu (for authenticated coordinators)

### 3. Frontend: Predefined Size Data

- [ ] **3.1** Create `inventorySizes.ts` constants file with all predefined sizes:
  ```
  Children's Socks: Newborn, 6-12m, 12-24m, 2T-3T, 4T-5T (5 sizes)
  Children's Underwear: 4, 6, 8, 10, 12, 14, 16 (7 sizes)
  Kids Shoes: 0-10, 10.5-13.5, 1Y-7Y (31 sizes)
  Diapers: Preemie, Newborn, #1-#7 (9 sizes)
  ```

- [ ] **3.2** Implement category-to-sizes mapping function

### 4. Frontend: Messaging System

- [ ] **4.1** Create `InventoryMessages.tsx` component
  - Display list of active (unresolved) messages
  - Show author, date, content for each message

- [ ] **4.2** Implement "Post Message" functionality
  - Text input for message content
  - Submit button to create message

- [ ] **4.3** Implement "Resolve Message" functionality
  - Button to mark message as resolved
  - Show who resolved and when

- [ ] **4.4** Implement message history view
  - Toggle to show resolved messages
  - Different styling for resolved vs active

### 5. Frontend: Donation Tracking (via TeamMember)

- [ ] **5.1** Create `DonorList.tsx` component
  - Display list of team members who have donated (lastDonation is set)
  - Show name, last donation date, donation notes

- [ ] **5.2** Implement "Record Donation" functionality
  - Select team member from Breeze lookup
  - Update lastDonation timestamp
  - Add/update donationNotes

- [ ] **5.3** Implement Breeze persona lookup
  - Search Breeze for matching persona
  - Create TeamMember record if not exists, or update existing

### 6. UX: Desktop & Mobile Optimization

- [ ] **6.1** Implement responsive layout for inventory page
  - Desktop: Full table view with all columns
  - Mobile: Card-based view with essential info

- [ ] **6.2** Implement responsive layout for messaging section
  - Desktop: Side panel or dedicated section
  - Mobile: Collapsible section or separate tab

- [ ] **6.3** Implement responsive layout for donor list
  - Desktop: Table view of team members with donation history
  - Mobile: Compact list view

- [ ] **6.4** Test on various screen sizes
  - Desktop (1920px, 1366px)
  - Tablet (768px)
  - Mobile (375px, 414px)

### 7. Testing

- [ ] **7.1** Write unit tests for inventory size constants

- [ ] **7.2** Write component tests for inventory CRUD operations

- [ ] **7.3** Write component tests for messaging system

- [ ] **7.4** Write component tests for donation tracking (TeamMember enhancement)

- [ ] **7.5** Manual testing of full workflow
  - Add/edit/delete inventory items
  - Post/resolve messages
  - Record donations for team members

### 8. Deployment

- [ ] **8.1** Code review and merge to main branch

- [ ] **8.2** Deploy to staging environment

- [ ] **8.3** User acceptance testing

- [ ] **8.4** Deploy to production

---

## Size Reference

### Children's Socks (5 sizes)
| Size |
|------|
| Newborn |
| 6-12m |
| 12-24m |
| 2T-3T |
| 4T-5T |

### Children's Underwear (7 sizes)
| Size |
|------|
| 4 |
| 6 |
| 8 |
| 10 |
| 12 |
| 14 |
| 16 |

### Kids Shoes (31 sizes)
| Category | Sizes |
|----------|-------|
| Infant/Toddler | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 |
| Little Kids | 10.5, 11, 11.5, 12, 12.5, 13, 13.5 |
| Youth | 1Y, 1.5Y, 2Y, 2.5Y, 3Y, 3.5Y, 4Y, 4.5Y, 5Y, 5.5Y, 6Y, 6.5Y, 7Y |

### Diapers (9 sizes)
| Size |
|------|
| Preemie |
| Newborn |
| #1 |
| #2 |
| #3 |
| #4 |
| #5 |
| #6 |
| #7 |

---

## Notes

- Location field is modeled in the data but NOT exposed in Phase 1 UX
- Access control: All authenticated coordinators have access
- Phase 2 will add team page integration and donation request workflow
- **Donation tracking uses the existing TeamMember model (with breezeId) rather than a separate Donor model**
