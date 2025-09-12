import {
  Card,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { ContentCopy, LocalPhone } from "@mui/icons-material";
import { isPointInPolygon } from "geolib";
import { t } from "i18next";
import parsePhoneNumber, {
  AsYouType,
  isPossiblePhoneNumber,
  parseIncompletePhoneNumber,
} from "libphonenumber-js";
import { ReactElement, useEffect, useState } from "react";

import areasOfConcern from "./data/areasOfConcern.json";
import { cardStyle } from "./needRequestForm";
import {
  HouseholdItemsGQL,
  IFoodInfo,
  IGroceriesType,
  IHomeRepairType,
  IJobTraining,
  IMovingType,
  INeedReason,
  RadioButtonState,
} from "./needRequestTypes";
import { LeadSource } from "./RequestAPI";
import { Alert } from "@mui/material";
import { fetchAuthSession } from "@aws-amplify/auth";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

export interface ContactCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  agent: RadioButtonState;
  referee: string;
  otherPersonsPhone: string;
}
export interface ContactCardProps extends ContactCardData {
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
  setPhone: (value: string) => void;
  setEmail: (value: string) => void;
  setAddress: (value: string) => void;
  setCity: (value: string) => void;
  setZip: (value: string) => void;
  setAgent: (value: RadioButtonState) => void;
  setReferee: (referee: string) => void;
  setRefereeKnows: (refereeKnows: RadioButtonState) => void;
  refereeKnows: RadioButtonState;
  setOtherPersonsPhone: (value: string) => void;
  copy: undefined | (() => void);
}

export function getCopyTextForContactInfo(contactData: ContactCardData) {
  return `Name - ${
    contactData.agent === RadioButtonState.YES || !contactData.referee
      ? contactData.firstName.trimEnd() + " " + contactData.lastName
      : contactData.referee
  }
Address -
${contactData.address}
${contactData.city}, ${contactData.zip}
Phone - ${
    contactData.agent === RadioButtonState.YES
      ? contactData.phone
      : contactData.otherPersonsPhone
  }`;
}

export function ContactCard(props: ContactCardProps): ReactElement {
  const formatter = new AsYouType("US");
  const copyItemsToClipboard = () => {
    const contactInfo = getCopyTextForContactInfo(props);
    navigator.clipboard.writeText(contactInfo);
    if (props.copy) {
      props.copy();
    }
  };
  const [alertForAddress, setAlertForAddress] = useState("");
  useEffect(() => {
    props.copy
      ? getLocationAlertForAddress(
          `${props.address}, ${props.city}, CA ${props.zip}`
        )
      : setAlertForAddress("");
  }, []);

  async function getLocationAlertForAddress(address: string) {
    try {
      const { credentials } = await fetchAuthSession();

      if (!credentials) {
        throw new Error("No credentials available.");
      }

      const client = new LambdaClient({
        region: "us-west-1",
        credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
          sessionToken: credentials.sessionToken,
        },
      });

      const command = new InvokeCommand({
        FunctionName: `findlatlong-${process.env.ENV}`,
        Payload: new TextEncoder().encode(JSON.stringify({ address })),
      });

      const data = await client.send(command);

      if (data.Payload) {
        const payloadParsed = JSON.parse(
          new TextDecoder().decode(data.Payload)
        );
        const bodyParsed = JSON.parse(payloadParsed.body);
        const response = bodyParsed[0];

        for (let area of areasOfConcern) {
          if (
            isPointInPolygon(
              { latitude: response.latitude, longitude: response.longitude },
              area.polygon
            )
          ) {
            setAlertForAddress(JSON.stringify(area.name));
          }
        }
      }
    } catch (err) {
      console.error("Error invoking Lambda:", err);
    }
  }

  return (
    <Card style={cardStyle}>
      <CardHeader
        title={t("contact_info")}
        titleTypographyProps={{ variant: "h6" }}
        action={
          props.copy && (
            <IconButton>
              <ContentCopy onClick={copyItemsToClipboard} />
            </IconButton>
          )
        }
      />{" "}
      <TextField
        label={t("first_name")}
        value={props.firstName}
        onChange={(changeEvent: any) =>
          props.setFirstName(changeEvent.target.value)
        }
        fullWidth
        required
      />
      <TextField
        label={t("last_name")}
        value={props.lastName}
        onChange={(changeEvent: any) =>
          props.setLastName(changeEvent.target.value)
        }
        fullWidth
        required
      />
      <Grid container spacing={0}>
        <Grid item xs={props.copy ? 11 : 12}>
          <TextField
            label={t("phone_number")}
            value={
              isPossiblePhoneNumber(props.phone)
                ? parsePhoneNumber(props.phone, "US")!.number
                : props.phone
            }
            onChange={(changeEvent: any) => {
              let newValue = parseIncompletePhoneNumber(
                changeEvent.target.value
              );

              // By default, if a value is something like `"(123)"`
              // then Backspace would only erase the rightmost brace
              // becoming something like `"(123"`
              // which would give the same `"123"` value
              // which would then be formatted back to `"(123)"`
              // and so a user wouldn't be able to erase the phone number.
              // Working around this issue with this simple hack.
              if (changeEvent.target.value?.length !== 4)
                props.setPhone(formatter.input(newValue));
              else props.setPhone(changeEvent.target.value);
            }}
            autoComplete="phone"
            fullWidth
            required
          />
        </Grid>
        {
          // use a grid to wrap this and the phone number textfield (above) to put these on the same line
          props.copy && (
            <Grid item xs={1}>
              {" "}
              <a href={"tel:" + props.phone}>
                <IconButton>
                  <LocalPhone />
                </IconButton>
              </a>{" "}
            </Grid>
          )
        }
      </Grid>
      <TextField
        label={t("email")}
        value={props.email}
        onChange={(changeEvent: any) =>
          props.setEmail(changeEvent.target.value)
        }
        autoComplete="email"
        fullWidth
      />
      {props.copy && alertForAddress && (
        <Alert severity="warning" style={{ marginTop: 6 }}>
          {alertForAddress}
        </Alert>
      )}
      <TextField
        label={t("street_address")}
        value={props.address}
        onChange={(changeEvent: any) =>
          props.setAddress(changeEvent.target.value)
        }
        autoComplete="address-line1"
        multiline
        fullWidth
      />
      <TextField
        label={t("city")}
        value={props.city}
        onChange={(changeEvent: any) => props.setCity(changeEvent.target.value)}
        fullWidth
        required
      />
      <TextField
        label={t("zip")}
        value={props.zip}
        onChange={(changeEvent: any) => props.setZip(changeEvent.target.value)}
        inputProps={{
          inputMode: "numeric",
          pattern: "[1-9][0-9]{4}",
          maxLength: 5,
          minLength: 5,
        }}
        autoComplete="postal-code"
        fullWidth
      />
      <Typography style={{ paddingTop: 15 }}>{t("for_you")}</Typography>
      <RadioGroup
        aria-label={t("for_you")}
        value={props.agent}
        onChange={(changeEvent: any) =>
          props.setAgent(changeEvent.target.value)
        }
      >
        <FormControlLabel
          value="yes"
          control={<Radio required={true} />}
          label={t("yes")}
        />
        <FormControlLabel
          value="no"
          control={<Radio required={true} />}
          label={t("no")}
        />
      </RadioGroup>
      {props.agent === "no" && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography>{t("do_they_know")}</Typography>{" "}
            <RadioGroup
              value={props.refereeKnows}
              onChange={(changeEvent: any) =>
                props.setRefereeKnows(changeEvent.target.value)
              }
            >
              <FormControlLabel
                value="yes"
                control={<Radio required={true} />}
                label={t("yes")}
              />
              <FormControlLabel
                value="no"
                control={<Radio required={true} />}
                label={t("no")}
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t("request_is_for")}
              value={props.referee}
              onChange={(changeEvent: any) =>
                props.setReferee(changeEvent.target.value)
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={props.copy ? 11 : 12}>
                <TextField
                  label={t("others_phone_number")}
                  value={
                    isPossiblePhoneNumber(
                      props.otherPersonsPhone ? props.otherPersonsPhone : ""
                    )
                      ? parsePhoneNumber(props.otherPersonsPhone, "US")!.number
                      : props.otherPersonsPhone
                  }
                  required
                  onChange={(changeEvent: any) => {
                    let newValue = parseIncompletePhoneNumber(
                      changeEvent.target.value
                    );

                    // By default, if a value is something like `"(123)"`
                    // then Backspace would only erase the rightmost brace
                    // becoming something like `"(123"`
                    // which would give the same `"123"` value
                    // which would then be formatted back to `"(123)"`
                    // and so a user wouldn't be able to erase the phone number.
                    // Working around this issue with this simple hack.
                    if (changeEvent.target.value?.length !== 4)
                      props.setOtherPersonsPhone(formatter.input(newValue));
                    else props.setOtherPersonsPhone(changeEvent.target.value);
                  }}
                  fullWidth
                />
              </Grid>
              {
                // use a grid to wrap this and the phone number textfield (above) to put these on the same line
                props.copy && (
                  <Grid item xs={1}>
                    <a href={"tel:" + props.otherPersonsPhone}>
                      <IconButton>
                        <LocalPhone />
                      </IconButton>
                    </a>
                  </Grid>
                )
              }
            </Grid>
          </Grid>
        </Grid>
      )}
    </Card>
  );
}

export function forSelfDetailsCard(
  usedOtherResources: RadioButtonState,
  setUsedOtherResources: (value: RadioButtonState) => void,
  otherResources: string,
  setOtherResources: (value: string) => void,
  t: (s: string) => string
) {
  return (
    <Card style={cardStyle}>
      {" "}
      <Typography>{t("have_used_other_resources")}</Typography>
      <RadioGroup
        aria-label={t("have_used_other_resources")}
        value={usedOtherResources}
        onChange={(changeEvent: any) =>
          setUsedOtherResources(changeEvent.target.value)
        }
      >
        <FormControlLabel
          value="yes"
          control={<Radio required={true} />}
          label={t("yes")}
        />
        <FormControlLabel
          value="no"
          control={<Radio required={true} />}
          label={t("no")}
        />
      </RadioGroup>
      {usedOtherResources === "yes" && (
        <TextField
          label={t("list_other_resources")}
          value={otherResources}
          onChange={(changeEvent: any) =>
            setOtherResources(changeEvent.target.value)
          }
        />
      )}
    </Card>
  );
}

export function leadTracingCard(
  lead: LeadSource | null,
  setLead: (leadSource: LeadSource) => void,
  leadOther: string,
  setLeadOther: (leadOther: string) => void,
  t: (s: string) => string
) {
  return (
    <Card style={cardStyle}>
      <FormControl>
        <Typography>{t("how_did_you_hear")}</Typography>
        <RadioGroup
          value={lead}
          onChange={(changeEvent: any) => setLead(changeEvent.target.value)}
        >
          <FormControlLabel
            value={LeadSource.REDEEMERS}
            control={<Radio required={true} />}
            label={t("heard_redeemers")}
          />
          <FormControlLabel
            value={LeadSource.FAMILY}
            control={<Radio required={true} />}
            label={t("heard_family")}
          />
          <FormControlLabel
            value={LeadSource.FRIEND}
            control={<Radio required={true} />}
            label={t("heard_friend")}
          />
          <FormControlLabel
            value={LeadSource.OTHER}
            control={<Radio required={true} />}
            label={t("other")}
          />
        </RadioGroup>
        {lead === LeadSource.OTHER && (
          <TextField
            value={leadOther}
            onChange={(changeEvent: any) =>
              setLeadOther(changeEvent.target.value)
            }
            required
          />
        )}
      </FormControl>
    </Card>
  );
}

export function needReasonCard(
  needReason: INeedReason,
  handleNeedReasonChange: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
  return (
    <Card style={cardStyle}>
      <FormControl required error={false}>
        <FormGroup>
          <Typography>{t("reason_for_need")}</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={needReason.covid}
                onChange={handleNeedReasonChange}
                name="covid"
              />
            }
            label={t("covid_loss")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needReason.illness}
                onChange={handleNeedReasonChange}
                name="illness"
              />
            }
            label={t("illness")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needReason.financial}
                onChange={handleNeedReasonChange}
                name="financial"
              />
            }
            label={t("financial")}
          />
        </FormGroup>
      </FormControl>
    </Card>
  );
}

export function familySizeCard(
  foodInfo: IFoodInfo,
  handleFoodInfoChange: (newFoodInfo: IFoodInfo) => void
) {
  return (
    <Card style={cardStyle}>
      <CardHeader
        title={t("family_size_title")}
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid item xs={12}>
        <Typography>{t("family_size")}</Typography>
        <TextField
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9][0-9]?",
            maxLength: 2,
          }}
          onChange={(changeEvent: any) =>
            handleFoodInfoChange({
              ...foodInfo,
              familyMembers: changeEvent.target.value,
            })
          }
          value={foodInfo.familyMembers}
          required
        ></TextField>
      </Grid>
    </Card>
  );
}

export function foodInfoCard(
  mealsOrGroceries: boolean,
  foodInfo: IFoodInfo,
  handleFoodInfoChange: (newFoodInfo: IFoodInfo) => void
) {
  return (
    <Card style={cardStyle}>
      <CardHeader
        title={mealsOrGroceries ? t("family_meals") : t("family_groceries")}
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <FormControl>
            <Typography>{t("minors")}</Typography>
            <TextField
              inputProps={{
                pattern: "([0-9][0-8]?[ -,]?[ ]?)*",
              }}
              helperText="1,4,12"
              value={foodInfo.children}
              onChange={(changeEvent: any) =>
                handleFoodInfoChange({
                  ...foodInfo,
                  children: changeEvent.target.value,
                })
              }
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography>{t("delivery_time")}</Typography>
          <TextField
            value={foodInfo.deliveryTime}
            onChange={(changeEvent: any) =>
              handleFoodInfoChange({
                ...foodInfo,
                deliveryTime: changeEvent.target.value,
              })
            }
          />
        </Grid>
        <Grid item>
          <Typography>{t("have_allergies")}</Typography>
          <RadioGroup
            value={foodInfo.haveAllergies}
            onChange={(changeEvent: any) =>
              handleFoodInfoChange({
                ...foodInfo,
                haveAllergies: changeEvent.target.value,
              })
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio required={true} />}
              label={t("yes")}
            />
            <FormControlLabel
              value="no"
              control={<Radio required={true} />}
              label={t("no")}
            />
          </RadioGroup>
        </Grid>
        {foodInfo.haveAllergies === RadioButtonState.YES && (
          <Grid item xs={12}>
            <FormControl>
              <Typography>{t("allergy_list")}</Typography>
              <TextField
                value={foodInfo.allergies}
                onChange={(changeEvent: any) =>
                  handleFoodInfoChange({
                    ...foodInfo,
                    allergies: changeEvent.target.value,
                  })
                }
                required
              ></TextField>
            </FormControl>
          </Grid>
        )}{" "}
      </Grid>
    </Card>
  );
}

export function movingCard(
  moving: IMovingType,
  handleMovingChange: (newMovingInfo: IMovingType) => void
) {
  const handleMovingConditions = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleMovingChange({
      ...moving,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Card style={cardStyle}>
      <CardHeader
        title={t("moving")}
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item>
          {" "}
          <FormControl>
            <Typography>{t("moving_items")}</Typography>
            <TextField
              required
              value={moving.items}
              onChange={(changeEvent: any) =>
                handleMovingChange({
                  ...moving,
                  items: changeEvent.target.value,
                })
              }
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography>{t("have_transportation")}</Typography>
          <RadioGroup
            value={moving.haveTransportation}
            onChange={(changeEvent: any) =>
              handleMovingChange({
                ...moving,
                haveTransportation: changeEvent.target.value,
              })
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio required={true} />}
              label={t("yes")}
            />
            <FormControlLabel
              value="no"
              control={<Radio required={true} />}
              label={t("no")}
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <Typography>{t("near_reedley")}</Typography>
            <RadioGroup
              value={moving.withinRange}
              onChange={(changeEvent: any) => {
                handleMovingChange({
                  ...moving,
                  withinRange: changeEvent.target.value,
                });
                if (changeEvent.target.value.toLowerCase() !== "yes") {
                  alert(t("move_too_far"));
                }
              }}
            >
              <FormControlLabel
                value="yes"
                control={<Radio required={true} />}
                label={t("yes")}
              />
              <FormControlLabel
                value="no"
                control={<Radio required={true} />}
                label={t("no")}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography>{t("special_conditions")}</Typography>
          <RadioGroup
            value={moving.haveSpecialConditions}
            onChange={(changeEvent: any) =>
              handleMovingChange({
                ...moving,
                haveSpecialConditions: changeEvent.target.value,
              })
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio required={true} />}
              label={t("yes")}
            />
            <FormControlLabel
              value="no"
              control={<Radio required={true} />}
              label={t("no")}
            />
          </RadioGroup>
        </Grid>
        {moving.haveSpecialConditions === "yes" && (
          <Grid item xs={12}>
            <FormControl>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={moving.steepDriveway}
                      onChange={handleMovingConditions}
                      name="steepDriveway"
                    />
                  }
                  label={t("steep_driveway")}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={moving.stairs}
                      onChange={handleMovingConditions}
                      name="stairs"
                    />
                  }
                  label={t("stairs")}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={moving.unpavedRoad}
                      onChange={handleMovingConditions}
                      name="unpavedRoad"
                    />
                  }
                  label={t("unpaved_road")}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={moving.other}
                      onChange={handleMovingConditions}
                      name="other"
                    />
                  }
                  label={t("other")}
                />
              </FormGroup>

              {moving.other && (
                <FormControl>
                  <Typography>{t("other_considerations")}</Typography>
                  <TextField
                    value={moving.otherDetails}
                    onChange={(changeEvent: any) =>
                      handleMovingChange({
                        ...moving,
                        otherDetails: changeEvent.target.value,
                      })
                    }
                    required
                  ></TextField>
                </FormControl>
              )}
            </FormControl>
          </Grid>
        )}
        {moving.liabilityAck || (
          <Grid item xs={12}>
            <FormControlLabel
              value="false"
              control={<Checkbox required={true} />}
              label={t("packing_wrapping")}
            />
            <FormControlLabel
              value="false"
              control={<Checkbox required={true} />}
              label={t("volunteer_liability")}
            />
            <FormControlLabel
              value="false"
              control={<Checkbox required={true} />}
              label={t("storage_unit")}
            />
          </Grid>
        )}
      </Grid>
    </Card>
  );
}

export function getGroceriesListText(groceries: IGroceriesType): string {
  let selectedItems = [];
  if (groceries.milk) selectedItems.push("Milk");
  if (groceries.eggs) selectedItems.push("Eggs");
  if (groceries.bread) selectedItems.push("Bread");
  if (groceries.butter) selectedItems.push("Butter");
  if (groceries.tortillas) selectedItems.push("Tortillas");
  if (groceries.rice) selectedItems.push("Rice");
  if (groceries.beans) selectedItems.push("Beans");
  if (groceries.cheese) selectedItems.push("Cheese");
  if (groceries.beef) selectedItems.push("Beef");
  if (groceries.hotdogs) selectedItems.push("Hotdogs");
  if (groceries.lunchMeat) selectedItems.push("Lunch Meat");
  if (groceries.fruit) selectedItems.push("Fruit");
  if (groceries.peanutButter) selectedItems.push("Peanut Butter");
  if (groceries.jelly) selectedItems.push("Jelly");
  return selectedItems.join();
}

export function groceriesCard(
  groceries: IGroceriesType,
  handleGroceriesChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  copy: undefined | (() => void)
): JSX.Element {
  const copyItemsToClipboard = () => {
    navigator.clipboard.writeText(getGroceriesListText(groceries));
    if (copy) {
      copy();
    }
  };
  return (
    <Card style={cardStyle}>
      <CardHeader
        title={t("groceries")}
        titleTypographyProps={{ variant: "h6" }}
        action={
          copy && (
            <IconButton>
              <ContentCopy onClick={copyItemsToClipboard} />
            </IconButton>
          )
        }
      />
      <FormControl required>
        <FormGroup>
          <Typography>{t("groceries_list")}</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.milk}
                onChange={handleGroceriesChange}
                name="milk"
              />
            }
            label={t("milk")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.eggs}
                onChange={handleGroceriesChange}
                name="eggs"
              />
            }
            label={t("eggs")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.bread}
                onChange={handleGroceriesChange}
                name="bread"
              />
            }
            label={t("bread")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.tortillas}
                onChange={handleGroceriesChange}
                name="tortillas"
              />
            }
            label={t("tortillas")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.rice}
                onChange={handleGroceriesChange}
                name="rice"
              />
            }
            label={t("rice")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.beans}
                onChange={handleGroceriesChange}
                name="beans"
              />
            }
            label={t("beans")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.cheese}
                onChange={handleGroceriesChange}
                name="cheese"
              />
            }
            label={t("cheese")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.beef}
                onChange={handleGroceriesChange}
                name="beef"
              />
            }
            label={t("beef")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.hotdogs}
                onChange={handleGroceriesChange}
                name="hotdogs"
              />
            }
            label={t("hotdogs")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.lunchMeat}
                onChange={handleGroceriesChange}
                name="lunchMeat"
              />
            }
            label={t("lunch_meat")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.fruit}
                onChange={handleGroceriesChange}
                name="fruit"
              />
            }
            label={t("fruit")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.butter}
                onChange={handleGroceriesChange}
                name="butter"
              />
            }
            label={t("butter")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.peanutButter}
                onChange={handleGroceriesChange}
                name="peanutButter"
              />
            }
            label={t("peanut_butter")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.jelly}
                onChange={handleGroceriesChange}
                name="jelly"
              />
            }
            label={t("jelly")}
          />
        </FormGroup>
      </FormControl>
    </Card>
  );
}

export function clothingCard(
  clothingType: string,
  clothingSize: string,
  setClothingType: (type: string) => void,
  setClothingSize: (size: string) => void,
  copy: undefined | (() => void)
) {
  const copyItemsToClipboard = () => {
    "Types";
    navigator.clipboard.writeText(
      "Clothing Type: " + clothingType + "\nClothing Size: " + clothingSize
    );
    if (copy) {
      copy();
    }
  };

  return (
    <Card style={cardStyle}>
      {" "}
      <CardHeader
        title={t("clothing")}
        titleTypographyProps={{ variant: "h6" }}
        action={
          copy && (
            <IconButton>
              <ContentCopy onClick={copyItemsToClipboard} />
            </IconButton>
          )
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {" "}
          <FormControl fullWidth>
            <Typography>{t("clothing_type")}</Typography>
            <TextField
              required
              multiline
              value={clothingType}
              onChange={(changeEvent: any) =>
                setClothingType(changeEvent.target.value)
              }
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <FormControl fullWidth>
            <Typography>{t("clothing_size")}</Typography>
            <TextField
              required
              multiline
              value={clothingSize}
              helperText={t("clothing_size_hint")}
              onChange={(changeEvent: any) =>
                setClothingSize(changeEvent.target.value)
              }
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
}

export function furnitureCard(
  furnitureType: string,
  setFurnitureType: (ft: string) => void
) {
  return (
    <Card style={cardStyle}>
      {" "}
      <CardHeader
        title={t("furniture")}
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {" "}
          <FormControl fullWidth>
            <Typography>{t("furniture_type")}</Typography>
            <TextField
              required
              multiline
              value={furnitureType}
              onChange={(changeEvent: any) =>
                setFurnitureType(changeEvent.target.value)
              }
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
}

export function jobTrainingCard(
  jobTraining: IJobTraining,
  setJobTraining: (jt: IJobTraining) => void
) {
  return (
    <Card style={cardStyle}>
      <CardHeader
        title={t("job_prep")}
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography>{t("resume_help")}</Typography>
          <RadioGroup
            value={jobTraining.resumeHelp}
            onChange={(changeEvent: any) =>
              setJobTraining({
                ...jobTraining,
                resumeHelp: changeEvent.target.value,
              })
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio required={true} />}
              label={t("yes")}
            />
            <FormControlLabel
              value="no"
              control={<Radio required={true} />}
              label={t("no")}
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography>{t("cover_letter_help")}</Typography>
          <RadioGroup
            value={jobTraining.coverLetterHelp}
            onChange={(changeEvent: any) =>
              setJobTraining({
                ...jobTraining,
                coverLetterHelp: changeEvent.target.value,
              })
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio required={true} />}
              label={t("yes")}
            />
            <FormControlLabel
              value="no"
              control={<Radio required={true} />}
              label={t("no")}
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </Card>
  );
}

export function carRepairCard(
  carRepairDetails: string,
  setCarRepairDetails: (details: string) => void
) {
  return (
    <Card style={cardStyle}>
      <CardHeader
        title={t("car_repair")}
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography>{t("repair_limits")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Typography>{t("car_repair_details")}</Typography>
            <TextField
              fullWidth
              multiline
              value={carRepairDetails}
              onChange={(changeEvent: any) =>
                setCarRepairDetails(changeEvent.target.value)
              }
              required
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
}

export function homeRepairCard(
  homeRepairDetails: IHomeRepairType,
  setHomeRepairDetails: (details: IHomeRepairType) => void
) {
  const handleHomeRepair = (event: React.ChangeEvent<HTMLInputElement>) =>
    setHomeRepairDetails({
      ...homeRepairDetails,
      [event.target.name]: event.target.checked,
    });
  return (
    <Card style={cardStyle}>
      <CardHeader
        title={t("home_repair")}
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography>{t("repair_limits")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.plumbing}
                    onChange={handleHomeRepair}
                    name="plumbing"
                  />
                }
                label={t("plumbing")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.electrical}
                    onChange={handleHomeRepair}
                    name="electrical"
                  />
                }
                label={t("electrical")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.painting}
                    onChange={handleHomeRepair}
                    name="painting"
                  />
                }
                label={t("painting")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.yardwork}
                    onChange={handleHomeRepair}
                    name="yardwork"
                  />
                }
                label={t("yard_work")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.other}
                    onChange={handleHomeRepair}
                    name="other"
                  />
                }
                label={t("other")}
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Typography>{t("home_repair_details")}</Typography>
            <TextField
              fullWidth
              multiline
              value={homeRepairDetails.details}
              onChange={(changeEvent: any) =>
                setHomeRepairDetails({
                  ...homeRepairDetails,
                  details: changeEvent.target.value,
                })
              }
              required
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
}

export function getHouseholdItemsText(items: HouseholdItemsGQL) {
  let selectedItems = [];
  for (var key in items) {
    switch (key) {
      case "bleach":
        if (items.bleach) selectedItems.push("Bleach");
        break;
      case "lysolSpray":
        if (items.lysolSpray) selectedItems.push("Lysol Spray");
        break;
      case "lysolWipes":
        if (items.lysolWipes) selectedItems.push("Lysol Wipes");
        break;
      case "dishsoap":
        if (items.dishsoap) selectedItems.push("Dish Soap");
        break;
      case "sponges":
        if (items.sponges) selectedItems.push("Sponges");
        break;
      case "pinesol":
        if (items.pinesol) selectedItems.push("Pine-sol");
        break;
      case "paperTowels":
        if (items.paperTowels) selectedItems.push("Paper Towels");
        break;
      case "laundrySoap":
        if (items.laundrySoap) selectedItems.push("Laundry Detergent");
        break;
    }
  }
  return selectedItems.join();
}

export function getHygeneItemsText(items: HouseholdItemsGQL) {
  let selectedItems = [];
  for (var key in items) {
    switch (key) {
      case "shampoo":
        if (items.shampoo) {
          selectedItems.push("Shampoo");
        }
        break;

      case "conditioner":
        if (items.conditioner) {
          selectedItems.push("Conditioner");
        }
        break;

      case "bathSoap":
        if (items.bathSoap) {
          selectedItems.push("Bath Soap");
        }
        break;

      case "toothpaste":
        if (items.toothpaste) {
          selectedItems.push("Toothpaste");
        }
        break;

      case "toothbrush":
        if (items.toothbrush) {
          selectedItems.push("Toothbrush");
        }
        break;

      case "deodorant":
        if (items.deodorant) {
          selectedItems.push("Deodorant");
        }
        break;

      case "toiletPaper":
        if (items.toiletPaper) {
          selectedItems.push("Toilet Paper");
        }
        break;

      case "handSoap":
        if (items.handSoap) {
          selectedItems.push("Hand Soap");
        }
        break;

      case "sanitaryPads":
        if (items.sanitaryPads) {
          selectedItems.push("Sanitary Pads");
        }
        break;

      case "tampons":
        if (items.tampons) {
          selectedItems.push("Tampons");
        }
        break;
    }
  }
  return selectedItems.join();
}

export function householdItemsCard(
  items: HouseholdItemsGQL,
  handleItemsChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  copy: undefined | (() => void)
): JSX.Element {
  const copyItemsToClipboard = () => {
    navigator.clipboard.writeText(getHouseholdItemsText(items));
    if (copy) {
      copy();
    }
  };
  return (
    <Card style={cardStyle}>
      <CardHeader
        title={t("household_items")}
        titleTypographyProps={{ variant: "h6" }}
        action={
          copy && (
            <IconButton>
              <ContentCopy onClick={copyItemsToClipboard} />
            </IconButton>
          )
        }
      />
      <FormControl required>
        <FormGroup>
          <Typography>{t("household_items_list")}</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.bleach}
                onChange={handleItemsChange}
                name="bleach"
              />
            }
            label={t("bleach")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.dishsoap}
                onChange={handleItemsChange}
                name="dishsoap"
              />
            }
            label={t("dish_soap")}
          />
          {items.lysolWipes && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!items.lysolSpray}
                  onChange={handleItemsChange}
                  name="lysolSpray"
                />
              }
              label={t("lysol_spray")}
            />
          )}
          {items.lysolWipes && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!items.lysolWipes}
                  onChange={handleItemsChange}
                  name="lysolWipes"
                />
              }
              label={t("lysol_wipes")}
            />
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.laundrySoap}
                onChange={handleItemsChange}
                name="laundrySoap"
              />
            }
            label={t("laundry_detergent")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.pinesol}
                onChange={handleItemsChange}
                name="pinesol"
              />
            }
            label={t("pine-sol")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.sponges}
                onChange={handleItemsChange}
                name="sponges"
              />
            }
            label={t("sponges")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.paperTowels}
                onChange={handleItemsChange}
                name="paperTowels"
              />
            }
            label={t("paper_towels")}
          />
        </FormGroup>
      </FormControl>
    </Card>
  );
}

export function hygeneItemsCard(
  items: HouseholdItemsGQL,
  handleItemsChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  copy: undefined | (() => void)
): JSX.Element {
  const copyItemsToClipboard = () => {
    let selectedItems = [];
    for (var key in items) {
      switch (key) {
        case "bathSoap":
          if (items.bathSoap) selectedItems.push("Bath Soap");
          break;
        case "deodorant":
          if (items.deodorant) selectedItems.push("Deodorant");
          break;
        case "handSoap":
          if (items.handSoap) selectedItems.push("Hand Soap");
          break;
        case "sanitaryPads":
          if (items.sanitaryPads) selectedItems.push("Sanitary Pads");
          break;
        case "shampoo":
          if (items.shampoo) selectedItems.push("Shampoo");
          break;
        case "conditioner":
          if (items.conditioner) selectedItems.push("Conditioner");
          break;
        case "tampons":
          if (items.tampons) selectedItems.push("Tampons");
          break;
        case "toiletPaper":
          if (items.toiletPaper) selectedItems.push("Toilet Paper");
          break;
        case "toothbrush":
          if (items.toothbrush) selectedItems.push("Tooth Brush");
          break;
        case "toothpaste":
          if (items.toothpaste) selectedItems.push("Toothpaste");
          break;
        case "bleach":
        case "lysolSpray":
        case "lysolWipes":
        case "dishsoap":
        case "sponges":
        case "pinesol":
        case "paperTowels":
        case "laundrySoap":
        case "id":
        case "createdAt":
        case "updatedAt":
          break;
        default:
          alert("Tell Jason that he forgot to copy " + key);
      }
    }
    navigator.clipboard.writeText(selectedItems.join());
    if (copy) {
      copy();
    }
  };
  return (
    <Card style={cardStyle}>
      <CardHeader
        title={t("hygene_items")}
        titleTypographyProps={{ variant: "h6" }}
        action={
          copy && (
            <IconButton>
              <ContentCopy onClick={copyItemsToClipboard} />
            </IconButton>
          )
        }
      />
      <FormControl required>
        <FormGroup>
          <Typography>{t("household_items_list")}</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.bathSoap}
                onChange={handleItemsChange}
                name="bathSoap"
              />
            }
            label={t("bath_soap")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.deodorant}
                onChange={handleItemsChange}
                name="deodorant"
              />
            }
            label={t("deodorant")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.handSoap}
                onChange={handleItemsChange}
                name="handSoap"
              />
            }
            label={t("hand_soap")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.sanitaryPads}
                onChange={handleItemsChange}
                name="sanitaryPads"
              />
            }
            label={t("sanitary_pads")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.shampoo}
                onChange={handleItemsChange}
                name="shampoo"
              />
            }
            label={t("shampoo")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.conditioner}
                onChange={handleItemsChange}
                name="conditioner"
              />
            }
            label={t("conditioner")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.tampons}
                onChange={handleItemsChange}
                name="tampons"
              />
            }
            label={t("tampons")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.toiletPaper}
                onChange={handleItemsChange}
                name="toiletPaper"
              />
            }
            label={t("toilet_paper")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.toothbrush}
                onChange={handleItemsChange}
                name="toothbrush"
              />
            }
            label={t("toothbrush")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.toothpaste}
                onChange={handleItemsChange}
                name="toothpaste"
              />
            }
            label={t("toothpaste")}
          />
        </FormGroup>
      </FormControl>
    </Card>
  );
}

export function otherNeedCard(
  other: string,
  setOther: (other: string) => void
) {
  return (
    <Card style={cardStyle}>
      <CardHeader title={t("Other")} titleTypographyProps={{ variant: "h6" }} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            label={t("other_needs")}
            onChange={(changeEvent: any) => setOther(changeEvent.target.value)}
            value={other}
            required
          ></TextField>
        </Grid>
      </Grid>
    </Card>
  );
}
