// import { useSelector, useDispatch } from 'react-redux';
// import { toggleModal } from '../../redux/slices/modalSlice';
// import { Modal } from 'antd';
// import { CloseOutlined } from '@ant-design/icons';

// const RegisterForm =  () => {
//   const isModalOpen = useSelector((state) => state.modal.isModalOpen); // Thêm dòng này
//   const dispatch = useDispatch();

//   return (
//     <>
//       <Modal
//         className="relative"
//         open={isModalOpen}
//         onOk={() => dispatch(toggleModal())}
//         closeIcon={false}
//         footer={false}
//       >
//         <button
//           className="absolute top-[-15px] right-[-15px] shadow-lg w-10 h-10 bg-white rounded-full hover:text-blue-500"
//           onClick={() => dispatch(toggleModal())}
//         >
//           <CloseOutlined />
//         </button>

//         <div>Form Đăng ký</div>
//       </Modal>
//     </>
//   );
// }

// export default RegisterForm;
