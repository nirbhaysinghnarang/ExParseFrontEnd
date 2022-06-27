import React from 'react';
import { AppBar, Typography, Toolbar } from '@mui/material';

export default function Header() {
    return (
        <AppBar color="primary" enableColorOnDark elevation={0}>
            <Toolbar>
                <Typography variant='h4'>
                    ExParse
                </Typography>
            </Toolbar>

        </AppBar>
    )
}