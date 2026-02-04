/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
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
export const onCreateTeam = /* GraphQL */ `subscription OnCreateTeam($filter: ModelSubscriptionTeamFilterInput) {
  onCreateTeam(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTeamSubscriptionVariables,
  APITypes.OnCreateTeamSubscription
>;
export const onUpdateTeam = /* GraphQL */ `subscription OnUpdateTeam($filter: ModelSubscriptionTeamFilterInput) {
  onUpdateTeam(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTeamSubscriptionVariables,
  APITypes.OnUpdateTeamSubscription
>;
export const onDeleteTeam = /* GraphQL */ `subscription OnDeleteTeam($filter: ModelSubscriptionTeamFilterInput) {
  onDeleteTeam(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTeamSubscriptionVariables,
  APITypes.OnDeleteTeamSubscription
>;
export const onCreateTeamMember = /* GraphQL */ `subscription OnCreateTeamMember(
  $filter: ModelSubscriptionTeamMemberFilterInput
) {
  onCreateTeamMember(filter: $filter) {
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
          lastDonation
          donationNotes
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
    lastDonation
    donationNotes
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTeamMemberSubscriptionVariables,
  APITypes.OnCreateTeamMemberSubscription
>;
export const onUpdateTeamMember = /* GraphQL */ `subscription OnUpdateTeamMember(
  $filter: ModelSubscriptionTeamMemberFilterInput
) {
  onUpdateTeamMember(filter: $filter) {
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
          lastDonation
          donationNotes
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
    lastDonation
    donationNotes
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTeamMemberSubscriptionVariables,
  APITypes.OnUpdateTeamMemberSubscription
>;
export const onDeleteTeamMember = /* GraphQL */ `subscription OnDeleteTeamMember(
  $filter: ModelSubscriptionTeamMemberFilterInput
) {
  onDeleteTeamMember(filter: $filter) {
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
          lastDonation
          donationNotes
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
    lastDonation
    donationNotes
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTeamMemberSubscriptionVariables,
  APITypes.OnDeleteTeamMemberSubscription
>;
export const onCreateTeamRequest = /* GraphQL */ `subscription OnCreateTeamRequest(
  $filter: ModelSubscriptionTeamRequestFilterInput
) {
  onCreateTeamRequest(filter: $filter) {
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
          lastDonation
          donationNotes
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
` as GeneratedSubscription<
  APITypes.OnCreateTeamRequestSubscriptionVariables,
  APITypes.OnCreateTeamRequestSubscription
>;
export const onUpdateTeamRequest = /* GraphQL */ `subscription OnUpdateTeamRequest(
  $filter: ModelSubscriptionTeamRequestFilterInput
) {
  onUpdateTeamRequest(filter: $filter) {
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
          lastDonation
          donationNotes
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
` as GeneratedSubscription<
  APITypes.OnUpdateTeamRequestSubscriptionVariables,
  APITypes.OnUpdateTeamRequestSubscription
>;
export const onDeleteTeamRequest = /* GraphQL */ `subscription OnDeleteTeamRequest(
  $filter: ModelSubscriptionTeamRequestFilterInput
) {
  onDeleteTeamRequest(filter: $filter) {
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
          lastDonation
          donationNotes
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
` as GeneratedSubscription<
  APITypes.OnDeleteTeamRequestSubscriptionVariables,
  APITypes.OnDeleteTeamRequestSubscription
>;
export const onCreateClothingInventory = /* GraphQL */ `subscription OnCreateClothingInventory(
  $filter: ModelSubscriptionClothingInventoryFilterInput
) {
  onCreateClothingInventory(filter: $filter) {
    id
    category
    size
    quantity
    location
    notes
    lastUpdated
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateClothingInventorySubscriptionVariables,
  APITypes.OnCreateClothingInventorySubscription
>;
export const onUpdateClothingInventory = /* GraphQL */ `subscription OnUpdateClothingInventory(
  $filter: ModelSubscriptionClothingInventoryFilterInput
) {
  onUpdateClothingInventory(filter: $filter) {
    id
    category
    size
    quantity
    location
    notes
    lastUpdated
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateClothingInventorySubscriptionVariables,
  APITypes.OnUpdateClothingInventorySubscription
>;
export const onDeleteClothingInventory = /* GraphQL */ `subscription OnDeleteClothingInventory(
  $filter: ModelSubscriptionClothingInventoryFilterInput
) {
  onDeleteClothingInventory(filter: $filter) {
    id
    category
    size
    quantity
    location
    notes
    lastUpdated
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteClothingInventorySubscriptionVariables,
  APITypes.OnDeleteClothingInventorySubscription
>;
export const onCreateInventoryMessage = /* GraphQL */ `subscription OnCreateInventoryMessage(
  $filter: ModelSubscriptionInventoryMessageFilterInput
) {
  onCreateInventoryMessage(filter: $filter) {
    id
    content
    authorId
    authorName
    resolved
    resolvedBy
    resolvedAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateInventoryMessageSubscriptionVariables,
  APITypes.OnCreateInventoryMessageSubscription
>;
export const onUpdateInventoryMessage = /* GraphQL */ `subscription OnUpdateInventoryMessage(
  $filter: ModelSubscriptionInventoryMessageFilterInput
) {
  onUpdateInventoryMessage(filter: $filter) {
    id
    content
    authorId
    authorName
    resolved
    resolvedBy
    resolvedAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateInventoryMessageSubscriptionVariables,
  APITypes.OnUpdateInventoryMessageSubscription
>;
export const onDeleteInventoryMessage = /* GraphQL */ `subscription OnDeleteInventoryMessage(
  $filter: ModelSubscriptionInventoryMessageFilterInput
) {
  onDeleteInventoryMessage(filter: $filter) {
    id
    content
    authorId
    authorName
    resolved
    resolvedBy
    resolvedAt
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteInventoryMessageSubscriptionVariables,
  APITypes.OnDeleteInventoryMessageSubscription
>;
export const onCreateAskedMembers = /* GraphQL */ `subscription OnCreateAskedMembers(
  $filter: ModelSubscriptionAskedMembersFilterInput
) {
  onCreateAskedMembers(filter: $filter) {
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
      lastDonation
      donationNotes
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
` as GeneratedSubscription<
  APITypes.OnCreateAskedMembersSubscriptionVariables,
  APITypes.OnCreateAskedMembersSubscription
>;
export const onUpdateAskedMembers = /* GraphQL */ `subscription OnUpdateAskedMembers(
  $filter: ModelSubscriptionAskedMembersFilterInput
) {
  onUpdateAskedMembers(filter: $filter) {
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
      lastDonation
      donationNotes
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
` as GeneratedSubscription<
  APITypes.OnUpdateAskedMembersSubscriptionVariables,
  APITypes.OnUpdateAskedMembersSubscription
>;
export const onDeleteAskedMembers = /* GraphQL */ `subscription OnDeleteAskedMembers(
  $filter: ModelSubscriptionAskedMembersFilterInput
) {
  onDeleteAskedMembers(filter: $filter) {
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
      lastDonation
      donationNotes
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
` as GeneratedSubscription<
  APITypes.OnDeleteAskedMembersSubscriptionVariables,
  APITypes.OnDeleteAskedMembersSubscription
>;
