import { Button, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Auth } from "@aws-amplify/auth";
import Lambda from "aws-sdk/clients/lambda";

interface Person {
  id: string;
  first_name: string;
  last_name: string;
  last_contacted: string;
  last_filled: string;
  contacts_last_month: number;
}

interface Props {
  people: Person[];
  onSelectionChange: (selectedPeople: string[]) => void;
}

const PeopleTable: React.FC<Props> = ({ people, onSelectionChange }) => {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);

  const handleCheckboxChange = (personId: string) => {
    const updatedSelection = selectedPeople.includes(personId)
      ? selectedPeople.filter((id) => id !== personId)
      : [...selectedPeople, personId];
    setSelectedPeople(updatedSelection);
    onSelectionChange(updatedSelection);
  };

  return (
    <Card>
      <CardHeader title="Select People" />
      <CardContent>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #dddddd",
                  backgroundColor: "#f2f2f2",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Name
              </th>
              <th
                style={{
                  border: "1px solid #dddddd",
                  backgroundColor: "#f2f2f2",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Last Contacted
              </th>
              <th
                style={{
                  border: "1px solid #dddddd",
                  backgroundColor: "#f2f2f2",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Last Filled
              </th>
              <th
                style={{
                  border: "1px solid #dddddd",
                  backgroundColor: "#f2f2f2",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Contacts in Last Month
              </th>
              <th
                style={{
                  border: "1px solid #dddddd",
                  backgroundColor: "#f2f2f2",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Select
              </th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id}>
                <td
                  style={{
                    border: "1px solid #dddddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {person.first_name} {person.last_name}
                </td>
                <td
                  style={{
                    border: "1px solid #dddddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {person.last_contacted}
                </td>
                <td
                  style={{
                    border: "1px solid #dddddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {person.last_filled}
                </td>
                <td
                  style={{
                    border: "1px solid #dddddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {person.contacts_last_month}
                </td>
                <td
                  style={{
                    border: "1px solid #dddddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedPeople.includes(person.id)}
                    onChange={() => handleCheckboxChange(person.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h2>Selected People ({selectedPeople.length})</h2>
          <ul>
            {selectedPeople.map((personId) => {
              const selectedPerson = people.find(
                (person) => person.id === personId
              );
              return (
                <li key={personId}>
                  {selectedPerson?.first_name} {selectedPerson?.last_name}
                </li>
              );
            })}
          </ul>
          <Button variant="contained" color="primary">
            Send
          </Button>
          <Button variant="contained" color="primary">
            Mark as Sent
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const generateRandomDate = (): string => {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toDateString();
};

const generateRandomContacts = (): number => Math.floor(Math.random() * 10);

const populatePeopleArray = (data: any[]): Person[] => {
  return data.map((item) => ({
    ...item,
    last_contacted: generateRandomDate(),
    last_filled: generateRandomDate(),
    contacts_last_month: generateRandomContacts(),
  }));
};

const TeamPicker: React.FC = () => {
  const jsonData = [
    {
      id: "43405199",
      first_name: "Kathy",
      force_first_name: "Kathy",
      last_name: "Brown",
      thumb_path: "",
      path: "img/profiles/generic/gray.png",
    },
    {
      id: "44306340",
      first_name: "David",
      force_first_name: "David",
      last_name: "Harler Jr",
      thumb_path: "",
      path: "img/profiles/generic/gray.png",
    },
    {
      id: "38559836",
      first_name: "Debbie",
      force_first_name: "Debbie",
      last_name: "Lepp",
      thumb_path: "",
      path: "img/profiles/generic/gray.png",
    },
    {
      id: "38917838",
      first_name: "Nicole",
      force_first_name: "Nicole",
      last_name: "Lovewell",
      thumb_path: "",
      path: "img/profiles/generic/gray.png",
    },
    {
      id: "47822547",
      first_name: "Kimberly",
      force_first_name: "Kimberly",
      last_name: "McNutt",
      thumb_path: "",
      path: "img/profiles/generic/gray.png",
    },
    {
      id: "38559882",
      first_name: "Tod",
      force_first_name: "Tod",
      last_name: "Parkinson",
      thumb_path: "",
      path: "img/profiles/generic/gray.png",
    },
    {
      id: "38559898",
      first_name: "Ray",
      force_first_name: "Ray",
      last_name: "Perkins",
      thumb_path: "",
      path: "img/profiles/generic/gray.png",
    },
    {
      id: "46699342",
      first_name: "Leo",
      force_first_name: "Leo",
      last_name: "Rojas",
      thumb_path: "",
      path: "img/profiles/generic/gray.png",
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>("");
  interface Option {
    id: string;
    option_id: string;
    name: string;
  }
  const handleOptionChange = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedOption(event.target.value as string);
    const peopleResult = await getPeopleOnTeam(selectedOption);
    console.log(JSON.stringify(peopleResult));
  };

  const [people, setPeople] = useState(populatePeopleArray(jsonData));
  async function getPeopleOnTeam(teamId: string): Promise<Person[]> {
    const people: Person[] = [];
    try {
      let response: any;
      Auth.currentCredentials().then((credentials) => {
        const lambda = new Lambda({
          credentials: Auth.essentialCredentials(credentials),
        });
        response = lambda.invoke(
          {
            FunctionName: "listPeopleOnTeam",
            Payload: JSON.stringify({ teamId: teamId }),
          },
          function (err, data) {
            if (err) {
              console.log(JSON.stringify(err));
            } else {
              // response looks like:
              // "{"statusCode":200,
              //   "body":"[{\"formattedAddress\":\"856 S Reed Ave, Reedley, CA 93654, USA\",
              //             \"latitude\":36.5901299,
              //             \"longitude\":-119.4569698,
              //             ...}]}"
              let payloadParsed = JSON.parse(data.Payload as string);

              console.log(payloadParsed);
            }
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
    return people;
  }

  const handleSelectionChange = (selectedPeople: string[]) => {
    console.log("Selected people:", selectedPeople);

    // You can do something with the selected people here
  };

  const defaultOption = { id: "0", option_id: "0", name: "Select Team" };
  const options = [
    {
      id: "59711358",
      option_id: "42",
      name: "Baby Needs",
    },
    {
      id: "59711360",
      option_id: "7",
      name: "Car Repair",
    },
    {
      id: "59711362",
      option_id: "41",
      name: "Clothing Needs",
    },
    {
      id: "59711364",
      option_id: "392",
      name: "Counseling or Social Service Support",
    },
    {
      id: "59711366",
      option_id: "44",
      name: "Furniture Needs",
    },
    {
      id: "59711368",
      option_id: "9",
      name: "Groceries + Delivery",
    },
    {
      id: "59711370",
      option_id: "8",
      name: "Handyman Maintenance",
    },
    {
      id: "59711372",
      option_id: "43",
      name: "Household Items (Bathroom, kitchen, cleaning supplies)",
    },
    {
      id: "59711374",
      option_id: "40",
      name: "Meals + Delivery",
    },
    {
      id: "59711376",
      option_id: "45",
      name: "Moving + Hauling",
    },
    {
      id: "59711378",
      option_id: "390",
      name: "Personal Care + Hygiene Products",
    },
    {
      id: "59711380",
      option_id: "10",
      name: "Providing Transportation",
    },
    {
      id: "59711382",
      option_id: "11",
      name: "Yard Care",
    },
  ];

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        displayEmpty
        fullWidth
      >
        <MenuItem value="" disabled>
          Select an option
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.option_id} value={option.option_id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      <h1>Select Personal Care + Hygiene Products Members</h1>
      <PeopleTable people={people} onSelectionChange={handleSelectionChange} />
    </div>
  );
};

export default TeamPicker;
