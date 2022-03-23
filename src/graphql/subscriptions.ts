/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest {
    onCreateRequest {
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
        forSelf
        usedOtherResources
        otherResources
        requestFor
        requestIsKnown
        id
        createdAt
        updatedAt
      }
      foodRequest {
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
        id
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
          requestNoteId
        }
        nextToken
      }
      otherNeeds
      needFulfiller
      dateFulfilled
      followUp
      createdAt
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
  subscription OnUpdateRequest {
    onUpdateRequest {
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
        forSelf
        usedOtherResources
        otherResources
        requestFor
        requestIsKnown
        id
        createdAt
        updatedAt
      }
      foodRequest {
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
        id
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
          requestNoteId
        }
        nextToken
      }
      otherNeeds
      needFulfiller
      dateFulfilled
      followUp
      createdAt
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
  subscription OnDeleteRequest {
    onDeleteRequest {
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
        forSelf
        usedOtherResources
        otherResources
        requestFor
        requestIsKnown
        id
        createdAt
        updatedAt
      }
      foodRequest {
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
        id
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
          requestNoteId
        }
        nextToken
      }
      otherNeeds
      needFulfiller
      dateFulfilled
      followUp
      createdAt
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
  subscription OnCreateNoteType {
    onCreateNoteType {
      id
      requestID
      dateCreated
      author
      content
      createdAt
      updatedAt
      requestNoteId
    }
  }
`;
export const onUpdateNoteType = /* GraphQL */ `
  subscription OnUpdateNoteType {
    onUpdateNoteType {
      id
      requestID
      dateCreated
      author
      content
      createdAt
      updatedAt
      requestNoteId
    }
  }
`;
export const onDeleteNoteType = /* GraphQL */ `
  subscription OnDeleteNoteType {
    onDeleteNoteType {
      id
      requestID
      dateCreated
      author
      content
      createdAt
      updatedAt
      requestNoteId
    }
  }
`;
export const onCreateSelfOrOtherInfo = /* GraphQL */ `
  subscription OnCreateSelfOrOtherInfo {
    onCreateSelfOrOtherInfo {
      forSelf
      usedOtherResources
      otherResources
      requestFor
      requestIsKnown
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSelfOrOtherInfo = /* GraphQL */ `
  subscription OnUpdateSelfOrOtherInfo {
    onUpdateSelfOrOtherInfo {
      forSelf
      usedOtherResources
      otherResources
      requestFor
      requestIsKnown
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSelfOrOtherInfo = /* GraphQL */ `
  subscription OnDeleteSelfOrOtherInfo {
    onDeleteSelfOrOtherInfo {
      forSelf
      usedOtherResources
      otherResources
      requestFor
      requestIsKnown
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHouseholdItems = /* GraphQL */ `
  subscription OnCreateHouseholdItems {
    onCreateHouseholdItems {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHouseholdItems = /* GraphQL */ `
  subscription OnUpdateHouseholdItems {
    onUpdateHouseholdItems {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHouseholdItems = /* GraphQL */ `
  subscription OnDeleteHouseholdItems {
    onDeleteHouseholdItems {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFoodInfo = /* GraphQL */ `
  subscription OnCreateFoodInfo {
    onCreateFoodInfo {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFoodInfo = /* GraphQL */ `
  subscription OnUpdateFoodInfo {
    onUpdateFoodInfo {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFoodInfo = /* GraphQL */ `
  subscription OnDeleteFoodInfo {
    onDeleteFoodInfo {
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
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMovingInfo = /* GraphQL */ `
  subscription OnCreateMovingInfo {
    onCreateMovingInfo {
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
  subscription OnUpdateMovingInfo {
    onUpdateMovingInfo {
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
  subscription OnDeleteMovingInfo {
    onDeleteMovingInfo {
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
  subscription OnCreateHomeRepairType {
    onCreateHomeRepairType {
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
  subscription OnUpdateHomeRepairType {
    onUpdateHomeRepairType {
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
  subscription OnDeleteHomeRepairType {
    onDeleteHomeRepairType {
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
