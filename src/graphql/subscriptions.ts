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
        groceries {
          id
          milk
          eggs
          bread
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
        groceries {
          id
          milk
          eggs
          bread
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
        groceries {
          id
          milk
          eggs
          bread
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
      needFulfiller
      dateFulfilled
      followUp
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
export const onCreateFoodInfo = /* GraphQL */ `
  subscription OnCreateFoodInfo {
    onCreateFoodInfo {
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
export const onUpdateFoodInfo = /* GraphQL */ `
  subscription OnUpdateFoodInfo {
    onUpdateFoodInfo {
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
export const onDeleteFoodInfo = /* GraphQL */ `
  subscription OnDeleteFoodInfo {
    onDeleteFoodInfo {
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
export const onCreateGroceries = /* GraphQL */ `
  subscription OnCreateGroceries {
    onCreateGroceries {
      id
      milk
      eggs
      bread
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
export const onUpdateGroceries = /* GraphQL */ `
  subscription OnUpdateGroceries {
    onUpdateGroceries {
      id
      milk
      eggs
      bread
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
export const onDeleteGroceries = /* GraphQL */ `
  subscription OnDeleteGroceries {
    onDeleteGroceries {
      id
      milk
      eggs
      bread
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
