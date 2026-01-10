# Clothing Inventory System Specification

## Overview

This document captures the specifications for a new clothing inventory management system to support the clothing team's operations. The system will track clothing donations, manage inventory levels, enable donation requests when stock is low, and facilitate communication with team members about clothing needs.

## Background

The existing ServeReedley application supports team pages for groceries, household items, and hygiene items. These pages allow coordinators to:
- View open requests assigned to their team
- Select team members to contact about fulfilling requests
- Send SMS messages with request details
- Mark requests as sent or fulfilled

The clothing team requires similar functionality but with additional inventory management capabilities to track available clothing items and facilitate donation requests when stock is low.

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
- `minStockLevel` - Threshold for triggering low stock alerts
- `condition` - Condition of items (New, Good, Fair)
- `location` - Storage location (if applicable)
- `notes` - Additional notes
- `lastUpdated` - Timestamp of last inventory update
- `createdAt` - Timestamp of creation

### 2. Inventory Management Page

A new page for managing the clothing inventory.

**Features:**
- View all inventory items with filtering/sorting capabilities
- Add new inventory items (to accept donations)
- Edit existing inventory quantities (to correct inventory)
- Delete inventory items
- View low-stock alerts
- Select team members for donation requests
- Create and send donation request messages to team members

### 3. Donation Request Workflow

**Process Flow:**
1. Team leader identifies low inventory items (manually or via low-stock alerts)
2. Team leader selects which team members to contact
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

5. **Low Stock Thresholds**: Should minimum stock levels be:
   - Set per item?
   - Set per category?
   - A global default?

6. **Condition Tracking**: Is tracking item condition (New/Good/Fair) important for this use case?

### Workflow Questions

7. **Donation Tracking**: Should the system track who donated items and when?
   - This would require an additional "DonationRecord" model

8. **Request Matching**: When a clothing request comes in, should the system:
   - Automatically suggest matching inventory items?
   - Automatically decrement inventory when a request is fulfilled?

9. **Team Member Selection**: For donation requests, should team members be:
   - Selected from the existing Breeze integration (like other teams)?
   - A separate list of potential clothing donors?

10. **Message Templates**: Should donation request messages follow a standard template, or be free-form?

11. **Notification System**: Should there be automatic notifications when:
    - Inventory falls below minimum levels?
    - A new clothing request is submitted?

### UI/UX Questions

12. **Access Control**: Who should have access to the inventory management page?
    - Only clothing team coordinators?
    - All authenticated coordinators?

13. **Mobile Optimization**: Is the inventory management primarily used on:
    - Desktop computers?
    - Mobile devices?
    - Both equally?

14. **Reporting Needs**: Are there any reporting requirements, such as:
    - Monthly inventory reports?
    - Donation tracking reports?
    - Request fulfillment rates?

### Integration Questions

15. **Existing Clothing Requests**: How should existing clothing requests (with free-text type/size) integrate with the new inventory system?
    - Should coordinators manually match requests to inventory?
    - Should there be a migration of existing data?

16. **Team Page Behavior**: Should the clothing team page replace or augment the existing team page pattern used by other teams (groceries, household items, hygiene)?

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
