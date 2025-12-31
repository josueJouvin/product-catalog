import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ProductNotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      px={2}
    >
      <Typography variant="h3" color="error" fontWeight={700} gutterBottom>
        😕 Producto no encontrado
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        El producto que buscas no existe o fue eliminado
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate('/')}
        sx={{ fontWeight: 600, px: 4 }}
      >
        Volver al catálogo
      </Button>
    </Box>
  );
};
