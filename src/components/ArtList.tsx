import { ART_IMAGES } from "../helpers/constants";

function ArtList() {
  // const [selectedImage, setSelectedImage] = useState<string>();
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const openModal = (url: string) => {
  //   setIsModalOpen(true);
  //   setSelectedImage(url);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedImage("");
  // };

  return (
    <div className="w-full flex flex-col items-center mt-10 mb-20">
      {/* Gallery */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ART_IMAGES.map((src, index) => (
          <li key={index} className="gallery-item">
            <img
              src={src}
              alt={`Art ${index + 1}`}
              className="h-full object-cover select-none rounded-sm shadow-md cursor-pointer"
              // onClick={() => openModal(src)}
            />
          </li>
        ))}
      </ul>
      {/* Image Modal  */}
      {/* <Modal
        isOpen={isModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        className={""}
        contentLabel="Example Modal"
      >
        <img
          src={selectedImage}
          alt="thumbnail"
          className="w-10/12 m-auto align-middle"
        />
      </Modal> */}
    </div>
  );
}

export default ArtList;
