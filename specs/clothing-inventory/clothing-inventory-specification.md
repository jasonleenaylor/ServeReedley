# Clothing Inventory System Specification

## Overview

This document captures the specifications for a new clothing inventory management system to support the clothing team's operations. The system will track clothing donations, manage inventory levels, and facilitate communication with team members about clothing needs.

## Background

The existing ServeReedley application supports team pages for groceries, household items, and hygiene items. These pages allow coordinators to:
- View open requests assigned to their team
- Select team members to contact about fulfilling requests
- Send SMS messages with request details
- Mark requests as sent or fulfilled

The clothing team requires similar functionality but with additional inventory management capabilities to track available clothing items and facilitate donation requests.

## Current Clothing Request Flow

Currently, clothing requests in the system capture:
- `clothingType` (string) - Free-text description of clothing type needed
- `clothingSize` (string) - Free-text size information

The existing `NeedType.CLOTHING` enum value is already defined in the schema.

---

## Development Phases

### ✅ Phase 1 Ready for Implementation

All decisions required for Phase 1 have been resolved. See "Decisions Made" section below.

---

## Phase 1: Inventory Management Page

Phase 1 focuses on building the core inventory management functionality with a limited set of inventory items.

### Phase 1 Inventory Items

The following items and sizes will be supported in Phase 1:

#### Children's Socks
| Size |
|------|
| Newborn |
| 6-12m |
| 12-24m |
| 2T-3T |
| 4T-5T |

#### Children's Underwear
| Size |
|------|
| 4 |
| 6 |
| 8 |
| 10 |
| 12 |
| 14 |
| 16 |

#### Kids Shoes
| Size |
|------|
| 0 |
| 1 |
| 2 |
| 3 |
| 4 |
| 5 |
| 6 |
| 7 |
| 8 |
| 9 |
| 10 |
| 10.5 |
| 11 |
| 11.5 |
| 12 |
| 12.5 |
| 13 |
| 13.5 |
| 1Y |
| 1.5Y |
| 2Y |
| 2.5Y |
| 3Y |
| 3.5Y |
| 4Y |
| 4.5Y |
| 5Y |
| 5.5Y |
| 6Y |
| 6.5Y |
| 7Y |

#### Diapers
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

### Phase 1 Data Model

#### ClothingInventory Model

**Proposed Fields:**
- `id` - Unique identifier
- `category` - Type of item: "Children's Socks", "Children's Underwear", "Kids Shoes", "Diapers"
- `size` - Size of the item (from predefined list per category)
- `quantity` - Number of items in stock
- `location` - Storage location (modeled for future multi-location support, but not exposed in Phase 1 UX)
- `notes` - Additional notes
- `lastUpdated` - Timestamp of last inventory update
- `createdAt` - Timestamp of creation

> **Note:** Low stock alerts are not needed in the data model at this time. This will be a manual process managed by the clothing coordinator. Any future low stock highlighting can be implemented with constants in the frontend code.

#### InventoryMessage Model (New)

A messaging system allowing inventory users to post and resolve messages about inventory concerns.

**Proposed Fields:**
- `id` - Unique identifier
- `content` - Message text
- `authorId` - User who posted the message
- `authorName` - Display name of author
- `resolved` - Boolean indicating if the message has been resolved
- `resolvedBy` - User who resolved the message (if resolved)
- `resolvedAt` - Timestamp when resolved
- `createdAt` - Timestamp of creation

#### Donor Model (New)

Track individuals who have donated clothing or goods, linked to Breeze personas.

**Proposed Fields:**
- `id` - Unique identifier
- `breezeId` - Link to Breeze persona (optional - for known donors)
- `name` - Donor name
- `notes` - Additional notes about the donor
- `lastDonation` - Timestamp of most recent donation
- `createdAt` - Timestamp of creation

### Phase 1 Features

**Inventory Management Page:**
- View all inventory items with filtering/sorting capabilities
- Add new inventory items (to accept donations)
- Edit existing inventory quantities (to correct inventory)
- Delete inventory items

**Messaging System:**
- Post messages about inventory concerns (e.g., "Running low on size 4 underwear")
- View all active (unresolved) messages
- Resolve messages when the concern has been addressed
- View message history (resolved messages)

**Donor Tracking:**
- Add new donors (optionally linked to Breeze persona)
- View list of donors
- Record when donations are received (updates `lastDonation` timestamp)

**UX Requirements:**
- **Desktop Experience:** Focused on overall inventory management, bulk operations, and comprehensive views
- **Mobile Experience:** Optimized for on-site inventory updates (e.g., when receiving donations or checking stock)
- **Location:** Not exposed in Phase 1 UX (modeled in data for future use)

---

## Phase 2: Team Page Integration (Future)

Phase 2 will add integration with the clothing team page and donation request workflow.

### Phase 2 Features

**Donation Request Workflow:**
1. Team leader manually identifies low inventory items
2. Team leader selects which team members to contact (via Breeze integration)
3. System generates a message listing needed items and current inventory status
4. Team leader sends message to selected team members
5. When donations are received, team leader updates inventory

**Clothing Team Page Enhancements:**
- Show pending clothing requests from the community
- Display inventory availability for each request
- Generate messages for team members explaining:
  - What clothing items are needed (from the request)
  - Whether those items are in inventory and where
  - If not in inventory, indicate donation may be needed

### Phase 2 Questions (to be resolved before Phase 2)

1. **Message Templates**: Should donation request messages follow a standard template, or be free-form?

2. **Request Evaluation Responsibility**: Who should evaluate the free-form clothing request text and match it to inventory?
   - **Option A:** The coordinator when creating the team request
   - **Option B:** The team lead when sending it out to team members

3. **Team Page Behavior**: Should the clothing team page replace or augment the existing team page pattern used by other teams (groceries, household items, hygiene)?

4. **Request Matching**: When a clothing request comes in, should the system:
   - Automatically suggest matching inventory items?
   - Automatically decrement inventory when a request is fulfilled?

---

## Decisions Made

The following decisions have been confirmed:

1. **Low Stock Alerts:** Not needed in the data model. Low stock identification will be a manual process managed by the clothing coordinator. Future low stock highlighting can be implemented with frontend constants.

2. **Team Member Selection:** Team members will be selected through the existing Breeze integration (same as other teams). *(Phase 2)*

3. **UX Requirements:** The system must support both desktop and mobile use:
   - Desktop: Focused on overall inventory management
   - Mobile: Focused on on-site updating (receiving donations, checking stock)

4. **Reporting Needs:** No additional reporting requirements at this time.

5. **Clothing Request Format:** Clothing requests will continue to come in as free-form text. The people using the system will evaluate the text manually. *(Phase 2)*

6. **Breeze Integration:** The clothing team Breeze category is already defined in `TeamPicker.tsx` with `option_id: "41"` and name `"Clothing Needs"`. No additional Breeze configuration is needed. *(Phase 2)*

7. **Access Control:** All authenticated coordinators will have access to the clothing inventory management page.

8. **Phase 1 Scope:** Initial implementation will focus only on inventory management with the following item categories:
   - Children's Socks (sizes: Newborn, 6-12m, 12-24m, 2T-3T, 4T-5T)
   - Children's Underwear (sizes: 4, 6, 8, 10, 12, 14, 16)
   - Kids Shoes (individual sizes: 0-10, 10.5-13.5, 1Y-7Y)
   - Diapers (individual sizes: Preemie, Newborn, #1-7)

9. **Inventory Location:** Model will support multiple locations for future use, but location will NOT be exposed in Phase 1 UX.

10. **Condition Tracking:** Not needed. Condition tracking is unnecessary for this use case.

11. **Donation Tracking:** Per-item donation tracking is unnecessary. Instead, a separate Donor model will track individuals who have donated (optionally linked to Breeze personas).

12. **Messaging System:** Phase 1 will include a messaging system where users can post and resolve messages about inventory concerns.

---

## Next Steps

### Phase 1 Implementation
1. ✅ **All decisions resolved** - Ready to begin implementation
2. **Design GraphQL schema** - For ClothingInventory, InventoryMessage, and Donor models
3. **Implement inventory management page** - CRUD operations for inventory items
4. **Implement messaging system** - Post/resolve messages
5. **Implement donor tracking** - Manage donors with optional Breeze linking
6. **Test and deploy Phase 1**

### Phase 2 Implementation (Future)
1. **Resolve Phase 2 questions** (see "Phase 2 Questions" above)
2. **Implement donation request workflow**
3. **Integrate with clothing team page**
4. **Test and deploy Phase 2**

---

## Appendix: Existing Related Code

### Current GraphQL Schema (relevant sections)

```graphql
enum NeedType {
  MEALS
  GROCERIES
  MOVING
  JOBTRAINING
  HOMEREPAIR
  CARREPAIR
  HOUSING
  HOUSEHOLDITEMS
  HYGENEITEMS
  CLOTHING  # Already exists
  FURNITURE
  OTHER
}

type Request {
  # ...
  clothingType: String
  clothingSize: String
  # ...
}
```

### Existing Team Page Pattern

The existing team pages (TeamPicker.tsx) follow this pattern:
1. Load team data and assigned requests
2. Fetch team members from Breeze integration
3. Display open requests in accordions
4. Allow selection of team members
5. Generate SMS messages with request details
6. Track which members were contacted (via TeamMember/AskedMembers models)
7. Mark requests as fulfilled

### Existing Inventory-Like Models

The HouseholdItems model provides a pattern for tracking specific items:
```graphql
type HouseholdItems {
  shampoo: Boolean
  bathSoap: Boolean
  toothpaste: Boolean
  # ... etc
}
```

However, clothing inventory requires quantity tracking rather than boolean flags.
