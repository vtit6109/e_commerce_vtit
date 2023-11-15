import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import LoginPhoneComponent from './LoginPhoneComponent';
import VerificationComponent from './VerificationComponent';
import LoginEmailComponent from './LoginEmailCompoent';

function Login({modal, openModal, closeModal, path}) {
  const navigate = useNavigate();

  const handleNumberSuccess = () => {
    closeModal();
    openModal('verificationModal');
  };

  const handleVerificationSuccess = () => {
    closeModal();
    navigate(path);
  };

  const handleEmailSuccess = () => {
    closeModal();
    navigate(path);
  };

  return (
    <div>
      <LoginPhoneComponent
        isOpen={modal === 'numberModal'}
        onClose={closeModal}
        onSuccess={handleNumberSuccess}
        onOpenEmail={() => openModal('emailModal')}
      />

      <VerificationComponent
        isOpen={modal === 'verificationModal'}
        onClose={closeModal}
        onSuccess={handleVerificationSuccess}
      />

      <LoginEmailComponent
        isOpen={modal === 'emailModal'}
        onClose={closeModal}
        onSuccess={handleEmailSuccess}
      />
    </div>
  );
}
Login.propTypes ={
  modal : PropTypes.func.isRequired,
  openModal : PropTypes.func.isRequired,
  closeModal : PropTypes.func.isRequired,
  path: PropTypes.string
}
export default Login;
