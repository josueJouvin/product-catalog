import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton } from '@mui/material';

type FavoriteToggleButtonProps = {
  favorite: boolean;
  onToggle: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'overlay' | 'default';
};

export function FavoriteToggleButton({
  favorite,
  onToggle,
  size = 'medium',
  variant = 'default',
}: FavoriteToggleButtonProps) {
  const iconSize = size === 'small' ? 28 : 36;
  const sx =
    variant === 'overlay'
      ? {
          backgroundColor: 'rgba(255,255,255,0.85)',
          boxShadow: 2,
          transition: 'background 0.2s',
          '&:hover': { backgroundColor: 'rgba(255,215,0,0.2)' },
        }
      : {
          bgcolor: 'rgba(255,255,255,0.1)',
          transition: 'background 0.2s',
          '&:hover': { bgcolor: 'rgba(255,215,0,0.2)' },
        };

  return (
    <IconButton
      aria-label={favorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
      onClick={onToggle}
      sx={sx}
      size={size}
    >
      {favorite ? (
        <StarIcon sx={{ color: '#FFD700', fontSize: iconSize }} />
      ) : (
        <StarBorderIcon sx={{ color: '#FFD700', fontSize: iconSize }} />
      )}
    </IconButton>
  );
}
