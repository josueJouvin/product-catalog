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
  const baseStyles =
    variant === 'overlay'
      ? {
          backgroundColor: 'rgba(255,255,255,0.85)',
          boxShadow: 1,
          '&:hover': { backgroundColor: 'rgba(255,215,0,0.2)' },
        }
      : {
          bgcolor: 'rgba(255,255,255,0.1)',
          '&:hover': { bgcolor: 'rgba(255,215,0,0.2)' },
        };

  const iconSize = size === 'small' ? 28 : 36;

  return (
    <IconButton
      aria-label={favorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
      onClick={onToggle}
      sx={baseStyles}
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
