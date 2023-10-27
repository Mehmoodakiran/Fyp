import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardHeader, CardMedia } from '@mui/material';
import { FastForward, AccessTime, SupportAgent } from '@mui/icons-material';

function AboutPage() {
    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                About Our Hotel Booking System in Skardu
            </Typography>
            <hr />
            <Typography variant="body1">
                Welcome to our state-of-the-art Hotel Booking System in Skardu. We're dedicated to providing you with a seamless booking experience.
            </Typography>

            {/* Key Features Section */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardHeader
                            title="Fast and Easy Booking"
                            titleTypographyProps={{ variant: 'h5' }}
                            avatar={<FastForward fontSize="large" />}
                        />
                        <CardContent>
                            Our system offers quick and hassle-free hotel booking to save your time and effort.
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardHeader
                            title="Any Time Anywhere"
                            titleTypographyProps={{ variant: 'h5' }}
                            avatar={<AccessTime fontSize="large" />}
                        />
                        <CardContent>
                            You can book a hotel at your convenience, 24/7, from anywhere in Skardu.
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardHeader
                            title="24/7 Support"
                            titleTypographyProps={{ variant: 'h5' }}
                            avatar={<SupportAgent fontSize="large" />}
                        />
                        <CardContent>
                            Our support team is available around the clock to assist you with any inquiries or issues.
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AboutPage;
