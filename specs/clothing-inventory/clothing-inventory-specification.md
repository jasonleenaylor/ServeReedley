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

## Requirements

### 1. Clothing Inventory Model

Create a new data model to track clothing inventory items.

**Proposed Fields:**
- `id` - Unique identifier
- `category` - Type of clothing (e.g., shirts, pants, shoes, jackets, etc.)
- `size` - Size of the item
- `gender` - Target gender (Men, Women, Children, Unisex)
- `ageGroup` - Age group (Adult, Youth, Child, Infant)
- `quantity` - Number of items in stock
- `condition` - Condition of items (New, Good, Fair)
- `location` - Storage location (if applicable)
- `notes` - Additional notes
- `lastUpdated` - Timestamp of last inventory update
- `createdAt` - Timestamp of creation

> **Note:** Low stock alerts are not needed in the data model at this time. This will be a manual process managed by the clothing coordinator. Any future low stock highlighting can be implemented with constants in the frontend code.

### 2. Inventory Management Page

A new page for managing the clothing inventory.

**Features:**
- View all inventory items with filtering/sorting capabilities
- Add new inventory items (to accept donations)
- Edit existing inventory quantities (to correct inventory)
- Delete inventory items
- Select team members for donation requests (via Breeze integration)
- Create and send donation request messages to team members

**UX Requirements:**
- **Desktop Experience:** Focused on overall inventory management, bulk operations, and comprehensive views
- **Mobile Experience:** Optimized for on-site inventory updates (e.g., when receiving donations or checking stock)

### 3. Donation Request Workflow

**Process Flow:**
1. Team leader manually identifies low inventory items
2. Team leader selects which team members to contact (via Breeze integration)
3. System generates a message listing needed items and current inventory status
4. Team leader sends message to selected team members
5. When donations are received, team leader updates inventory

### 4. Clothing Team Page Enhancements

The clothing team page should:
- Show pending clothing requests from the community
- Display inventory availability for each request
- Generate messages for team members explaining:
  - What clothing items are needed (from the request)
  - Whether those items are in inventory and where
  - If not in inventory, indicate donation may be needed

---

## Decisions Made

The following decisions have been confirmed:

1. **Low Stock Alerts:** Not needed in the data model. Low stock identification will be a manual process managed by the clothing coordinator. Future low stock highlighting can be implemented with frontend constants.

2. **Team Member Selection:** Team members will be selected through the existing Breeze integration (same as other teams).

3. **UX Requirements:** The system must support both desktop and mobile use:
   - Desktop: Focused on overall inventory management
   - Mobile: Focused on on-site updating (receiving donations, checking stock)

4. **Reporting Needs:** No additional reporting requirements at this time.

5. **Clothing Request Format:** Clothing requests will continue to come in as free-form text. The people using the system will evaluate the text manually.

6. **Breeze Integration:** The clothing team Breeze category is already defined in `TeamPicker.tsx` with `option_id: "41"` and name `"Clothing Needs"`. No additional Breeze configuration is needed.

7. **Access Control:** All authenticated coordinators will have access to the clothing inventory management page.

---

## Clarifying Questions

The following questions need to be answered before implementation can proceed:

### Inventory Model Questions

1. **Clothing Categories**: What are the specific clothing categories that should be tracked?
   - Suggested: Shirts, Pants, Shorts, Dresses, Skirts, Jackets/Coats, Shoes, Socks, Underwear, Hats, Accessories
   - Are there others specific to this community's needs?

2. **Size Standards**: Should sizes follow a specific standard or be free-text?
   - For example: XS, S, M, L, XL, XXL for adults
   - Numeric sizes for children (2T, 3T, etc.)
   - Shoe sizes (Men's 7-14, Women's 5-11, etc.)

3. **Gender Categories**: What gender categories should be supported?
   - Men, Women, Boys, Girls, Unisex?
   - Or Adult Men, Adult Women, Youth Boys, Youth Girls, Infant?

4. **Inventory Location**: Is there a single storage location or multiple?
   - If multiple, should inventory be tracked per location?

5. **Condition Tracking**: Is tracking item condition (New/Good/Fair) important for this use case?

### Workflow Questions

6. **Donation Tracking**: Should the system track who donated items and when?
   - This would require an additional "DonationRecord" model

7. **Request Matching**: When a clothing request comes in, should the system:
   - Automatically suggest matching inventory items?
   - Automatically decrement inventory when a request is fulfilled?

8. **Message Templates**: Should donation request messages follow a standard template, or be free-form?

9. **Request Evaluation Responsibility**: Who should evaluate the free-form clothing request text and match it to inventory?
    - **Option A:** The coordinator when creating the team request
    - **Option B:** The team lead when sending it out to team members

### Integration Questions

10. **Team Page Behavior**: Should the clothing team page replace or augment the existing team page pattern used by other teams (groceries, household items, hygiene)?

---

## Next Steps

1. **Review and answer clarifying questions** - Before any code is written
2. **Create detailed implementation plan** - After questions are answered
3. **Design GraphQL schema updates** - For the ClothingInventory model
4. **Design UI mockups** - For the inventory management page
5. **Implementation** - Following the approved design

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
