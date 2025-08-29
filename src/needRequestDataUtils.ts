import {
  CreateFoodInfoInput,
  CreateHomeRepairTypeInput,
  CreateMovingInfoInput,
  CreateNoteTypeInput,
  NoteType,
  UpdateFoodInfoInput,
  UpdateHomeRepairTypeInput,
  UpdateMovingInfoInput,
  UpdateNoteTypeInput,
} from "./RequestAPI";
import {
  CREATE_TABLE,
  IGraphQLTable,
  IHomeRepairReqType,
  MovingInfoGQL,
} from "./needRequestTypes";
import { generateClient } from "aws-amplify/api";

export function noteCreateFromReqData(value: NoteType): CreateNoteTypeInput {
  return {
    author: value.author,
    content: value.content,
    notable: value.notable,
    dateCreated: value.dateCreated,
    requestID: value.requestID,
  };
}

export function movingInfoCreateFromReqData(
  value: MovingInfoGQL
): CreateMovingInfoInput {
  return {
    items: value.items,
    haveTransportation: value.haveTransportation,
    other: value.other,
    otherDetails: value.otherDetails,
    liabilityAck: value.liabilityAck,
    stairs: value.stairs,
    steepDriveway: value.steepDriveway,
    unpavedRoad: value.unpavedRoad,
  };
}

export function homeRepairCreateFromReqData(
  value: IHomeRepairReqType
): CreateHomeRepairTypeInput {
  return {
    other: value.other,
    painting: value.painting,
    plumbing: value.plumbing,
    yardwork: value.yardwork,
    electrical: value.electrical,
    details: value.details,
  };
}

export function foodInfoCreateFromReqData(value: any): CreateFoodInfoInput {
  return {
    allergies: value.allergies,
    children: value.children,
    haveAllergies: value.haveAllergies,
    familyMembers: value.familyMembers,
    milk: value.milk,
    eggs: value.eggs,
    beans: value.beans,
    beef: value.beef,
    bread: value.bread,
    butter: value.butter,
    peanutButter: value.peanutButter,
    cheese: value.cheese,
    fruit: value.fruit,
    hotdogs: value.hotdogs,
    jelly: value.jelly,
    lunchMeat: value.lunchMeat,
    rice: value.rice,
    tortillas: value.tortillas,
  };
}

export function noteUpdateFromReqData(value: NoteType): UpdateNoteTypeInput {
  return {
    id: value.id,
    author: value.author,
    content: value.content,
    dateCreated: value.dateCreated,
    requestID: value.requestID,
  };
}

export function movingInfoUpdateFromReqData(
  value: MovingInfoGQL & IGraphQLTable
): UpdateMovingInfoInput {
  return {
    id: value.id,
    items: value.items,
    haveTransportation: value.haveTransportation,
    other: value.other,
    otherDetails: value.otherDetails,
    liabilityAck: value.liabilityAck,
    stairs: value.stairs,
    steepDriveway: value.steepDriveway,
    unpavedRoad: value.unpavedRoad,
  };
}

export function homeRepairUpdateFromReqData(
  value: IHomeRepairReqType
): UpdateHomeRepairTypeInput {
  return {
    id: value.id,
    other: value.other,
    painting: value.painting,
    plumbing: value.plumbing,
    yardwork: value.yardwork,
    electrical: value.electrical,
    details: value.details,
  };
}

export function foodInfoUpdateFromReqData(value: any): UpdateFoodInfoInput {
  return {
    id: value.id,
    allergies: value.allergies,
    children: value.children,
    haveAllergies: value.haveAllergies,
    familyMembers: value.familyMembers,
    milk: value.milk,
    eggs: value.eggs,
    beans: value.beans,
    beef: value.beef,
    bread: value.bread,
    butter: value.butter,
    peanutButter: value.peanutButter,
    cheese: value.cheese,
    fruit: value.fruit,
    hotdogs: value.hotdogs,
    jelly: value.jelly,
    lunchMeat: value.lunchMeat,
    rice: value.rice,
    tortillas: value.tortillas,
  };
}

export async function createOrUpdate<TableType extends IGraphQLTable>(
  requestTable: TableType,
  createOperation: string,
  tableCreateFromReqData: (reqData: TableType) => any,
  updateOperation: string,
  tableUpdateFromReqData: (reqData: TableType) => any,
  getIdFromCreate: (newRowData: any) => string
): Promise<TableType> {
  const API = await generateClient();
  if (requestTable.id === CREATE_TABLE) {
    let newRow: any = await API.graphql({
      query: createOperation,
      variables: {
        input: tableCreateFromReqData(requestTable),
      },
    });
    requestTable.id = getIdFromCreate(newRow.data);
  } else if (requestTable.id === "DELETE_TABLE") {
    // delete the row from the table and set requestTable to null
  } else {
    // update the row in the table
    await API.graphql({
      query: updateOperation,
      variables: {
        input: tableUpdateFromReqData(requestTable),
      },
      authMode: "userPool",
    });
  }
  return requestTable;
}
