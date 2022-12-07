import {
  Card,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { t } from "i18next";
import parsePhoneNumber, {
  AsYouType,
  isPossiblePhoneNumber,
  parseIncompletePhoneNumber,
} from "libphonenumber-js";
import { Fragment } from "react";

import { cardStyle } from "./needRequestForm";
import {
  HouseholdItemsGQL,
  IFoodInfo,
  IGroceriesType,
  IHomeRepairType,
  IJobTraining,
  IMovingType,
  INeedReason,
  INeedTypes,
  RadioButtonState,
} from "./needRequestTypes";
import { LeadSource } from "./RequestAPI";

export function nameCard(
  firstName: string,
  setFirstName: (name: string) => void,
  lastName: string,
  setLastName: (name: string) => void
): JSX.Element {
  return (
    <Card style={cardStyle}>
      <TextField
        label={t("first_name")}
        value={firstName}
        onChange={(changeEvent: any) => setFirstName(changeEvent.target.value)}
        fullWidth
        required
      />
      <TextField
        label={t("last_name")}
        value={lastName}
        onChange={(changeEvent: any) => setLastName(changeEvent.target.value)}
        fullWidth
        required
      />
    </Card>
  );
}

export function contactCard(
  phone: string,
  setPhone: (value: string) => void,
  email: string,
  setEmail: (value: string) => void,
  address: string,
  setAddress: (value: string) => void,
  city: string,
  setCity: (value: string) => void,
  zip: string,
  setZip: (value: string) => void
): JSX.Element {
  const formatter = new AsYouType("US");
  return (
    <Card style={cardStyle}>
      <TextField
        label={t("phone_number")}
        value={
          isPossiblePhoneNumber(phone)
            ? parsePhoneNumber(phone, "US")!.number
            : phone
        }
        onChange={(changeEvent: any) => {
          let newValue = parseIncompletePhoneNumber(changeEvent.target.value);

          // By default, if a value is something like `"(123)"`
          // then Backspace would only erase the rightmost brace
          // becoming something like `"(123"`
          // which would give the same `"123"` value
          // which would then be formatted back to `"(123)"`
          // and so a user wouldn't be able to erase the phone number.
          // Working around this issue with this simple hack.
          if (changeEvent.target.value?.length !== 4)
            setPhone(formatter.input(newValue));
          else setPhone(changeEvent.target.value);
        }}
        autoComplete="phone"
        fullWidth
        required
      />
      <TextField
        label={t("email")}
        value={email}
        onChange={(changeEvent: any) => setEmail(changeEvent.target.value)}
        autoComplete="email"
        fullWidth
      />
      <TextField
        label={t("street_address")}
        value={address}
        onChange={(changeEvent: any) => setAddress(changeEvent.target.value)}
        autoComplete="address-line1"
        multiline
        fullWidth
      />
      <TextField
        label={t("city")}
        value={city}
        onChange={(changeEvent: any) => setCity(changeEvent.target.value)}
        fullWidth
        required
      />
      <TextField
        label={t("zip")}
        value={zip}
        onChange={(changeEvent: any) => setZip(changeEvent.target.value)}
        inputProps={{
          inputMode: "numeric",
          pattern: "[1-9][0-9]{4}",
          maxLength: 5,
          minLength: 5,
        }}
        autoComplete="postal-code"
        fullWidth
      />
    </Card>
  );
}

export function forYouOrOtherCard(
  agent: RadioButtonState,
  setAgent: (value: RadioButtonState) => void
): JSX.Element {
  return (
    <Card style={cardStyle}>
      <Typography>{t("for_you")}</Typography>
      <RadioGroup
        aria-label={t("for_you")}
        value={agent}
        onChange={(changeEvent: any) => setAgent(changeEvent.target.value)}
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

export function forOtherDetailsCard(
  referee: string,
  setReferee: (referee: string) => void,
  refereeKnows: RadioButtonState,
  setRefereeKnows: (refereeKnows: RadioButtonState) => void,
  otherPersonsPhone: string,
  setOtherPersonsPhone: (value: string) => void
) {
  const formatter = new AsYouType("US");
  return (
    <Card style={cardStyle}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            label={t("request_is_for")}
            value={referee}
            onChange={(changeEvent: any) =>
              setReferee(changeEvent.target.value)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>{t("do_they_know")}</Typography>{" "}
          <RadioGroup
            value={refereeKnows}
            onChange={(changeEvent: any) =>
              setRefereeKnows(changeEvent.target.value)
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
            label={t("others_phone_number")}
            value={
              isPossiblePhoneNumber(otherPersonsPhone ? otherPersonsPhone : "")
                ? parsePhoneNumber(otherPersonsPhone, "US")!.number
                : otherPersonsPhone
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
                setOtherPersonsPhone(formatter.input(newValue));
              else setOtherPersonsPhone(changeEvent.target.value);
            }}
            fullWidth
          />
        </Grid>
      </Grid>
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

export function needRequestCard(
  needType: INeedTypes,
  handleNeedTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  completed?: INeedTypes,
  displayAll: boolean = true
) {
  let groceriesCheck = displayAll ? needType.groceries : completed?.groceries;
  let mealsCheck = displayAll ? needType.meals : completed?.meals;
  let clothingCheck = displayAll ? needType.clothing : completed?.clothing;
  let furnitureCheck = displayAll ? needType.furniture : completed?.furniture;
  let carRepairCheck = displayAll ? needType.carRepair : completed?.carRepair;
  let homeRepairCheck = displayAll
    ? needType.homeRepair
    : completed?.homeRepair;
  let hygeneCheck = displayAll ? needType.hygeneItems : completed?.hygeneItems;
  let otherCheck = displayAll ? needType.other : completed?.other;
  let householdItemsCheck = displayAll
    ? needType.householdItems
    : completed?.householdItems;
  let housingCheck = displayAll ? needType.housing : completed?.housing;
  let jobTrainingCheck = displayAll
    ? needType.jobTraining
    : completed?.jobTraining;
  let movingCheck = displayAll ? needType.moving : completed?.moving;
  return (
    <Card style={cardStyle}>
      {" "}
      <FormControl required>
        <FormGroup>
          {displayAll ? (
            <Typography>{t("assistance_type")}</Typography>
          ) : (
            <Typography>
              Assistance Requested: Check items when they are fulfilled
            </Typography>
          )}
          {}
          {(displayAll || needType.groceries) && (
            <Fragment>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={groceriesCheck}
                    onChange={handleNeedTypeChange}
                    name="groceries"
                  />
                }
                label={t("groceries")}
              />
            </Fragment>
          )}
          {(displayAll || needType.meals) && (
            <Fragment>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mealsCheck}
                    onChange={handleNeedTypeChange}
                    name="meals"
                  />
                }
                label={t("meals")}
              />
            </Fragment>
          )}
          {(displayAll || needType.clothing) && (
            <Fragment>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={clothingCheck}
                    onChange={handleNeedTypeChange}
                    name="clothing"
                  />
                }
                label={t("clothing")}
              />
            </Fragment>
          )}
          {(displayAll || needType.householdItems) && (
            <Fragment>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={householdItemsCheck}
                    onChange={handleNeedTypeChange}
                    name="householdItems"
                  />
                }
                label={t("household_items")}
              />
            </Fragment>
          )}
          {(displayAll || needType.hygeneItems) && (
            <Fragment>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hygeneCheck}
                    onChange={handleNeedTypeChange}
                    name="hygeneItems"
                  />
                }
                label={t("hygene_items")}
              />
            </Fragment>
          )}
          {(displayAll || needType.moving) && (
            <Fragment>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={movingCheck}
                    onChange={handleNeedTypeChange}
                    name="moving"
                  />
                }
                label={t("moving_assistance")}
              />
            </Fragment>
          )}
          {(displayAll || needType.furniture) && (
            <Fragment>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={furnitureCheck}
                    onChange={handleNeedTypeChange}
                    name="furniture"
                  />
                }
                label={t("furniture")}
              />
            </Fragment>
          )}
          {(displayAll || needType.homeRepair) && (
            <Fragment>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairCheck}
                    onChange={handleNeedTypeChange}
                    name="homeRepair"
                  />
                }
                label={t("home_repair")}
              />
            </Fragment>
          )}
          {(displayAll || needType.carRepair) && (
            <Fragment>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={carRepairCheck}
                    onChange={handleNeedTypeChange}
                    name="carRepair"
                  />
                }
                label={t("car_repair")}
              />
            </Fragment>
          )}
          {(displayAll || needType.jobTraining) && (
            <Fragment>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jobTrainingCheck}
                    onChange={handleNeedTypeChange}
                    name="jobTraining"
                  />
                }
                label={t("job_prep")}
              />
            </Fragment>
          )}
          {(displayAll || needType.housing) && (
            <Fragment>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={housingCheck}
                    onChange={handleNeedTypeChange}
                    name="housing"
                  />
                }
                label={t("housing")}
              />
            </Fragment>
          )}
          {(displayAll || needType.other) && (
            <Fragment>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={otherCheck}
                    onChange={handleNeedTypeChange}
                    name="other"
                  />
                }
                label={t("other")}
              />
            </Fragment>
          )}
        </FormGroup>
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

export function groceriesCard(
  groceries: IGroceriesType,
  handleGroceriesChange: (event: React.ChangeEvent<HTMLInputElement>) => void
): JSX.Element {
  return (
    <Card style={cardStyle}>
      <CardHeader
        title={t("groceries")}
        titleTypographyProps={{ variant: "h6" }}
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
  setClothingSize: (size: string) => void
) {
  return (
    <Card style={cardStyle}>
      {" "}
      <CardHeader
        title={t("clothing")}
        titleTypographyProps={{ variant: "h6" }}
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

export function householdItemsCard(
  items: HouseholdItemsGQL,
  handleItemsChange: (event: React.ChangeEvent<HTMLInputElement>) => void
): JSX.Element {
  return (
    <Card style={cardStyle}>
      <CardHeader
        title={t("household_items")}
        titleTypographyProps={{ variant: "h6" }}
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
  handleItemsChange: (event: React.ChangeEvent<HTMLInputElement>) => void
): JSX.Element {
  return (
    <Card style={cardStyle}>
      <CardHeader
        title={t("hygene_items")}
        titleTypographyProps={{ variant: "h6" }}
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
