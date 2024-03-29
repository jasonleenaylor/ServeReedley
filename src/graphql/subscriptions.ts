/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../RequestAPI";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateRequest = /* GraphQL */ `subscription OnCreateRequest($filter: ModelSubscriptionRequestFilterInput) {
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
}
` as GeneratedSubscription<
  APITypes.OnCreateRequestSubscriptionVariables,
  APITypes.OnCreateRequestSubscription
>;
export const onUpdateRequest = /* GraphQL */ `subscription OnUpdateRequest($filter: ModelSubscriptionRequestFilterInput) {
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
}
` as GeneratedSubscription<
  APITypes.OnUpdateRequestSubscriptionVariables,
  APITypes.OnUpdateRequestSubscription
>;
export const onDeleteRequest = /* GraphQL */ `subscription OnDeleteRequest($filter: ModelSubscriptionRequestFilterInput) {
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
}
` as GeneratedSubscription<
  APITypes.OnDeleteRequestSubscriptionVariables,
  APITypes.OnDeleteRequestSubscription
>;
export const onCreateNoteType = /* GraphQL */ `subscription OnCreateNoteType($filter: ModelSubscriptionNoteTypeFilterInput) {
  onCreateNoteType(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateNoteTypeSubscriptionVariables,
  APITypes.OnCreateNoteTypeSubscription
>;
export const onUpdateNoteType = /* GraphQL */ `subscription OnUpdateNoteType($filter: ModelSubscriptionNoteTypeFilterInput) {
  onUpdateNoteType(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateNoteTypeSubscriptionVariables,
  APITypes.OnUpdateNoteTypeSubscription
>;
export const onDeleteNoteType = /* GraphQL */ `subscription OnDeleteNoteType($filter: ModelSubscriptionNoteTypeFilterInput) {
  onDeleteNoteType(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteNoteTypeSubscriptionVariables,
  APITypes.OnDeleteNoteTypeSubscription
>;
export const onCreateSelfOrOtherInfo = /* GraphQL */ `subscription OnCreateSelfOrOtherInfo(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSelfOrOtherInfoSubscriptionVariables,
  APITypes.OnCreateSelfOrOtherInfoSubscription
>;
export const onUpdateSelfOrOtherInfo = /* GraphQL */ `subscription OnUpdateSelfOrOtherInfo(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSelfOrOtherInfoSubscriptionVariables,
  APITypes.OnUpdateSelfOrOtherInfoSubscription
>;
export const onDeleteSelfOrOtherInfo = /* GraphQL */ `subscription OnDeleteSelfOrOtherInfo(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSelfOrOtherInfoSubscriptionVariables,
  APITypes.OnDeleteSelfOrOtherInfoSubscription
>;
export const onCreateHouseholdItems = /* GraphQL */ `subscription OnCreateHouseholdItems(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateHouseholdItemsSubscriptionVariables,
  APITypes.OnCreateHouseholdItemsSubscription
>;
export const onUpdateHouseholdItems = /* GraphQL */ `subscription OnUpdateHouseholdItems(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateHouseholdItemsSubscriptionVariables,
  APITypes.OnUpdateHouseholdItemsSubscription
>;
export const onDeleteHouseholdItems = /* GraphQL */ `subscription OnDeleteHouseholdItems(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteHouseholdItemsSubscriptionVariables,
  APITypes.OnDeleteHouseholdItemsSubscription
>;
export const onCreateFoodInfo = /* GraphQL */ `subscription OnCreateFoodInfo($filter: ModelSubscriptionFoodInfoFilterInput) {
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFoodInfoSubscriptionVariables,
  APITypes.OnCreateFoodInfoSubscription
>;
export const onUpdateFoodInfo = /* GraphQL */ `subscription OnUpdateFoodInfo($filter: ModelSubscriptionFoodInfoFilterInput) {
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateFoodInfoSubscriptionVariables,
  APITypes.OnUpdateFoodInfoSubscription
>;
export const onDeleteFoodInfo = /* GraphQL */ `subscription OnDeleteFoodInfo($filter: ModelSubscriptionFoodInfoFilterInput) {
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFoodInfoSubscriptionVariables,
  APITypes.OnDeleteFoodInfoSubscription
>;
export const onCreateMovingInfo = /* GraphQL */ `subscription OnCreateMovingInfo(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMovingInfoSubscriptionVariables,
  APITypes.OnCreateMovingInfoSubscription
>;
export const onUpdateMovingInfo = /* GraphQL */ `subscription OnUpdateMovingInfo(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMovingInfoSubscriptionVariables,
  APITypes.OnUpdateMovingInfoSubscription
>;
export const onDeleteMovingInfo = /* GraphQL */ `subscription OnDeleteMovingInfo(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMovingInfoSubscriptionVariables,
  APITypes.OnDeleteMovingInfoSubscription
>;
export const onCreateHomeRepairType = /* GraphQL */ `subscription OnCreateHomeRepairType(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateHomeRepairTypeSubscriptionVariables,
  APITypes.OnCreateHomeRepairTypeSubscription
>;
export const onUpdateHomeRepairType = /* GraphQL */ `subscription OnUpdateHomeRepairType(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateHomeRepairTypeSubscriptionVariables,
  APITypes.OnUpdateHomeRepairTypeSubscription
>;
export const onDeleteHomeRepairType = /* GraphQL */ `subscription OnDeleteHomeRepairType(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteHomeRepairTypeSubscriptionVariables,
  APITypes.OnDeleteHomeRepairTypeSubscription
>;
