import { useEffect, useState } from "react";
import "../main/Main.css";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { BiLoaderCircle } from "react-icons/bi";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setMain] = useState([]);
  const [todos, setTodos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  const fetchMain = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setMain(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodos = async (userId) => {
    if (selectedUserId === userId && !showGallery) {
      setTodos([]);
      setSelectedUserId(null);
    } else {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
        );
        const data = await res.json();
        setTodos(data);
        setSelectedUserId(userId);
        setShowGallery(false);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const fetchPhotos = async (userId) => {
    if (selectedUserId === userId && showGallery) {
      setShowGallery(false);
      setPhotos([]);
    } else {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/photos");
        const data = await res.json();
        const userPhotos = data.filter((photo) => photo.albumId === userId);
        setPhotos(userPhotos.slice(0, 10));
        setTodos([]);
        setSelectedUserId(userId);
        setShowGallery(true);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    fetchMain();
  }, []);

  return (
    <div className="Main  container">
      {loading ? (
        <h1 className="loading">
          <BiLoaderCircle /> Loading...
        </h1>
      ) : null}
      {error ? <h2>{error}</h2> : null}
      <div className="container">
        {posts.map((post) => (
          <div className="main" key={post.id}>
            <div className="mains">
              <div className="logo">
                <IoPersonCircleSharp className="icons" />
                <IoMdSettings className="icone" />
              </div>
              <div className="lina"></div>
              <div className="word">
                <h4>#ID: {post.id}</h4>
                <p>#Ism: {post.name}</p>
                <p>#Foydalanuvchi nomi: {post.username}</p>
              </div>
              <div className="btnnn">
                <button onClick={() => fetchTodos(post.id)}>USER TODOS</button>
                <button onClick={() => fetchPhotos(post.id)}>GALRY</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedUserId && !showGallery && (
        <section className="todos">
          {todos.map((todo) => (
            <div className="box" key={todo.id}>
              <div className="boxs">
                <p>post: {todo.userId}</p>
                <p>title: {todo.title}</p>
              </div>
            </div>
          ))}
        </section>
      )}
      {showGallery && (
        <section className="gallery">
          {photos.map((photo) => (
            <div className="photo" key={photo.id}>
              <img
                className="photos"
                src={photo.thumbnailUrl}
                alt={photo.title}
              />
              <p className="wordss">album Id: {photo.albumId}</p>
              <p className="wordss">title: {photo.title}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Main;
