import {
  HomeRepairType,
  LeadSource,
  NeedReason,
  NeedType,
  RequestStatus,
} from "./RequestAPI";

export enum RadioButtonState {
  UNSET = "",
  YES = "yes",
  NO = "no",
}

export interface IGroceriesType {
  milk: boolean;
  eggs: boolean;
  bread: boolean;
  butter: boolean;
  tortillas: boolean;
  rice: boolean;
  beans: boolean;
  cheese: boolean;
  beef: boolean;
  hotdogs: boolean;
  lunchMeat: boolean;
  fruit: boolean;
  peanutButter: boolean;
  jelly: boolean;
}

export interface IMovingType {
  withinRange: RadioButtonState;
  items: string;
  haveTransportation: RadioButtonState;
  haveSpecialConditions: string;
  driveway: boolean;
  stairs: boolean;
  unpavedRoad: boolean;
  other: boolean;
  otherDetails: string;
  liabilityAck: boolean;
}

export interface INeedTypes {
  meals: boolean;
  groceries: boolean;
  moving: boolean;
  jobTraining: boolean;
  homeRepair: boolean;
  carRepair: boolean;
  housing: boolean;
  clothing: boolean;
  furniture: boolean;
  other: boolean;
}

export interface INeedReason {
  covid: boolean;
  illness: boolean;
  financial: boolean;
}

export const defaultGroceries: IGroceriesType = {
  milk: false,
  eggs: false,
  bread: false,
  butter: false,
  tortillas: false,
  rice: false,
  beans: false,
  cheese: false,
  beef: false,
  hotdogs: false,
  lunchMeat: false,
  fruit: false,
  peanutButter: false,
  jelly: false,
};

export const defaultNeedReason: INeedReason = {
  covid: false,
  illness: false,
  financial: false,
};

export const defaultNeedType: INeedTypes = {
  meals: false,
  groceries: false,
  moving: false,
  jobTraining: false,
  homeRepair: false,
  carRepair: false,
  housing: false,
  clothing: false,
  furniture: false,
  other: false,
};

export const defaultMoving: IMovingType = {
  withinRange: RadioButtonState.UNSET,
  items: "",
  haveTransportation: RadioButtonState.UNSET,
  haveSpecialConditions: "",
  driveway: false,
  stairs: false,
  unpavedRoad: false,
  other: false,
  otherDetails: "",
  liabilityAck: false,
};

export const defaultHomeRepair: IHomeRepairType = {
  plumbing: false,
  electrical: false,
  painting: false,
  yardwork: false,
  other: false,
  details: "",
};

export interface SelfOrOtherGQL {
  forSelf?: boolean | null;
  usedOtherResources?: boolean | null;
  otherResources?: string | null;
  requestFor?: string | null;
  requestIsKnown?: boolean | null;
}

export interface GroceriesGQL {
  milk?: boolean | null;
  eggs?: boolean | null;
  bread?: boolean | null;
  tortillas?: boolean | null;
  rice?: boolean | null;
  beans?: boolean | null;
  cheese?: boolean | null;
  beef?: boolean | null;
  hotdogs?: boolean | null;
  lunchMeat?: boolean | null;
  fruit?: boolean | null;
  peanutButter?: boolean | null;
  jelly?: boolean | null;
}

export interface FoodInfoGQL {
  familyMembers?: number | null;
  children?: string | null;
  haveAllergies?: boolean | null;
  allergies?: string | null;
  foodInfoGroceriesId?: string | null;
}

export interface MovingInfoGQL {
  items?: string | null;
  haveTransportation?: boolean | null;
  steepDriveway?: boolean | null;
  stairs?: boolean | null;
  unpavedRoad?: boolean | null;
  other?: boolean | null;
  otherDetails?: string | null;
  liabilityAck?: boolean | null;
}

export interface NeedRequestGQL {
  dateOfRequest: string;
  firstName: string;
  lastName: string;
  address?: string | null;
  city: string;
  zipCode?: number | null;
  phone?: string | null;
  email?: string | null;
  spanishOnly?: boolean | null;
  preferredContactTime?: string | null;
  request?: string | null;
  leadSource: LeadSource;
  leadOtherDetails?: string | null;
  requestSelfOrOtherInfoId: string | null;
  requestFoodRequestId: string | null;
  requestMovingRequestId: string | null;
  resumeHelp?: boolean | null;
  coverLetterHelp?: boolean | null;
  carRepairDetails?: string;
  requestHomeRepairTypeId?: string | null;
  clothingType?: string;
  clothingSize?: string;
  furnitureType?: string;
  furnitureSize?: string;
  needReason: Array<NeedReason | null>;
  needTypes: Array<NeedType | null>;
  status: RequestStatus;
  note?: string | null;
  needFulfiller?: string | null;
  dateFulfilled?: string | null;
  followUp?: string | null;
}

export interface IHomeRepairType {
  plumbing: boolean;
  electrical: boolean;
  painting: boolean;
  yardwork: boolean;
  other: boolean;
  details: string;
}

// Copied out of the RequestAPI ListRequestsQuery items
export interface NeedRequestType {
  __typename: "Request";
  id: string;
  dateOfRequest: string;
  firstName: string;
  lastName: string;
  address?: string | null;
  city: string;
  zipCode?: number | null;
  phone?: string | null;
  email?: string | null;
  spanishOnly?: boolean | null;
  preferredContactTime?: string | null;
  request?: string | null;
  leadSource: LeadSource;
  leadOtherDetails?: string | null;
  selfOrOtherInfo: {
    __typename: "SelfOrOtherInfo";
    id: string;
    forSelf?: boolean | null;
    usedOtherResources?: boolean | null;
    otherResources?: string | null;
    requestFor?: string | null;
    requestIsKnown?: boolean | null;
    createdAt: string;
    updatedAt: string;
  };
  foodRequest?: {
    __typename: "FoodInfo";
    id: string;
    familyMembers?: number | null;
    children?: string | null;
    haveAllergies?: boolean | null;
    allergies?: string | null;
    groceries?: {
      __typename: "Groceries";
      id: string;
      milk?: boolean | null;
      eggs?: boolean | null;
      bread?: boolean | null;
      tortillas?: boolean | null;
      rice?: boolean | null;
      beans?: boolean | null;
      cheese?: boolean | null;
      beef?: boolean | null;
      hotdogs?: boolean | null;
      lunchMeat?: boolean | null;
      fruit?: boolean | null;
      peanutButter?: boolean | null;
      jelly?: boolean | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  movingRequest?: {
    __typename: "MovingInfo";
    id: string;
    items?: string | null;
    haveTransportation?: boolean | null;
    steepDriveway?: boolean | null;
    stairs?: boolean | null;
    unpavedRoad?: boolean | null;
    other?: boolean | null;
    otherDetails?: string | null;
    liabilityAck?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  resumeHelp?: boolean | null;
  coverLetterHelp?: boolean | null;
  carRepairDetails?: string | null;
  homeRepairType?: {
    __typename: "HomeRepairType";
    id: string;
    plumbing?: boolean | null;
    electrical?: boolean | null;
    painting?: boolean | null;
    yardwork?: boolean | null;
    other?: boolean | null;
    details?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  clothingType?: string | null;
  clothingSize?: string | null;
  furnitureType?: string | null;
  housingHelp?: boolean | null;
  needReason: Array<NeedReason | null>;
  needTypes: Array<NeedType | null>;
  status: RequestStatus;
  note?: string | null;
  needFulfiller?: string | null;
  dateFulfilled?: string | null;
  followUp?: string | null;
  createdAt: string;
  updatedAt: string;
}

export function getNeedTypes(needType: {
  meals: boolean;
  groceries: boolean;
  moving: boolean;
  jobTraining: boolean;
  homeRepair: boolean;
  carRepair: boolean;
  housing: boolean;
  clothing: boolean;
  furniture: boolean;
  other: boolean;
}) {
  let types: NeedType[] = [];
  if (needType.meals) types.push(NeedType.MEALS);
  if (needType.groceries) types.push(NeedType.GROCERIES);
  if (needType.moving) types.push(NeedType.MOVING);
  if (needType.carRepair) types.push(NeedType.CARREPAIR);
  if (needType.housing) types.push(NeedType.HOUSING);
  if (needType.homeRepair) types.push(NeedType.HOMEREPAIR);
  if (needType.jobTraining) types.push(NeedType.JOBTRAINING);
  if (needType.clothing) types.push(NeedType.CLOTHING);
  if (needType.furniture) types.push(NeedType.FURNITURE);
  if (needType.other) types.push(NeedType.OTHER);
  return types;
}