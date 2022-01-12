/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRequest = /* GraphQL */ `
  query GetRequest($id: ID!) {
    getRequest(id: $id) {
      id
      dateOfRequest
      firstName
      lastName
      address
      city
      zipCode
      phone
      email
      spanishOnly
      preferredContactTime
      request
      leadSource
      leadOtherDetails
      selfOrOtherInfo {
        id
        forSelf
        usedOtherResources
        otherResources
        requestFor
        requestIsKnown
        createdAt
        updatedAt
      }
      foodRequest {
        id
        familyMembers
        children
        haveAllergies
        allergies
        groceries {
          id
          milk
          eggs
          bread
          butter
          tortillas
          rice
          beans
          cheese
          beef
          hotdogs
          lunchMeat
          fruit
          peanutButter
          jelly
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      movingRequest {
        id
        items
        haveTransportation
        steepDriveway
        stairs
        unpavedRoad
        other
        otherDetails
        liabilityAck
        createdAt
        updatedAt
      }
      resumeHelp
      coverLetterHelp
      carRepairDetails
      homeRepairType {
        id
        plumbing
        electrical
        painting
        yardwork
        other
        details
        createdAt
        updatedAt
      }
      clothingType
      clothingSize
      furnitureType
      housingHelp
      needReason
      needTypes
      status
      note
      otherNeeds
      needFulfiller
      dateFulfilled
      followUp
      createdAt
      updatedAt
    }
  }
`;
export const listRequests = /* GraphQL */ `
  query ListRequests(
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dateOfRequest
        firstName
        lastName
        address
        city
        zipCode
        phone
        email
        spanishOnly
        preferredContactTime
        request
        leadSource
        leadOtherDetails
        selfOrOtherInfo {
          id
          forSelf
          usedOtherResources
          otherResources
          requestFor
          requestIsKnown
          createdAt
          updatedAt
        }
        foodRequest {
          id
          familyMembers
          children
          haveAllergies
          allergies
          groceries {
            id
            milk
            eggs
            bread
            butter
            tortillas
            rice
            beans
            cheese
            beef
            hotdogs
            lunchMeat
            fruit
            peanutButter
            jelly
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        movingRequest {
          id
          items
          haveTransportation
          steepDriveway
          stairs
          unpavedRoad
          other
          otherDetails
          liabilityAck
          createdAt
          updatedAt
        }
        resumeHelp
        coverLetterHelp
        carRepairDetails
        homeRepairType {
          id
          plumbing
          electrical
          painting
          yardwork
          other
          details
          createdAt
          updatedAt
        }
        clothingType
        clothingSize
        furnitureType
        housingHelp
        needReason
        needTypes
        status
        note
        otherNeeds
        needFulfiller
        dateFulfilled
        followUp
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSelfOrOtherInfo = /* GraphQL */ `
  query GetSelfOrOtherInfo($id: ID!) {
    getSelfOrOtherInfo(id: $id) {
      id
      forSelf
      usedOtherResources
      otherResources
      requestFor
      requestIsKnown
      createdAt
      updatedAt
    }
  }
`;
export const listSelfOrOtherInfos = /* GraphQL */ `
  query ListSelfOrOtherInfos(
    $filter: ModelSelfOrOtherInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSelfOrOtherInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        forSelf
        usedOtherResources
        otherResources
        requestFor
        requestIsKnown
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFoodInfo = /* GraphQL */ `
  query GetFoodInfo($id: ID!) {
    getFoodInfo(id: $id) {
      id
      familyMembers
      children
      haveAllergies
      allergies
      groceries {
        id
        milk
        eggs
        bread
        butter
        tortillas
        rice
        beans
        cheese
        beef
        hotdogs
        lunchMeat
        fruit
        peanutButter
        jelly
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFoodInfos = /* GraphQL */ `
  query ListFoodInfos(
    $filter: ModelFoodInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoodInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        familyMembers
        children
        haveAllergies
        allergies
        groceries {
          id
          milk
          eggs
          bread
          butter
          tortillas
          rice
          beans
          cheese
          beef
          hotdogs
          lunchMeat
          fruit
          peanutButter
          jelly
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMovingInfo = /* GraphQL */ `
  query GetMovingInfo($id: ID!) {
    getMovingInfo(id: $id) {
      id
      items
      haveTransportation
      steepDriveway
      stairs
      unpavedRoad
      other
      otherDetails
      liabilityAck
      createdAt
      updatedAt
    }
  }
`;
export const listMovingInfos = /* GraphQL */ `
  query ListMovingInfos(
    $filter: ModelMovingInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovingInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        items
        haveTransportation
        steepDriveway
        stairs
        unpavedRoad
        other
        otherDetails
        liabilityAck
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGroceries = /* GraphQL */ `
  query GetGroceries($id: ID!) {
    getGroceries(id: $id) {
      id
      milk
      eggs
      bread
      butter
      tortillas
      rice
      beans
      cheese
      beef
      hotdogs
      lunchMeat
      fruit
      peanutButter
      jelly
      createdAt
      updatedAt
    }
  }
`;
export const listGroceriess = /* GraphQL */ `
  query ListGroceriess(
    $filter: ModelGroceriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroceriess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        milk
        eggs
        bread
        butter
        tortillas
        rice
        beans
        cheese
        beef
        hotdogs
        lunchMeat
        fruit
        peanutButter
        jelly
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHomeRepairType = /* GraphQL */ `
  query GetHomeRepairType($id: ID!) {
    getHomeRepairType(id: $id) {
      id
      plumbing
      electrical
      painting
      yardwork
      other
      details
      createdAt
      updatedAt
    }
  }
`;
export const listHomeRepairTypes = /* GraphQL */ `
  query ListHomeRepairTypes(
    $filter: ModelHomeRepairTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHomeRepairTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        plumbing
        electrical
        painting
        yardwork
        other
        details
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
