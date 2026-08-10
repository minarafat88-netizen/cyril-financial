import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface PasswordResetEmailProps {
  userName?: string | null;
  resetLink?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const PasswordResetEmail = ({
  userName,
  resetLink,
}: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Cyril Financial - Reset your password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/images/Logo4.png`}
          width="48"
          height="48"
          alt="Cyril Financial Logo"
          style={logo}
        />
        <Heading style={heading}>Reset your password</Heading>
        <Section style={mainContent}>
          <Text style={text}>Hi {userName || 'there'},</Text>
          <Text style={text}>
            Someone recently requested a password change for your Cyril Financial
            account. If this was you, you can set a new password by clicking the
            button below.
          </Text>
          <Button style={button} href={resetLink}>
            Reset Password
          </Button>
          <Text style={text}>
            If you did not request a password reset, please ignore this email. This
            link will expire in 1 hour.
          </Text>
          <Text style={text}>
            — The Cyril Financial Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default PasswordResetEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const logo = {
  margin: '0 auto',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
  textAlign: 'center' as const,
};

const mainContent = {
  padding: '0 35px',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const button = {
  backgroundColor: '#002366', // Cyril's Navy Blue
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '14px 0',
  marginTop: '24px',
  marginBottom: '24px',
};