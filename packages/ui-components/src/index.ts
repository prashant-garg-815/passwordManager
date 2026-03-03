export * from './ThemeProvider';
export * from './StyledElements';
export * from './Images';

// Re-export MUI components to act as a single source of truth for microapps
export {
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Paper,
    Stack,
    Grid,
    Alert,
    CircularProgress,
    IconButton,
} from '@mui/material';

export type {
    ButtonProps,
    TextFieldProps,
    BoxProps,
    TypographyProps,
    ContainerProps,
    PaperProps,
    StackProps,
    GridProps,
    AlertProps,
    CircularProgressProps,
    IconButtonProps
} from '@mui/material';
