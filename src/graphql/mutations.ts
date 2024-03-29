/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../RequestAPI";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createRequest = /* GraphQL */ `mutation CreateRequest(
  $input: CreateRequestInput!
  $condition: ModelRequestConditionInput
) {
  createRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateRequestMutationVariables,
  APITypes.CreateRequestMutation
>;
export const updateRequest = /* GraphQL */ `mutation UpdateRequest(
  $input: UpdateRequestInput!
  $condition: ModelRequestConditionInput
) {
  updateRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateRequestMutationVariables,
  APITypes.UpdateRequestMutation
>;
export const deleteRequest = /* GraphQL */ `mutation DeleteRequest(
  $input: DeleteRequestInput!
  $condition: ModelRequestConditionInput
) {
  deleteRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteRequestMutationVariables,
  APITypes.DeleteRequestMutation
>;
export const createNoteType = /* GraphQL */ `mutation CreateNoteType(
  $input: CreateNoteTypeInput!
  $condition: ModelNoteTypeConditionInput
) {
  createNoteType(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateNoteTypeMutationVariables,
  APITypes.CreateNoteTypeMutation
>;
export const updateNoteType = /* GraphQL */ `mutation UpdateNoteType(
  $input: UpdateNoteTypeInput!
  $condition: ModelNoteTypeConditionInput
) {
  updateNoteType(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateNoteTypeMutationVariables,
  APITypes.UpdateNoteTypeMutation
>;
export const deleteNoteType = /* GraphQL */ `mutation DeleteNoteType(
  $input: DeleteNoteTypeInput!
  $condition: ModelNoteTypeConditionInput
) {
  deleteNoteType(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteNoteTypeMutationVariables,
  APITypes.DeleteNoteTypeMutation
>;
export const createSelfOrOtherInfo = /* GraphQL */ `mutation CreateSelfOrOtherInfo(
  $input: CreateSelfOrOtherInfoInput!
  $condition: ModelSelfOrOtherInfoConditionInput
) {
  createSelfOrOtherInfo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateSelfOrOtherInfoMutationVariables,
  APITypes.CreateSelfOrOtherInfoMutation
>;
export const updateSelfOrOtherInfo = /* GraphQL */ `mutation UpdateSelfOrOtherInfo(
  $input: UpdateSelfOrOtherInfoInput!
  $condition: ModelSelfOrOtherInfoConditionInput
) {
  updateSelfOrOtherInfo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateSelfOrOtherInfoMutationVariables,
  APITypes.UpdateSelfOrOtherInfoMutation
>;
export const deleteSelfOrOtherInfo = /* GraphQL */ `mutation DeleteSelfOrOtherInfo(
  $input: DeleteSelfOrOtherInfoInput!
  $condition: ModelSelfOrOtherInfoConditionInput
) {
  deleteSelfOrOtherInfo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteSelfOrOtherInfoMutationVariables,
  APITypes.DeleteSelfOrOtherInfoMutation
>;
export const createHouseholdItems = /* GraphQL */ `mutation CreateHouseholdItems(
  $input: CreateHouseholdItemsInput!
  $condition: ModelHouseholdItemsConditionInput
) {
  createHouseholdItems(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateHouseholdItemsMutationVariables,
  APITypes.CreateHouseholdItemsMutation
>;
export const updateHouseholdItems = /* GraphQL */ `mutation UpdateHouseholdItems(
  $input: UpdateHouseholdItemsInput!
  $condition: ModelHouseholdItemsConditionInput
) {
  updateHouseholdItems(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateHouseholdItemsMutationVariables,
  APITypes.UpdateHouseholdItemsMutation
>;
export const deleteHouseholdItems = /* GraphQL */ `mutation DeleteHouseholdItems(
  $input: DeleteHouseholdItemsInput!
  $condition: ModelHouseholdItemsConditionInput
) {
  deleteHouseholdItems(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteHouseholdItemsMutationVariables,
  APITypes.DeleteHouseholdItemsMutation
>;
export const createFoodInfo = /* GraphQL */ `mutation CreateFoodInfo(
  $input: CreateFoodInfoInput!
  $condition: ModelFoodInfoConditionInput
) {
  createFoodInfo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateFoodInfoMutationVariables,
  APITypes.CreateFoodInfoMutation
>;
export const updateFoodInfo = /* GraphQL */ `mutation UpdateFoodInfo(
  $input: UpdateFoodInfoInput!
  $condition: ModelFoodInfoConditionInput
) {
  updateFoodInfo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateFoodInfoMutationVariables,
  APITypes.UpdateFoodInfoMutation
>;
export const deleteFoodInfo = /* GraphQL */ `mutation DeleteFoodInfo(
  $input: DeleteFoodInfoInput!
  $condition: ModelFoodInfoConditionInput
) {
  deleteFoodInfo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteFoodInfoMutationVariables,
  APITypes.DeleteFoodInfoMutation
>;
export const createMovingInfo = /* GraphQL */ `mutation CreateMovingInfo(
  $input: CreateMovingInfoInput!
  $condition: ModelMovingInfoConditionInput
) {
  createMovingInfo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMovingInfoMutationVariables,
  APITypes.CreateMovingInfoMutation
>;
export const updateMovingInfo = /* GraphQL */ `mutation UpdateMovingInfo(
  $input: UpdateMovingInfoInput!
  $condition: ModelMovingInfoConditionInput
) {
  updateMovingInfo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMovingInfoMutationVariables,
  APITypes.UpdateMovingInfoMutation
>;
export const deleteMovingInfo = /* GraphQL */ `mutation DeleteMovingInfo(
  $input: DeleteMovingInfoInput!
  $condition: ModelMovingInfoConditionInput
) {
  deleteMovingInfo(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMovingInfoMutationVariables,
  APITypes.DeleteMovingInfoMutation
>;
export const createHomeRepairType = /* GraphQL */ `mutation CreateHomeRepairType(
  $input: CreateHomeRepairTypeInput!
  $condition: ModelHomeRepairTypeConditionInput
) {
  createHomeRepairType(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateHomeRepairTypeMutationVariables,
  APITypes.CreateHomeRepairTypeMutation
>;
export const updateHomeRepairType = /* GraphQL */ `mutation UpdateHomeRepairType(
  $input: UpdateHomeRepairTypeInput!
  $condition: ModelHomeRepairTypeConditionInput
) {
  updateHomeRepairType(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateHomeRepairTypeMutationVariables,
  APITypes.UpdateHomeRepairTypeMutation
>;
export const deleteHomeRepairType = /* GraphQL */ `mutation DeleteHomeRepairType(
  $input: DeleteHomeRepairTypeInput!
  $condition: ModelHomeRepairTypeConditionInput
) {
  deleteHomeRepairType(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteHomeRepairTypeMutationVariables,
  APITypes.DeleteHomeRepairTypeMutation
>;
