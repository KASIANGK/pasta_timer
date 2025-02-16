import React, { useState, useEffect } from "react";
import "./App.css";
import pastaData from "./data/pastaData.json"; // Importation du JSON séparé

const App = () => {
  const [category, setCategory] = useState(null);
  const [selectedPasta, setSelectedPasta] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);

  // Timer pour la cuisson
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) {
      setShowModal(false);
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Démarrer la cuisson, ouvrir le modal et afficher la recette
  const startCooking = (time) => {
    setTimeLeft(time * 60);
    setShowModal(true);
    setShowRecipe(true); // Affichage de la section recette
  };

  return (
    <div className="pasta-timer-all">
      <div className="main-container">
        <div className="container">
          <div className="choix-categorie container-first">
            <div className="container-titre">
              <p>STEP 1</p>
              <h1>Choose your pasta category 👇</h1>
              <div className="buttons">
                {Object.keys(pastaData).map((cat) => (
                  <button key={cat} onClick={() => setCategory(cat)}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="main-illustration">
              <img src="/src/assets/images/farfalle.JPG" alt="Pasta Illustration"></img>
            </div>
          </div>

          <div className="container-pasta">
            {category && (
              <div className="second-container">
                <div className="choix-pasta">
                  <h2>Choose your type</h2>
                  <p>STEP 2</p>
                </div>
                <div className="pasta-illustration">
                  <div className="slider">
                    <div className="slides">
                      {pastaData[category].map((pasta) => (
                        <div
                          className={`pasta-card ${selectedPasta?.name === pasta.name ? "selected" : ""}`}
                          key={pasta.name}
                          onClick={() => setSelectedPasta(pasta)}
                        >
                          <img src={pasta.image} alt={pasta.name} className="pasta-image" />
                          {pasta.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {selectedPasta && (
                  <div className="cooking-options">
                    <div className="choix-pasta-time">
                      <h2>How do you prefer it?</h2>
                      <p>STEP 3</p>
                    </div>
                    <div className="buttons buttons-cuisson">
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
                {/* RECETTES */}
                {showRecipe && selectedPasta && (
                  <div className="recipe-container">
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

          {/* MODAL de cuisson */}
          <div className="container-modal">
            {showModal && (
              <div className="modal">
                <div className="timer">
                  <h1>
                    {Math.floor(timeLeft / 60)}:
                    {String(timeLeft % 60).padStart(2, "0")}
                  </h1>
                </div>
                <h2>Cuisson en cours...</h2>
                <button onClick={() => setShowModal(false)}>Annuler</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;





// import React, { useState, useEffect } from "react";
// import "./App.css";
// import pastaData from "./data/pastaData.json"; // Importation du JSON séparé

// const App = () => {
//   const [category, setCategory] = useState(null);
//   const [selectedPasta, setSelectedPasta] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showRecipe, setShowRecipe] = useState(false);


//   // Timer pour la cuisson
//   useEffect(() => {
//     if (timeLeft === null || timeLeft <= 0) {
//       setShowModal(false);
//       return;
//     }
//     const timer = setTimeout(() => {
//       setTimeLeft(timeLeft - 1);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, [timeLeft]);

//   // Démarrer la cuisson et ouvrir le modal
//   const startCooking = (time) => {
//     setTimeLeft(time * 60);
//     setShowModal(true);
//   };

//   return (
//     <div className="pasta-timer-all">
//       <div className="main-container">
//         {/* <div className="pasta-timer-all-title">
//           <h1>PASTA TIMEEEEE </h1>
//         </div> */}
//         <div className="container">
//           <div className="choix-categorie container-first">
//             <div className="container-titre">
//               <p>STEP 1</p>
//               <h1>Choose your pasta category 👇</h1>
//               {/* <img src='/src/assets/images/farfalle.JPG'></img> */}
//               <div className="buttons">
//               {Object.keys(pastaData).map((cat) => (
//                 <button key={cat} onClick={() => setCategory(cat)}>
//                   {cat}
//                 </button>
//               ))}
//             </div>
//             </div>
//             <div className="main-illustration">
//               <img src="/src/assets/images/farfalle.JPG"></img>
//             </div>
//           </div>
//           <div className="container-pasta">
//               {category && (
//                 <>
//                 <div className="second-container">
//                   <div className="choix-pasta">
//                     <h2>Choose your type</h2>
//                     <p>STEP 2</p>
//                   </div>
//                   <div className="pasta-illustration">
//                     <div className="slider">
//                       <div className="slides">
//                       {pastaData[category].map((pasta) => (
//                         <div
//                           className={`pasta-card ${selectedPasta?.name === pasta.name ? "selected" : ""}`}
//                           key={pasta.name}
//                           onClick={() => setSelectedPasta(pasta)}
//                         >
//                           <img src={pasta.image} alt={pasta.name} className="pasta-image" />
//                           {pasta.name}
//                         </div>

//                       ))}
//                       </div>
//                     </div>
//                   </div>
//                   {selectedPasta && (
//                     <div className="cooking-options">
//                       <div className="choix-pasta-time">
//                         <h2>How do u prefer it?</h2>
//                         <p>STEP 3</p>
//                       </div>
//                       <div className="buttons">
//                         <button onClick={() => startCooking(selectedPasta.alDente)}>Al Dente</button>
//                         <button onClick={() => startCooking(selectedPasta.wellDone)}>Bien Cuit</button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 </>
//               )}
//           </div>
//           <div className="container-modal">
//             {showModal && (
//               <div className="modal">
//                 <h2>Cuisson en cours...</h2>
//                 <p>Temps restant : {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
//                 <button onClick={() => setShowModal(false)}>Annuler</button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;



// import React, { useState, useEffect } from "react";
// import pastaData from "./data/pastaData.json";
// import "./App.css";

// const App = () => {
//   const [category, setCategory] = useState(null);
//   const [selectedPasta, setSelectedPasta] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [isCooking, setIsCooking] = useState(false);

//   // Timer pour la cuisson
//   useEffect(() => {
//     if (timeLeft === null || timeLeft <= 0) {
//       setIsCooking(false);
//       return;
//     }

//     const timer = setTimeout(() => {
//       setTimeLeft(timeLeft - 1);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [timeLeft]);

//   // Lancer la cuisson
//   const startCooking = (time) => {
//     setTimeLeft(time * 60); // Convertir en secondes
//     setIsCooking(true);
//   };

//   return (
//     <div className="app-container">
//       {!category && <h1>🍝 PASTA TIMER 🍝</h1>}

//       {/* Sélection de la catégorie */}
//       {!category && (
//         <div className="category-buttons">
//           <button onClick={() => setCategory("short")}>Short Pasta</button>
//           <button onClick={() => setCategory("long")}>Long Pasta</button>
//           <button onClick={() => setCategory("special")}>Special Pasta</button>
//         </div>
//       )}

//       {/* Slider des pâtes */}
//       {category && pastaData[category] && (
//         <div className="slider-container">
//           <div className="slider">
//             <div className="slides">
//               {pastaData[category].map((pasta, index) => (
//                 <div
//                   key={pasta.name}
//                   id={`slide-${index + 1}`}
//                   className="slide"
//                   onClick={() => setSelectedPasta(pasta)}
//                 >
//                   <h3>{pasta.name}</h3>
//                   <p>🍽 Al Dente: {pasta.alDente} min</p>
//                   <p>🔥 Well Done: {pasta.wellCooked} min</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Détails et cuisson */}
//       {selectedPasta && (
//         <div className="pasta-info">
//           <h2>Cooking {selectedPasta.name}!</h2>
//           <p>🍽 Al Dente: {selectedPasta.alDente} min</p>
//           <p>🔥 Well Done: {selectedPasta.wellCooked} min</p>

//           {!isCooking ? (
//             <>
//               <button onClick={() => startCooking(selectedPasta.alDente)}>Al Dente</button>
//               <button onClick={() => startCooking(selectedPasta.wellCooked)}>Well Done</button>
//             </>
//           ) : (
//             <h3>⏳ Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</h3>
//           )}
//         </div>
//       )}

//       {/* Bouton Retour */}
//       {category && (
//         <button className="back-button" onClick={() => setCategory(null)}>⬅ Back</button>
//       )}
//     </div>
//   );
// };

// export default App;



// import { useState, useEffect } from 'react';
// import './App.css';
// import Countdown from 'react-countdown';
// import Slider from 'react-slick';
// import pastaData from './data/pastaData.json';

// function App() {
//   const [category, setCategory] = useState(null); // Category selection
//   const [selectedPasta, setSelectedPasta] = useState(null); // Selected pasta
//   const [cookingStyle, setCookingStyle] = useState(null); // Al dente or well done
//   const [timer, setTimer] = useState(null); // Timer state
//   const [showModal, setShowModal] = useState(false); // To control the modal visibility for cooking style
//   const [showTimerModal, setShowTimerModal] = useState(false); // To control the timer modal visibility
//   const [showReadyMessage, setShowReadyMessage] = useState(false); // To control the "Ready, bby" message visibility

//   // Slider settings for swipeable carousel
//   const sliderSettings = {
//     dots: false, // Disable the dots navigation
//     infinite: true, // Enable infinite looping
//     speed: 500, // Set the speed for sliding
//     slidesToShow: 1, // Only show one slide at a time
//     slidesToScroll: 1, // Scroll one slide at a time
//     centerMode: true, // Center the current slide
//     focusOnSelect: true, // Allow clicking to select a pasta
//     variableWidth: true, // Allow variable width for each slide (important for swipe)
//     draggable: true, // Enable dragging for carousel (important for desktop)
//     swipeToSlide: true, // Enable swipe functionality for mobile/tablet
//     touchMove: true, // Enable touch swipe move for mobile/tablet
//     swipe: true, // Enable swipe gesture functionality
//     arrows: false, // Disable previous/next arrows
//     centerPadding: "0", // Remove extra space on each side when scrolling
//   };

//   // Log when the selected pasta is changed
//   useEffect(() => {
//     console.log('Selected pasta changed:', selectedPasta);
//   }, [selectedPasta]);

//   // Start the timer based on selected pasta and cooking style
//   const startTimer = () => {
//     if (!selectedPasta || !cookingStyle) return;

//     const timeInMinutes = selectedPasta[cookingStyle]; // Get the time for the selected cooking style

//     // Ensure time is valid
//     if (isNaN(timeInMinutes)) {
//       console.error('Invalid cooking time');
//       return;
//     }

//     setTimer(Date.now() + timeInMinutes * 60000); // Set the countdown timer

//     setShowTimerModal(true); // Show the timer modal when the timer starts
//     setShowReadyMessage(false); // Reset the "Ready, bby" message when starting a new timer
//   };

//   // This callback will be called when the countdown finishes
//   const handleCountdownComplete = () => {
//     setShowReadyMessage(true); // Show the "Ready, bby" message when the timer finishes
//   };

//   // Log state updates to check
//   console.log('Selected category:', category);
//   console.log('Selected pasta:', selectedPasta);

//   return (
//     <div className='pasta-timer-all'>
//       {/* Show title until a category is selected */}
//       {!category && <h1>PASTAAA TIMER pshhpshhh</h1>}

//       {/* Category selection */}
//       {!category && (
//         <div className='pasta-choice'>
//           <button onClick={() => setCategory('short')}>Short Pasta</button>
//           <button onClick={() => setCategory('long')}>Long Pasta</button>
//           <button onClick={() => setCategory('special')}>Special Pasta</button>
//         </div>
//       )}

//       {/* Display pasta options after category selection */}
//       {category && pastaData[category] && (
//         <div style={{ width: '100vw', overflow: 'hidden' }}>
//           <h2>Select your pasta:</h2>
//           <Slider {...sliderSettings}>
//             {pastaData[category].map((pasta) => (
//               <div
//                 key={pasta.name}
//                 onClick={() => {
//                   setSelectedPasta(pasta); // Update selected pasta
//                   setShowModal(true); // Show the modal for cooking style
//                   console.log('Pasta clicked:', pasta.name); // Log selected pasta
//                 }}
//                 className={`pasta-card ${selectedPasta?.name === pasta.name ? 'selected' : ''}`} // Add selected class for styling
//                 style={{
//                   padding: '10px',
//                   cursor: 'pointer',
//                   width: '200px', // Width for each pasta card
//                   margin: '0 10px', // Margin between cards
//                 }}
//               >
//                 <h3>{pasta.name}</h3>
//                 <p>Al Dente: {pasta.alDente} min</p>
//                 <p>Well Done: {pasta.wellCooked} min</p>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       )}

//       {/* Modal for choosing cooking style */}
//       {showModal && selectedPasta && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Choose your cooking style for {selectedPasta.name}:</h2>
//             <button onClick={() => { setCookingStyle('alDente'); setShowModal(false); }}>Al Dente</button>
//             <button onClick={() => { setCookingStyle('wellCooked'); setShowModal(false); }}>Well Done</button>
//             <button onClick={() => { setCookingStyle(null); setShowModal(false); }}>Any Style</button>
//             <button onClick={() => setShowModal(false)}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* Timer modal */}
//       {showTimerModal && timer && (
//         <div className="timer-modal">
//           <div className="timer-modal-content">
//             <Countdown date={timer} onComplete={handleCountdownComplete} />
//             {/* Show "Ready, bby" message after timer finishes */}
//             {showReadyMessage && (
//               <div style={{ marginTop: '20px', fontSize: '24px', color: 'green' }}>
//                 <p>Ready, bby!</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Timer button */}
//       {selectedPasta && cookingStyle && (
//         <button onClick={startTimer} style={{ marginTop: '10px', padding: '10px' }}>
//           Start Timer
//         </button>
//       )}
//     </div>
//   );
// }

// export default App;




// import { useState, useEffect } from 'react';
// import './App.css';
// import Countdown from 'react-countdown';
// import Slider from 'react-slick';
// import pastaData from './data/pastaData.json';

// function App() {
//   const [category, setCategory] = useState(null); // Category selection
//   const [selectedPasta, setSelectedPasta] = useState(null); // Selected pasta
//   const [cookingStyle, setCookingStyle] = useState(null); // Al dente or well done
//   const [timer, setTimer] = useState(null); // Timer state
//   const [showModal, setShowModal] = useState(false); // To control the modal visibility
//   const [showReadyMessage, setShowReadyMessage] = useState(false); // To control the "Ready, bby" message visibility
//   const [isCategorySelected, setIsCategorySelected] = useState(false); // To handle category selection

//   // Slider settings for horizontal scrolling
//   const sliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1, // Show one pasta card at a time
//     slidesToScroll: 1,
//     centerMode: true,
//     focusOnSelect: true, // Allow clicking to select the pasta
//     variableWidth: true, // Variable width for scrolling effect
//   };

//   // Log when the selected pasta is changed
//   useEffect(() => {
//     console.log('Selected pasta changed:', selectedPasta);
//   }, [selectedPasta]);

//   // Start the timer based on selected pasta and cooking style
//   const startTimer = () => {
//     if (!selectedPasta || !cookingStyle) return;

//     const timeInMinutes = selectedPasta[cookingStyle]; // Get the time for the selected cooking style
//     setTimer(Date.now() + timeInMinutes * 60000); // Set the countdown timer

//     setShowReadyMessage(false); // Reset the "Ready, bby" message when starting a new timer
//   };

//   // This callback will be called when the countdown finishes
//   const handleCountdownComplete = () => {
//     setShowReadyMessage(true); // Show the "Ready, bby" message when the timer finishes
//   };

//   // Log state updates to check
//   console.log('Selected category:', category);
//   console.log('Selected pasta:', selectedPasta);

//   return (
//     <div className='pasta-timer-all'>
//       {/* Show title until a category is selected */}
//       {!category && <h1>PASTAAA TIMER pshhpshhh</h1>}

//       {/* Category selection */}
//       {!category && (
//         <div className='pasta-choice'>
//           <button onClick={() => { setCategory('short'); setIsCategorySelected(true); }}>Short Pasta</button>
//           <button onClick={() => { setCategory('long'); setIsCategorySelected(true); }}>Long Pasta</button>
//           <button onClick={() => { setCategory('special'); setIsCategorySelected(true); }}>Special Pasta</button>
//         </div>
//       )}

//       {/* Display pasta options after category selection */}
//       {category && pastaData[category] && (
//         <div style={{ width: '100vw', overflow: 'hidden' }}>
//           <h2>Select your pasta:</h2>
//           <Slider {...sliderSettings}>
//             {pastaData[category].map((pasta) => (
//               <div
//                 key={pasta.name}
//                 onClick={() => {
//                   setSelectedPasta(pasta); // Update selected pasta
//                   setShowModal(true); // Show the modal for cooking style
//                   console.log('Pasta clicked:', pasta.name); // Log selected pasta
//                 }}
//                 className={`pasta-card ${selectedPasta?.name === pasta.name ? 'selected' : ''}`} // Add selected class for styling
//                 style={{
//                   padding: '10px',
//                   cursor: 'pointer',
//                   width: '200px', // Width for each pasta card
//                   margin: '0 10px', // Margin between cards
//                 }}
//               >
//                 <h3>{pasta.name}</h3>
//                 <p>Al Dente: {pasta.alDente} min</p>
//                 <p>Well Done: {pasta.wellCooked} min</p>
//               </div>
//             ))}
//           </Slider>

//           {/* Timer button */}
//           {selectedPasta && cookingStyle && (
//             <button onClick={startTimer} style={{ marginTop: '10px', padding: '10px' }}>
//               Start Timer
//             </button>
//           )}

//           {/* Timer countdown display */}
//           {timer && (
//             <div style={{ marginTop: '20px', fontSize: '24px' }}>
//               <Countdown date={timer} onComplete={handleCountdownComplete} />
//             </div>
//           )}

//           {/* Show "Ready, bby" message after timer finishes */}
//           {showReadyMessage && (
//             <div style={{ marginTop: '20px', fontSize: '24px', color: 'green' }}>
//               <p>Ready, bby!</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Modal for choosing cooking style */}
//       {showModal && selectedPasta && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Choose your cooking style for {selectedPasta.name}:</h2>
//             <button onClick={() => { setCookingStyle('alDente'); setShowModal(false); }}>Al Dente</button>
//             <button onClick={() => { setCookingStyle('wellCooked'); setShowModal(false); }}>Well Done</button>
//             <button onClick={() => { setCookingStyle(null); setShowModal(false); }}>Any Style</button>
//             <button onClick={() => setShowModal(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

