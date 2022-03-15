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
      householdItems {
        id
        shampoo
        bathSoap
        toothpaste
        toothbrush
        deodorant
        toiletPaper
        handSoap
        sanitaryPads
        tampons
        bleach
        lysolSpray
        lysolWipes
        dishsoap
        sponges
        pinesol
        createdAt
        updatedAt
      }
      needReason
      needTypes
      status
      note {
        items {
          id
          requestID
          dateCreated
          author
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      otherNeeds
      needFulfiller
      dateFulfilled
      followUp
      createdAt
      updatedAt
      owner
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
        householdItems {
          id
          shampoo
          bathSoap
          toothpaste
          toothbrush
          deodorant
          toiletPaper
          handSoap
          sanitaryPads
          tampons
          bleach
          lysolSpray
          lysolWipes
          dishsoap
          sponges
          pinesol
          createdAt
          updatedAt
        }
        needReason
        needTypes
        status
        note {
          items {
            id
            requestID
            dateCreated
            author
            content
            createdAt
            updatedAt
          }
          nextToken
        }
        otherNeeds
        needFulfiller
        dateFulfilled
        followUp
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getNoteType = /* GraphQL */ `
  query GetNoteType($id: ID!) {
    getNoteType(id: $id) {
      id
      requestID
      dateCreated
      author
      content
      createdAt
      updatedAt
    }
  }
`;
export const listNoteTypes = /* GraphQL */ `
  query ListNoteTypes(
    $filter: ModelNoteTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNoteTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        requestID
        dateCreated
        author
        content
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
export const getHouseholdItems = /* GraphQL */ `
  query GetHouseholdItems($id: ID!) {
    getHouseholdItems(id: $id) {
      id
      shampoo
      bathSoap
      toothpaste
      toothbrush
      deodorant
      toiletPaper
      handSoap
      sanitaryPads
      tampons
      bleach
      lysolSpray
      lysolWipes
      dishsoap
      sponges
      pinesol
      createdAt
      updatedAt
    }
  }
`;
export const listHouseholdItemss = /* GraphQL */ `
  query ListHouseholdItemss(
    $filter: ModelHouseholdItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHouseholdItemss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        shampoo
        bathSoap
        toothpaste
        toothbrush
        deodorant
        toiletPaper
        handSoap
        sanitaryPads
        tampons
        bleach
        lysolSpray
        lysolWipes
        dishsoap
        sponges
        pinesol
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
