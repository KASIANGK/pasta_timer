import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import pastaData from "/src/data/pastaData.json"; 
// import { motion } from "framer-motion";
import CookingButtons from "./assets/Components/CookingButtons";
import alarmSound from "/images/alert.mp3"

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
  const [selectedCooking, setSelectedCooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const categoryDescriptions = {
    short: "Pour les gens pressés ou qui ne savent pas viser avec une fourchette",
    long: "Idéal pour twister autour de la fourchette... ou autour de ta dignité",
    special: "Pour les artistes incompris 🥹 Des pâtes qui ont autant de personnalité que toi",
  };
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStepTwoThreeOpen, setIsStepTwoThreeOpen] = useState(false);
  const sliderRef = useRef(null);
  const allPasta = Object.values(pastaData).flat(); // Fusionne toutes les pâtes

  const filteredPasta = allPasta.filter((pasta) =>
    pasta.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [videoVisible, setVideoVisible] = useState(true);
  const [modalText, setModalText] = useState('ENJOY ❤️');
  const [textAnimClass, setTextAnimClass] = useState('');
  const [imageSrc, setImageSrc] = useState('/images/final-image.jpg'); 
  const [isHovered, setIsHovered] = useState(false)
  const [alarmAudio, setAlarmAudio] = useState(null)


  useEffect(() => {
    // La vidéo disparaît après 20 secondes et change le texte
    const timer = setTimeout(() => {
      setVideoVisible(false);  // Cache la vidéo
      setModalText('Chef, il est temps de retirer les pastaaa'); // Change le texte
      setImageSrc('/src/assets/images/final-image.jpg');  // Change l'image
      setTextAnimClass('animate-text'); // Applique l'animation sur le texte
    }, 40000);  // 20 secondes

    const timer1 = setTimeout(() => {
      setVideoVisible(false);  // Cache la vidéo
      setModalText('Tu fais des pâtes ou du ciment??'); // Change le texte
      setImageSrc('/src/assets/images/final-image2.jpg');  // Change l'image
      setTextAnimClass('animate-text'); // Applique l'animation sur le texte
    }, 45000);  // 20 secondes

    // Le texte change à 25 secondes et change l'image
    const timer2 = setTimeout(() => {
      setModalText('Bravo chef, t\'as inventé une nouvelle colle industrielle');
      setImageSrc('/src/assets/images/final-image3.jpg');  // Change l'image
      setTextAnimClass('animate-text');
    }, 50000);  // 25 secondes

    // Le texte change à 30 secondes et change l'image
    const timer3 = setTimeout(() => {
      setModalText('Si tu aimais vraiment les pâtes tu leur ferais pas ça');
      setImageSrc('/src/assets/images/final-image4.jpg');  // Change l'image
      setTextAnimClass('animate-text');
    }, 55000);  // 30 secondes

    // Le texte change à 35 secondes et change l'image
    const timer4 = setTimeout(() => {
      setModalText('Si l\'Italie te voyait, elle pleurerait');
      setImageSrc('/src/assets/images/final-image4.jpg');  // Change l'image
      setTextAnimClass('animate-text');
    }, 60000);  // 35 secondes
    
    // Nettoyer les timers à la fin
    return () => {
      clearTimeout(timer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);


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
    } else if (timeLeft === 0) {
      // Jouer l'alarme quand le temps atteint 0
      const alarm = new Audio(alarmSound);
      alarm.loop = true; // Boucle le son jusqu'à l'arrêt
      alarm.play();
      setAlarmAudio(alarm);
    }
  }, [timeLeft]);


  useEffect(() => {
    const stopAlarmTimer = setTimeout(() => {
      if (alarmAudio) {
        alarmAudio.pause();
        alarmAudio.currentTime = 0; // Remet le son au début
      }
    }, 40000); // Arrêter l'alarme après 40 secondes
  
    return () => clearTimeout(stopAlarmTimer);
  }, [alarmAudio]);
  

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
  

  // useEffect(() => {
  //   if (timeLeft <= 0) {
  //     console.log("Modal de fin affichée");
  //   }
  // }, [timeLeft]);
  

  const handlePastaSelection = (pasta) => {
    setSelectedPasta(pasta);  // Sélectionner la pâte
    setIsStepTwoThreeOpen(true);  // Ouvrir la section des étapes deux et trois
  };

  const handleItemClick = (pastaName) => {
    let selectedCategory = null;
    let selectedPastaIndex = 0;
  
    // Trouver la catégorie et l'index de la pâte sélectionnée
    for (let category in pastaData) {
      const foundPastaIndex = pastaData[category].findIndex(pasta => pasta.name === pastaName);
      if (foundPastaIndex !== -1) {
        selectedCategory = category;
        selectedPastaIndex = foundPastaIndex;
        break;
      }
    }
  
    if (selectedCategory) {
      setCategory(selectedCategory);
      const selectedPasta = pastaData[selectedCategory][selectedPastaIndex];
      setSelectedPasta(selectedPasta);
      setIsStepTwoThreeOpen(true);
  
      // Attendre le rendu avant de scroller
      setTimeout(() => {
        if (sliderRef.current) {
          const slider = sliderRef.current;
          const pastaCards = slider.children;
          
          if (pastaCards[selectedPastaIndex]) {
            const selectedCard = pastaCards[selectedPastaIndex];
            slider.scrollLeft = selectedCard.offsetLeft - slider.offsetLeft;
          }
        }
      }, 100); 
    }
    setIsSearchOpen(false);
  };


  // Fonction pour fermer la pasta-list si on clique en dehors
  const handleClickOutside = (e) => {
    if (!e.target.closest('.searchbar')) {
      setIsSearchOpen(false);  // Fermer la liste si le clic est en dehors de .searchbar
    }
  };
  
  useEffect(() => {
    // Ajouter l'écouteur d'événements
    document.addEventListener('click', handleClickOutside);

    // Nettoyage pour retirer l'écouteur lors du démontage
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  console.log("selectedPasta dans App:", selectedPasta);


  return (
    <div className="pasta-timer">
      <div className="main-container">

        {/* SEARCHBAR */}
        <div className="searchbar">
          {/* Bouton de recherche qui s'agrandit */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Rechercher..."
              className={`search-input ${isSearchOpen ? "open" : ""}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="search-button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              🔍
            </button>
          </div>

          {/* Résultats filtrés */}
          {searchTerm && isSearchOpen && (
            <div className={`pasta-list ${filteredPasta.length > 0 ? "show" : ""}`}>
              {filteredPasta.length > 0 ? (
                filteredPasta.map((pasta) => (
                  <div key={pasta.name} className="pasta-item" onClick={() => handleItemClick(pasta.name)} >

                    <img src={pasta.image} alt={pasta.name} />
                    <p>{pasta.name}</p>
                  </div>
                ))
              ) : (
                <p className="pasta-item-fail">Aucune pâte trouvée</p>
              )}
            </div>
          )}
        </div>
        
        <div className="container">

          {/* STEP ONE */}
          <div className="step-one">
            <div className="step-one-title">
              <div className="step-one-first-line">
                <div className="step-icon">
                  <svg height="50px" width="50px" viewBox="0 0 496.158 496.158" xmlns="http://www.w3.org/2000/svg" fill="#D0EAFF">
                    <path d="M248.082,0.003C111.07,0.003,0,111.061,0,248.085c0,137,111.07,248.07,248.082,248.07 c137.006,0,248.076-111.07,248.076-248.07C496.158,111.061,385.088,0.003,248.082,0.003z"></path> 
                    <path fill="#CFB4AF" d="M278.767,145.419c-3.126-4.003-7.276-6.006-12.451-6.006c-4.591,0-7.716,0.879-9.375,2.637 c-1.662,1.758-5.226,6.445-10.693,14.063c-5.47,7.617-11.744,14.502-18.823,20.654c-7.082,6.152-16.53,12.012-28.345,17.578 c-7.91,3.712-13.429,6.738-16.553,9.082c-3.126,2.344-4.688,6.006-4.688,10.986c0,4.298,1.586,8.082,4.761,11.353 c3.172,3.273,6.812,4.907,10.913,4.907c8.592,0,25.292-9.521,50.098-28.564V335.41c0,7.814,1.806,13.722,5.42,17.725 c3.612,4.003,8.397,6.006,14.355,6.006c13.378,0,20.068-9.814,20.068-29.443V161.972 C283.455,154.941,281.892,149.425,278.767,145.419z"></path>
                  </svg>
                </div>
              </div>
              {/* ANIMATION SUR LE TITRE */}
              {/* <motion.h1
                className="animated-title"
                initial={{ opacity: 0, y: 50 }} // Apparition avec effet de montée
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {Array.from("Choisis la catégorie 👇").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="letter"
                    animate={isHovered ? { x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 20, rotate: (Math.random() - 0.5) * 20 } : { x: 0, y: 0, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 8 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1> */}
              {/* <h1>Choisis la catégorie 👇</h1> */}
              <h1>Pick your pasta category 👇</h1>
              <div className="buttons-step-one">
                <div className="buttons-general">
                  {Object.keys(pastaData).map((cat) => (
                    <div key={cat} className="button-container">
                      <button
                        onClick={() => setCategory(cat)}
                        onMouseEnter={() => setHoveredCategory(cat)}
                        onMouseLeave={() => setHoveredCategory(null)}
                        className={category === cat ? "selected" : ""}
                      >
                        {cat}
                      </button>
                      {hoveredCategory === cat && (
                        <div className="hover-text-container">
                          <p className="hover-text">{categoryDescriptions[cat]}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>          
              </div>
            </div>
            <div className="step-one-illustration">
              <video
                autoPlay
                muted
              >
                <source src="/images/Pasta_Timer2.MP4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </div>

          {/* STEP TWO AND THREE */}
          <div>
            {category && (
              <div className="steps-two-three">
                {/* STEP TWO */}
                <div className="step-two-title">
                  {/* <h2>Choisis ton type</h2> */}
                  <h2
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Choose your type
                  </h2>

                  {/* La div apparaît si isHovered est true */}
                  {/* {isHovered && (
                    <div className="step-two-title-hover-text">
                      <p>Pâtes gangsta ou torsadées comme mon avenir</p>
                    </div>
                  )} */}
                  {/* <h2>Choose your type</h2> */}
                  <div className="step-icon">
                    <svg height="50px" width="50px" viewBox="0 0 496.158 496.158" xmlns="http://www.w3.org/2000/svg" fill="#D0EAFF">
                      <path d="M248.082,0.003C111.07,0.003,0,111.061,0,248.085c0,137,111.07,248.07,248.082,248.07 c137.006,0,248.076-111.07,248.076-248.07C496.158,111.061,385.088,0.003,248.082,0.003z"></path> 
                      <path fill="#EDA07E" d="M319.783,325.595c-4.005-3.124-9.814-4.688-17.432-4.688h-76.465c2.44-3.71,4.834-6.885,7.178-9.521 c5.468-6.64,15.55-15.967,30.249-27.979c14.696-12.012,25.17-20.824,31.421-26.44c6.249-5.614,12.378-13.378,18.384-23.291 c6.006-9.911,9.009-20.922,9.009-33.032c0-7.713-1.442-15.161-4.321-22.339c-2.882-7.178-6.91-13.5-12.085-18.97 c-5.177-5.468-11.183-9.764-18.018-12.891c-10.547-4.688-23.291-7.031-38.232-7.031c-12.403,0-23.218,1.831-32.446,5.493 
                      s-16.846,8.473-22.852,14.429c-6.006,5.958-10.524,12.598-13.55,19.922c-3.028,7.324-4.541,14.355-4.541,21.094 
                      c0,5.566,1.611,9.961,4.834,13.184s7.274,4.834,12.158,4.834c5.566,0,9.789-1.758,12.671-5.273 
                      c2.879-3.516,5.468-8.544,7.764-15.088c2.293-6.542,3.93-10.547,4.907-12.012c7.324-11.229,17.381-16.846,30.176-16.846 
                      c6.054,0,11.646,1.369,16.772,4.102c5.127,2.735,9.178,6.569,12.158,11.499c2.978,4.933,4.468,10.524,4.468,16.772 
                      c0,5.763-1.392,11.646-4.175,17.651s-6.837,11.865-12.158,17.578c-5.324,5.713-11.989,11.403-19.995,17.065 
                      c-4.493,3.028-11.964,9.352-22.412,18.97c-10.451,9.62-22.169,21.167-35.156,34.644c-3.126,3.321-6.006,7.887-8.643,13.696 
                      c-2.637,5.812-3.955,10.474-3.955,13.989c0,5.47,2.051,10.231,6.152,14.282c4.102,4.054,9.814,6.079,17.139,6.079H306.6 
                      c6.445,0,11.254-1.659,14.429-4.98c3.172-3.319,4.761-7.372,4.761-12.158C325.789,332.97,323.786,328.722,319.783,325.595z"></path> 
                    </svg>
                  </div>
                </div>
                <div className="cards-slider">
                  <div className="slider">
                    <div className="slides" ref={sliderRef}>
                      {category && pastaData[category] && pastaData[category].map((pasta) => (
                        <div
                          className={`pasta-card ${selectedPasta?.name === pasta.name ? "selected" : ""}`}
                          key={pasta.name}
                          onClick={() => handlePastaSelection(pasta)} // Cette fonction doit être correctement définie
                          onMouseEnter={() => setHoveredPasta(pasta.name)}
                          onMouseLeave={() => setHoveredPasta(null)}
                        >
                          <img
                            src={hoveredPasta === pasta.name || selectedPasta?.name === pasta.name ? pasta["image-bis"] : pasta.image}
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
                  <div className="step-three">
                    {/* STEP THREE */}
                    <div className="step-three-title">
                      {/* <h2>Tu préfères...</h2> */}
                      <h2>How do u prefer it?</h2>
                      <div className="step-icon">
                        <svg
                          height="200px"
                          width="200px"
                          viewBox="0 0 496.158 496.158"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          fill="#D0EAFF"
                        >
                          <g>
                            <path
                              style={{ fill: "#eda07e56B48C" }}
                              d="M248.082,0.003C111.07,0.003,0,111.061,0,248.085c0,137,111.07,248.07,248.082,248.07 
                              c137.006,0,248.076-111.07,248.076-248.07C496.158,111.061,385.088,0.003,248.082,0.003z"
                            ></path>
                            <path
                              style={{ fill: "#eda07e" }}
                              d="M319.637,269.711c-2.637-6.395-6.569-12.231-11.792-17.505c-5.226-5.273-11.646-9.961-19.263-14.063 
                              c7.91-6.64,13.989-13.451,18.237-20.435c4.248-6.981,6.372-15.355,6.372-25.122c0-7.42-1.465-14.355-4.395-20.801 
                              s-7.276-12.108-13.037-16.992c-5.763-4.882-12.55-8.617-20.361-11.206c-7.814-2.586-16.457-3.882-25.928-3.882 
                              c-10.84,0-20.654,1.538-29.443,4.614s-16.139,7.155-22.046,12.231c-5.91,5.079-10.4,10.426-13.477,16.04 
                              c-3.076,5.617-4.614,10.963-4.614,16.04c0,5.273,1.634,9.499,4.907,12.671c3.271,3.175,6.859,4.761,10.767,4.761 
                              c3.319,0,6.249-0.586,8.789-1.758c2.538-1.172,4.296-2.783,5.273-4.834c1.659-3.809,3.49-7.86,5.493-12.158 
                              c2-4.296,4.125-7.812,6.372-10.547c2.245-2.733,5.296-4.93,9.155-6.592c3.856-1.659,8.764-2.49,14.722-2.49 
                              c8.789,0,15.77,2.71,20.947,8.13c5.175,5.42,7.764,11.891,7.764,19.409c0,9.865-3.248,17.432-9.741,22.705 
                              c-6.496,5.273-14.234,7.91-23.218,7.91h-6.006c-6.935,0-12.158,1.442-15.674,4.321c-3.516,2.882-5.273,6.665-5.273,11.353 
                              c0,4.786,1.465,8.521,4.395,11.206c2.93,2.687,7.079,4.028,12.451,4.028c1.172,0,3.809-0.194,7.91-0.586 
                              c4.102-0.389,7.127-0.586,9.082-0.586c11.133,0,19.823,3.248,26.074,9.741c6.249,6.496,9.375,15.454,9.375,26.88 
                              c0,7.716-1.831,14.502-5.493,20.361s-8.302,10.279-13.916,13.257c-5.617,2.98-11.451,4.468-17.505,4.468 
                              c-10.547,0-18.727-3.296-24.536-9.888c-5.812-6.592-11.256-16.674-16.333-30.249c-0.783-2.245-2.442-4.175-4.98-5.786 
                              c-2.541-1.611-5.177-2.417-7.91-2.417c-5.47,0-10.034,1.735-13.696,5.2c-3.662,3.468-5.493,8.034-5.493,13.696 
                              c0,4.395,1.538,9.961,4.614,16.699s7.617,13.257,13.623,19.556s13.646,11.549,22.925,15.747c9.276,4.198,19.775,6.299,31.494,6.299 
                              c11.522,0,22.046-1.831,31.567-5.493s17.748-8.739,24.683-15.234c6.933-6.493,12.181-13.891,15.747-22.192 
                              c3.563-8.299,5.347-16.894,5.347-25.781C323.592,283.018,322.273,276.109,319.637,269.711z"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    
                    {/* COOKING BUTTONS */}
                    <CookingButtons 
                      selectedPasta={selectedPasta} 
                      startCooking={startCooking} 
                      setSelectedCooking={setSelectedCooking} 
                      selectedCooking={selectedCooking}
                    />
                  </div>
                )}

                {/* RECIPES CONTAINER  */}
                {showRecipe && selectedPasta && (
                  <div className="recipes-container">
                    <div
                      className="recipe-card"
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

                      <div className="stop-button-container">
                        <button className="stop-button" onClick={() => setShowModal(false)}>STOP</button>
                      </div>
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
                      <video
                        className="modal-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src="/images/alert.MP4" type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                      </video>
                      {!videoVisible && (
                        <img
                          src={imageSrc}  // L'image change selon le texte
                          alt="Final Image"
                          className="modal-image"
                        />
                      )}
                      <div className="hearts-container">
                        <h2 className={`hearts ${textAnimClass}`}>{modalText}</h2>                      </div>
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


