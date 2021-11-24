/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRequestInput = {
  id?: string | null,
  dateOfRequest: string,
  firstName: string,
  lastName: string,
  address?: string | null,
  city: string,
  zipCode?: number | null,
  phone?: string | null,
  email?: string | null,
  spanishOnly?: boolean | null,
  preferredContactTime?: string | null,
  request?: string | null,
  leadSource: LeadSource,
  leadOtherDetails?: string | null,
  needReason: Array< NeedReason | null >,
  needTypes: Array< NeedType | null >,
  status: RequestStatus,
  note?: string | null,
  needFulfiller?: string | null,
  dateFulfilled?: string | null,
  followUp?: string | null,
  requestSelfOrOtherInfoId: string,
  requestFoodRequestId?: string | null,
};

export enum LeadSource {
  REDEEMERS = "REDEEMERS",
  FAMILY = "FAMILY",
  FRIEND = "FRIEND",
  OTHER = "OTHER",
}


export enum NeedReason {
  COVID = "COVID",
  ILLNESS = "ILLNESS",
  FINANCIAL = "FINANCIAL",
}


export enum NeedType {
  MEALS = "MEALS",
  GROCERIES = "GROCERIES",
  MOVING = "MOVING",
  JOBTRAINING = "JOBTRAINING",
  HOMEREPAIR = "HOMEREPAIR",
  CARREPAIR = "CARREPAIR",
  HOUSING = "HOUSING",
  CLOTHING = "CLOTHING",
  FURNITURE = "FURNITURE",
  OTHER = "OTHER",
}


export enum RequestStatus {
  NEW = "NEW",
  INPROGRESS = "INPROGRESS",
  FULFILLED = "FULFILLED",
}


export type ModelRequestConditionInput = {
  dateOfRequest?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  address?: ModelStringInput | null,
  city?: ModelStringInput | null,
  zipCode?: ModelIntInput | null,
  phone?: ModelStringInput | null,
  email?: ModelStringInput | null,
  spanishOnly?: ModelBooleanInput | null,
  preferredContactTime?: ModelStringInput | null,
  request?: ModelStringInput | null,
  leadSource?: ModelLeadSourceInput | null,
  leadOtherDetails?: ModelStringInput | null,
  needReason?: ModelNeedReasonListInput | null,
  needTypes?: ModelNeedTypeListInput | null,
  status?: ModelRequestStatusInput | null,
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

export type ModelLeadSourceInput = {
  eq?: LeadSource | null,
  ne?: LeadSource | null,
};

export type ModelNeedReasonListInput = {
  eq?: Array< NeedReason | null > | null,
  ne?: Array< NeedReason | null > | null,
  contains?: NeedReason | null,
  notContains?: NeedReason | null,
};

export type ModelNeedTypeListInput = {
  eq?: Array< NeedType | null > | null,
  ne?: Array< NeedType | null > | null,
  contains?: NeedType | null,
  notContains?: NeedType | null,
};

export type ModelRequestStatusInput = {
  eq?: RequestStatus | null,
  ne?: RequestStatus | null,
};

export type Request = {
  __typename: "Request",
  id: string,
  dateOfRequest: string,
  firstName: string,
  lastName: string,
  address?: string | null,
  city: string,
  zipCode?: number | null,
  phone?: string | null,
  email?: string | null,
  spanishOnly?: boolean | null,
  preferredContactTime?: string | null,
  request?: string | null,
  leadSource: LeadSource,
  leadOtherDetails?: string | null,
  selfOrOtherInfo: SelfOrOtherInfo,
  foodRequest?: FoodInfo | null,
  needReason: Array< NeedReason | null >,
  needTypes: Array< NeedType | null >,
  status: RequestStatus,
  note?: string | null,
  needFulfiller?: string | null,
  dateFulfilled?: string | null,
  followUp?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type SelfOrOtherInfo = {
  __typename: "SelfOrOtherInfo",
  id: string,
  forSelf?: boolean | null,
  usedOtherResources?: boolean | null,
  otherResources?: string | null,
  requestFor?: string | null,
  requestIsKnown?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type FoodInfo = {
  __typename: "FoodInfo",
  id: string,
  familyMembers?: number | null,
  children?: string | null,
  haveAllergies?: boolean | null,
  allergies?: string | null,
  groceries?: Groceries | null,
  createdAt: string,
  updatedAt: string,
};

export type Groceries = {
  __typename: "Groceries",
  id: string,
  milk?: boolean | null,
  eggs?: boolean | null,
  bread?: boolean | null,
  tortillas?: boolean | null,
  rice?: boolean | null,
  beans?: boolean | null,
  cheese?: boolean | null,
  beef?: boolean | null,
  hotdogs?: boolean | null,
  lunchMeat?: boolean | null,
  fruit?: boolean | null,
  peanutButter?: boolean | null,
  jelly?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRequestInput = {
  id: string,
  dateOfRequest?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  address?: string | null,
  city?: string | null,
  zipCode?: number | null,
  phone?: string | null,
  email?: string | null,
  spanishOnly?: boolean | null,
  preferredContactTime?: string | null,
  request?: string | null,
  leadSource?: LeadSource | null,
  leadOtherDetails?: string | null,
  needReason?: Array< NeedReason | null > | null,
  needTypes?: Array< NeedType | null > | null,
  status?: RequestStatus | null,
  note?: string | null,
  needFulfiller?: string | null,
  dateFulfilled?: string | null,
  followUp?: string | null,
  requestSelfOrOtherInfoId?: string | null,
  requestFoodRequestId?: string | null,
};

export type DeleteRequestInput = {
  id: string,
};

export type CreateSelfOrOtherInfoInput = {
  id?: string | null,
  forSelf?: boolean | null,
  usedOtherResources?: boolean | null,
  otherResources?: string | null,
  requestFor?: string | null,
  requestIsKnown?: boolean | null,
};

export type ModelSelfOrOtherInfoConditionInput = {
  forSelf?: ModelBooleanInput | null,
  usedOtherResources?: ModelBooleanInput | null,
  otherResources?: ModelStringInput | null,
  requestFor?: ModelStringInput | null,
  requestIsKnown?: ModelBooleanInput | null,
  and?: Array< ModelSelfOrOtherInfoConditionInput | null > | null,
  or?: Array< ModelSelfOrOtherInfoConditionInput | null > | null,
  not?: ModelSelfOrOtherInfoConditionInput | null,
};

export type UpdateSelfOrOtherInfoInput = {
  forSelf?: boolean | null,
  usedOtherResources?: boolean | null,
  otherResources?: string | null,
  requestFor?: string | null,
  requestIsKnown?: boolean | null,
};

export type DeleteSelfOrOtherInfoInput = {
  id: string,
};

export type CreateFoodInfoInput = {
  id?: string | null,
  familyMembers?: number | null,
  children?: string | null,
  haveAllergies?: boolean | null,
  allergies?: string | null,
  foodInfoGroceriesId?: string | null,
};

export type ModelFoodInfoConditionInput = {
  familyMembers?: ModelIntInput | null,
  children?: ModelStringInput | null,
  haveAllergies?: ModelBooleanInput | null,
  allergies?: ModelStringInput | null,
  and?: Array< ModelFoodInfoConditionInput | null > | null,
  or?: Array< ModelFoodInfoConditionInput | null > | null,
  not?: ModelFoodInfoConditionInput | null,
};

export type UpdateFoodInfoInput = {
  familyMembers?: number | null,
  children?: string | null,
  haveAllergies?: boolean | null,
  allergies?: string | null,
  foodInfoGroceriesId?: string | null,
};

export type DeleteFoodInfoInput = {
  id: string,
};

export type CreateGroceriesInput = {
  id?: string | null,
  milk?: boolean | null,
  eggs?: boolean | null,
  bread?: boolean | null,
  tortillas?: boolean | null,
  rice?: boolean | null,
  beans?: boolean | null,
  cheese?: boolean | null,
  beef?: boolean | null,
  hotdogs?: boolean | null,
  lunchMeat?: boolean | null,
  fruit?: boolean | null,
  peanutButter?: boolean | null,
  jelly?: boolean | null,
};

export type ModelGroceriesConditionInput = {
  milk?: ModelBooleanInput | null,
  eggs?: ModelBooleanInput | null,
  bread?: ModelBooleanInput | null,
  tortillas?: ModelBooleanInput | null,
  rice?: ModelBooleanInput | null,
  beans?: ModelBooleanInput | null,
  cheese?: ModelBooleanInput | null,
  beef?: ModelBooleanInput | null,
  hotdogs?: ModelBooleanInput | null,
  lunchMeat?: ModelBooleanInput | null,
  fruit?: ModelBooleanInput | null,
  peanutButter?: ModelBooleanInput | null,
  jelly?: ModelBooleanInput | null,
  and?: Array< ModelGroceriesConditionInput | null > | null,
  or?: Array< ModelGroceriesConditionInput | null > | null,
  not?: ModelGroceriesConditionInput | null,
};

export type UpdateGroceriesInput = {
  milk?: boolean | null,
  eggs?: boolean | null,
  bread?: boolean | null,
  tortillas?: boolean | null,
  rice?: boolean | null,
  beans?: boolean | null,
  cheese?: boolean | null,
  beef?: boolean | null,
  hotdogs?: boolean | null,
  lunchMeat?: boolean | null,
  fruit?: boolean | null,
  peanutButter?: boolean | null,
  jelly?: boolean | null,
};

export type DeleteGroceriesInput = {
  id: string,
};

export type ModelRequestFilterInput = {
  id?: ModelIDInput | null,
  dateOfRequest?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  address?: ModelStringInput | null,
  city?: ModelStringInput | null,
  zipCode?: ModelIntInput | null,
  phone?: ModelStringInput | null,
  email?: ModelStringInput | null,
  spanishOnly?: ModelBooleanInput | null,
  preferredContactTime?: ModelStringInput | null,
  request?: ModelStringInput | null,
  leadSource?: ModelLeadSourceInput | null,
  leadOtherDetails?: ModelStringInput | null,
  needReason?: ModelNeedReasonListInput | null,
  needTypes?: ModelNeedTypeListInput | null,
  status?: ModelRequestStatusInput | null,
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

export type ModelSelfOrOtherInfoFilterInput = {
  forSelf?: ModelBooleanInput | null,
  usedOtherResources?: ModelBooleanInput | null,
  otherResources?: ModelStringInput | null,
  requestFor?: ModelStringInput | null,
  requestIsKnown?: ModelBooleanInput | null,
  and?: Array< ModelSelfOrOtherInfoFilterInput | null > | null,
  or?: Array< ModelSelfOrOtherInfoFilterInput | null > | null,
  not?: ModelSelfOrOtherInfoFilterInput | null,
};

export type ModelSelfOrOtherInfoConnection = {
  __typename: "ModelSelfOrOtherInfoConnection",
  items?:  Array<SelfOrOtherInfo | null > | null,
  nextToken?: string | null,
};

export type ModelFoodInfoFilterInput = {
  familyMembers?: ModelIntInput | null,
  children?: ModelStringInput | null,
  haveAllergies?: ModelBooleanInput | null,
  allergies?: ModelStringInput | null,
  and?: Array< ModelFoodInfoFilterInput | null > | null,
  or?: Array< ModelFoodInfoFilterInput | null > | null,
  not?: ModelFoodInfoFilterInput | null,
};

export type ModelFoodInfoConnection = {
  __typename: "ModelFoodInfoConnection",
  items?:  Array<FoodInfo | null > | null,
  nextToken?: string | null,
};

export type ModelGroceriesFilterInput = {
  milk?: ModelBooleanInput | null,
  eggs?: ModelBooleanInput | null,
  bread?: ModelBooleanInput | null,
  tortillas?: ModelBooleanInput | null,
  rice?: ModelBooleanInput | null,
  beans?: ModelBooleanInput | null,
  cheese?: ModelBooleanInput | null,
  beef?: ModelBooleanInput | null,
  hotdogs?: ModelBooleanInput | null,
  lunchMeat?: ModelBooleanInput | null,
  fruit?: ModelBooleanInput | null,
  peanutButter?: ModelBooleanInput | null,
  jelly?: ModelBooleanInput | null,
  and?: Array< ModelGroceriesFilterInput | null > | null,
  or?: Array< ModelGroceriesFilterInput | null > | null,
  not?: ModelGroceriesFilterInput | null,
};

export type ModelGroceriesConnection = {
  __typename: "ModelGroceriesConnection",
  items?:  Array<Groceries | null > | null,
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
    address?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    leadSource: LeadSource,
    leadOtherDetails?: string | null,
    selfOrOtherInfo:  {
      __typename: "SelfOrOtherInfo",
      id: string,
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      id: string,
      familyMembers?: number | null,
      children?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      groceries?:  {
        __typename: "Groceries",
        id: string,
        milk?: boolean | null,
        eggs?: boolean | null,
        bread?: boolean | null,
        tortillas?: boolean | null,
        rice?: boolean | null,
        beans?: boolean | null,
        cheese?: boolean | null,
        beef?: boolean | null,
        hotdogs?: boolean | null,
        lunchMeat?: boolean | null,
        fruit?: boolean | null,
        peanutButter?: boolean | null,
        jelly?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    status: RequestStatus,
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
    address?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    leadSource: LeadSource,
    leadOtherDetails?: string | null,
    selfOrOtherInfo:  {
      __typename: "SelfOrOtherInfo",
      id: string,
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      id: string,
      familyMembers?: number | null,
      children?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      groceries?:  {
        __typename: "Groceries",
        id: string,
        milk?: boolean | null,
        eggs?: boolean | null,
        bread?: boolean | null,
        tortillas?: boolean | null,
        rice?: boolean | null,
        beans?: boolean | null,
        cheese?: boolean | null,
        beef?: boolean | null,
        hotdogs?: boolean | null,
        lunchMeat?: boolean | null,
        fruit?: boolean | null,
        peanutButter?: boolean | null,
        jelly?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    status: RequestStatus,
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
    address?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    leadSource: LeadSource,
    leadOtherDetails?: string | null,
    selfOrOtherInfo:  {
      __typename: "SelfOrOtherInfo",
      id: string,
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      id: string,
      familyMembers?: number | null,
      children?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      groceries?:  {
        __typename: "Groceries",
        id: string,
        milk?: boolean | null,
        eggs?: boolean | null,
        bread?: boolean | null,
        tortillas?: boolean | null,
        rice?: boolean | null,
        beans?: boolean | null,
        cheese?: boolean | null,
        beef?: boolean | null,
        hotdogs?: boolean | null,
        lunchMeat?: boolean | null,
        fruit?: boolean | null,
        peanutButter?: boolean | null,
        jelly?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    status: RequestStatus,
    note?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSelfOrOtherInfoMutationVariables = {
  input: CreateSelfOrOtherInfoInput,
  condition?: ModelSelfOrOtherInfoConditionInput | null,
};

export type CreateSelfOrOtherInfoMutation = {
  createSelfOrOtherInfo?:  {
    __typename: "SelfOrOtherInfo",
    id: string,
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSelfOrOtherInfoMutationVariables = {
  input: UpdateSelfOrOtherInfoInput,
  condition?: ModelSelfOrOtherInfoConditionInput | null,
};

export type UpdateSelfOrOtherInfoMutation = {
  updateSelfOrOtherInfo?:  {
    __typename: "SelfOrOtherInfo",
    id: string,
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSelfOrOtherInfoMutationVariables = {
  input: DeleteSelfOrOtherInfoInput,
  condition?: ModelSelfOrOtherInfoConditionInput | null,
};

export type DeleteSelfOrOtherInfoMutation = {
  deleteSelfOrOtherInfo?:  {
    __typename: "SelfOrOtherInfo",
    id: string,
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateFoodInfoMutationVariables = {
  input: CreateFoodInfoInput,
  condition?: ModelFoodInfoConditionInput | null,
};

export type CreateFoodInfoMutation = {
  createFoodInfo?:  {
    __typename: "FoodInfo",
    id: string,
    familyMembers?: number | null,
    children?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    groceries?:  {
      __typename: "Groceries",
      id: string,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      tortillas?: boolean | null,
      rice?: boolean | null,
      beans?: boolean | null,
      cheese?: boolean | null,
      beef?: boolean | null,
      hotdogs?: boolean | null,
      lunchMeat?: boolean | null,
      fruit?: boolean | null,
      peanutButter?: boolean | null,
      jelly?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFoodInfoMutationVariables = {
  input: UpdateFoodInfoInput,
  condition?: ModelFoodInfoConditionInput | null,
};

export type UpdateFoodInfoMutation = {
  updateFoodInfo?:  {
    __typename: "FoodInfo",
    id: string,
    familyMembers?: number | null,
    children?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    groceries?:  {
      __typename: "Groceries",
      id: string,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      tortillas?: boolean | null,
      rice?: boolean | null,
      beans?: boolean | null,
      cheese?: boolean | null,
      beef?: boolean | null,
      hotdogs?: boolean | null,
      lunchMeat?: boolean | null,
      fruit?: boolean | null,
      peanutButter?: boolean | null,
      jelly?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFoodInfoMutationVariables = {
  input: DeleteFoodInfoInput,
  condition?: ModelFoodInfoConditionInput | null,
};

export type DeleteFoodInfoMutation = {
  deleteFoodInfo?:  {
    __typename: "FoodInfo",
    id: string,
    familyMembers?: number | null,
    children?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    groceries?:  {
      __typename: "Groceries",
      id: string,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      tortillas?: boolean | null,
      rice?: boolean | null,
      beans?: boolean | null,
      cheese?: boolean | null,
      beef?: boolean | null,
      hotdogs?: boolean | null,
      lunchMeat?: boolean | null,
      fruit?: boolean | null,
      peanutButter?: boolean | null,
      jelly?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGroceriesMutationVariables = {
  input: CreateGroceriesInput,
  condition?: ModelGroceriesConditionInput | null,
};

export type CreateGroceriesMutation = {
  createGroceries?:  {
    __typename: "Groceries",
    id: string,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    tortillas?: boolean | null,
    rice?: boolean | null,
    beans?: boolean | null,
    cheese?: boolean | null,
    beef?: boolean | null,
    hotdogs?: boolean | null,
    lunchMeat?: boolean | null,
    fruit?: boolean | null,
    peanutButter?: boolean | null,
    jelly?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGroceriesMutationVariables = {
  input: UpdateGroceriesInput,
  condition?: ModelGroceriesConditionInput | null,
};

export type UpdateGroceriesMutation = {
  updateGroceries?:  {
    __typename: "Groceries",
    id: string,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    tortillas?: boolean | null,
    rice?: boolean | null,
    beans?: boolean | null,
    cheese?: boolean | null,
    beef?: boolean | null,
    hotdogs?: boolean | null,
    lunchMeat?: boolean | null,
    fruit?: boolean | null,
    peanutButter?: boolean | null,
    jelly?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGroceriesMutationVariables = {
  input: DeleteGroceriesInput,
  condition?: ModelGroceriesConditionInput | null,
};

export type DeleteGroceriesMutation = {
  deleteGroceries?:  {
    __typename: "Groceries",
    id: string,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    tortillas?: boolean | null,
    rice?: boolean | null,
    beans?: boolean | null,
    cheese?: boolean | null,
    beef?: boolean | null,
    hotdogs?: boolean | null,
    lunchMeat?: boolean | null,
    fruit?: boolean | null,
    peanutButter?: boolean | null,
    jelly?: boolean | null,
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
    address?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    leadSource: LeadSource,
    leadOtherDetails?: string | null,
    selfOrOtherInfo:  {
      __typename: "SelfOrOtherInfo",
      id: string,
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      id: string,
      familyMembers?: number | null,
      children?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      groceries?:  {
        __typename: "Groceries",
        id: string,
        milk?: boolean | null,
        eggs?: boolean | null,
        bread?: boolean | null,
        tortillas?: boolean | null,
        rice?: boolean | null,
        beans?: boolean | null,
        cheese?: boolean | null,
        beef?: boolean | null,
        hotdogs?: boolean | null,
        lunchMeat?: boolean | null,
        fruit?: boolean | null,
        peanutButter?: boolean | null,
        jelly?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    status: RequestStatus,
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
      address?: string | null,
      city: string,
      zipCode?: number | null,
      phone?: string | null,
      email?: string | null,
      spanishOnly?: boolean | null,
      preferredContactTime?: string | null,
      request?: string | null,
      leadSource: LeadSource,
      leadOtherDetails?: string | null,
      selfOrOtherInfo:  {
        __typename: "SelfOrOtherInfo",
        id: string,
        forSelf?: boolean | null,
        usedOtherResources?: boolean | null,
        otherResources?: string | null,
        requestFor?: string | null,
        requestIsKnown?: boolean | null,
        createdAt: string,
        updatedAt: string,
      },
      foodRequest?:  {
        __typename: "FoodInfo",
        id: string,
        familyMembers?: number | null,
        children?: string | null,
        haveAllergies?: boolean | null,
        allergies?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      needReason: Array< NeedReason | null >,
      needTypes: Array< NeedType | null >,
      status: RequestStatus,
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

export type GetSelfOrOtherInfoQueryVariables = {
  id: string,
};

export type GetSelfOrOtherInfoQuery = {
  getSelfOrOtherInfo?:  {
    __typename: "SelfOrOtherInfo",
    id: string,
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSelfOrOtherInfosQueryVariables = {
  filter?: ModelSelfOrOtherInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSelfOrOtherInfosQuery = {
  listSelfOrOtherInfos?:  {
    __typename: "ModelSelfOrOtherInfoConnection",
    items?:  Array< {
      __typename: "SelfOrOtherInfo",
      id: string,
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetFoodInfoQueryVariables = {
  id: string,
};

export type GetFoodInfoQuery = {
  getFoodInfo?:  {
    __typename: "FoodInfo",
    id: string,
    familyMembers?: number | null,
    children?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    groceries?:  {
      __typename: "Groceries",
      id: string,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      tortillas?: boolean | null,
      rice?: boolean | null,
      beans?: boolean | null,
      cheese?: boolean | null,
      beef?: boolean | null,
      hotdogs?: boolean | null,
      lunchMeat?: boolean | null,
      fruit?: boolean | null,
      peanutButter?: boolean | null,
      jelly?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFoodInfosQueryVariables = {
  filter?: ModelFoodInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFoodInfosQuery = {
  listFoodInfos?:  {
    __typename: "ModelFoodInfoConnection",
    items?:  Array< {
      __typename: "FoodInfo",
      id: string,
      familyMembers?: number | null,
      children?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      groceries?:  {
        __typename: "Groceries",
        id: string,
        milk?: boolean | null,
        eggs?: boolean | null,
        bread?: boolean | null,
        tortillas?: boolean | null,
        rice?: boolean | null,
        beans?: boolean | null,
        cheese?: boolean | null,
        beef?: boolean | null,
        hotdogs?: boolean | null,
        lunchMeat?: boolean | null,
        fruit?: boolean | null,
        peanutButter?: boolean | null,
        jelly?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetGroceriesQueryVariables = {
  id: string,
};

export type GetGroceriesQuery = {
  getGroceries?:  {
    __typename: "Groceries",
    id: string,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    tortillas?: boolean | null,
    rice?: boolean | null,
    beans?: boolean | null,
    cheese?: boolean | null,
    beef?: boolean | null,
    hotdogs?: boolean | null,
    lunchMeat?: boolean | null,
    fruit?: boolean | null,
    peanutButter?: boolean | null,
    jelly?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGroceriessQueryVariables = {
  filter?: ModelGroceriesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGroceriessQuery = {
  listGroceriess?:  {
    __typename: "ModelGroceriesConnection",
    items?:  Array< {
      __typename: "Groceries",
      id: string,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      tortillas?: boolean | null,
      rice?: boolean | null,
      beans?: boolean | null,
      cheese?: boolean | null,
      beef?: boolean | null,
      hotdogs?: boolean | null,
      lunchMeat?: boolean | null,
      fruit?: boolean | null,
      peanutButter?: boolean | null,
      jelly?: boolean | null,
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
    address?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    leadSource: LeadSource,
    leadOtherDetails?: string | null,
    selfOrOtherInfo:  {
      __typename: "SelfOrOtherInfo",
      id: string,
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      id: string,
      familyMembers?: number | null,
      children?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      groceries?:  {
        __typename: "Groceries",
        id: string,
        milk?: boolean | null,
        eggs?: boolean | null,
        bread?: boolean | null,
        tortillas?: boolean | null,
        rice?: boolean | null,
        beans?: boolean | null,
        cheese?: boolean | null,
        beef?: boolean | null,
        hotdogs?: boolean | null,
        lunchMeat?: boolean | null,
        fruit?: boolean | null,
        peanutButter?: boolean | null,
        jelly?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    status: RequestStatus,
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
    address?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    leadSource: LeadSource,
    leadOtherDetails?: string | null,
    selfOrOtherInfo:  {
      __typename: "SelfOrOtherInfo",
      id: string,
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      id: string,
      familyMembers?: number | null,
      children?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      groceries?:  {
        __typename: "Groceries",
        id: string,
        milk?: boolean | null,
        eggs?: boolean | null,
        bread?: boolean | null,
        tortillas?: boolean | null,
        rice?: boolean | null,
        beans?: boolean | null,
        cheese?: boolean | null,
        beef?: boolean | null,
        hotdogs?: boolean | null,
        lunchMeat?: boolean | null,
        fruit?: boolean | null,
        peanutButter?: boolean | null,
        jelly?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    status: RequestStatus,
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
    address?: string | null,
    city: string,
    zipCode?: number | null,
    phone?: string | null,
    email?: string | null,
    spanishOnly?: boolean | null,
    preferredContactTime?: string | null,
    request?: string | null,
    leadSource: LeadSource,
    leadOtherDetails?: string | null,
    selfOrOtherInfo:  {
      __typename: "SelfOrOtherInfo",
      id: string,
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      id: string,
      familyMembers?: number | null,
      children?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      groceries?:  {
        __typename: "Groceries",
        id: string,
        milk?: boolean | null,
        eggs?: boolean | null,
        bread?: boolean | null,
        tortillas?: boolean | null,
        rice?: boolean | null,
        beans?: boolean | null,
        cheese?: boolean | null,
        beef?: boolean | null,
        hotdogs?: boolean | null,
        lunchMeat?: boolean | null,
        fruit?: boolean | null,
        peanutButter?: boolean | null,
        jelly?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    status: RequestStatus,
    note?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSelfOrOtherInfoSubscription = {
  onCreateSelfOrOtherInfo?:  {
    __typename: "SelfOrOtherInfo",
    id: string,
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSelfOrOtherInfoSubscription = {
  onUpdateSelfOrOtherInfo?:  {
    __typename: "SelfOrOtherInfo",
    id: string,
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSelfOrOtherInfoSubscription = {
  onDeleteSelfOrOtherInfo?:  {
    __typename: "SelfOrOtherInfo",
    id: string,
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFoodInfoSubscription = {
  onCreateFoodInfo?:  {
    __typename: "FoodInfo",
    id: string,
    familyMembers?: number | null,
    children?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    groceries?:  {
      __typename: "Groceries",
      id: string,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      tortillas?: boolean | null,
      rice?: boolean | null,
      beans?: boolean | null,
      cheese?: boolean | null,
      beef?: boolean | null,
      hotdogs?: boolean | null,
      lunchMeat?: boolean | null,
      fruit?: boolean | null,
      peanutButter?: boolean | null,
      jelly?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFoodInfoSubscription = {
  onUpdateFoodInfo?:  {
    __typename: "FoodInfo",
    id: string,
    familyMembers?: number | null,
    children?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    groceries?:  {
      __typename: "Groceries",
      id: string,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      tortillas?: boolean | null,
      rice?: boolean | null,
      beans?: boolean | null,
      cheese?: boolean | null,
      beef?: boolean | null,
      hotdogs?: boolean | null,
      lunchMeat?: boolean | null,
      fruit?: boolean | null,
      peanutButter?: boolean | null,
      jelly?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFoodInfoSubscription = {
  onDeleteFoodInfo?:  {
    __typename: "FoodInfo",
    id: string,
    familyMembers?: number | null,
    children?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    groceries?:  {
      __typename: "Groceries",
      id: string,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      tortillas?: boolean | null,
      rice?: boolean | null,
      beans?: boolean | null,
      cheese?: boolean | null,
      beef?: boolean | null,
      hotdogs?: boolean | null,
      lunchMeat?: boolean | null,
      fruit?: boolean | null,
      peanutButter?: boolean | null,
      jelly?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGroceriesSubscription = {
  onCreateGroceries?:  {
    __typename: "Groceries",
    id: string,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    tortillas?: boolean | null,
    rice?: boolean | null,
    beans?: boolean | null,
    cheese?: boolean | null,
    beef?: boolean | null,
    hotdogs?: boolean | null,
    lunchMeat?: boolean | null,
    fruit?: boolean | null,
    peanutButter?: boolean | null,
    jelly?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGroceriesSubscription = {
  onUpdateGroceries?:  {
    __typename: "Groceries",
    id: string,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    tortillas?: boolean | null,
    rice?: boolean | null,
    beans?: boolean | null,
    cheese?: boolean | null,
    beef?: boolean | null,
    hotdogs?: boolean | null,
    lunchMeat?: boolean | null,
    fruit?: boolean | null,
    peanutButter?: boolean | null,
    jelly?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGroceriesSubscription = {
  onDeleteGroceries?:  {
    __typename: "Groceries",
    id: string,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    tortillas?: boolean | null,
    rice?: boolean | null,
    beans?: boolean | null,
    cheese?: boolean | null,
    beef?: boolean | null,
    hotdogs?: boolean | null,
    lunchMeat?: boolean | null,
    fruit?: boolean | null,
    peanutButter?: boolean | null,
    jelly?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
