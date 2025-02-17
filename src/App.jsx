import React, { useState, useEffect } from "react";
import "./App.css";
import pastaData from "/src/data/pastaData.json"; 

const App = () => {
  const [category, setCategory] = useState(null);
  const [selectedPasta, setSelectedPasta] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [hoveredPasta, setHoveredPasta] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    if (timeLeft === null) {
      setShowModal(false);
      return;
    }
  
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);
  

  // Démarrer la cuisson, ouvrir le modal et afficher la recette
  const startCooking = (time) => {
    setTimeLeft(time * 60);
    setShowModal(true);
    setShowRecipe(true); // Affichage de la section recette
  };


  const toggleMinimized = () => {
    setIsMinimized(prevState => !prevState);
  };
  
  const handleMouseDown = (e) => {
    // Lors du début du glissement, enregistrer la position de la souris
    setStartPosition({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y
    });
    setIsDragging(true); // Activer l'état de glissement
  };
  
  const handleMouseMove = (e) => {
    if (isDragging) {
      // Déplacer la modal avec la souris
      setModalPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false); // Désactiver l'état de glissement lorsque la souris est relâchée
  };
  
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false); // Désactiver le glissement si la souris quitte la fenêtre
    }
  };
  

  useEffect(() => {
    if (timeLeft <= 0) {
      console.log("Modal de fin affichée");
    }
  }, [timeLeft]);
  
  return (
    <div className="pasta-timer">
      <div className="main-container">
        <div className="container">

          {/* STEP ONE */}
          <div className="step-one">
            <div className="step-one-title">
              <p>STEP 1</p>
              <h1>Choose your pasta category 👇</h1>
              <div className="buttons-general">
                {Object.keys(pastaData).map((cat) => (
                  <button key={cat} onClick={() => setCategory(cat)}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="step-one-illustration">
              <img src="/src/assets/images/farfalle.JPG" alt="Pasta Illustration"></img>
            </div>
          </div>

          {/* STEP TWO AND THREE */}
          <div>
            {category && (
              <div className="steps-two-three">
                {/* STEP TWO */}
                <div className="step-two-title">
                  <h2>Choose your type</h2>
                  <p>STEP 2</p>
                </div>
                <div className="cards-slider">
                  <div className="slider">
                    <div className="slides">
                      {pastaData[category].map((pasta) => (
                        <div
                          className={`pasta-card ${selectedPasta?.name === pasta.name ? "selected" : ""}`}
                          key={pasta.name}
                          onClick={() => setSelectedPasta(pasta)}
                          onMouseEnter={() => setHoveredPasta(pasta.name)}
                          onMouseLeave={() => setHoveredPasta(null)}
                        >
                          <img
                            src={
                              hoveredPasta === pasta.name || selectedPasta?.name === pasta.name
                                ? pasta["image-bis"]
                                : pasta.image
                            }
                            alt={pasta.name}
                            className="pasta-image"
                          />
                          <p>{pasta.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {selectedPasta && (
                  <div>
                    {/* STEP TWO AND THREE */}
                    <div className="step-three-title">
                      <h2>How do you prefer it?</h2>
                      <p>STEP 3</p>
                    </div>
                    {/* COOKING BUTTONS */}
                    <div className="buttons-general buttons-cooking">
                      <button onClick={() => startCooking(selectedPasta.alDente)}>
                        <span className="svg-wrapper">
                          <svg
                            fill="#00a3d7"
                            width="24"
                            height="24"
                            viewBox="0 0 504.064 504.064"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#00a3d7"
                          >
                            <g>
                              <path d="M413.416,416.207h-0.914l-78.396-32.914h46.396c21.029,0,37.486-16.457,37.486-36.571v-8.229 c0-8.062-2.796-15.68-7.435-21.919c14.774-6.01,25.927-21.207,26.635-37.51v-5.486c0-13.182-7.462-24.793-18.781-31.23 c5.431-6.386,8.724-14.638,8.724-23.627v-8.229c0-21.029-16.457-37.486-36.571-37.486h-100.57c0,0-0.001,0-0.001,0h-55.771 l9.143-11.886c12.8-17.371,45.714-77.714,48.457-114.286c0.914-21.029-16.457-43.886-37.486-47.543 c-6.4-0.914-29.257-1.829-38.4,32.914c-8.229,32.914-44.8,84.114-71.314,106.057c-12.8,10.971-23.771,25.6-33.829,43.886H79.702 c-21.943,0-36.571,13.714-36.571,32.914v164.571c0,19.2,14.629,40.229,36.571,40.229h34.743 c37.486,28.343,42.057,28.343,117.943,28.343h10.971l153.6,49.371c5.486,1.828,15.543,5.486,25.6,5.486 c10.971,0,22.857-4.571,31.086-20.114C468.273,451.864,451.816,436.321,413.416,416.207z" />
                            </g>
                          </svg>
                        </span>
                        <span>Al Dente</span>
                      </button>

                      <button onClick={() => startCooking(selectedPasta.wellDone)}>
                        <span className="svg-wrapper">
                          <svg
                            fill="#00a3d7"
                            width="24"
                            height="24"
                            viewBox="0 0 504.064 504.064"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#00a3d7"
                          >
                            <g>
                              <path d="M413.416,416.207h-0.914l-78.396-32.914h46.396c21.029,0,37.486-16.457,37.486-36.571v-8.229 c0-8.062-2.796-15.68-7.435-21.919c14.774-6.01,25.927-21.207,26.635-37.51v-5.486c0-13.182-7.462-24.793-18.781-31.23 c5.431-6.386,8.724-14.638,8.724-23.627v-8.229c0-21.029-16.457-37.486-36.571-37.486h-100.57c0,0-0.001,0-0.001,0h-55.771 l9.143-11.886c12.8-17.371,45.714-77.714,48.457-114.286c0.914-21.029-16.457-43.886-37.486-47.543 c-6.4-0.914-29.257-1.829-38.4,32.914c-8.229,32.914-44.8,84.114-71.314,106.057c-12.8,10.971-23.771,25.6-33.829,43.886H79.702 c-21.943,0-36.571,13.714-36.571,32.914v164.571c0,19.2,14.629,40.229,36.571,40.229h34.743 c37.486,28.343,42.057,28.343,117.943,28.343h10.971l153.6,49.371c5.486,1.828,15.543,5.486,25.6,5.486 c10.971,0,22.857-4.571,31.086-20.114C468.273,451.864,451.816,436.321,413.416,416.207z" />
                            </g>
                          </svg>
                        </span>
                        <span>Well Done</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* RECIPES CONTAINER  */}
                {showRecipe && selectedPasta && (
                  <div className="recipes-container">
                    <div
                      className="recipe-card"
                      style={{ backgroundImage: `url(${selectedPasta.image})` }}
                    >
                      <h3>Recettes de la hess</h3>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>


          {/* MODAL */}
          <div
            className="container-modal"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {showModal && (
              <>
                <div
                  className={`modal-overlay ${isMinimized ? 'minimized' : ''}`}
                  onClick={() => setShowModal(false)}
                ></div>
              
                  {timeLeft > 0 ? (
                    <div
                    className={`modal ${isMinimized ? 'minimized' : ''}`}
                    style={{
                      top: `${modalPosition.y}px`,
                      left: `${modalPosition.x}px`,
                      position: 'absolute', 
                    }}
                    onMouseDown={handleMouseDown} 
                    >

                      {/* BUTTONS EXOAND AND MINIMIZE */}
                      <div className="buttons-expand-minimize">
                        {isMinimized ? (
                          <div className="div-expand-minimize" onClick={toggleMinimized}>
                            <svg className="button-expand-minimize" onClick={toggleMinimized} fill="#00a3d7" height="40px" width="40px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 299.995 299.995">
                              <path d="M139.415,96.195c-22.673,0-41.056,18.389-41.056,41.062c0,22.676,18.383,41.059,41.056,41.059 c7.446,0,14.41-2.01,20.43-5.478c2.625-1.511,5.06-3.308,7.275-5.342c0.08-0.073,0.163-0.145,0.241-0.218 c0.705-0.659,1.393-1.343,2.052-2.049c0.036-0.039,0.07-0.078,0.106-0.117c2.754-2.977,5.073-6.367,6.86-10.068 c2.596-5.387,4.095-11.404,4.095-17.787C180.474,114.584,162.093,96.195,139.415,96.195z M159.256,146.973h-39.684 c-4.298,0-7.781-3.483-7.781-7.781c0-4.298,3.483-7.781,7.781-7.781h39.684c4.298,0,7.781,3.483,7.781,7.781 C167.037,143.49,163.554,146.973,159.256,146.973z"></path>
                            </svg>
                          </div>
                        ) : (
                          <div className="div-expand-minimize" onClick={toggleMinimized}>
                            <svg className="button-expand-minimize"  onClick={toggleMinimized} fill="#00a3d7" height="40px" width="40px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 299.998 299.998">
                              <path d="M139.414,96.193c-22.673,0-41.056,18.389-41.056,41.062c0,22.678,18.383,41.062,41.056,41.062 c22.678,0,41.059-18.383,41.059-41.062C180.474,114.582,162.094,96.193,139.414,96.193z M159.255,146.971h-12.06v12.06 c0,4.298-3.483,7.781-7.781,7.781c-4.298,0-7.781-3.483-7.781-7.781v-12.06h-12.06c-4.298,0-7.781-3.483-7.781-7.781 c0-4.298,3.483-7.781,7.781-7.781h12.06v-12.063c0-4.298,3.483-7.781,7.781-7.781c4.298,0,7.781,3.483,7.781,7.781v12.063h12.06 c4.298,0,7.781,3.483,7.781,7.781C167.036,143.488,163.555,146.971,159.255,146.971z"></path>
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className={`timer ${!isMinimized ? 'minimized' : ''}`}>
                        <h1>
                          {Math.floor(timeLeft / 60)}:
                          {String(timeLeft % 60).padStart(2, "0")}
                        </h1>
                      </div>

                      {!isMinimized ? (
                        <div className='modal-text'>
                          <h2>Currently cooking...</h2>
                        </div>
                      ) : (
                        <p></p>
                      )}

                      <button onClick={() => setShowModal(false)}>STOP</button>
                    </div>

                  ) : (
                    // MODAL-FNISHED
                    <div 
                    className={`modal-finished ${isMinimized ? 'finished-minimized' : ''}`}
                    style={{
                      top: `${modalPosition.y}px`,
                      left: `${modalPosition.x}px`,
                      position: 'absolute', // Position absolue pour déplacer la modal
                    }}
                    onMouseDown={handleMouseDown}
                    onClick={() => setShowModal(false)}
                    >
                      <h2 className="hearts">ENJOY ❤️</h2>
                    </div>
                  )}
                  {console.log(timeLeft)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


