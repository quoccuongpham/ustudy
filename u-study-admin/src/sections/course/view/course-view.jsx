import { Container, Stack, Typography, Card } from '@mui/material';

export default function CourseView() {
  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        {' '}
        <Typography variant="h4">Courses</Typography>
      </Stack>
      <Card>{/*  */}</Card>
    </Container>
  );
}
