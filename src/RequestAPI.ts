/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRequestInput = {
  id?: string | null,
  dateOfRequest: string,
  firstName: string,
  lastName: string,
  address1?: string | null,
  address2?: string | null,
  city: string,
  zipCode?: number | null,
  phone?: string | null,
  email?: string | null,
  spanishOnly?: boolean | null,
  preferredContactTime?: string | null,
  request?: string | null,
  specificNeed?: string | null,
  status?: string | null,
  note?: string | null,
  needFulfiller?: string | null,
  dateFulfilled?: string | null,
  followUp?: string | null,
};

export type ModelRequestConditionInput = {
  dateOfRequest?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  address1?: ModelStringInput | null,
  address2?: ModelStringInput | null,
  city?: ModelStringInput | null,
  zipCode?: ModelIntInput | null,
  phone?: ModelStringInput | null,
  email?: ModelStringInput | null,
  spanishOnly?: ModelBooleanInput | null,
  preferredContactTime?: ModelStringInput | null,
  request?: ModelStringInput | null,
  specificNeed?: ModelStringInput | null,
  status?: ModelStringInput | null,
  note?: ModelStringInput | null,
  needFulfiller?: ModelStringInput | null,
  dateFulfilled?: ModelStringInput | null,
  followUp?: ModelStringInput | null,
  and?: Array< ModelRequestConditionInput | null > | null,
  or?: Array< ModelRequestConditionInput | null > | null,
  not?: ModelRequestConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Request = {
  __typename: "Request",
  id: string,
  dateOfRequest: string,
  firstName: string,
  lastName: string,
  address1?: string | null,
  address2?: string | null,
  city: string,
  zipCode?: number | null,
  phone?: string | null,
  email?: string | null,
  spanishOnly?: boolean | null,
  preferredContactTime?: string | null,
  request?: string | null,
  specificNeed?: string | null,
  status?: string | null,
  note?: string | null,
  needFulfiller?: string | null,
  dateFulfilled?: string | null,
  followUp?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRequestInput = {
  id: string,
  dateOfRequest?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  address1?: string | null,
  address2?: string | null,
  city?: string | null,
  zipCode?: number | null,
  phone?: string | null,
  email?: string | null,
  spanishOnly?: boolean | null,
  preferredContactTime?: string | null,
  request?: string | null,
  specificNeed?: string | null,
  status?: string | null,
  note?: string | null,
  needFulfiller?: string | null,
  dateFulfilled?: string | null,
  followUp?: string | null,
};

export type DeleteRequestInput = {
  id: string,
};

export type ModelRequestFilterInput = {
  id?: ModelIDInput | null,
  dateOfRequest?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  address1?: ModelStringInput | null,
  address2?: ModelStringInput | null,
  city?: ModelStringInput | null,
  zipCode?: ModelIntInput | null,
  phone?: ModelStringInput | null,
  email?: ModelStringInput | null,
  spanishOnly?: ModelBooleanInput | null,
  preferredContactTime?: ModelStringInput | null,
  request?: ModelStringInput | null,
  specificNeed?: ModelStringInput | null,
  status?: ModelStringInput | null,
  note?: ModelStringInput | null,
  needFulfiller?: ModelStringInput | null,
  dateFulfilled?: ModelStringInput | null,
  followUp?: ModelStringInput | null,
  and?: Array< ModelRequestFilterInput | null > | null,
  or?: Array< ModelRequestFilterInput | null > | null,
  not?: ModelRequestFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelRequestConnection = {
  __typename: "ModelRequestConnection",
  items?:  Array<Request | null > | null,
  nextToken?: string | null,
};

export type CreateRequestMutationVariables = {
  input: CreateRequestInput,
  condition?: ModelRequestConditionInput | null,
};

export type CreateRequestMutation = {
  createRequest?:  {
    __typename: "Request",
    id: string,
    dateOfRequest: string,
    firstName: string,
    lastName: string,
    address1?: string | null,
    address2?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    specificNeed?: string | null,
    status?: string | null,
    note?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRequestMutationVariables = {
  input: UpdateRequestInput,
  condition?: ModelRequestConditionInput | null,
};

export type UpdateRequestMutation = {
  updateRequest?:  {
    __typename: "Request",
    id: string,
    dateOfRequest: string,
    firstName: string,
    lastName: string,
    address1?: string | null,
    address2?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    specificNeed?: string | null,
    status?: string | null,
    note?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRequestMutationVariables = {
  input: DeleteRequestInput,
  condition?: ModelRequestConditionInput | null,
};

export type DeleteRequestMutation = {
  deleteRequest?:  {
    __typename: "Request",
    id: string,
    dateOfRequest: string,
    firstName: string,
    lastName: string,
    address1?: string | null,
    address2?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    specificNeed?: string | null,
    status?: string | null,
    note?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetRequestQueryVariables = {
  id: string,
};

export type GetRequestQuery = {
  getRequest?:  {
    __typename: "Request",
    id: string,
    dateOfRequest: string,
    firstName: string,
    lastName: string,
    address1?: string | null,
    address2?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    specificNeed?: string | null,
    status?: string | null,
    note?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRequestsQueryVariables = {
  filter?: ModelRequestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRequestsQuery = {
  listRequests?:  {
    __typename: "ModelRequestConnection",
    items?:  Array< {
      __typename: "Request",
      id: string,
      dateOfRequest: string,
      firstName: string,
      lastName: string,
      address1?: string | null,
      address2?: string | null,
      city: string,
      zipCode?: number | null,
      phone?: string | null,
      email?: string | null,
      spanishOnly?: boolean | null,
      preferredContactTime?: string | null,
      request?: string | null,
      specificNeed?: string | null,
      status?: string | null,
      note?: string | null,
      needFulfiller?: string | null,
      dateFulfilled?: string | null,
      followUp?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateRequestSubscription = {
  onCreateRequest?:  {
    __typename: "Request",
    id: string,
    dateOfRequest: string,
    firstName: string,
    lastName: string,
    address1?: string | null,
    address2?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    specificNeed?: string | null,
    status?: string | null,
    note?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRequestSubscription = {
  onUpdateRequest?:  {
    __typename: "Request",
    id: string,
    dateOfRequest: string,
    firstName: string,
    lastName: string,
    address1?: string | null,
    address2?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    specificNeed?: string | null,
    status?: string | null,
    note?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRequestSubscription = {
  onDeleteRequest?:  {
    __typename: "Request",
    id: string,
    dateOfRequest: string,
    firstName: string,
    lastName: string,
    address1?: string | null,
    address2?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    specificNeed?: string | null,
    status?: string | null,
    note?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
