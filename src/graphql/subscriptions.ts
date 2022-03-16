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
    }
  }
`;
export const onCreateSelfOrOtherInfo = /* GraphQL */ `
  subscription OnCreateSelfOrOtherInfo {
    onCreateSelfOrOtherInfo {
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
export const onUpdateSelfOrOtherInfo = /* GraphQL */ `
  subscription OnUpdateSelfOrOtherInfo {
    onUpdateSelfOrOtherInfo {
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
export const onDeleteSelfOrOtherInfo = /* GraphQL */ `
  subscription OnDeleteSelfOrOtherInfo {
    onDeleteSelfOrOtherInfo {
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
export const onCreateHouseholdItems = /* GraphQL */ `
  subscription OnCreateHouseholdItems {
    onCreateHouseholdItems {
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
export const onUpdateHouseholdItems = /* GraphQL */ `
  subscription OnUpdateHouseholdItems {
    onUpdateHouseholdItems {
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
export const onDeleteHouseholdItems = /* GraphQL */ `
  subscription OnDeleteHouseholdItems {
    onDeleteHouseholdItems {
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
export const onCreateFoodInfo = /* GraphQL */ `
  subscription OnCreateFoodInfo {
    onCreateFoodInfo {
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
export const onUpdateFoodInfo = /* GraphQL */ `
  subscription OnUpdateFoodInfo {
    onUpdateFoodInfo {
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
export const onDeleteFoodInfo = /* GraphQL */ `
  subscription OnDeleteFoodInfo {
    onDeleteFoodInfo {
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
export const onCreateMovingInfo = /* GraphQL */ `
  subscription OnCreateMovingInfo {
    onCreateMovingInfo {
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
export const onUpdateMovingInfo = /* GraphQL */ `
  subscription OnUpdateMovingInfo {
    onUpdateMovingInfo {
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
export const onDeleteMovingInfo = /* GraphQL */ `
  subscription OnDeleteMovingInfo {
    onDeleteMovingInfo {
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
export const onCreateHomeRepairType = /* GraphQL */ `
  subscription OnCreateHomeRepairType {
    onCreateHomeRepairType {
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
export const onUpdateHomeRepairType = /* GraphQL */ `
  subscription OnUpdateHomeRepairType {
    onUpdateHomeRepairType {
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
export const onDeleteHomeRepairType = /* GraphQL */ `
  subscription OnDeleteHomeRepairType {
    onDeleteHomeRepairType {
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
