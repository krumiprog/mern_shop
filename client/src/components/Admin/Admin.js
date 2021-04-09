import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import ImageUploading from 'react-images-uploading';
import { Zoom } from 'react-reveal';
import { AiOutlinePlus } from 'react-icons/ai';
import { fetchProducts } from '../../store/actions/productActions';
import './Admin.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    height: '60vh',
    width: '50vw',
    transform: 'translate(-50%, -50%)',
  },
};

const Admin = () => {
  const { products, loading, error } = useSelector(state => state.products);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onChange = imageList => {
    setImage(imageList);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setImage(null);
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image[0].file);

    fetch('/api/products', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        dispatch(fetchProducts());
      })
      .catch(error => console.log(error.message))
      .finally(() => closeModal());
  };

  return (
    <div className="wrapper">
      <h2 className="title">Products</h2>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <table class="table">
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>
                <img
                  src={`/images/${product.image}`}
                  alt={product.title}
                  className="table__image"
                />
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>$ {product.price}</td>
            </tr>
          ))}
        </table>
      )}
      <button className="btn-modal" onClick={openModal}>
        <AiOutlinePlus />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="New Product"
      >
        <Zoom>
          <div className="product">
            <ImageUploading
              value={image}
              onChange={onChange}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="product__image">
                  {}
                  <button
                    style={isDragging ? { color: 'red' } : null}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Select or Drop Image
                  </button>
                  {imageList.map((image, index) => (
                    <>
                      <img
                        src={image.data_url}
                        alt=""
                        className="image-upload"
                      />
                      <button onClick={() => onImageRemove(index)}>
                        Remove
                      </button>
                    </>
                  ))}
                </div>
              )}
            </ImageUploading>
            <div className="fields">
              <h2>New Product</h2>
              <input
                className="fields__item"
                type="text"
                placeholder="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                className="fields__item"
                placeholder="description"
                rows="3"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <input
                className="fields__item"
                type="number"
                placeholder="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
              <button className="fields__button" onClick={handleSubmit}>
                Create
              </button>
            </div>
          </div>
        </Zoom>
      </Modal>
    </div>
  );
};

export default Admin;
