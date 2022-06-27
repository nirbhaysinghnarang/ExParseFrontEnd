import React from 'react';
import { AppBar, Typography, Toolbar, Stack, Box } from '@mui/material';

export default function Header() {
    return (
        <AppBar style={{ background: 'transparent', boxShadow: 'none' }} enableColorOnDark elevation={0}>
            <Toolbar>
                <Box>
                    <Stack direction="column" pt={3} pl={3}>
                        <Typography variant='h4' color="primary">
                            ExParse
                        </Typography>
                        <Typography variant='subtitle1' color="primary">
                            Leave the scraping to us.
                        </Typography>
                    </Stack>
                </Box>


            </Toolbar>

        </AppBar>
    )
}