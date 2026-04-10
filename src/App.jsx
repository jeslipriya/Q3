import React, { useState } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState({ name: '', cuisine: '', image: '' });
  const [formData, setFormData] = useState({ name: '', cuisine: '', image: '' });
  const [errors, setErrors] = useState({ name: false, cuisine: false, image: false });
  
  const isValidImageUrl = (url) => /^(https?:\/\/.*\.(jpg|jpeg|png|gif|webp|svg|bmp))$/i.test(url || '');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const validators = {
      name: () => value.trim() === '',
      cuisine: () => value.trim() === '',
      image: () => !isValidImageUrl(value)
    };
    setErrors(prev => ({ ...prev, [name]: validators[name]() }));
  };
  
  const isFormValid = () => formData.name.trim() !== '' && formData.cuisine.trim() !== '' && isValidImageUrl(formData.image);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = { name: formData.name.trim() !== '', cuisine: formData.cuisine.trim() !== '', image: isValidImageUrl(formData.image) };
    
    if (!isValid.name || !isValid.cuisine || !isValid.image) {
      setErrors({ name: !isValid.name, cuisine: !isValid.cuisine, image: !isValid.image });
      return;
    }
    
    setRecipeInfo({ name: formData.name.trim(), cuisine: formData.cuisine.trim(), image: formData.image });
    setFormData({ name: '', cuisine: '', image: '' });
    setErrors({ name: false, cuisine: false, image: false });
    setShowForm(false);
  };
  
  const handleCloseModal = () => {
    setShowForm(false);
    setFormData({ name: '', cuisine: '', image: '' });
    setErrors({ name: false, cuisine: false, image: false });
  };

  const getCuisineColor = (cuisine) => {
    const colors = { italian: '#e74c3c', chinese: '#e67e22', indian: '#d4a017', mexican: '#2ecc71', japanese: '#e84393', thai: '#e67e22', french: '#3498db', american: '#1abc9c', mediterranean: '#9b59b6', greek: '#3498db' };
    return colors[cuisine.toLowerCase()] || '#6c5ce7';
  };

  return (
    <div className='fullpart'>
      <div className="buttonpart">
        <button onClick={() => setShowForm(true)} className='profilebutton'>Add Recipe Info</button>
      </div>

      <div className="backgroundpart">
        <div className="contentcard">
          <h2 className="congratshead">Recipe Card</h2>
          <div className="profile">
            <img src={recipeInfo.image || "https://cdn-icons-png.flaticon.com/512/3075/3075977.png"} alt="Recipe" className="profile-pic" />
            <h4 className="name">{recipeInfo.name || "No Recipe Added"}</h4>
            {recipeInfo.cuisine && <span className="cuisine-badge" style={{ backgroundColor: getCuisineColor(recipeInfo.cuisine) }}>{recipeInfo.cuisine}</span>}
            {!recipeInfo.cuisine && <p className="placeholder-text">Add a recipe to get started</p>}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className='cancelbuttonarea'>
              <button type="button" className='profilebutton' onClick={handleCloseModal}>X</button>
            </div>
            <h3 className='textclr'>Add Recipe Details</h3>
            <form onSubmit={handleSubmit}>
              {['name', 'cuisine', 'image'].map((field) => (
                <div key={field}>
                  <label>{field === 'name' ? 'Recipe Name:' : field === 'cuisine' ? 'Cuisine Type:' : 'Image URL:'}</label>
                  <input 
                    type="text" 
                    name={field} 
                    value={formData[field]}
                    onChange={handleInputChange}
                    className={errors[field] ? 'error-input' : ''}
                    placeholder={field === 'name' ? "e.g., Margherita Pizza" : field === 'cuisine' ? "e.g., Italian, Chinese, Indian" : "https://example.com/recipe.jpg"}
                  />
                  {errors[field] && <span className="error-text">{field === 'name' ? 'Recipe name is required' : field === 'cuisine' ? 'Cuisine type is required' : 'Valid image URL is required (jpg, png, gif, webp)'}</span>}
                </div>
              ))}
              <button type="submit" className='submitbtn' disabled={!isFormValid()}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;