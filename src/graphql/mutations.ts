/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
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
export const createTeam = /* GraphQL */ `mutation CreateTeam(
  $input: CreateTeamInput!
  $condition: ModelTeamConditionInput
) {
  createTeam(input: $input, condition: $condition) {
    id
    teamName
    teamType
    email
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
        filledBy
        askedMembers {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTeamMutationVariables,
  APITypes.CreateTeamMutation
>;
export const updateTeam = /* GraphQL */ `mutation UpdateTeam(
  $input: UpdateTeamInput!
  $condition: ModelTeamConditionInput
) {
  updateTeam(input: $input, condition: $condition) {
    id
    teamName
    teamType
    email
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
        filledBy
        askedMembers {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTeamMutationVariables,
  APITypes.UpdateTeamMutation
>;
export const deleteTeam = /* GraphQL */ `mutation DeleteTeam(
  $input: DeleteTeamInput!
  $condition: ModelTeamConditionInput
) {
  deleteTeam(input: $input, condition: $condition) {
    id
    teamName
    teamType
    email
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
        filledBy
        askedMembers {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTeamMutationVariables,
  APITypes.DeleteTeamMutation
>;
export const createTeamMember = /* GraphQL */ `mutation CreateTeamMember(
  $input: CreateTeamMemberInput!
  $condition: ModelTeamMemberConditionInput
) {
  createTeamMember(input: $input, condition: $condition) {
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
          filledBy
          createdAt
          updatedAt
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
        filledBy
        askedMembers {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTeamMemberMutationVariables,
  APITypes.CreateTeamMemberMutation
>;
export const updateTeamMember = /* GraphQL */ `mutation UpdateTeamMember(
  $input: UpdateTeamMemberInput!
  $condition: ModelTeamMemberConditionInput
) {
  updateTeamMember(input: $input, condition: $condition) {
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
          filledBy
          createdAt
          updatedAt
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
        filledBy
        askedMembers {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTeamMemberMutationVariables,
  APITypes.UpdateTeamMemberMutation
>;
export const deleteTeamMember = /* GraphQL */ `mutation DeleteTeamMember(
  $input: DeleteTeamMemberInput!
  $condition: ModelTeamMemberConditionInput
) {
  deleteTeamMember(input: $input, condition: $condition) {
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
          filledBy
          createdAt
          updatedAt
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
        filledBy
        askedMembers {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTeamMemberMutationVariables,
  APITypes.DeleteTeamMemberMutation
>;
export const createTeamRequest = /* GraphQL */ `mutation CreateTeamRequest(
  $input: CreateTeamRequestInput!
  $condition: ModelTeamRequestConditionInput
) {
  createTeamRequest(input: $input, condition: $condition) {
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
    filledBy
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
          filledBy
          createdAt
          updatedAt
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTeamRequestMutationVariables,
  APITypes.CreateTeamRequestMutation
>;
export const updateTeamRequest = /* GraphQL */ `mutation UpdateTeamRequest(
  $input: UpdateTeamRequestInput!
  $condition: ModelTeamRequestConditionInput
) {
  updateTeamRequest(input: $input, condition: $condition) {
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
    filledBy
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
          filledBy
          createdAt
          updatedAt
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTeamRequestMutationVariables,
  APITypes.UpdateTeamRequestMutation
>;
export const deleteTeamRequest = /* GraphQL */ `mutation DeleteTeamRequest(
  $input: DeleteTeamRequestInput!
  $condition: ModelTeamRequestConditionInput
) {
  deleteTeamRequest(input: $input, condition: $condition) {
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
    filledBy
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
          filledBy
          createdAt
          updatedAt
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTeamRequestMutationVariables,
  APITypes.DeleteTeamRequestMutation
>;
export const createAskedMembers = /* GraphQL */ `mutation CreateAskedMembers(
  $input: CreateAskedMembersInput!
  $condition: ModelAskedMembersConditionInput
) {
  createAskedMembers(input: $input, condition: $condition) {
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
          filledBy
          createdAt
          updatedAt
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
      filledBy
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
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAskedMembersMutationVariables,
  APITypes.CreateAskedMembersMutation
>;
export const updateAskedMembers = /* GraphQL */ `mutation UpdateAskedMembers(
  $input: UpdateAskedMembersInput!
  $condition: ModelAskedMembersConditionInput
) {
  updateAskedMembers(input: $input, condition: $condition) {
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
          filledBy
          createdAt
          updatedAt
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
      filledBy
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
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAskedMembersMutationVariables,
  APITypes.UpdateAskedMembersMutation
>;
export const deleteAskedMembers = /* GraphQL */ `mutation DeleteAskedMembers(
  $input: DeleteAskedMembersInput!
  $condition: ModelAskedMembersConditionInput
) {
  deleteAskedMembers(input: $input, condition: $condition) {
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
          filledBy
          createdAt
          updatedAt
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
      filledBy
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
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAskedMembersMutationVariables,
  APITypes.DeleteAskedMembersMutation
>;
