import { Snackbar, Alert } from '@mui/material';

function FeedbackSnackbar({ open, message, severity, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={severity === 'error' ? null : 4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default FeedbackSnackbar;