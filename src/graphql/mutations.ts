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
      address1
      address2
      city
      zipCode
      phone
      email
      spanishOnly
      preferredContactTime
      request
      specificNeed
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
      address1
      address2
      city
      zipCode
      phone
      email
      spanishOnly
      preferredContactTime
      request
      specificNeed
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
      address1
      address2
      city
      zipCode
      phone
      email
      spanishOnly
      preferredContactTime
      request
      specificNeed
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
