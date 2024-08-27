/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../RequestAPI";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getRequest = /* GraphQL */ `query GetRequest($id: ID!) {
  getRequest(id: $id) {
    id
    createdAt
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
      forSelf
      usedOtherResources
      otherResources
      requestFor
      requestIsKnown
      phoneNumber
      id
      createdAt
      updatedAt
      __typename
    }
    foodRequest {
      familyMembers
      children
      deliveryTime
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
      id
      createdAt
      updatedAt
      __typename
    }
    movingRequest {
      items
      haveTransportation
      steepDriveway
      stairs
      unpavedRoad
      other
      otherDetails
      liabilityAck
      id
      createdAt
      updatedAt
      __typename
    }
    resumeHelp
    coverLetterHelp
    carRepairDetails
    homeRepairType {
      plumbing
      electrical
      painting
      yardwork
      other
      details
      id
      createdAt
      updatedAt
      __typename
    }
    clothingType
    clothingSize
    furnitureType
    housingHelp
    householdItems {
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
      conditioner
      paperTowels
      laundrySoap
      id
      createdAt
      updatedAt
      __typename
    }
    needReason
    needTypes
    fulfilledNeeds
    status
    note {
      items {
        id
        requestID
        dateCreated
        author
        content
        notable
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    otherNeeds
    needFulfiller
    dateFulfilled
    followUp
    updatedAt
    requestSelfOrOtherInfoId
    requestFoodRequestId
    requestMovingRequestId
    requestHomeRepairTypeId
    requestHouseholdItemsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRequestQueryVariables,
  APITypes.GetRequestQuery
>;
export const listRequests = /* GraphQL */ `query ListRequests(
  $filter: ModelRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
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
        forSelf
        usedOtherResources
        otherResources
        requestFor
        requestIsKnown
        phoneNumber
        id
        createdAt
        updatedAt
        __typename
      }
      foodRequest {
        familyMembers
        children
        deliveryTime
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
        id
        createdAt
        updatedAt
        __typename
      }
      movingRequest {
        items
        haveTransportation
        steepDriveway
        stairs
        unpavedRoad
        other
        otherDetails
        liabilityAck
        id
        createdAt
        updatedAt
        __typename
      }
      resumeHelp
      coverLetterHelp
      carRepairDetails
      homeRepairType {
        plumbing
        electrical
        painting
        yardwork
        other
        details
        id
        createdAt
        updatedAt
        __typename
      }
      clothingType
      clothingSize
      furnitureType
      housingHelp
      householdItems {
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
        conditioner
        paperTowels
        laundrySoap
        id
        createdAt
        updatedAt
        __typename
      }
      needReason
      needTypes
      fulfilledNeeds
      status
      note {
        items {
          id
          requestID
          dateCreated
          author
          content
          notable
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      otherNeeds
      needFulfiller
      dateFulfilled
      followUp
      updatedAt
      requestSelfOrOtherInfoId
      requestFoodRequestId
      requestMovingRequestId
      requestHomeRepairTypeId
      requestHouseholdItemsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRequestsQueryVariables,
  APITypes.ListRequestsQuery
>;
export const getNoteType = /* GraphQL */ `query GetNoteType($id: ID!) {
  getNoteType(id: $id) {
    id
    requestID
    dateCreated
    author
    content
    notable
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetNoteTypeQueryVariables,
  APITypes.GetNoteTypeQuery
>;
export const listNoteTypes = /* GraphQL */ `query ListNoteTypes(
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
      notable
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNoteTypesQueryVariables,
  APITypes.ListNoteTypesQuery
>;
export const getSelfOrOtherInfo = /* GraphQL */ `query GetSelfOrOtherInfo($id: ID!) {
  getSelfOrOtherInfo(id: $id) {
    forSelf
    usedOtherResources
    otherResources
    requestFor
    requestIsKnown
    phoneNumber
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSelfOrOtherInfoQueryVariables,
  APITypes.GetSelfOrOtherInfoQuery
>;
export const listSelfOrOtherInfos = /* GraphQL */ `query ListSelfOrOtherInfos(
  $filter: ModelSelfOrOtherInfoFilterInput
  $limit: Int
  $nextToken: String
) {
  listSelfOrOtherInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      forSelf
      usedOtherResources
      otherResources
      requestFor
      requestIsKnown
      phoneNumber
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSelfOrOtherInfosQueryVariables,
  APITypes.ListSelfOrOtherInfosQuery
>;
export const getHouseholdItems = /* GraphQL */ `query GetHouseholdItems($id: ID!) {
  getHouseholdItems(id: $id) {
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
    conditioner
    paperTowels
    laundrySoap
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetHouseholdItemsQueryVariables,
  APITypes.GetHouseholdItemsQuery
>;
export const listHouseholdItems = /* GraphQL */ `query ListHouseholdItems(
  $filter: ModelHouseholdItemsFilterInput
  $limit: Int
  $nextToken: String
) {
  listHouseholdItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      conditioner
      paperTowels
      laundrySoap
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListHouseholdItemsQueryVariables,
  APITypes.ListHouseholdItemsQuery
>;
export const getFoodInfo = /* GraphQL */ `query GetFoodInfo($id: ID!) {
  getFoodInfo(id: $id) {
    familyMembers
    children
    deliveryTime
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
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFoodInfoQueryVariables,
  APITypes.GetFoodInfoQuery
>;
export const listFoodInfos = /* GraphQL */ `query ListFoodInfos(
  $filter: ModelFoodInfoFilterInput
  $limit: Int
  $nextToken: String
) {
  listFoodInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      familyMembers
      children
      deliveryTime
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
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFoodInfosQueryVariables,
  APITypes.ListFoodInfosQuery
>;
export const getMovingInfo = /* GraphQL */ `query GetMovingInfo($id: ID!) {
  getMovingInfo(id: $id) {
    items
    haveTransportation
    steepDriveway
    stairs
    unpavedRoad
    other
    otherDetails
    liabilityAck
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMovingInfoQueryVariables,
  APITypes.GetMovingInfoQuery
>;
export const listMovingInfos = /* GraphQL */ `query ListMovingInfos(
  $filter: ModelMovingInfoFilterInput
  $limit: Int
  $nextToken: String
) {
  listMovingInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      items
      haveTransportation
      steepDriveway
      stairs
      unpavedRoad
      other
      otherDetails
      liabilityAck
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMovingInfosQueryVariables,
  APITypes.ListMovingInfosQuery
>;
export const getHomeRepairType = /* GraphQL */ `query GetHomeRepairType($id: ID!) {
  getHomeRepairType(id: $id) {
    plumbing
    electrical
    painting
    yardwork
    other
    details
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetHomeRepairTypeQueryVariables,
  APITypes.GetHomeRepairTypeQuery
>;
export const listHomeRepairTypes = /* GraphQL */ `query ListHomeRepairTypes(
  $filter: ModelHomeRepairTypeFilterInput
  $limit: Int
  $nextToken: String
) {
  listHomeRepairTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      plumbing
      electrical
      painting
      yardwork
      other
      details
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListHomeRepairTypesQueryVariables,
  APITypes.ListHomeRepairTypesQuery
>;
export const getTeam = /* GraphQL */ `query GetTeam($id: ID!) {
  getTeam(id: $id) {
    id
    teamName
    teamType
    requests {
      items {
        id
        requestID
        request {
          id
          createdAt
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
          resumeHelp
          coverLetterHelp
          carRepairDetails
          clothingType
          clothingSize
          furnitureType
          housingHelp
          needReason
          needTypes
          fulfilledNeeds
          status
          otherNeeds
          needFulfiller
          dateFulfilled
          followUp
          updatedAt
          requestSelfOrOtherInfoId
          requestFoodRequestId
          requestMovingRequestId
          requestHomeRepairTypeId
          requestHouseholdItemsId
          __typename
        }
        type
        teamID
        askDate
        note
        filledDate
        filledBy {
          breezeId
          name
          createdAt
          updatedAt
          __typename
        }
        askedMembers {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        teamMemberFulfilledId
        teamRequestFilledById
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTeamQueryVariables, APITypes.GetTeamQuery>;
export const listTeams = /* GraphQL */ `query ListTeams(
  $filter: ModelTeamFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      teamName
      teamType
      requests {
        items {
          id
          requestID
          type
          teamID
          askDate
          note
          filledDate
          createdAt
          updatedAt
          teamMemberFulfilledId
          teamRequestFilledById
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTeamsQueryVariables, APITypes.ListTeamsQuery>;
export const getTeamMember = /* GraphQL */ `query GetTeamMember($breezeId: String!) {
  getTeamMember(breezeId: $breezeId) {
    breezeId
    name
    asks {
      items {
        id
        teamMemberID
        teamRequestID
        teamMember {
          breezeId
          name
          createdAt
          updatedAt
          __typename
        }
        teamRequest {
          id
          requestID
          type
          teamID
          askDate
          note
          filledDate
          createdAt
          updatedAt
          teamMemberFulfilledId
          teamRequestFilledById
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    fulfilled {
      items {
        id
        requestID
        request {
          id
          createdAt
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
          resumeHelp
          coverLetterHelp
          carRepairDetails
          clothingType
          clothingSize
          furnitureType
          housingHelp
          needReason
          needTypes
          fulfilledNeeds
          status
          otherNeeds
          needFulfiller
          dateFulfilled
          followUp
          updatedAt
          requestSelfOrOtherInfoId
          requestFoodRequestId
          requestMovingRequestId
          requestHomeRepairTypeId
          requestHouseholdItemsId
          __typename
        }
        type
        teamID
        askDate
        note
        filledDate
        filledBy {
          breezeId
          name
          createdAt
          updatedAt
          __typename
        }
        askedMembers {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        teamMemberFulfilledId
        teamRequestFilledById
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTeamMemberQueryVariables,
  APITypes.GetTeamMemberQuery
>;
export const listTeamMembers = /* GraphQL */ `query ListTeamMembers(
  $breezeId: String
  $filter: ModelTeamMemberFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listTeamMembers(
    breezeId: $breezeId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      breezeId
      name
      asks {
        items {
          id
          teamMemberID
          teamRequestID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      fulfilled {
        items {
          id
          requestID
          type
          teamID
          askDate
          note
          filledDate
          createdAt
          updatedAt
          teamMemberFulfilledId
          teamRequestFilledById
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTeamMembersQueryVariables,
  APITypes.ListTeamMembersQuery
>;
export const getTeamRequest = /* GraphQL */ `query GetTeamRequest($id: ID!) {
  getTeamRequest(id: $id) {
    id
    requestID
    request {
      id
      createdAt
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
        forSelf
        usedOtherResources
        otherResources
        requestFor
        requestIsKnown
        phoneNumber
        id
        createdAt
        updatedAt
        __typename
      }
      foodRequest {
        familyMembers
        children
        deliveryTime
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
        id
        createdAt
        updatedAt
        __typename
      }
      movingRequest {
        items
        haveTransportation
        steepDriveway
        stairs
        unpavedRoad
        other
        otherDetails
        liabilityAck
        id
        createdAt
        updatedAt
        __typename
      }
      resumeHelp
      coverLetterHelp
      carRepairDetails
      homeRepairType {
        plumbing
        electrical
        painting
        yardwork
        other
        details
        id
        createdAt
        updatedAt
        __typename
      }
      clothingType
      clothingSize
      furnitureType
      housingHelp
      householdItems {
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
        conditioner
        paperTowels
        laundrySoap
        id
        createdAt
        updatedAt
        __typename
      }
      needReason
      needTypes
      fulfilledNeeds
      status
      note {
        items {
          id
          requestID
          dateCreated
          author
          content
          notable
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      otherNeeds
      needFulfiller
      dateFulfilled
      followUp
      updatedAt
      requestSelfOrOtherInfoId
      requestFoodRequestId
      requestMovingRequestId
      requestHomeRepairTypeId
      requestHouseholdItemsId
      __typename
    }
    type
    teamID
    askDate
    note
    filledDate
    filledBy {
      breezeId
      name
      asks {
        items {
          id
          teamMemberID
          teamRequestID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      fulfilled {
        items {
          id
          requestID
          type
          teamID
          askDate
          note
          filledDate
          createdAt
          updatedAt
          teamMemberFulfilledId
          teamRequestFilledById
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    askedMembers {
      items {
        id
        teamMemberID
        teamRequestID
        teamMember {
          breezeId
          name
          createdAt
          updatedAt
          __typename
        }
        teamRequest {
          id
          requestID
          type
          teamID
          askDate
          note
          filledDate
          createdAt
          updatedAt
          teamMemberFulfilledId
          teamRequestFilledById
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    teamMemberFulfilledId
    teamRequestFilledById
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTeamRequestQueryVariables,
  APITypes.GetTeamRequestQuery
>;
export const listTeamRequests = /* GraphQL */ `query ListTeamRequests(
  $filter: ModelTeamRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeamRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      requestID
      request {
        id
        createdAt
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
          forSelf
          usedOtherResources
          otherResources
          requestFor
          requestIsKnown
          phoneNumber
          id
          createdAt
          updatedAt
          __typename
        }
        foodRequest {
          familyMembers
          children
          deliveryTime
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
          id
          createdAt
          updatedAt
          __typename
        }
        movingRequest {
          items
          haveTransportation
          steepDriveway
          stairs
          unpavedRoad
          other
          otherDetails
          liabilityAck
          id
          createdAt
          updatedAt
          __typename
        }
        resumeHelp
        coverLetterHelp
        carRepairDetails
        homeRepairType {
          plumbing
          electrical
          painting
          yardwork
          other
          details
          id
          createdAt
          updatedAt
          __typename
        }
        clothingType
        clothingSize
        furnitureType
        housingHelp
        householdItems {
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
          conditioner
          paperTowels
          laundrySoap
          id
          createdAt
          updatedAt
          __typename
        }
        needReason
        needTypes
        fulfilledNeeds
        status
        note {
          nextToken
          __typename
        }
        otherNeeds
        needFulfiller
        dateFulfilled
        followUp
        updatedAt
        requestSelfOrOtherInfoId
        requestFoodRequestId
        requestMovingRequestId
        requestHomeRepairTypeId
        requestHouseholdItemsId
        __typename
      }
      type
      teamID
      askDate
      note
      filledDate
      filledBy {
        breezeId
        name
        asks {
          nextToken
          __typename
        }
        fulfilled {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      askedMembers {
        items {
          id
          teamMemberID
          teamRequestID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      teamMemberFulfilledId
      teamRequestFilledById
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTeamRequestsQueryVariables,
  APITypes.ListTeamRequestsQuery
>;
export const getAskedMembers = /* GraphQL */ `query GetAskedMembers($id: ID!) {
  getAskedMembers(id: $id) {
    id
    teamMemberID
    teamRequestID
    teamMember {
      breezeId
      name
      asks {
        items {
          id
          teamMemberID
          teamRequestID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      fulfilled {
        items {
          id
          requestID
          type
          teamID
          askDate
          note
          filledDate
          createdAt
          updatedAt
          teamMemberFulfilledId
          teamRequestFilledById
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    teamRequest {
      id
      requestID
      request {
        id
        createdAt
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
          forSelf
          usedOtherResources
          otherResources
          requestFor
          requestIsKnown
          phoneNumber
          id
          createdAt
          updatedAt
          __typename
        }
        foodRequest {
          familyMembers
          children
          deliveryTime
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
          id
          createdAt
          updatedAt
          __typename
        }
        movingRequest {
          items
          haveTransportation
          steepDriveway
          stairs
          unpavedRoad
          other
          otherDetails
          liabilityAck
          id
          createdAt
          updatedAt
          __typename
        }
        resumeHelp
        coverLetterHelp
        carRepairDetails
        homeRepairType {
          plumbing
          electrical
          painting
          yardwork
          other
          details
          id
          createdAt
          updatedAt
          __typename
        }
        clothingType
        clothingSize
        furnitureType
        housingHelp
        householdItems {
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
          conditioner
          paperTowels
          laundrySoap
          id
          createdAt
          updatedAt
          __typename
        }
        needReason
        needTypes
        fulfilledNeeds
        status
        note {
          nextToken
          __typename
        }
        otherNeeds
        needFulfiller
        dateFulfilled
        followUp
        updatedAt
        requestSelfOrOtherInfoId
        requestFoodRequestId
        requestMovingRequestId
        requestHomeRepairTypeId
        requestHouseholdItemsId
        __typename
      }
      type
      teamID
      askDate
      note
      filledDate
      filledBy {
        breezeId
        name
        asks {
          nextToken
          __typename
        }
        fulfilled {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      askedMembers {
        items {
          id
          teamMemberID
          teamRequestID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      teamMemberFulfilledId
      teamRequestFilledById
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAskedMembersQueryVariables,
  APITypes.GetAskedMembersQuery
>;
export const listAskedMembers = /* GraphQL */ `query ListAskedMembers(
  $filter: ModelAskedMembersFilterInput
  $limit: Int
  $nextToken: String
) {
  listAskedMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      teamMemberID
      teamRequestID
      teamMember {
        breezeId
        name
        asks {
          nextToken
          __typename
        }
        fulfilled {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      teamRequest {
        id
        requestID
        request {
          id
          createdAt
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
          resumeHelp
          coverLetterHelp
          carRepairDetails
          clothingType
          clothingSize
          furnitureType
          housingHelp
          needReason
          needTypes
          fulfilledNeeds
          status
          otherNeeds
          needFulfiller
          dateFulfilled
          followUp
          updatedAt
          requestSelfOrOtherInfoId
          requestFoodRequestId
          requestMovingRequestId
          requestHomeRepairTypeId
          requestHouseholdItemsId
          __typename
        }
        type
        teamID
        askDate
        note
        filledDate
        filledBy {
          breezeId
          name
          createdAt
          updatedAt
          __typename
        }
        askedMembers {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        teamMemberFulfilledId
        teamRequestFilledById
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAskedMembersQueryVariables,
  APITypes.ListAskedMembersQuery
>;
