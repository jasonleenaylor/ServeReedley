/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRequestInput = {
  id?: string | null,
  createdAt?: string | null,
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
  resumeHelp?: boolean | null,
  coverLetterHelp?: boolean | null,
  carRepairDetails?: string | null,
  clothingType?: string | null,
  clothingSize?: string | null,
  furnitureType?: string | null,
  housingHelp?: boolean | null,
  needReason: Array< NeedReason | null >,
  needTypes: Array< NeedType | null >,
  fulfilledNeeds?: Array< NeedType | null > | null,
  status: RequestStatus,
  otherNeeds?: string | null,
  needFulfiller?: string | null,
  dateFulfilled?: string | null,
  followUp?: string | null,
  requestSelfOrOtherInfoId: string,
  requestFoodRequestId?: string | null,
  requestMovingRequestId?: string | null,
  requestHomeRepairTypeId?: string | null,
  requestHouseholdItemsId?: string | null,
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
  HOUSEHOLDITEMS = "HOUSEHOLDITEMS",
  HYGENEITEMS = "HYGENEITEMS",
  CLOTHING = "CLOTHING",
  FURNITURE = "FURNITURE",
  OTHER = "OTHER",
}


export enum RequestStatus {
  NEW = "NEW",
  VETTED = "VETTED",
  INPROGRESS = "INPROGRESS",
  FULFILLED = "FULFILLED",
  INELIGIBLE = "INELIGIBLE",
  CANTFULFILL = "CANTFULFILL",
}


export type ModelRequestConditionInput = {
  createdAt?: ModelStringInput | null,
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
  resumeHelp?: ModelBooleanInput | null,
  coverLetterHelp?: ModelBooleanInput | null,
  carRepairDetails?: ModelStringInput | null,
  clothingType?: ModelStringInput | null,
  clothingSize?: ModelStringInput | null,
  furnitureType?: ModelStringInput | null,
  housingHelp?: ModelBooleanInput | null,
  needReason?: ModelNeedReasonInput | null,
  needTypes?: ModelNeedTypeInput | null,
  fulfilledNeeds?: ModelNeedTypeListInput | null,
  status?: ModelRequestStatusInput | null,
  otherNeeds?: ModelStringInput | null,
  needFulfiller?: ModelStringInput | null,
  dateFulfilled?: ModelStringInput | null,
  followUp?: ModelStringInput | null,
  and?: Array< ModelRequestConditionInput | null > | null,
  or?: Array< ModelRequestConditionInput | null > | null,
  not?: ModelRequestConditionInput | null,
  updatedAt?: ModelStringInput | null,
  requestSelfOrOtherInfoId?: ModelIDInput | null,
  requestFoodRequestId?: ModelIDInput | null,
  requestMovingRequestId?: ModelIDInput | null,
  requestHomeRepairTypeId?: ModelIDInput | null,
  requestHouseholdItemsId?: ModelIDInput | null,
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

export type ModelNeedReasonInput = {
  eq?: NeedReason | null,
  ne?: NeedReason | null,
};

export type ModelNeedTypeInput = {
  eq?: NeedType | null,
  ne?: NeedType | null,
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

export type Request = {
  __typename: "Request",
  id: string,
  createdAt?: string | null,
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
  movingRequest?: MovingInfo | null,
  resumeHelp?: boolean | null,
  coverLetterHelp?: boolean | null,
  carRepairDetails?: string | null,
  homeRepairType?: HomeRepairType | null,
  clothingType?: string | null,
  clothingSize?: string | null,
  furnitureType?: string | null,
  housingHelp?: boolean | null,
  householdItems?: HouseholdItems | null,
  needReason: Array< NeedReason | null >,
  needTypes: Array< NeedType | null >,
  fulfilledNeeds?: Array< NeedType | null > | null,
  status: RequestStatus,
  note?: ModelNoteTypeConnection | null,
  otherNeeds?: string | null,
  needFulfiller?: string | null,
  dateFulfilled?: string | null,
  followUp?: string | null,
  updatedAt: string,
  requestSelfOrOtherInfoId: string,
  requestFoodRequestId?: string | null,
  requestMovingRequestId?: string | null,
  requestHomeRepairTypeId?: string | null,
  requestHouseholdItemsId?: string | null,
};

export type SelfOrOtherInfo = {
  __typename: "SelfOrOtherInfo",
  forSelf?: boolean | null,
  usedOtherResources?: boolean | null,
  otherResources?: string | null,
  requestFor?: string | null,
  requestIsKnown?: boolean | null,
  phoneNumber?: string | null,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type FoodInfo = {
  __typename: "FoodInfo",
  familyMembers?: number | null,
  children?: string | null,
  deliveryTime?: string | null,
  haveAllergies?: boolean | null,
  allergies?: string | null,
  milk?: boolean | null,
  eggs?: boolean | null,
  bread?: boolean | null,
  butter?: boolean | null,
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
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type MovingInfo = {
  __typename: "MovingInfo",
  items?: string | null,
  haveTransportation?: boolean | null,
  steepDriveway?: boolean | null,
  stairs?: boolean | null,
  unpavedRoad?: boolean | null,
  other?: boolean | null,
  otherDetails?: string | null,
  liabilityAck?: boolean | null,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type HomeRepairType = {
  __typename: "HomeRepairType",
  plumbing?: boolean | null,
  electrical?: boolean | null,
  painting?: boolean | null,
  yardwork?: boolean | null,
  other?: boolean | null,
  details?: string | null,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type HouseholdItems = {
  __typename: "HouseholdItems",
  shampoo?: boolean | null,
  bathSoap?: boolean | null,
  toothpaste?: boolean | null,
  toothbrush?: boolean | null,
  deodorant?: boolean | null,
  toiletPaper?: boolean | null,
  handSoap?: boolean | null,
  sanitaryPads?: boolean | null,
  tampons?: boolean | null,
  bleach?: boolean | null,
  lysolSpray?: boolean | null,
  lysolWipes?: boolean | null,
  dishsoap?: boolean | null,
  sponges?: boolean | null,
  pinesol?: boolean | null,
  conditioner?: boolean | null,
  paperTowels?: boolean | null,
  laundrySoap?: boolean | null,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelNoteTypeConnection = {
  __typename: "ModelNoteTypeConnection",
  items:  Array<NoteType | null >,
  nextToken?: string | null,
};

export type NoteType = {
  __typename: "NoteType",
  id: string,
  requestID: string,
  dateCreated: string,
  author: string,
  content: string,
  notable?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRequestInput = {
  id: string,
  createdAt?: string | null,
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
  resumeHelp?: boolean | null,
  coverLetterHelp?: boolean | null,
  carRepairDetails?: string | null,
  clothingType?: string | null,
  clothingSize?: string | null,
  furnitureType?: string | null,
  housingHelp?: boolean | null,
  needReason?: Array< NeedReason | null > | null,
  needTypes?: Array< NeedType | null > | null,
  fulfilledNeeds?: Array< NeedType | null > | null,
  status?: RequestStatus | null,
  otherNeeds?: string | null,
  needFulfiller?: string | null,
  dateFulfilled?: string | null,
  followUp?: string | null,
  requestSelfOrOtherInfoId?: string | null,
  requestFoodRequestId?: string | null,
  requestMovingRequestId?: string | null,
  requestHomeRepairTypeId?: string | null,
  requestHouseholdItemsId?: string | null,
};

export type DeleteRequestInput = {
  id: string,
};

export type CreateNoteTypeInput = {
  id?: string | null,
  requestID: string,
  dateCreated: string,
  author: string,
  content: string,
  notable?: boolean | null,
};

export type ModelNoteTypeConditionInput = {
  requestID?: ModelIDInput | null,
  dateCreated?: ModelStringInput | null,
  author?: ModelStringInput | null,
  content?: ModelStringInput | null,
  notable?: ModelBooleanInput | null,
  and?: Array< ModelNoteTypeConditionInput | null > | null,
  or?: Array< ModelNoteTypeConditionInput | null > | null,
  not?: ModelNoteTypeConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateNoteTypeInput = {
  id: string,
  requestID?: string | null,
  dateCreated?: string | null,
  author?: string | null,
  content?: string | null,
  notable?: boolean | null,
};

export type DeleteNoteTypeInput = {
  id: string,
};

export type CreateSelfOrOtherInfoInput = {
  forSelf?: boolean | null,
  usedOtherResources?: boolean | null,
  otherResources?: string | null,
  requestFor?: string | null,
  requestIsKnown?: boolean | null,
  phoneNumber?: string | null,
  id?: string | null,
};

export type ModelSelfOrOtherInfoConditionInput = {
  forSelf?: ModelBooleanInput | null,
  usedOtherResources?: ModelBooleanInput | null,
  otherResources?: ModelStringInput | null,
  requestFor?: ModelStringInput | null,
  requestIsKnown?: ModelBooleanInput | null,
  phoneNumber?: ModelStringInput | null,
  and?: Array< ModelSelfOrOtherInfoConditionInput | null > | null,
  or?: Array< ModelSelfOrOtherInfoConditionInput | null > | null,
  not?: ModelSelfOrOtherInfoConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateSelfOrOtherInfoInput = {
  forSelf?: boolean | null,
  usedOtherResources?: boolean | null,
  otherResources?: string | null,
  requestFor?: string | null,
  requestIsKnown?: boolean | null,
  phoneNumber?: string | null,
  id: string,
};

export type DeleteSelfOrOtherInfoInput = {
  id: string,
};

export type CreateHouseholdItemsInput = {
  shampoo?: boolean | null,
  bathSoap?: boolean | null,
  toothpaste?: boolean | null,
  toothbrush?: boolean | null,
  deodorant?: boolean | null,
  toiletPaper?: boolean | null,
  handSoap?: boolean | null,
  sanitaryPads?: boolean | null,
  tampons?: boolean | null,
  bleach?: boolean | null,
  lysolSpray?: boolean | null,
  lysolWipes?: boolean | null,
  dishsoap?: boolean | null,
  sponges?: boolean | null,
  pinesol?: boolean | null,
  conditioner?: boolean | null,
  paperTowels?: boolean | null,
  laundrySoap?: boolean | null,
  id?: string | null,
};

export type ModelHouseholdItemsConditionInput = {
  shampoo?: ModelBooleanInput | null,
  bathSoap?: ModelBooleanInput | null,
  toothpaste?: ModelBooleanInput | null,
  toothbrush?: ModelBooleanInput | null,
  deodorant?: ModelBooleanInput | null,
  toiletPaper?: ModelBooleanInput | null,
  handSoap?: ModelBooleanInput | null,
  sanitaryPads?: ModelBooleanInput | null,
  tampons?: ModelBooleanInput | null,
  bleach?: ModelBooleanInput | null,
  lysolSpray?: ModelBooleanInput | null,
  lysolWipes?: ModelBooleanInput | null,
  dishsoap?: ModelBooleanInput | null,
  sponges?: ModelBooleanInput | null,
  pinesol?: ModelBooleanInput | null,
  conditioner?: ModelBooleanInput | null,
  paperTowels?: ModelBooleanInput | null,
  laundrySoap?: ModelBooleanInput | null,
  and?: Array< ModelHouseholdItemsConditionInput | null > | null,
  or?: Array< ModelHouseholdItemsConditionInput | null > | null,
  not?: ModelHouseholdItemsConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateHouseholdItemsInput = {
  shampoo?: boolean | null,
  bathSoap?: boolean | null,
  toothpaste?: boolean | null,
  toothbrush?: boolean | null,
  deodorant?: boolean | null,
  toiletPaper?: boolean | null,
  handSoap?: boolean | null,
  sanitaryPads?: boolean | null,
  tampons?: boolean | null,
  bleach?: boolean | null,
  lysolSpray?: boolean | null,
  lysolWipes?: boolean | null,
  dishsoap?: boolean | null,
  sponges?: boolean | null,
  pinesol?: boolean | null,
  conditioner?: boolean | null,
  paperTowels?: boolean | null,
  laundrySoap?: boolean | null,
  id: string,
};

export type DeleteHouseholdItemsInput = {
  id: string,
};

export type CreateFoodInfoInput = {
  familyMembers?: number | null,
  children?: string | null,
  deliveryTime?: string | null,
  haveAllergies?: boolean | null,
  allergies?: string | null,
  milk?: boolean | null,
  eggs?: boolean | null,
  bread?: boolean | null,
  butter?: boolean | null,
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
  id?: string | null,
};

export type ModelFoodInfoConditionInput = {
  familyMembers?: ModelIntInput | null,
  children?: ModelStringInput | null,
  deliveryTime?: ModelStringInput | null,
  haveAllergies?: ModelBooleanInput | null,
  allergies?: ModelStringInput | null,
  milk?: ModelBooleanInput | null,
  eggs?: ModelBooleanInput | null,
  bread?: ModelBooleanInput | null,
  butter?: ModelBooleanInput | null,
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
  and?: Array< ModelFoodInfoConditionInput | null > | null,
  or?: Array< ModelFoodInfoConditionInput | null > | null,
  not?: ModelFoodInfoConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateFoodInfoInput = {
  familyMembers?: number | null,
  children?: string | null,
  deliveryTime?: string | null,
  haveAllergies?: boolean | null,
  allergies?: string | null,
  milk?: boolean | null,
  eggs?: boolean | null,
  bread?: boolean | null,
  butter?: boolean | null,
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
  id: string,
};

export type DeleteFoodInfoInput = {
  id: string,
};

export type CreateMovingInfoInput = {
  items?: string | null,
  haveTransportation?: boolean | null,
  steepDriveway?: boolean | null,
  stairs?: boolean | null,
  unpavedRoad?: boolean | null,
  other?: boolean | null,
  otherDetails?: string | null,
  liabilityAck?: boolean | null,
  id?: string | null,
};

export type ModelMovingInfoConditionInput = {
  items?: ModelStringInput | null,
  haveTransportation?: ModelBooleanInput | null,
  steepDriveway?: ModelBooleanInput | null,
  stairs?: ModelBooleanInput | null,
  unpavedRoad?: ModelBooleanInput | null,
  other?: ModelBooleanInput | null,
  otherDetails?: ModelStringInput | null,
  liabilityAck?: ModelBooleanInput | null,
  and?: Array< ModelMovingInfoConditionInput | null > | null,
  or?: Array< ModelMovingInfoConditionInput | null > | null,
  not?: ModelMovingInfoConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateMovingInfoInput = {
  items?: string | null,
  haveTransportation?: boolean | null,
  steepDriveway?: boolean | null,
  stairs?: boolean | null,
  unpavedRoad?: boolean | null,
  other?: boolean | null,
  otherDetails?: string | null,
  liabilityAck?: boolean | null,
  id: string,
};

export type DeleteMovingInfoInput = {
  id: string,
};

export type CreateHomeRepairTypeInput = {
  plumbing?: boolean | null,
  electrical?: boolean | null,
  painting?: boolean | null,
  yardwork?: boolean | null,
  other?: boolean | null,
  details?: string | null,
  id?: string | null,
};

export type ModelHomeRepairTypeConditionInput = {
  plumbing?: ModelBooleanInput | null,
  electrical?: ModelBooleanInput | null,
  painting?: ModelBooleanInput | null,
  yardwork?: ModelBooleanInput | null,
  other?: ModelBooleanInput | null,
  details?: ModelStringInput | null,
  and?: Array< ModelHomeRepairTypeConditionInput | null > | null,
  or?: Array< ModelHomeRepairTypeConditionInput | null > | null,
  not?: ModelHomeRepairTypeConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateHomeRepairTypeInput = {
  plumbing?: boolean | null,
  electrical?: boolean | null,
  painting?: boolean | null,
  yardwork?: boolean | null,
  other?: boolean | null,
  details?: string | null,
  id: string,
};

export type DeleteHomeRepairTypeInput = {
  id: string,
};

export type ModelRequestFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
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
  resumeHelp?: ModelBooleanInput | null,
  coverLetterHelp?: ModelBooleanInput | null,
  carRepairDetails?: ModelStringInput | null,
  clothingType?: ModelStringInput | null,
  clothingSize?: ModelStringInput | null,
  furnitureType?: ModelStringInput | null,
  housingHelp?: ModelBooleanInput | null,
  needReason?: ModelNeedReasonInput | null,
  needTypes?: ModelNeedTypeInput | null,
  fulfilledNeeds?: ModelNeedTypeListInput | null,
  status?: ModelRequestStatusInput | null,
  otherNeeds?: ModelStringInput | null,
  needFulfiller?: ModelStringInput | null,
  dateFulfilled?: ModelStringInput | null,
  followUp?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelRequestFilterInput | null > | null,
  or?: Array< ModelRequestFilterInput | null > | null,
  not?: ModelRequestFilterInput | null,
  requestSelfOrOtherInfoId?: ModelIDInput | null,
  requestFoodRequestId?: ModelIDInput | null,
  requestMovingRequestId?: ModelIDInput | null,
  requestHomeRepairTypeId?: ModelIDInput | null,
  requestHouseholdItemsId?: ModelIDInput | null,
};

export type ModelRequestConnection = {
  __typename: "ModelRequestConnection",
  items:  Array<Request | null >,
  nextToken?: string | null,
};

export type ModelNoteTypeFilterInput = {
  id?: ModelIDInput | null,
  requestID?: ModelIDInput | null,
  dateCreated?: ModelStringInput | null,
  author?: ModelStringInput | null,
  content?: ModelStringInput | null,
  notable?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNoteTypeFilterInput | null > | null,
  or?: Array< ModelNoteTypeFilterInput | null > | null,
  not?: ModelNoteTypeFilterInput | null,
};

export type ModelSelfOrOtherInfoFilterInput = {
  forSelf?: ModelBooleanInput | null,
  usedOtherResources?: ModelBooleanInput | null,
  otherResources?: ModelStringInput | null,
  requestFor?: ModelStringInput | null,
  requestIsKnown?: ModelBooleanInput | null,
  phoneNumber?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSelfOrOtherInfoFilterInput | null > | null,
  or?: Array< ModelSelfOrOtherInfoFilterInput | null > | null,
  not?: ModelSelfOrOtherInfoFilterInput | null,
};

export type ModelSelfOrOtherInfoConnection = {
  __typename: "ModelSelfOrOtherInfoConnection",
  items:  Array<SelfOrOtherInfo | null >,
  nextToken?: string | null,
};

export type ModelHouseholdItemsFilterInput = {
  shampoo?: ModelBooleanInput | null,
  bathSoap?: ModelBooleanInput | null,
  toothpaste?: ModelBooleanInput | null,
  toothbrush?: ModelBooleanInput | null,
  deodorant?: ModelBooleanInput | null,
  toiletPaper?: ModelBooleanInput | null,
  handSoap?: ModelBooleanInput | null,
  sanitaryPads?: ModelBooleanInput | null,
  tampons?: ModelBooleanInput | null,
  bleach?: ModelBooleanInput | null,
  lysolSpray?: ModelBooleanInput | null,
  lysolWipes?: ModelBooleanInput | null,
  dishsoap?: ModelBooleanInput | null,
  sponges?: ModelBooleanInput | null,
  pinesol?: ModelBooleanInput | null,
  conditioner?: ModelBooleanInput | null,
  paperTowels?: ModelBooleanInput | null,
  laundrySoap?: ModelBooleanInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelHouseholdItemsFilterInput | null > | null,
  or?: Array< ModelHouseholdItemsFilterInput | null > | null,
  not?: ModelHouseholdItemsFilterInput | null,
};

export type ModelHouseholdItemsConnection = {
  __typename: "ModelHouseholdItemsConnection",
  items:  Array<HouseholdItems | null >,
  nextToken?: string | null,
};

export type ModelFoodInfoFilterInput = {
  familyMembers?: ModelIntInput | null,
  children?: ModelStringInput | null,
  deliveryTime?: ModelStringInput | null,
  haveAllergies?: ModelBooleanInput | null,
  allergies?: ModelStringInput | null,
  milk?: ModelBooleanInput | null,
  eggs?: ModelBooleanInput | null,
  bread?: ModelBooleanInput | null,
  butter?: ModelBooleanInput | null,
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
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelFoodInfoFilterInput | null > | null,
  or?: Array< ModelFoodInfoFilterInput | null > | null,
  not?: ModelFoodInfoFilterInput | null,
};

export type ModelFoodInfoConnection = {
  __typename: "ModelFoodInfoConnection",
  items:  Array<FoodInfo | null >,
  nextToken?: string | null,
};

export type ModelMovingInfoFilterInput = {
  items?: ModelStringInput | null,
  haveTransportation?: ModelBooleanInput | null,
  steepDriveway?: ModelBooleanInput | null,
  stairs?: ModelBooleanInput | null,
  unpavedRoad?: ModelBooleanInput | null,
  other?: ModelBooleanInput | null,
  otherDetails?: ModelStringInput | null,
  liabilityAck?: ModelBooleanInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMovingInfoFilterInput | null > | null,
  or?: Array< ModelMovingInfoFilterInput | null > | null,
  not?: ModelMovingInfoFilterInput | null,
};

export type ModelMovingInfoConnection = {
  __typename: "ModelMovingInfoConnection",
  items:  Array<MovingInfo | null >,
  nextToken?: string | null,
};

export type ModelHomeRepairTypeFilterInput = {
  plumbing?: ModelBooleanInput | null,
  electrical?: ModelBooleanInput | null,
  painting?: ModelBooleanInput | null,
  yardwork?: ModelBooleanInput | null,
  other?: ModelBooleanInput | null,
  details?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelHomeRepairTypeFilterInput | null > | null,
  or?: Array< ModelHomeRepairTypeFilterInput | null > | null,
  not?: ModelHomeRepairTypeFilterInput | null,
};

export type ModelHomeRepairTypeConnection = {
  __typename: "ModelHomeRepairTypeConnection",
  items:  Array<HomeRepairType | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionRequestFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  dateOfRequest?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  address?: ModelSubscriptionStringInput | null,
  city?: ModelSubscriptionStringInput | null,
  zipCode?: ModelSubscriptionIntInput | null,
  phone?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  spanishOnly?: ModelSubscriptionBooleanInput | null,
  preferredContactTime?: ModelSubscriptionStringInput | null,
  request?: ModelSubscriptionStringInput | null,
  leadSource?: ModelSubscriptionStringInput | null,
  leadOtherDetails?: ModelSubscriptionStringInput | null,
  resumeHelp?: ModelSubscriptionBooleanInput | null,
  coverLetterHelp?: ModelSubscriptionBooleanInput | null,
  carRepairDetails?: ModelSubscriptionStringInput | null,
  clothingType?: ModelSubscriptionStringInput | null,
  clothingSize?: ModelSubscriptionStringInput | null,
  furnitureType?: ModelSubscriptionStringInput | null,
  housingHelp?: ModelSubscriptionBooleanInput | null,
  needReason?: ModelSubscriptionStringInput | null,
  needTypes?: ModelSubscriptionStringInput | null,
  fulfilledNeeds?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  otherNeeds?: ModelSubscriptionStringInput | null,
  needFulfiller?: ModelSubscriptionStringInput | null,
  dateFulfilled?: ModelSubscriptionStringInput | null,
  followUp?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRequestFilterInput | null > | null,
  or?: Array< ModelSubscriptionRequestFilterInput | null > | null,
  requestSelfOrOtherInfoId?: ModelSubscriptionIDInput | null,
  requestFoodRequestId?: ModelSubscriptionIDInput | null,
  requestMovingRequestId?: ModelSubscriptionIDInput | null,
  requestHomeRepairTypeId?: ModelSubscriptionIDInput | null,
  requestHouseholdItemsId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionIDInput = {
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
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
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
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionNoteTypeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  requestID?: ModelSubscriptionIDInput | null,
  dateCreated?: ModelSubscriptionStringInput | null,
  author?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  notable?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionNoteTypeFilterInput | null > | null,
  or?: Array< ModelSubscriptionNoteTypeFilterInput | null > | null,
};

export type ModelSubscriptionSelfOrOtherInfoFilterInput = {
  forSelf?: ModelSubscriptionBooleanInput | null,
  usedOtherResources?: ModelSubscriptionBooleanInput | null,
  otherResources?: ModelSubscriptionStringInput | null,
  requestFor?: ModelSubscriptionStringInput | null,
  requestIsKnown?: ModelSubscriptionBooleanInput | null,
  phoneNumber?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSelfOrOtherInfoFilterInput | null > | null,
  or?: Array< ModelSubscriptionSelfOrOtherInfoFilterInput | null > | null,
};

export type ModelSubscriptionHouseholdItemsFilterInput = {
  shampoo?: ModelSubscriptionBooleanInput | null,
  bathSoap?: ModelSubscriptionBooleanInput | null,
  toothpaste?: ModelSubscriptionBooleanInput | null,
  toothbrush?: ModelSubscriptionBooleanInput | null,
  deodorant?: ModelSubscriptionBooleanInput | null,
  toiletPaper?: ModelSubscriptionBooleanInput | null,
  handSoap?: ModelSubscriptionBooleanInput | null,
  sanitaryPads?: ModelSubscriptionBooleanInput | null,
  tampons?: ModelSubscriptionBooleanInput | null,
  bleach?: ModelSubscriptionBooleanInput | null,
  lysolSpray?: ModelSubscriptionBooleanInput | null,
  lysolWipes?: ModelSubscriptionBooleanInput | null,
  dishsoap?: ModelSubscriptionBooleanInput | null,
  sponges?: ModelSubscriptionBooleanInput | null,
  pinesol?: ModelSubscriptionBooleanInput | null,
  conditioner?: ModelSubscriptionBooleanInput | null,
  paperTowels?: ModelSubscriptionBooleanInput | null,
  laundrySoap?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionHouseholdItemsFilterInput | null > | null,
  or?: Array< ModelSubscriptionHouseholdItemsFilterInput | null > | null,
};

export type ModelSubscriptionFoodInfoFilterInput = {
  familyMembers?: ModelSubscriptionIntInput | null,
  children?: ModelSubscriptionStringInput | null,
  deliveryTime?: ModelSubscriptionStringInput | null,
  haveAllergies?: ModelSubscriptionBooleanInput | null,
  allergies?: ModelSubscriptionStringInput | null,
  milk?: ModelSubscriptionBooleanInput | null,
  eggs?: ModelSubscriptionBooleanInput | null,
  bread?: ModelSubscriptionBooleanInput | null,
  butter?: ModelSubscriptionBooleanInput | null,
  tortillas?: ModelSubscriptionBooleanInput | null,
  rice?: ModelSubscriptionBooleanInput | null,
  beans?: ModelSubscriptionBooleanInput | null,
  cheese?: ModelSubscriptionBooleanInput | null,
  beef?: ModelSubscriptionBooleanInput | null,
  hotdogs?: ModelSubscriptionBooleanInput | null,
  lunchMeat?: ModelSubscriptionBooleanInput | null,
  fruit?: ModelSubscriptionBooleanInput | null,
  peanutButter?: ModelSubscriptionBooleanInput | null,
  jelly?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionFoodInfoFilterInput | null > | null,
  or?: Array< ModelSubscriptionFoodInfoFilterInput | null > | null,
};

export type ModelSubscriptionMovingInfoFilterInput = {
  items?: ModelSubscriptionStringInput | null,
  haveTransportation?: ModelSubscriptionBooleanInput | null,
  steepDriveway?: ModelSubscriptionBooleanInput | null,
  stairs?: ModelSubscriptionBooleanInput | null,
  unpavedRoad?: ModelSubscriptionBooleanInput | null,
  other?: ModelSubscriptionBooleanInput | null,
  otherDetails?: ModelSubscriptionStringInput | null,
  liabilityAck?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMovingInfoFilterInput | null > | null,
  or?: Array< ModelSubscriptionMovingInfoFilterInput | null > | null,
};

export type ModelSubscriptionHomeRepairTypeFilterInput = {
  plumbing?: ModelSubscriptionBooleanInput | null,
  electrical?: ModelSubscriptionBooleanInput | null,
  painting?: ModelSubscriptionBooleanInput | null,
  yardwork?: ModelSubscriptionBooleanInput | null,
  other?: ModelSubscriptionBooleanInput | null,
  details?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionHomeRepairTypeFilterInput | null > | null,
  or?: Array< ModelSubscriptionHomeRepairTypeFilterInput | null > | null,
};

export type CreateRequestMutationVariables = {
  input: CreateRequestInput,
  condition?: ModelRequestConditionInput | null,
};

export type CreateRequestMutation = {
  createRequest?:  {
    __typename: "Request",
    id: string,
    createdAt?: string | null,
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
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      phoneNumber?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      familyMembers?: number | null,
      children?: string | null,
      deliveryTime?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      butter?: boolean | null,
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
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    movingRequest?:  {
      __typename: "MovingInfo",
      items?: string | null,
      haveTransportation?: boolean | null,
      steepDriveway?: boolean | null,
      stairs?: boolean | null,
      unpavedRoad?: boolean | null,
      other?: boolean | null,
      otherDetails?: string | null,
      liabilityAck?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    resumeHelp?: boolean | null,
    coverLetterHelp?: boolean | null,
    carRepairDetails?: string | null,
    homeRepairType?:  {
      __typename: "HomeRepairType",
      plumbing?: boolean | null,
      electrical?: boolean | null,
      painting?: boolean | null,
      yardwork?: boolean | null,
      other?: boolean | null,
      details?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    clothingType?: string | null,
    clothingSize?: string | null,
    furnitureType?: string | null,
    housingHelp?: boolean | null,
    householdItems?:  {
      __typename: "HouseholdItems",
      shampoo?: boolean | null,
      bathSoap?: boolean | null,
      toothpaste?: boolean | null,
      toothbrush?: boolean | null,
      deodorant?: boolean | null,
      toiletPaper?: boolean | null,
      handSoap?: boolean | null,
      sanitaryPads?: boolean | null,
      tampons?: boolean | null,
      bleach?: boolean | null,
      lysolSpray?: boolean | null,
      lysolWipes?: boolean | null,
      dishsoap?: boolean | null,
      sponges?: boolean | null,
      pinesol?: boolean | null,
      conditioner?: boolean | null,
      paperTowels?: boolean | null,
      laundrySoap?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    fulfilledNeeds?: Array< NeedType | null > | null,
    status: RequestStatus,
    note?:  {
      __typename: "ModelNoteTypeConnection",
      nextToken?: string | null,
    } | null,
    otherNeeds?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    updatedAt: string,
    requestSelfOrOtherInfoId: string,
    requestFoodRequestId?: string | null,
    requestMovingRequestId?: string | null,
    requestHomeRepairTypeId?: string | null,
    requestHouseholdItemsId?: string | null,
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
    createdAt?: string | null,
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
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      phoneNumber?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      familyMembers?: number | null,
      children?: string | null,
      deliveryTime?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      butter?: boolean | null,
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
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    movingRequest?:  {
      __typename: "MovingInfo",
      items?: string | null,
      haveTransportation?: boolean | null,
      steepDriveway?: boolean | null,
      stairs?: boolean | null,
      unpavedRoad?: boolean | null,
      other?: boolean | null,
      otherDetails?: string | null,
      liabilityAck?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    resumeHelp?: boolean | null,
    coverLetterHelp?: boolean | null,
    carRepairDetails?: string | null,
    homeRepairType?:  {
      __typename: "HomeRepairType",
      plumbing?: boolean | null,
      electrical?: boolean | null,
      painting?: boolean | null,
      yardwork?: boolean | null,
      other?: boolean | null,
      details?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    clothingType?: string | null,
    clothingSize?: string | null,
    furnitureType?: string | null,
    housingHelp?: boolean | null,
    householdItems?:  {
      __typename: "HouseholdItems",
      shampoo?: boolean | null,
      bathSoap?: boolean | null,
      toothpaste?: boolean | null,
      toothbrush?: boolean | null,
      deodorant?: boolean | null,
      toiletPaper?: boolean | null,
      handSoap?: boolean | null,
      sanitaryPads?: boolean | null,
      tampons?: boolean | null,
      bleach?: boolean | null,
      lysolSpray?: boolean | null,
      lysolWipes?: boolean | null,
      dishsoap?: boolean | null,
      sponges?: boolean | null,
      pinesol?: boolean | null,
      conditioner?: boolean | null,
      paperTowels?: boolean | null,
      laundrySoap?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    fulfilledNeeds?: Array< NeedType | null > | null,
    status: RequestStatus,
    note?:  {
      __typename: "ModelNoteTypeConnection",
      nextToken?: string | null,
    } | null,
    otherNeeds?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    updatedAt: string,
    requestSelfOrOtherInfoId: string,
    requestFoodRequestId?: string | null,
    requestMovingRequestId?: string | null,
    requestHomeRepairTypeId?: string | null,
    requestHouseholdItemsId?: string | null,
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
    createdAt?: string | null,
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
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      phoneNumber?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      familyMembers?: number | null,
      children?: string | null,
      deliveryTime?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      butter?: boolean | null,
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
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    movingRequest?:  {
      __typename: "MovingInfo",
      items?: string | null,
      haveTransportation?: boolean | null,
      steepDriveway?: boolean | null,
      stairs?: boolean | null,
      unpavedRoad?: boolean | null,
      other?: boolean | null,
      otherDetails?: string | null,
      liabilityAck?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    resumeHelp?: boolean | null,
    coverLetterHelp?: boolean | null,
    carRepairDetails?: string | null,
    homeRepairType?:  {
      __typename: "HomeRepairType",
      plumbing?: boolean | null,
      electrical?: boolean | null,
      painting?: boolean | null,
      yardwork?: boolean | null,
      other?: boolean | null,
      details?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    clothingType?: string | null,
    clothingSize?: string | null,
    furnitureType?: string | null,
    housingHelp?: boolean | null,
    householdItems?:  {
      __typename: "HouseholdItems",
      shampoo?: boolean | null,
      bathSoap?: boolean | null,
      toothpaste?: boolean | null,
      toothbrush?: boolean | null,
      deodorant?: boolean | null,
      toiletPaper?: boolean | null,
      handSoap?: boolean | null,
      sanitaryPads?: boolean | null,
      tampons?: boolean | null,
      bleach?: boolean | null,
      lysolSpray?: boolean | null,
      lysolWipes?: boolean | null,
      dishsoap?: boolean | null,
      sponges?: boolean | null,
      pinesol?: boolean | null,
      conditioner?: boolean | null,
      paperTowels?: boolean | null,
      laundrySoap?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    fulfilledNeeds?: Array< NeedType | null > | null,
    status: RequestStatus,
    note?:  {
      __typename: "ModelNoteTypeConnection",
      nextToken?: string | null,
    } | null,
    otherNeeds?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    updatedAt: string,
    requestSelfOrOtherInfoId: string,
    requestFoodRequestId?: string | null,
    requestMovingRequestId?: string | null,
    requestHomeRepairTypeId?: string | null,
    requestHouseholdItemsId?: string | null,
  } | null,
};

export type CreateNoteTypeMutationVariables = {
  input: CreateNoteTypeInput,
  condition?: ModelNoteTypeConditionInput | null,
};

export type CreateNoteTypeMutation = {
  createNoteType?:  {
    __typename: "NoteType",
    id: string,
    requestID: string,
    dateCreated: string,
    author: string,
    content: string,
    notable?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNoteTypeMutationVariables = {
  input: UpdateNoteTypeInput,
  condition?: ModelNoteTypeConditionInput | null,
};

export type UpdateNoteTypeMutation = {
  updateNoteType?:  {
    __typename: "NoteType",
    id: string,
    requestID: string,
    dateCreated: string,
    author: string,
    content: string,
    notable?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNoteTypeMutationVariables = {
  input: DeleteNoteTypeInput,
  condition?: ModelNoteTypeConditionInput | null,
};

export type DeleteNoteTypeMutation = {
  deleteNoteType?:  {
    __typename: "NoteType",
    id: string,
    requestID: string,
    dateCreated: string,
    author: string,
    content: string,
    notable?: boolean | null,
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
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    phoneNumber?: string | null,
    id: string,
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
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    phoneNumber?: string | null,
    id: string,
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
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    phoneNumber?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateHouseholdItemsMutationVariables = {
  input: CreateHouseholdItemsInput,
  condition?: ModelHouseholdItemsConditionInput | null,
};

export type CreateHouseholdItemsMutation = {
  createHouseholdItems?:  {
    __typename: "HouseholdItems",
    shampoo?: boolean | null,
    bathSoap?: boolean | null,
    toothpaste?: boolean | null,
    toothbrush?: boolean | null,
    deodorant?: boolean | null,
    toiletPaper?: boolean | null,
    handSoap?: boolean | null,
    sanitaryPads?: boolean | null,
    tampons?: boolean | null,
    bleach?: boolean | null,
    lysolSpray?: boolean | null,
    lysolWipes?: boolean | null,
    dishsoap?: boolean | null,
    sponges?: boolean | null,
    pinesol?: boolean | null,
    conditioner?: boolean | null,
    paperTowels?: boolean | null,
    laundrySoap?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateHouseholdItemsMutationVariables = {
  input: UpdateHouseholdItemsInput,
  condition?: ModelHouseholdItemsConditionInput | null,
};

export type UpdateHouseholdItemsMutation = {
  updateHouseholdItems?:  {
    __typename: "HouseholdItems",
    shampoo?: boolean | null,
    bathSoap?: boolean | null,
    toothpaste?: boolean | null,
    toothbrush?: boolean | null,
    deodorant?: boolean | null,
    toiletPaper?: boolean | null,
    handSoap?: boolean | null,
    sanitaryPads?: boolean | null,
    tampons?: boolean | null,
    bleach?: boolean | null,
    lysolSpray?: boolean | null,
    lysolWipes?: boolean | null,
    dishsoap?: boolean | null,
    sponges?: boolean | null,
    pinesol?: boolean | null,
    conditioner?: boolean | null,
    paperTowels?: boolean | null,
    laundrySoap?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteHouseholdItemsMutationVariables = {
  input: DeleteHouseholdItemsInput,
  condition?: ModelHouseholdItemsConditionInput | null,
};

export type DeleteHouseholdItemsMutation = {
  deleteHouseholdItems?:  {
    __typename: "HouseholdItems",
    shampoo?: boolean | null,
    bathSoap?: boolean | null,
    toothpaste?: boolean | null,
    toothbrush?: boolean | null,
    deodorant?: boolean | null,
    toiletPaper?: boolean | null,
    handSoap?: boolean | null,
    sanitaryPads?: boolean | null,
    tampons?: boolean | null,
    bleach?: boolean | null,
    lysolSpray?: boolean | null,
    lysolWipes?: boolean | null,
    dishsoap?: boolean | null,
    sponges?: boolean | null,
    pinesol?: boolean | null,
    conditioner?: boolean | null,
    paperTowels?: boolean | null,
    laundrySoap?: boolean | null,
    id: string,
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
    familyMembers?: number | null,
    children?: string | null,
    deliveryTime?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    butter?: boolean | null,
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
    id: string,
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
    familyMembers?: number | null,
    children?: string | null,
    deliveryTime?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    butter?: boolean | null,
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
    id: string,
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
    familyMembers?: number | null,
    children?: string | null,
    deliveryTime?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    butter?: boolean | null,
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
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMovingInfoMutationVariables = {
  input: CreateMovingInfoInput,
  condition?: ModelMovingInfoConditionInput | null,
};

export type CreateMovingInfoMutation = {
  createMovingInfo?:  {
    __typename: "MovingInfo",
    items?: string | null,
    haveTransportation?: boolean | null,
    steepDriveway?: boolean | null,
    stairs?: boolean | null,
    unpavedRoad?: boolean | null,
    other?: boolean | null,
    otherDetails?: string | null,
    liabilityAck?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMovingInfoMutationVariables = {
  input: UpdateMovingInfoInput,
  condition?: ModelMovingInfoConditionInput | null,
};

export type UpdateMovingInfoMutation = {
  updateMovingInfo?:  {
    __typename: "MovingInfo",
    items?: string | null,
    haveTransportation?: boolean | null,
    steepDriveway?: boolean | null,
    stairs?: boolean | null,
    unpavedRoad?: boolean | null,
    other?: boolean | null,
    otherDetails?: string | null,
    liabilityAck?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMovingInfoMutationVariables = {
  input: DeleteMovingInfoInput,
  condition?: ModelMovingInfoConditionInput | null,
};

export type DeleteMovingInfoMutation = {
  deleteMovingInfo?:  {
    __typename: "MovingInfo",
    items?: string | null,
    haveTransportation?: boolean | null,
    steepDriveway?: boolean | null,
    stairs?: boolean | null,
    unpavedRoad?: boolean | null,
    other?: boolean | null,
    otherDetails?: string | null,
    liabilityAck?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateHomeRepairTypeMutationVariables = {
  input: CreateHomeRepairTypeInput,
  condition?: ModelHomeRepairTypeConditionInput | null,
};

export type CreateHomeRepairTypeMutation = {
  createHomeRepairType?:  {
    __typename: "HomeRepairType",
    plumbing?: boolean | null,
    electrical?: boolean | null,
    painting?: boolean | null,
    yardwork?: boolean | null,
    other?: boolean | null,
    details?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateHomeRepairTypeMutationVariables = {
  input: UpdateHomeRepairTypeInput,
  condition?: ModelHomeRepairTypeConditionInput | null,
};

export type UpdateHomeRepairTypeMutation = {
  updateHomeRepairType?:  {
    __typename: "HomeRepairType",
    plumbing?: boolean | null,
    electrical?: boolean | null,
    painting?: boolean | null,
    yardwork?: boolean | null,
    other?: boolean | null,
    details?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteHomeRepairTypeMutationVariables = {
  input: DeleteHomeRepairTypeInput,
  condition?: ModelHomeRepairTypeConditionInput | null,
};

export type DeleteHomeRepairTypeMutation = {
  deleteHomeRepairType?:  {
    __typename: "HomeRepairType",
    plumbing?: boolean | null,
    electrical?: boolean | null,
    painting?: boolean | null,
    yardwork?: boolean | null,
    other?: boolean | null,
    details?: string | null,
    id: string,
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
    createdAt?: string | null,
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
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      phoneNumber?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      familyMembers?: number | null,
      children?: string | null,
      deliveryTime?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      butter?: boolean | null,
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
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    movingRequest?:  {
      __typename: "MovingInfo",
      items?: string | null,
      haveTransportation?: boolean | null,
      steepDriveway?: boolean | null,
      stairs?: boolean | null,
      unpavedRoad?: boolean | null,
      other?: boolean | null,
      otherDetails?: string | null,
      liabilityAck?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    resumeHelp?: boolean | null,
    coverLetterHelp?: boolean | null,
    carRepairDetails?: string | null,
    homeRepairType?:  {
      __typename: "HomeRepairType",
      plumbing?: boolean | null,
      electrical?: boolean | null,
      painting?: boolean | null,
      yardwork?: boolean | null,
      other?: boolean | null,
      details?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    clothingType?: string | null,
    clothingSize?: string | null,
    furnitureType?: string | null,
    housingHelp?: boolean | null,
    householdItems?:  {
      __typename: "HouseholdItems",
      shampoo?: boolean | null,
      bathSoap?: boolean | null,
      toothpaste?: boolean | null,
      toothbrush?: boolean | null,
      deodorant?: boolean | null,
      toiletPaper?: boolean | null,
      handSoap?: boolean | null,
      sanitaryPads?: boolean | null,
      tampons?: boolean | null,
      bleach?: boolean | null,
      lysolSpray?: boolean | null,
      lysolWipes?: boolean | null,
      dishsoap?: boolean | null,
      sponges?: boolean | null,
      pinesol?: boolean | null,
      conditioner?: boolean | null,
      paperTowels?: boolean | null,
      laundrySoap?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    fulfilledNeeds?: Array< NeedType | null > | null,
    status: RequestStatus,
    note?:  {
      __typename: "ModelNoteTypeConnection",
      nextToken?: string | null,
    } | null,
    otherNeeds?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    updatedAt: string,
    requestSelfOrOtherInfoId: string,
    requestFoodRequestId?: string | null,
    requestMovingRequestId?: string | null,
    requestHomeRepairTypeId?: string | null,
    requestHouseholdItemsId?: string | null,
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
    items:  Array< {
      __typename: "Request",
      id: string,
      createdAt?: string | null,
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
      resumeHelp?: boolean | null,
      coverLetterHelp?: boolean | null,
      carRepairDetails?: string | null,
      clothingType?: string | null,
      clothingSize?: string | null,
      furnitureType?: string | null,
      housingHelp?: boolean | null,
      needReason: Array< NeedReason | null >,
      needTypes: Array< NeedType | null >,
      fulfilledNeeds?: Array< NeedType | null > | null,
      status: RequestStatus,
      otherNeeds?: string | null,
      needFulfiller?: string | null,
      dateFulfilled?: string | null,
      followUp?: string | null,
      updatedAt: string,
      requestSelfOrOtherInfoId: string,
      requestFoodRequestId?: string | null,
      requestMovingRequestId?: string | null,
      requestHomeRepairTypeId?: string | null,
      requestHouseholdItemsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNoteTypeQueryVariables = {
  id: string,
};

export type GetNoteTypeQuery = {
  getNoteType?:  {
    __typename: "NoteType",
    id: string,
    requestID: string,
    dateCreated: string,
    author: string,
    content: string,
    notable?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNoteTypesQueryVariables = {
  filter?: ModelNoteTypeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNoteTypesQuery = {
  listNoteTypes?:  {
    __typename: "ModelNoteTypeConnection",
    items:  Array< {
      __typename: "NoteType",
      id: string,
      requestID: string,
      dateCreated: string,
      author: string,
      content: string,
      notable?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSelfOrOtherInfoQueryVariables = {
  id: string,
};

export type GetSelfOrOtherInfoQuery = {
  getSelfOrOtherInfo?:  {
    __typename: "SelfOrOtherInfo",
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    phoneNumber?: string | null,
    id: string,
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
    items:  Array< {
      __typename: "SelfOrOtherInfo",
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      phoneNumber?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetHouseholdItemsQueryVariables = {
  id: string,
};

export type GetHouseholdItemsQuery = {
  getHouseholdItems?:  {
    __typename: "HouseholdItems",
    shampoo?: boolean | null,
    bathSoap?: boolean | null,
    toothpaste?: boolean | null,
    toothbrush?: boolean | null,
    deodorant?: boolean | null,
    toiletPaper?: boolean | null,
    handSoap?: boolean | null,
    sanitaryPads?: boolean | null,
    tampons?: boolean | null,
    bleach?: boolean | null,
    lysolSpray?: boolean | null,
    lysolWipes?: boolean | null,
    dishsoap?: boolean | null,
    sponges?: boolean | null,
    pinesol?: boolean | null,
    conditioner?: boolean | null,
    paperTowels?: boolean | null,
    laundrySoap?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListHouseholdItemsQueryVariables = {
  filter?: ModelHouseholdItemsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHouseholdItemsQuery = {
  listHouseholdItems?:  {
    __typename: "ModelHouseholdItemsConnection",
    items:  Array< {
      __typename: "HouseholdItems",
      shampoo?: boolean | null,
      bathSoap?: boolean | null,
      toothpaste?: boolean | null,
      toothbrush?: boolean | null,
      deodorant?: boolean | null,
      toiletPaper?: boolean | null,
      handSoap?: boolean | null,
      sanitaryPads?: boolean | null,
      tampons?: boolean | null,
      bleach?: boolean | null,
      lysolSpray?: boolean | null,
      lysolWipes?: boolean | null,
      dishsoap?: boolean | null,
      sponges?: boolean | null,
      pinesol?: boolean | null,
      conditioner?: boolean | null,
      paperTowels?: boolean | null,
      laundrySoap?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetFoodInfoQueryVariables = {
  id: string,
};

export type GetFoodInfoQuery = {
  getFoodInfo?:  {
    __typename: "FoodInfo",
    familyMembers?: number | null,
    children?: string | null,
    deliveryTime?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    butter?: boolean | null,
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
    id: string,
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
    items:  Array< {
      __typename: "FoodInfo",
      familyMembers?: number | null,
      children?: string | null,
      deliveryTime?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      butter?: boolean | null,
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
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMovingInfoQueryVariables = {
  id: string,
};

export type GetMovingInfoQuery = {
  getMovingInfo?:  {
    __typename: "MovingInfo",
    items?: string | null,
    haveTransportation?: boolean | null,
    steepDriveway?: boolean | null,
    stairs?: boolean | null,
    unpavedRoad?: boolean | null,
    other?: boolean | null,
    otherDetails?: string | null,
    liabilityAck?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMovingInfosQueryVariables = {
  filter?: ModelMovingInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMovingInfosQuery = {
  listMovingInfos?:  {
    __typename: "ModelMovingInfoConnection",
    items:  Array< {
      __typename: "MovingInfo",
      items?: string | null,
      haveTransportation?: boolean | null,
      steepDriveway?: boolean | null,
      stairs?: boolean | null,
      unpavedRoad?: boolean | null,
      other?: boolean | null,
      otherDetails?: string | null,
      liabilityAck?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetHomeRepairTypeQueryVariables = {
  id: string,
};

export type GetHomeRepairTypeQuery = {
  getHomeRepairType?:  {
    __typename: "HomeRepairType",
    plumbing?: boolean | null,
    electrical?: boolean | null,
    painting?: boolean | null,
    yardwork?: boolean | null,
    other?: boolean | null,
    details?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListHomeRepairTypesQueryVariables = {
  filter?: ModelHomeRepairTypeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHomeRepairTypesQuery = {
  listHomeRepairTypes?:  {
    __typename: "ModelHomeRepairTypeConnection",
    items:  Array< {
      __typename: "HomeRepairType",
      plumbing?: boolean | null,
      electrical?: boolean | null,
      painting?: boolean | null,
      yardwork?: boolean | null,
      other?: boolean | null,
      details?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateRequestSubscriptionVariables = {
  filter?: ModelSubscriptionRequestFilterInput | null,
};

export type OnCreateRequestSubscription = {
  onCreateRequest?:  {
    __typename: "Request",
    id: string,
    createdAt?: string | null,
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
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      phoneNumber?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      familyMembers?: number | null,
      children?: string | null,
      deliveryTime?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      butter?: boolean | null,
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
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    movingRequest?:  {
      __typename: "MovingInfo",
      items?: string | null,
      haveTransportation?: boolean | null,
      steepDriveway?: boolean | null,
      stairs?: boolean | null,
      unpavedRoad?: boolean | null,
      other?: boolean | null,
      otherDetails?: string | null,
      liabilityAck?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    resumeHelp?: boolean | null,
    coverLetterHelp?: boolean | null,
    carRepairDetails?: string | null,
    homeRepairType?:  {
      __typename: "HomeRepairType",
      plumbing?: boolean | null,
      electrical?: boolean | null,
      painting?: boolean | null,
      yardwork?: boolean | null,
      other?: boolean | null,
      details?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    clothingType?: string | null,
    clothingSize?: string | null,
    furnitureType?: string | null,
    housingHelp?: boolean | null,
    householdItems?:  {
      __typename: "HouseholdItems",
      shampoo?: boolean | null,
      bathSoap?: boolean | null,
      toothpaste?: boolean | null,
      toothbrush?: boolean | null,
      deodorant?: boolean | null,
      toiletPaper?: boolean | null,
      handSoap?: boolean | null,
      sanitaryPads?: boolean | null,
      tampons?: boolean | null,
      bleach?: boolean | null,
      lysolSpray?: boolean | null,
      lysolWipes?: boolean | null,
      dishsoap?: boolean | null,
      sponges?: boolean | null,
      pinesol?: boolean | null,
      conditioner?: boolean | null,
      paperTowels?: boolean | null,
      laundrySoap?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    fulfilledNeeds?: Array< NeedType | null > | null,
    status: RequestStatus,
    note?:  {
      __typename: "ModelNoteTypeConnection",
      nextToken?: string | null,
    } | null,
    otherNeeds?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    updatedAt: string,
    requestSelfOrOtherInfoId: string,
    requestFoodRequestId?: string | null,
    requestMovingRequestId?: string | null,
    requestHomeRepairTypeId?: string | null,
    requestHouseholdItemsId?: string | null,
  } | null,
};

export type OnUpdateRequestSubscriptionVariables = {
  filter?: ModelSubscriptionRequestFilterInput | null,
};

export type OnUpdateRequestSubscription = {
  onUpdateRequest?:  {
    __typename: "Request",
    id: string,
    createdAt?: string | null,
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
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      phoneNumber?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      familyMembers?: number | null,
      children?: string | null,
      deliveryTime?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      butter?: boolean | null,
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
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    movingRequest?:  {
      __typename: "MovingInfo",
      items?: string | null,
      haveTransportation?: boolean | null,
      steepDriveway?: boolean | null,
      stairs?: boolean | null,
      unpavedRoad?: boolean | null,
      other?: boolean | null,
      otherDetails?: string | null,
      liabilityAck?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    resumeHelp?: boolean | null,
    coverLetterHelp?: boolean | null,
    carRepairDetails?: string | null,
    homeRepairType?:  {
      __typename: "HomeRepairType",
      plumbing?: boolean | null,
      electrical?: boolean | null,
      painting?: boolean | null,
      yardwork?: boolean | null,
      other?: boolean | null,
      details?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    clothingType?: string | null,
    clothingSize?: string | null,
    furnitureType?: string | null,
    housingHelp?: boolean | null,
    householdItems?:  {
      __typename: "HouseholdItems",
      shampoo?: boolean | null,
      bathSoap?: boolean | null,
      toothpaste?: boolean | null,
      toothbrush?: boolean | null,
      deodorant?: boolean | null,
      toiletPaper?: boolean | null,
      handSoap?: boolean | null,
      sanitaryPads?: boolean | null,
      tampons?: boolean | null,
      bleach?: boolean | null,
      lysolSpray?: boolean | null,
      lysolWipes?: boolean | null,
      dishsoap?: boolean | null,
      sponges?: boolean | null,
      pinesol?: boolean | null,
      conditioner?: boolean | null,
      paperTowels?: boolean | null,
      laundrySoap?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    fulfilledNeeds?: Array< NeedType | null > | null,
    status: RequestStatus,
    note?:  {
      __typename: "ModelNoteTypeConnection",
      nextToken?: string | null,
    } | null,
    otherNeeds?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    updatedAt: string,
    requestSelfOrOtherInfoId: string,
    requestFoodRequestId?: string | null,
    requestMovingRequestId?: string | null,
    requestHomeRepairTypeId?: string | null,
    requestHouseholdItemsId?: string | null,
  } | null,
};

export type OnDeleteRequestSubscriptionVariables = {
  filter?: ModelSubscriptionRequestFilterInput | null,
};

export type OnDeleteRequestSubscription = {
  onDeleteRequest?:  {
    __typename: "Request",
    id: string,
    createdAt?: string | null,
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
      forSelf?: boolean | null,
      usedOtherResources?: boolean | null,
      otherResources?: string | null,
      requestFor?: string | null,
      requestIsKnown?: boolean | null,
      phoneNumber?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    foodRequest?:  {
      __typename: "FoodInfo",
      familyMembers?: number | null,
      children?: string | null,
      deliveryTime?: string | null,
      haveAllergies?: boolean | null,
      allergies?: string | null,
      milk?: boolean | null,
      eggs?: boolean | null,
      bread?: boolean | null,
      butter?: boolean | null,
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
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    movingRequest?:  {
      __typename: "MovingInfo",
      items?: string | null,
      haveTransportation?: boolean | null,
      steepDriveway?: boolean | null,
      stairs?: boolean | null,
      unpavedRoad?: boolean | null,
      other?: boolean | null,
      otherDetails?: string | null,
      liabilityAck?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    resumeHelp?: boolean | null,
    coverLetterHelp?: boolean | null,
    carRepairDetails?: string | null,
    homeRepairType?:  {
      __typename: "HomeRepairType",
      plumbing?: boolean | null,
      electrical?: boolean | null,
      painting?: boolean | null,
      yardwork?: boolean | null,
      other?: boolean | null,
      details?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    clothingType?: string | null,
    clothingSize?: string | null,
    furnitureType?: string | null,
    housingHelp?: boolean | null,
    householdItems?:  {
      __typename: "HouseholdItems",
      shampoo?: boolean | null,
      bathSoap?: boolean | null,
      toothpaste?: boolean | null,
      toothbrush?: boolean | null,
      deodorant?: boolean | null,
      toiletPaper?: boolean | null,
      handSoap?: boolean | null,
      sanitaryPads?: boolean | null,
      tampons?: boolean | null,
      bleach?: boolean | null,
      lysolSpray?: boolean | null,
      lysolWipes?: boolean | null,
      dishsoap?: boolean | null,
      sponges?: boolean | null,
      pinesol?: boolean | null,
      conditioner?: boolean | null,
      paperTowels?: boolean | null,
      laundrySoap?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    needReason: Array< NeedReason | null >,
    needTypes: Array< NeedType | null >,
    fulfilledNeeds?: Array< NeedType | null > | null,
    status: RequestStatus,
    note?:  {
      __typename: "ModelNoteTypeConnection",
      nextToken?: string | null,
    } | null,
    otherNeeds?: string | null,
    needFulfiller?: string | null,
    dateFulfilled?: string | null,
    followUp?: string | null,
    updatedAt: string,
    requestSelfOrOtherInfoId: string,
    requestFoodRequestId?: string | null,
    requestMovingRequestId?: string | null,
    requestHomeRepairTypeId?: string | null,
    requestHouseholdItemsId?: string | null,
  } | null,
};

export type OnCreateNoteTypeSubscriptionVariables = {
  filter?: ModelSubscriptionNoteTypeFilterInput | null,
};

export type OnCreateNoteTypeSubscription = {
  onCreateNoteType?:  {
    __typename: "NoteType",
    id: string,
    requestID: string,
    dateCreated: string,
    author: string,
    content: string,
    notable?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNoteTypeSubscriptionVariables = {
  filter?: ModelSubscriptionNoteTypeFilterInput | null,
};

export type OnUpdateNoteTypeSubscription = {
  onUpdateNoteType?:  {
    __typename: "NoteType",
    id: string,
    requestID: string,
    dateCreated: string,
    author: string,
    content: string,
    notable?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNoteTypeSubscriptionVariables = {
  filter?: ModelSubscriptionNoteTypeFilterInput | null,
};

export type OnDeleteNoteTypeSubscription = {
  onDeleteNoteType?:  {
    __typename: "NoteType",
    id: string,
    requestID: string,
    dateCreated: string,
    author: string,
    content: string,
    notable?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSelfOrOtherInfoSubscriptionVariables = {
  filter?: ModelSubscriptionSelfOrOtherInfoFilterInput | null,
};

export type OnCreateSelfOrOtherInfoSubscription = {
  onCreateSelfOrOtherInfo?:  {
    __typename: "SelfOrOtherInfo",
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    phoneNumber?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSelfOrOtherInfoSubscriptionVariables = {
  filter?: ModelSubscriptionSelfOrOtherInfoFilterInput | null,
};

export type OnUpdateSelfOrOtherInfoSubscription = {
  onUpdateSelfOrOtherInfo?:  {
    __typename: "SelfOrOtherInfo",
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    phoneNumber?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSelfOrOtherInfoSubscriptionVariables = {
  filter?: ModelSubscriptionSelfOrOtherInfoFilterInput | null,
};

export type OnDeleteSelfOrOtherInfoSubscription = {
  onDeleteSelfOrOtherInfo?:  {
    __typename: "SelfOrOtherInfo",
    forSelf?: boolean | null,
    usedOtherResources?: boolean | null,
    otherResources?: string | null,
    requestFor?: string | null,
    requestIsKnown?: boolean | null,
    phoneNumber?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateHouseholdItemsSubscriptionVariables = {
  filter?: ModelSubscriptionHouseholdItemsFilterInput | null,
};

export type OnCreateHouseholdItemsSubscription = {
  onCreateHouseholdItems?:  {
    __typename: "HouseholdItems",
    shampoo?: boolean | null,
    bathSoap?: boolean | null,
    toothpaste?: boolean | null,
    toothbrush?: boolean | null,
    deodorant?: boolean | null,
    toiletPaper?: boolean | null,
    handSoap?: boolean | null,
    sanitaryPads?: boolean | null,
    tampons?: boolean | null,
    bleach?: boolean | null,
    lysolSpray?: boolean | null,
    lysolWipes?: boolean | null,
    dishsoap?: boolean | null,
    sponges?: boolean | null,
    pinesol?: boolean | null,
    conditioner?: boolean | null,
    paperTowels?: boolean | null,
    laundrySoap?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateHouseholdItemsSubscriptionVariables = {
  filter?: ModelSubscriptionHouseholdItemsFilterInput | null,
};

export type OnUpdateHouseholdItemsSubscription = {
  onUpdateHouseholdItems?:  {
    __typename: "HouseholdItems",
    shampoo?: boolean | null,
    bathSoap?: boolean | null,
    toothpaste?: boolean | null,
    toothbrush?: boolean | null,
    deodorant?: boolean | null,
    toiletPaper?: boolean | null,
    handSoap?: boolean | null,
    sanitaryPads?: boolean | null,
    tampons?: boolean | null,
    bleach?: boolean | null,
    lysolSpray?: boolean | null,
    lysolWipes?: boolean | null,
    dishsoap?: boolean | null,
    sponges?: boolean | null,
    pinesol?: boolean | null,
    conditioner?: boolean | null,
    paperTowels?: boolean | null,
    laundrySoap?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteHouseholdItemsSubscriptionVariables = {
  filter?: ModelSubscriptionHouseholdItemsFilterInput | null,
};

export type OnDeleteHouseholdItemsSubscription = {
  onDeleteHouseholdItems?:  {
    __typename: "HouseholdItems",
    shampoo?: boolean | null,
    bathSoap?: boolean | null,
    toothpaste?: boolean | null,
    toothbrush?: boolean | null,
    deodorant?: boolean | null,
    toiletPaper?: boolean | null,
    handSoap?: boolean | null,
    sanitaryPads?: boolean | null,
    tampons?: boolean | null,
    bleach?: boolean | null,
    lysolSpray?: boolean | null,
    lysolWipes?: boolean | null,
    dishsoap?: boolean | null,
    sponges?: boolean | null,
    pinesol?: boolean | null,
    conditioner?: boolean | null,
    paperTowels?: boolean | null,
    laundrySoap?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFoodInfoSubscriptionVariables = {
  filter?: ModelSubscriptionFoodInfoFilterInput | null,
};

export type OnCreateFoodInfoSubscription = {
  onCreateFoodInfo?:  {
    __typename: "FoodInfo",
    familyMembers?: number | null,
    children?: string | null,
    deliveryTime?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    butter?: boolean | null,
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
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFoodInfoSubscriptionVariables = {
  filter?: ModelSubscriptionFoodInfoFilterInput | null,
};

export type OnUpdateFoodInfoSubscription = {
  onUpdateFoodInfo?:  {
    __typename: "FoodInfo",
    familyMembers?: number | null,
    children?: string | null,
    deliveryTime?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    butter?: boolean | null,
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
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFoodInfoSubscriptionVariables = {
  filter?: ModelSubscriptionFoodInfoFilterInput | null,
};

export type OnDeleteFoodInfoSubscription = {
  onDeleteFoodInfo?:  {
    __typename: "FoodInfo",
    familyMembers?: number | null,
    children?: string | null,
    deliveryTime?: string | null,
    haveAllergies?: boolean | null,
    allergies?: string | null,
    milk?: boolean | null,
    eggs?: boolean | null,
    bread?: boolean | null,
    butter?: boolean | null,
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
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMovingInfoSubscriptionVariables = {
  filter?: ModelSubscriptionMovingInfoFilterInput | null,
};

export type OnCreateMovingInfoSubscription = {
  onCreateMovingInfo?:  {
    __typename: "MovingInfo",
    items?: string | null,
    haveTransportation?: boolean | null,
    steepDriveway?: boolean | null,
    stairs?: boolean | null,
    unpavedRoad?: boolean | null,
    other?: boolean | null,
    otherDetails?: string | null,
    liabilityAck?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMovingInfoSubscriptionVariables = {
  filter?: ModelSubscriptionMovingInfoFilterInput | null,
};

export type OnUpdateMovingInfoSubscription = {
  onUpdateMovingInfo?:  {
    __typename: "MovingInfo",
    items?: string | null,
    haveTransportation?: boolean | null,
    steepDriveway?: boolean | null,
    stairs?: boolean | null,
    unpavedRoad?: boolean | null,
    other?: boolean | null,
    otherDetails?: string | null,
    liabilityAck?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMovingInfoSubscriptionVariables = {
  filter?: ModelSubscriptionMovingInfoFilterInput | null,
};

export type OnDeleteMovingInfoSubscription = {
  onDeleteMovingInfo?:  {
    __typename: "MovingInfo",
    items?: string | null,
    haveTransportation?: boolean | null,
    steepDriveway?: boolean | null,
    stairs?: boolean | null,
    unpavedRoad?: boolean | null,
    other?: boolean | null,
    otherDetails?: string | null,
    liabilityAck?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateHomeRepairTypeSubscriptionVariables = {
  filter?: ModelSubscriptionHomeRepairTypeFilterInput | null,
};

export type OnCreateHomeRepairTypeSubscription = {
  onCreateHomeRepairType?:  {
    __typename: "HomeRepairType",
    plumbing?: boolean | null,
    electrical?: boolean | null,
    painting?: boolean | null,
    yardwork?: boolean | null,
    other?: boolean | null,
    details?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateHomeRepairTypeSubscriptionVariables = {
  filter?: ModelSubscriptionHomeRepairTypeFilterInput | null,
};

export type OnUpdateHomeRepairTypeSubscription = {
  onUpdateHomeRepairType?:  {
    __typename: "HomeRepairType",
    plumbing?: boolean | null,
    electrical?: boolean | null,
    painting?: boolean | null,
    yardwork?: boolean | null,
    other?: boolean | null,
    details?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteHomeRepairTypeSubscriptionVariables = {
  filter?: ModelSubscriptionHomeRepairTypeFilterInput | null,
};

export type OnDeleteHomeRepairTypeSubscription = {
  onDeleteHomeRepairType?:  {
    __typename: "HomeRepairType",
    plumbing?: boolean | null,
    electrical?: boolean | null,
    painting?: boolean | null,
    yardwork?: boolean | null,
    other?: boolean | null,
    details?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
