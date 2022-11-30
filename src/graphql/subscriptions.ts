/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest($filter: ModelSubscriptionRequestFilterInput) {
    onCreateRequest(filter: $filter) {
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
        }
        nextToken
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
    }
  }
`;
export const onUpdateRequest = /* GraphQL */ `
  subscription OnUpdateRequest($filter: ModelSubscriptionRequestFilterInput) {
    onUpdateRequest(filter: $filter) {
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
        }
        nextToken
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
    }
  }
`;
export const onDeleteRequest = /* GraphQL */ `
  subscription OnDeleteRequest($filter: ModelSubscriptionRequestFilterInput) {
    onDeleteRequest(filter: $filter) {
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
        }
        nextToken
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
    }
  }
`;
export const onCreateNoteType = /* GraphQL */ `
  subscription OnCreateNoteType($filter: ModelSubscriptionNoteTypeFilterInput) {
    onCreateNoteType(filter: $filter) {
      id
      requestID
      dateCreated
      author
      content
      notable
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNoteType = /* GraphQL */ `
  subscription OnUpdateNoteType($filter: ModelSubscriptionNoteTypeFilterInput) {
    onUpdateNoteType(filter: $filter) {
      id
      requestID
      dateCreated
      author
      content
      notable
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNoteType = /* GraphQL */ `
  subscription OnDeleteNoteType($filter: ModelSubscriptionNoteTypeFilterInput) {
    onDeleteNoteType(filter: $filter) {
      id
      requestID
      dateCreated
      author
      content
      notable
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSelfOrOtherInfo = /* GraphQL */ `
  subscription OnCreateSelfOrOtherInfo(
    $filter: ModelSubscriptionSelfOrOtherInfoFilterInput
  ) {
    onCreateSelfOrOtherInfo(filter: $filter) {
      forSelf
      usedOtherResources
      otherResources
      requestFor
      requestIsKnown
      phoneNumber
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSelfOrOtherInfo = /* GraphQL */ `
  subscription OnUpdateSelfOrOtherInfo(
    $filter: ModelSubscriptionSelfOrOtherInfoFilterInput
  ) {
    onUpdateSelfOrOtherInfo(filter: $filter) {
      forSelf
      usedOtherResources
      otherResources
      requestFor
      requestIsKnown
      phoneNumber
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSelfOrOtherInfo = /* GraphQL */ `
  subscription OnDeleteSelfOrOtherInfo(
    $filter: ModelSubscriptionSelfOrOtherInfoFilterInput
  ) {
    onDeleteSelfOrOtherInfo(filter: $filter) {
      forSelf
      usedOtherResources
      otherResources
      requestFor
      requestIsKnown
      phoneNumber
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHouseholdItems = /* GraphQL */ `
  subscription OnCreateHouseholdItems(
    $filter: ModelSubscriptionHouseholdItemsFilterInput
  ) {
    onCreateHouseholdItems(filter: $filter) {
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
    }
  }
`;
export const onUpdateHouseholdItems = /* GraphQL */ `
  subscription OnUpdateHouseholdItems(
    $filter: ModelSubscriptionHouseholdItemsFilterInput
  ) {
    onUpdateHouseholdItems(filter: $filter) {
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
    }
  }
`;
export const onDeleteHouseholdItems = /* GraphQL */ `
  subscription OnDeleteHouseholdItems(
    $filter: ModelSubscriptionHouseholdItemsFilterInput
  ) {
    onDeleteHouseholdItems(filter: $filter) {
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
    }
  }
`;
export const onCreateFoodInfo = /* GraphQL */ `
  subscription OnCreateFoodInfo($filter: ModelSubscriptionFoodInfoFilterInput) {
    onCreateFoodInfo(filter: $filter) {
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
    }
  }
`;
export const onUpdateFoodInfo = /* GraphQL */ `
  subscription OnUpdateFoodInfo($filter: ModelSubscriptionFoodInfoFilterInput) {
    onUpdateFoodInfo(filter: $filter) {
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
    }
  }
`;
export const onDeleteFoodInfo = /* GraphQL */ `
  subscription OnDeleteFoodInfo($filter: ModelSubscriptionFoodInfoFilterInput) {
    onDeleteFoodInfo(filter: $filter) {
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
    }
  }
`;
export const onCreateMovingInfo = /* GraphQL */ `
  subscription OnCreateMovingInfo(
    $filter: ModelSubscriptionMovingInfoFilterInput
  ) {
    onCreateMovingInfo(filter: $filter) {
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
    }
  }
`;
export const onUpdateMovingInfo = /* GraphQL */ `
  subscription OnUpdateMovingInfo(
    $filter: ModelSubscriptionMovingInfoFilterInput
  ) {
    onUpdateMovingInfo(filter: $filter) {
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
    }
  }
`;
export const onDeleteMovingInfo = /* GraphQL */ `
  subscription OnDeleteMovingInfo(
    $filter: ModelSubscriptionMovingInfoFilterInput
  ) {
    onDeleteMovingInfo(filter: $filter) {
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
    }
  }
`;
export const onCreateHomeRepairType = /* GraphQL */ `
  subscription OnCreateHomeRepairType(
    $filter: ModelSubscriptionHomeRepairTypeFilterInput
  ) {
    onCreateHomeRepairType(filter: $filter) {
      plumbing
      electrical
      painting
      yardwork
      other
      details
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHomeRepairType = /* GraphQL */ `
  subscription OnUpdateHomeRepairType(
    $filter: ModelSubscriptionHomeRepairTypeFilterInput
  ) {
    onUpdateHomeRepairType(filter: $filter) {
      plumbing
      electrical
      painting
      yardwork
      other
      details
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHomeRepairType = /* GraphQL */ `
  subscription OnDeleteHomeRepairType(
    $filter: ModelSubscriptionHomeRepairTypeFilterInput
  ) {
    onDeleteHomeRepairType(filter: $filter) {
      plumbing
      electrical
      painting
      yardwork
      other
      details
      id
      createdAt
      updatedAt
    }
  }
`;
