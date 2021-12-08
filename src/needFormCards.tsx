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
import PhoneInput from "react-phone-input-2";
import { cardStyle } from "./needRequestForm";
import {
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
  return (
    <Card style={cardStyle}>
      <PhoneInput
        value={phone}
        onChange={(changeEvent: any) => setPhone(changeEvent.value)}
        disableCountryCode={true}
        disableCountryGuess={true}
        disableDropdown={true}
        country={"us"}
        placeholder={"(559) 555-5555"}
        inputProps={{
          autoComplete: "tel",
          required: true,
        }}
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

export function movingCard(
  moving: IMovingType,
  handleMovingChange: (newMovingInfo: {}) => void,
  handleMovingConditions: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
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
                handleMovingChange({ items: changeEvent.target.value })
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
                  withinRange: changeEvent.target.value,
                });
                if (!moving.withinRange) {
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
              value="No"
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
                      checked={moving.driveway}
                      onChange={handleMovingConditions}
                      name="driveway"
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
      </Grid>
    </Card>
  );
}
