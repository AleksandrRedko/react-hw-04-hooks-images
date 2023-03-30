import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

import s from "./App.module.css";

import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar";
import ImageGalleryItem from "./components/ImageGalleryItem";
import Button from "./components/Button";
import imagesApi from "./servise/imagesApi";
import Modal from "./components/Modal";
import Loader from "./components/Loader";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const changeQuery = (query) => {
    if (query.trim() === "") {
      alert("Вы ничего не ввели,попробуйте снова");
      return;
    }
    if (query.trim() === searchQuery) {
      return;
    }

    setSearchQuery(query);
    setPage(1);
    setData([]);
  };
  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    fetchImages();
  }, [searchQuery, page]);

  const fetchImages = async () => {
    const key = "33062017-dcd03692d6ff22d3e6e4522a8";
    const url = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&safesearch="true"&per_page=12`;

    setIsLoading(true);

    imagesApi
      .fetchImages(url)

      .then((data) => {
        if (data.total === 0) {
          alert("По вашему запросу ничего не найдено");

          return;
        }
        setData((prevState) => [...prevState, ...data.hits]);
      })

      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  const onShowLargeImgModal = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    setLargeImageURL(e.target.getAttribute("data-largeimg"));
    setTags(e.target.getAttribute("data-alt"));

    toggleModal();
  };
  const toggleModal = () => {
    setShowModal((state) => !showModal);
  };

  return (
    <div className={s.App}>
      <Searchbar submitForm={changeQuery}></Searchbar>

      {isLoading && (
        <Loader>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </Loader>
      )}
      {error && <h1>Упс..Что-то пошло не так</h1>}
      <ImageGallery onClick={onShowLargeImgModal}>
        <ImageGalleryItem data={data}></ImageGalleryItem>
      </ImageGallery>

      {data.length > 0 && (
        <Button onClick={() => setPage((s) => s + 1)}></Button>
      )}
      {showModal && (
        <Modal onClose={toggleModal} image={largeImageURL} tags={tags}></Modal>
      )}
    </div>
  );
}

// export default class App extends Component {
//   state = {
//     data: [],
//     page: 1,
//     isLoading: false,
//     showModal: false,
//     searchQuery: "",
//     largeImageURL: "",
//     error: null,
//     tags: "",
//   };
//   componentDidUpdate(prevProps, prevState) {
//     const { searchQuery, page } = this.state;
//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.fetchImages();
//     }
//   }
//   changeQuery = (query) => {
//     if (query.trim() === "") {
//       alert("Вы ничего не ввели,попробуйте снова");
//       return;
//     }
//     this.setState({
//       searchQuery: query,
//       data: [],
//       page: 1,
//       error: false,
//     });
//   };
//   fetchImages = async () => {
//     const key = "33062017-dcd03692d6ff22d3e6e4522a8";
//     const url = `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=${key}&image_type=photo&orientation=horizontal&safesearch="true"&per_page=12`;

//     this.setState({
//       isLoading: true,
//     });

//     imagesApi
//       .fetchImages(url)

//       .then((data) => {
//         if (data.total === 0) {
//           alert("По вашему запросу ничего не найдено");

//           return;
//         }
//         this.setState((prevStste) => ({
//           data: [...prevStste.data, ...data.hits],
//         }));
//       })

//       .catch(() => this.setState({ error: true }))
//       .finally(() => this.setState({ isLoading: false }));
//   };
//   buttonClick = () => {
//     this.setState((prevState) => ({
//       page: prevState.page + 1,
//     }));
//   };
//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };
//   onShowLargeImgModal = (e) => {
//     if (e.target.nodeName !== "IMG") {
//       return;
//     }

//     const largeImage = e.target.getAttribute("data-largeimg");
//     const ImageTags = e.target.getAttribute("data-alt");
//     this.setState({ largeImageURL: largeImage, tags: ImageTags });
//     this.toggleModal();
//   };
//   render() {
//     const { data, isLoading, showModal, largeImageURL, error, tags } =
//       this.state;
//     return (
//       <div className={s.App}>
//         <Searchbar submitForm={this.changeQuery}></Searchbar>

//         {isLoading && (
//           <Loader>
//             <RotatingLines
//               strokeColor="grey"
//               strokeWidth="5"
//               animationDuration="0.75"
//               width="96"
//               visible={true}
//             />
//           </Loader>
//         )}
//         {error && <h1>Упс..Что-то пошло не так</h1>}
//         <ImageGallery onClick={this.onShowLargeImgModal}>
//           <ImageGalleryItem data={data}></ImageGalleryItem>
//         </ImageGallery>
//         {data.length > 0 && <Button onClick={this.buttonClick}></Button>}
//         {showModal && (
//           <Modal
//             onClose={this.toggleModal}
//             image={largeImageURL}
//             tags={tags}
//           ></Modal>
//         )}
//       </div>
//     );
//   }
// }
