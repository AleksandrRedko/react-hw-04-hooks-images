import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ image, tags, onClose }) {
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };
  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return function clearListener() {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={image} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}
// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDown);
//   }

//   handleKeyDown = (e) => {
//     if (e.code === "Escape") {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = (event) => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={s.Overlay} onClick={this.handleBackdropClick}>
//         <div className={s.Modal}>
//           <img src={this.props.image} alt={this.props.tags} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
