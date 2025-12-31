import FavoriteIcon from '@mui/icons-material/Favorite';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useProducts } from '../hooks/useProducts';

export const Header = () => {
  const { totalFavoritesCount, totalFavoritesPrice } = useProducts();
  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
          BlueLabel
        </Typography>
        <Box display="flex" alignItems="center" gap={3}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <FavoriteIcon color="secondary" />
            <Typography variant="subtitle1">
              {totalFavoritesCount}{' '}
              {totalFavoritesCount === 1 ? 'favorito' : 'favoritos'}
            </Typography>
          </Box>
          <Typography variant="subtitle1">
            Total favoritos: ${totalFavoritesPrice.toFixed(2)}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
