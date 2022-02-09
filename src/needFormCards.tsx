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
import parsePhoneNumber, {
  AsYouType,
  isPossiblePhoneNumber,
  parseIncompletePhoneNumber,
} from "libphonenumber-js";

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
        label="First Name"
        value={firstName}
        onChange={(changeEvent: any) => setFirstName(changeEvent.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Last Name"
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
        label="Phone Number"
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
      />
      <TextField
        label="Email Address"
        value={email}
        onChange={(changeEvent: any) => setEmail(changeEvent.target.value)}
        autoComplete="email"
        fullWidth
      />
      <TextField
        label="Street Address"
        value={address}
        onChange={(changeEvent: any) => setAddress(changeEvent.target.value)}
        autoComplete="address-line1"
        multiline
        fullWidth
      />
      <TextField
        label="City"
        value={city}
        onChange={(changeEvent: any) => setCity(changeEvent.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Zip Code"
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
      <Typography>Is this request for you?</Typography>
      <RadioGroup
        aria-label="Is this request for you?"
        value={agent}
        onChange={(changeEvent: any) => setAgent(changeEvent.target.value)}
      >
        <FormControlLabel
          value="yes"
          control={<Radio required={true} />}
          label="Yes"
        />
        <FormControlLabel
          value="no"
          control={<Radio required={true} />}
          label="No"
        />
      </RadioGroup>
    </Card>
  );
}

export function forSelfDetailsCard(
  usedOtherResources: RadioButtonState,
  setUsedOtherResources: (value: RadioButtonState) => void,
  otherResources: string,
  setOtherResources: (value: string) => void
) {
  return (
    <Card style={cardStyle}>
      {" "}
      <Typography>Have you used any other resources?</Typography>
      <RadioGroup
        aria-label="Have you used any other resources?"
        value={usedOtherResources}
        onChange={(changeEvent: any) =>
          setUsedOtherResources(changeEvent.target.value)
        }
      >
        <FormControlLabel
          value="yes"
          control={<Radio required={true} />}
          label="Yes"
        />
        <FormControlLabel
          value="no"
          control={<Radio required={true} />}
          label="No"
        />
      </RadioGroup>
      {usedOtherResources === "yes" && (
        <TextField
          label="Please list resources"
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
  setRefereeKnows: (refereeKnows: RadioButtonState) => void
) {
  return (
    <Card style={cardStyle}>
      <TextField
        label="Who is the request for?"
        value={referee}
        onChange={(changeEvent: any) => setReferee(changeEvent.target.value)}
      />
      <Typography>
        Does the person know you are submitting this for them?
      </Typography>{" "}
      <RadioGroup
        value={refereeKnows}
        onChange={(changeEvent: any) =>
          setRefereeKnows(changeEvent.target.value)
        }
      >
        <FormControlLabel
          value="yes"
          control={<Radio required={true} />}
          label="Yes"
        />
        <FormControlLabel
          value="no"
          control={<Radio required={true} />}
          label="No"
        />
      </RadioGroup>
    </Card>
  );
}

export function leadTracingCard(
  lead: LeadSource | null,
  setLead: (leadSource: LeadSource) => void,
  leadOther: string,
  setLeadOther: (leadOther: string) => void
) {
  return (
    <Card style={cardStyle}>
      <FormControl>
        <Typography>How did you hear about us?</Typography>
        <RadioGroup
          value={lead}
          onChange={(changeEvent: any) => setLead(changeEvent.target.value)}
        >
          <FormControlLabel
            value={LeadSource.REDEEMERS}
            control={<Radio required={true} />}
            label="Redeemer's Church"
          />
          <FormControlLabel
            value={LeadSource.FAMILY}
            control={<Radio required={true} />}
            label="Family Member"
          />
          <FormControlLabel
            value={LeadSource.FRIEND}
            control={<Radio required={true} />}
            label="Friend"
          />
          <FormControlLabel
            value={LeadSource.OTHER}
            control={<Radio required={true} />}
            label="Other"
          />
        </RadioGroup>
        {lead === LeadSource.OTHER && (
          <TextField
            value={leadOther}
            onChange={(changeEvent: any) =>
              setLeadOther(changeEvent.target.value)
            }
          />
        )}
      </FormControl>
    </Card>
  );
}

export function needRequestCard(
  needType: INeedTypes,
  handleNeedTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
  return (
    <Card style={cardStyle}>
      {" "}
      <FormControl required>
        <FormGroup>
          <Typography>
            Please select the type(s) of assistance needed.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.meals}
                onChange={handleNeedTypeChange}
                name="meals"
              />
            }
            label="Meals"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.groceries}
                onChange={handleNeedTypeChange}
                name="groceries"
              />
            }
            label="Groceries"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.moving}
                onChange={handleNeedTypeChange}
                name="moving"
              />
            }
            label="Moving Assistance"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.jobTraining}
                onChange={handleNeedTypeChange}
                name="jobTraining"
              />
            }
            label="Job Preparedness"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.carRepair}
                onChange={handleNeedTypeChange}
                name="carRepair"
              />
            }
            label="Car Repair or Maintenance"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.homeRepair}
                onChange={handleNeedTypeChange}
                name="homeRepair"
              />
            }
            label="Home Repair or Maintenance"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.housing}
                onChange={handleNeedTypeChange}
                name="housing"
              />
            }
            label="Housing"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.householdItems}
                onChange={handleNeedTypeChange}
                name="householdItems"
              />
            }
            label="Household Items"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.clothing}
                onChange={handleNeedTypeChange}
                name="clothing"
              />
            }
            label="Clothing"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.furniture}
                onChange={handleNeedTypeChange}
                name="furniture"
              />
            }
            label="Furniture"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needType.other}
                onChange={handleNeedTypeChange}
                name="other"
              />
            }
            label="Other"
          />
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
          <Typography>
            Why do you need assistance? (Select all that apply)
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={needReason.covid}
                onChange={handleNeedReasonChange}
                name="covid"
              />
            }
            label="Loss of loved one due to Covid-19 or other complications"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needReason.illness}
                onChange={handleNeedReasonChange}
                name="illness"
              />
            }
            label="Sick or recovering from sickness"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={needReason.financial}
                onChange={handleNeedReasonChange}
                name="financial"
              />
            }
            label="Financially struggling"
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
        title={
          mealsOrGroceries
            ? "Family info for meals"
            : "Family info for groceries"
        }
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            label="Number of family members"
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
            <Typography>
              Please list ages of children under the age of 18
            </Typography>
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
        <Grid item>
          <Typography>Are there any food allergies?</Typography>
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
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio required={true} />}
              label="No"
            />
          </RadioGroup>
        </Grid>
        {foodInfo.haveAllergies === RadioButtonState.YES && (
          <Grid item xs={12}>
            <FormControl>
              <Typography>Please list allergies</Typography>
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
      <CardHeader title="Moving" titleTypographyProps={{ variant: "h6" }} />
      <Grid container spacing={4}>
        <Grid item>
          {" "}
          <FormControl>
            <Typography>
              What items need to be moved (couch, appliance, whole household)?
            </Typography>
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
          <Typography>
            Do you have transportation such as your own truck or a rented UHaul?
          </Typography>
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
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio required={true} />}
              label="No"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <Typography>Is this move within 30 miles of Reedley?</Typography>
            <RadioGroup
              value={moving.withinRange}
              onChange={(changeEvent: any) => {
                handleMovingChange({
                  ...moving,
                  withinRange: changeEvent.target.value,
                });
                if (changeEvent.target.value.toLowerCase() !== "yes") {
                  alert(
                    "We can only help with moves within 30 miles of Reedley."
                  );
                }
              }}
            >
              <FormControlLabel
                value="yes"
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Any conditions that need to be taken into consideration? (Steep
            driveway, dirt roads, stairs, etc.)
          </Typography>
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
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio required={true} />}
              label="No"
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
                  label="Steep Driveway"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={moving.stairs}
                      onChange={handleMovingConditions}
                      name="stairs"
                    />
                  }
                  label="Stairs"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={moving.unpavedRoad}
                      onChange={handleMovingConditions}
                      name="unpavedRoad"
                    />
                  }
                  label="Unpaved Road"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={moving.other}
                      onChange={handleMovingConditions}
                      name="other"
                    />
                  }
                  label="Other?"
                />
              </FormGroup>

              {moving.other && (
                <FormControl>
                  <Typography>What other things should we know?</Typography>
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
              label="I understand that I'm responsible for packing and wrapping."
            />
            <FormControlLabel
              value="false"
              control={<Checkbox required={true} />}
              label="I understand that this is a volunteer operation and that I am responsible for any damage."
            />
            <FormControlLabel
              value="false"
              control={<Checkbox required={true} />}
              label="If the move is to a storage unit I agree to make all arrangements prior to the move."
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
      <CardHeader title="Groceries" titleTypographyProps={{ variant: "h6" }} />
      <FormControl required>
        <FormGroup>
          <Typography>
            Below is a list of items that we can provide. Please check the items
            you would use.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.milk}
                onChange={handleGroceriesChange}
                name="milk"
              />
            }
            label="Gallon of milk"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.eggs}
                onChange={handleGroceriesChange}
                name="eggs"
              />
            }
            label="Dozen eggs"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.bread}
                onChange={handleGroceriesChange}
                name="bread"
              />
            }
            label="Bread"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.tortillas}
                onChange={handleGroceriesChange}
                name="tortillas"
              />
            }
            label="20 count flour tortillas"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.rice}
                onChange={handleGroceriesChange}
                name="rice"
              />
            }
            label="Pound of long grain rice"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.beans}
                onChange={handleGroceriesChange}
                name="beans"
              />
            }
            label="2 Pounds of pinto beans"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.cheese}
                onChange={handleGroceriesChange}
                name="cheese"
              />
            }
            label="12oz American cheese singles"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.beef}
                onChange={handleGroceriesChange}
                name="beef"
              />
            }
            label="Pound of ground beef"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.hotdogs}
                onChange={handleGroceriesChange}
                name="hotdogs"
              />
            }
            label="8 count hot dogs"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.lunchMeat}
                onChange={handleGroceriesChange}
                name="lunchMeat"
              />
            }
            label="Turkey lunch meat"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.fruit}
                onChange={handleGroceriesChange}
                name="fruit"
              />
            }
            label="Fresh or canned fruit"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.butter}
                onChange={handleGroceriesChange}
                name="butter"
              />
            }
            label="Pound of unsalted butter"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.peanutButter}
                onChange={handleGroceriesChange}
                name="peanutButter"
              />
            }
            label="Peanut butter"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={groceries.jelly}
                onChange={handleGroceriesChange}
                name="jelly"
              />
            }
            label="Jelly"
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
      <CardHeader title="Clothing" titleTypographyProps={{ variant: "h6" }} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {" "}
          <FormControl>
            <Typography>What type of clothing do you need?</Typography>
            <TextField
              required
              value={clothingType}
              onChange={(changeEvent: any) =>
                setClothingType(changeEvent.target.value)
              }
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <FormControl>
            <Typography>What size clothing do you need?</Typography>
            <TextField
              required
              value={clothingSize}
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
      <CardHeader title="Furniture" titleTypographyProps={{ variant: "h6" }} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {" "}
          <FormControl>
            <Typography>What type of furniture do you need?</Typography>
            <TextField
              required
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
        title="Job Training"
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography>Do you need help with your resume?</Typography>
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
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio required={true} />}
              label="No"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography>Do you need help writing a cover letter?</Typography>
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
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio required={true} />}
              label="No"
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
        title="Car Maintenence/Repair"
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography>
            Serve Reedley can only help with minor maintenance and repairs.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <Typography>
              Please describe the work needed on your vehicle.
            </Typography>
            <TextField
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
        title="Home Maintenance/Repair"
        titleTypographyProps={{ variant: "h6" }}
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography>
            Serve Reedley can only help with minor maintenance and repairs.
          </Typography>
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
                label="Plumbing"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.electrical}
                    onChange={handleHomeRepair}
                    name="electrical"
                  />
                }
                label="Electrical"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.painting}
                    onChange={handleHomeRepair}
                    name="painting"
                  />
                }
                label="Painting"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.yardwork}
                    onChange={handleHomeRepair}
                    name="yardwork"
                  />
                }
                label="Yard Work"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={homeRepairDetails.other}
                    onChange={handleHomeRepair}
                    name="other"
                  />
                }
                label="Other?"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <Typography>
              Please describe the work needed on your home.
            </Typography>
            <TextField
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
        title="Household Items"
        titleTypographyProps={{ variant: "h6" }}
      />
      <FormControl required>
        <FormGroup>
          <Typography>
            Below is a list of items that we can provide. Please check the items
            you would use.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.bathSoap}
                onChange={handleItemsChange}
                name="bathSoap"
              />
            }
            label="Bath Soap"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.bleach}
                onChange={handleItemsChange}
                name="bleach"
              />
            }
            label="Bleach"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.deodorant}
                onChange={handleItemsChange}
                name="deodorant"
              />
            }
            label="Deodorant"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.dishsoap}
                onChange={handleItemsChange}
                name="dishsoap"
              />
            }
            label="Dish Soap"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.handSoap}
                onChange={handleItemsChange}
                name="handSoap"
              />
            }
            label="Hand Soap"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.lysolSpray}
                onChange={handleItemsChange}
                name="lysolSpray"
              />
            }
            label="Lysol Spray"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.lysolWipes}
                onChange={handleItemsChange}
                name="lysolWipes"
              />
            }
            label="Lysol Wipes"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.pinesol}
                onChange={handleItemsChange}
                name="pinesol"
              />
            }
            label="Pine-Sol"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.sanitaryPads}
                onChange={handleItemsChange}
                name="sanitaryPads"
              />
            }
            label="Sanitary Pads"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.shampoo}
                onChange={handleItemsChange}
                name="shampoo"
              />
            }
            label="Shampoo"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.sponges}
                onChange={handleItemsChange}
                name="sponges"
              />
            }
            label="Sponges"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.tampons}
                onChange={handleItemsChange}
                name="tampons"
              />
            }
            label="Tampons"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.toiletPaper}
                onChange={handleItemsChange}
                name="toiletPaper"
              />
            }
            label="Toilet Paper"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.toothbrush}
                onChange={handleItemsChange}
                name="toothbrush"
              />
            }
            label="Toothbrush"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!items.toothpaste}
                onChange={handleItemsChange}
                name="toothpaste"
              />
            }
            label="Toothpaste"
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
      <CardHeader title="Other" titleTypographyProps={{ variant: "h6" }} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            label="Describe your other needs"
            onChange={(changeEvent: any) => setOther(changeEvent.target.value)}
            value={other}
            required
          ></TextField>
        </Grid>
      </Grid>
    </Card>
  );
}
