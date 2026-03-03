import { styled } from '@mui/material/styles';
import { Box, Paper, Container, Typography, Button } from '@mui/material';

export const CenteredContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(8),
}));

export const CenteredBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

// Using a styled generic paper component that will enforce radius and padding
export const FormCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: '100%',
    borderRadius: theme.spacing(3), // Enforce large borders 
})) as typeof Paper;

export const FormTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    textAlign: 'center',
})) as typeof Typography;

export const FormSubtitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing(4),
})) as typeof Typography;

export const PrimaryActionButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
})) as typeof Button;
