import { useState } from 'react';
import './MovieHome.css';
import Poster1 from '../assets/acc.jpg'
import Poster2 from '../assets/ave-1.jpg'
import Poster3 from '../assets/avengers.jpg'
import Poster4 from '../assets/batman.jpg'
import Poster5 from '../assets/ing.jpg'
import Poster6 from '../assets/pulp-1.jpg'
import Poster7 from '../assets/rubysparks.jpg'
import Poster8 from '../assets/youuuu.jpeg'
import { useNavigate } from 'react-router-dom';

export default function MovieHome() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/movies');
  }

  const [movies, setMovies] = useState([
    { id: 1, title: 'Spider-Man: Accross The Spider-Verse', poster: Poster1 },
    { id: 2, title: 'Avengers: Infinity War', poster: Poster2 },
    { id: 3, title: 'Avengers: Endgame', poster: Poster3 },
    { id: 4, title: 'The Batman', poster: Poster4 },
   
  ]);

  const [formData, setFormData] = useState({ title: '', poster: '' });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // create
  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newMovie = {
      id: Date.now(),
      title: formData.title,
      poster: formData.poster || null
    };

    setMovies([...movies, newMovie]);
    setFormData({ title: '', poster: '' });
    setShowForm(false);
  };

  // update
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setMovies(movies.map(movie =>
      movie.id === editId
        ? { ...movie, title: formData.title, poster: formData.poster || movie.poster }
        : movie
    ));

    setFormData({ title: '', poster: '' });
    setEditId(null);
    setShowForm(false);
  };

  // delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter(movie => movie.id !== id));
    }
  };

  // edit
  const handleEdit = (movie) => {
    setEditId(movie.id);
    setFormData({ title: movie.title, poster: movie.poster || '' });
    setShowForm(true);
  };

  // cancel
  const handleCancel = () => {
    setFormData({ title: '', poster: '' });
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="movie-container">
      <header className="movie-header">
        <button onClick={handleLogin} className="movie-header-title">Chill</button>
        <button className="add-movie-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Movie'}
        </button>
      </header>

      {/* Form tambah film */}
      {showForm && (
        <div className="movie-form-container">
          <form onSubmit={editId ? handleUpdate : handleAdd} className="movie-form">
            <h2 className="form-title">{editId ? 'Edit Movie' : 'Add New Movie'}</h2>
            <div className="form-group">
              <label htmlFor="title">Movie Title</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter movie title"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="poster">Poster URL</label>
              <input
                type="text"
                id="poster"
                value={formData.poster}
                onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                placeholder="Enter poster URL (optional)"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editId ? 'Update' : 'Add'} Movie
              </button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* form movie sesudah add */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="movie-poster">
              {movie.poster ? (
                <img src={movie.poster} alt={movie.title} className="movie-img" />
              ) : (
                <div className="movie-placeholder">
                  <p className="movie-placeholder-text">No Poster</p>
                </div>
              )}
            </div>
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-actions">
              <button className="edit-btn" onClick={() => handleEdit(movie)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(movie.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
