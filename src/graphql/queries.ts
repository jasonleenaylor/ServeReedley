/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRequest = /* GraphQL */ `
  query GetRequest($id: ID!) {
    getRequest(id: $id) {
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
export const listRequests = /* GraphQL */ `
  query ListRequests(
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
