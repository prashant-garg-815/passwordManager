import { useState } from 'react';
import {
    CenteredContainer,
    CenteredBox,
    FormCard,
    FormTitle,
    FormSubtitle,
    PrimaryActionButton,
    TextField,
    Stack,
    Images,
    Box
} from 'ui-components';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [masterPassword, setMasterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (masterPassword !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        // In actual implementation, we'd drive the cryptographic key from this password here
        console.log('Signup initiated with', { email });
    };

    return (
        <CenteredContainer maxWidth="sm">
            <CenteredBox>
                <FormCard elevation={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <img src={Images.companyLogo} alt="Vault Logo" style={{ width: 410, height: 128, margin: 'auto' }} />
                    </Box>
                    <FormTitle component="h1" variant="h5">
                        Create your Account
                    </FormTitle>
                    <FormSubtitle variant="body2">
                        Your master password is the only key that can unlock your vault.
                        Do not forget it!
                    </FormSubtitle>

                    <form onSubmit={handleSignup}>
                        <Stack spacing={3}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                required
                                fullWidth
                                name="masterPassword"
                                label="Master Password"
                                type="password"
                                id="masterPassword"
                                value={masterPassword}
                                onChange={(e) => setMasterPassword(e.target.value)}
                            />
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Master Password"
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <PrimaryActionButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                            >
                                Create Account
                            </PrimaryActionButton>
                        </Stack>
                    </form>
                </FormCard>
            </CenteredBox>
        </CenteredContainer>
    );
}
