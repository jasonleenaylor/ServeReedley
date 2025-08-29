import React from "react";
import { StyledCard, StyledCardContent, Title, Text } from "./MobileCardStyles";

interface ContactInfoProps {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const ContactInfoCard: React.FC<ContactInfoProps> = ({
  name,
  email,
  phone,
  address,
}) => {
  return (
    <StyledCard>
      <StyledCardContent>
        <Title color="textPrimary" gutterBottom>
          {name}
        </Title>
        <Text color="textSecondary">{email}</Text>
        <Text color="textSecondary">{phone}</Text>
        <Text color="textSecondary">{address}</Text>
      </StyledCardContent>
    </StyledCard>
  );
};

export default ContactInfoCard;
