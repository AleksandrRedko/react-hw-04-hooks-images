import React, { useState } from "react";
import PropTypes from "prop-types";

import s from "./Searchbar.module.css";

function Searchbar({ submitForm }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(searchQuery);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={(e) => handleSubmit(e)}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.Input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </header>
  );
}

// class Searchbar extends Component {
//   state = {
//     searchQuery: "",
//   };
//   handleChange = (e) => {
//     this.setState({
//       searchQuery: e.target.value,
//     });
//   };
//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.submitForm(this.state.searchQuery);
//   };

//   render() {
//     return (
//       <header className={s.Searchbar}>
//         <form className={s.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={s.SearchFormButton}>
//             <span className={s.SearchFormButtonLabel}>Search</span>
//           </button>

//           <input
//             className={s.Input}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

export default Searchbar;

Searchbar.propTypes = {
  submitForm: PropTypes.func.isRequired,
};
