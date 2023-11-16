import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import LoginPhone from './LoginPhone';
import Verification from './Verification';
import LoginEmail from './LoginEmail';

const Login = ({ modal, openModal, closeModal, path }) => {
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
      <LoginPhone
        isOpen={modal === 'numberModal'}
        onClose={closeModal}
        onSuccess={handleNumberSuccess}
        onOpenEmail={() => openModal('emailModal')}
      />

      <Verification
        isOpen={modal === 'verificationModal'}
        onClose={closeModal}
        onSuccess={handleVerificationSuccess}
      />

      <LoginEmail
        isOpen={modal === 'emailModal'}
        onClose={closeModal}
        onSuccess={handleEmailSuccess}
      />
    </div>
  );
};
Login.propTypes = {
  modal: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  path: PropTypes.string,
};
export default Login;
