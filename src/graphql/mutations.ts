/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRequest = /* GraphQL */ `
  mutation CreateRequest(
    $input: CreateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    createRequest(input: $input, condition: $condition) {
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
    }
  }
`;
export const updateRequest = /* GraphQL */ `
  mutation UpdateRequest(
    $input: UpdateRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    updateRequest(input: $input, condition: $condition) {
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
    }
  }
`;
export const deleteRequest = /* GraphQL */ `
  mutation DeleteRequest(
    $input: DeleteRequestInput!
    $condition: ModelRequestConditionInput
  ) {
    deleteRequest(input: $input, condition: $condition) {
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
    }
  }
`;
export const createNoteType = /* GraphQL */ `
  mutation CreateNoteType(
    $input: CreateNoteTypeInput!
    $condition: ModelNoteTypeConditionInput
  ) {
    createNoteType(input: $input, condition: $condition) {
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
export const updateNoteType = /* GraphQL */ `
  mutation UpdateNoteType(
    $input: UpdateNoteTypeInput!
    $condition: ModelNoteTypeConditionInput
  ) {
    updateNoteType(input: $input, condition: $condition) {
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
export const deleteNoteType = /* GraphQL */ `
  mutation DeleteNoteType(
    $input: DeleteNoteTypeInput!
    $condition: ModelNoteTypeConditionInput
  ) {
    deleteNoteType(input: $input, condition: $condition) {
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
export const createSelfOrOtherInfo = /* GraphQL */ `
  mutation CreateSelfOrOtherInfo(
    $input: CreateSelfOrOtherInfoInput!
    $condition: ModelSelfOrOtherInfoConditionInput
  ) {
    createSelfOrOtherInfo(input: $input, condition: $condition) {
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
export const updateSelfOrOtherInfo = /* GraphQL */ `
  mutation UpdateSelfOrOtherInfo(
    $input: UpdateSelfOrOtherInfoInput!
    $condition: ModelSelfOrOtherInfoConditionInput
  ) {
    updateSelfOrOtherInfo(input: $input, condition: $condition) {
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
export const deleteSelfOrOtherInfo = /* GraphQL */ `
  mutation DeleteSelfOrOtherInfo(
    $input: DeleteSelfOrOtherInfoInput!
    $condition: ModelSelfOrOtherInfoConditionInput
  ) {
    deleteSelfOrOtherInfo(input: $input, condition: $condition) {
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
export const createHouseholdItems = /* GraphQL */ `
  mutation CreateHouseholdItems(
    $input: CreateHouseholdItemsInput!
    $condition: ModelHouseholdItemsConditionInput
  ) {
    createHouseholdItems(input: $input, condition: $condition) {
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
export const updateHouseholdItems = /* GraphQL */ `
  mutation UpdateHouseholdItems(
    $input: UpdateHouseholdItemsInput!
    $condition: ModelHouseholdItemsConditionInput
  ) {
    updateHouseholdItems(input: $input, condition: $condition) {
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
export const deleteHouseholdItems = /* GraphQL */ `
  mutation DeleteHouseholdItems(
    $input: DeleteHouseholdItemsInput!
    $condition: ModelHouseholdItemsConditionInput
  ) {
    deleteHouseholdItems(input: $input, condition: $condition) {
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
export const createFoodInfo = /* GraphQL */ `
  mutation CreateFoodInfo(
    $input: CreateFoodInfoInput!
    $condition: ModelFoodInfoConditionInput
  ) {
    createFoodInfo(input: $input, condition: $condition) {
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
export const updateFoodInfo = /* GraphQL */ `
  mutation UpdateFoodInfo(
    $input: UpdateFoodInfoInput!
    $condition: ModelFoodInfoConditionInput
  ) {
    updateFoodInfo(input: $input, condition: $condition) {
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
export const deleteFoodInfo = /* GraphQL */ `
  mutation DeleteFoodInfo(
    $input: DeleteFoodInfoInput!
    $condition: ModelFoodInfoConditionInput
  ) {
    deleteFoodInfo(input: $input, condition: $condition) {
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
export const createMovingInfo = /* GraphQL */ `
  mutation CreateMovingInfo(
    $input: CreateMovingInfoInput!
    $condition: ModelMovingInfoConditionInput
  ) {
    createMovingInfo(input: $input, condition: $condition) {
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
export const updateMovingInfo = /* GraphQL */ `
  mutation UpdateMovingInfo(
    $input: UpdateMovingInfoInput!
    $condition: ModelMovingInfoConditionInput
  ) {
    updateMovingInfo(input: $input, condition: $condition) {
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
export const deleteMovingInfo = /* GraphQL */ `
  mutation DeleteMovingInfo(
    $input: DeleteMovingInfoInput!
    $condition: ModelMovingInfoConditionInput
  ) {
    deleteMovingInfo(input: $input, condition: $condition) {
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
export const createHomeRepairType = /* GraphQL */ `
  mutation CreateHomeRepairType(
    $input: CreateHomeRepairTypeInput!
    $condition: ModelHomeRepairTypeConditionInput
  ) {
    createHomeRepairType(input: $input, condition: $condition) {
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
export const updateHomeRepairType = /* GraphQL */ `
  mutation UpdateHomeRepairType(
    $input: UpdateHomeRepairTypeInput!
    $condition: ModelHomeRepairTypeConditionInput
  ) {
    updateHomeRepairType(input: $input, condition: $condition) {
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
export const deleteHomeRepairType = /* GraphQL */ `
  mutation DeleteHomeRepairType(
    $input: DeleteHomeRepairTypeInput!
    $condition: ModelHomeRepairTypeConditionInput
  ) {
    deleteHomeRepairType(input: $input, condition: $condition) {
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
