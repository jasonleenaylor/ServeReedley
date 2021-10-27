import {
  Button,
  Card,
  Container,
  createStyles,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@mui/material";
import { API, graphqlOperation } from "aws-amplify";
import { useState } from "react";
import { createRequest } from "./graphql/mutations";
import { SelfOrAgent } from "./selfOrAgentComponent";

export const NeedRequestForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [agent, setAgent] = useState<"" | "yes" | "no">("");
  const cardStyle = { padding: 4 };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let request = {
      dateOfRequest: Date.now,
      firstName: firstName,
      lastName: lastName,
      address1: address1,
      address2: address2,
      city: city,
      zipCode: zip,
      phone: phone,
      email: email,
      spanishOnly: true,
      preferredContactTime: "",
      request: "Form Not Complete",
      specificNeed: "Form Not Complete",
      status: "",
      note: "",
      needFulfiller: "Form not complete",
      dateFulfilled: "",
      followUp: "",
    };

    await API.graphql(graphqlOperation(createRequest, { input: request }));
    alert("Submitted");
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid item>
            <Card style={cardStyle}>
              <TextField
                label="First Name"
                value={firstName}
                onChange={(changeEvent: any) =>
                  setFirstName(changeEvent.target.value)
                }
                fullWidth
              />
              <TextField
                label="Last Name"
                value={lastName}
                onChange={(changeEvent: any) =>
                  setLastName(changeEvent.target.value)
                }
                fullWidth
              />
            </Card>
          </Grid>
          <Grid item>
            <Card style={cardStyle}>
              <TextField
                label="Phone Number"
                value={phone}
                onChange={(changeEvent: any) =>
                  setPhone(changeEvent.target.value)
                }
                fullWidth
              />
              <TextField
                label="Email Address"
                value={email}
                onChange={(changeEvent: any) =>
                  setEmail(changeEvent.target.value)
                }
                fullWidth
              />
              <TextField
                label="Street Address 1"
                value={address1}
                onChange={(changeEvent: any) =>
                  setAddress1(changeEvent.target.value)
                }
                fullWidth
              />
              <TextField
                label="Street Address 2"
                value={address2}
                onChange={(changeEvent: any) =>
                  setAddress2(changeEvent.target.value)
                }
                fullWidth
              />
              <TextField
                label="City"
                value={city}
                onChange={(changeEvent: any) =>
                  setCity(changeEvent.target.value)
                }
                fullWidth
              />
              <TextField
                label="Zip Code"
                value={zip}
                onChange={(changeEvent: any) =>
                  setZip(changeEvent.target.value)
                }
                fullWidth
              />
            </Card>
          </Grid>
          <Grid item>
            <Card style={cardStyle}>
              <Typography>Is this request for you?</Typography>
              <RadioGroup
                aria-label="Is this request for you?"
                value={agent}
                onChange={(changeEvent: any) =>
                  setAgent(changeEvent.target.value)
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
          </Grid>
          <Grid item>
            <SelfOrAgent selfOrOther={agent} style={cardStyle} />
          </Grid>
          <Grid item>
            <Button type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
