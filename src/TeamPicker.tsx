import axios from "axios";
import { Button, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

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
      id: "38917814",
      first_name: "Jessica",
      last_name: "Aguilar",
    },
    {
      id: "38559690",
      first_name: "Linda",
      last_name: "Armson",
    },
    // Add more data as needed
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
    await getPeopleOnTeam(selectedOption);
  };

  const getPeopleOnTeam = async (optionId: string) => {
    const peopleEndpoint = `https://servereedley.breezechms.com/api/people`;
    const filterArgs = `{"2141362012":"${optionId}"}`;
    const apiUrl = `${peopleEndpoint}?filter_json=${encodeURIComponent(
      filterArgs
    )}`;
    const headers = {
      "Api-Key": `"${process.env.REACT_APP_BREEZE_TEST}"`,
    };
    axios
      .get(apiUrl, { headers })
      .then((response) => {
        console.log(JSON.stringify(response));
        // let peopleJson = await response.json();
        // setPeople(populatePeopleArray(peopleJson));
      })
      .catch((error) => {
        console.error("Error fetching team members:", error);
      });
  };

  const [people, setPeople] = useState(populatePeopleArray(jsonData));

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
      <h1>Select People</h1>
      <PeopleTable people={people} onSelectionChange={handleSelectionChange} />
    </div>
  );
};

export default TeamPicker;
