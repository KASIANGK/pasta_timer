import React, { useEffect, useRef, useState } from 'react';
import "../../App.css";

const CookingButtons = ({ startCooking, selectedPasta, setSelectedCooking, selectedCooking }) => {
  const wellDoneButtonRef = useRef(null);
  const [showBlockedMessage, setShowBlockedMessage] = useState(false);

  // Détecter la position de la souris et déplacer le bouton Well Done
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!wellDoneButtonRef.current) return;

      const buttonRect = wellDoneButtonRef.current.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const distanceX = mouseX - (buttonRect.left + buttonRect.width / 2);
      const distanceY = mouseY - (buttonRect.top + buttonRect.height / 2);

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const threshold = 100;  // seuil de détection, ajustable selon la distance

      // Si la souris est à moins de 100px, le bouton fuit la souris
      if (distance < threshold) {
        // Calculer la direction pour fuir la souris (opposé à la direction de la souris)
        const moveFactor = 60;  // Déplacer de 40px dans la direction opposée
        const moveX = (distanceX / distance) * moveFactor;  // Déplacement horizontal
        const moveY = (distanceY / distance) * moveFactor;  // Déplacement vertical

        // Appliquer le mouvement dans la direction opposée
        wellDoneButtonRef.current.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
      } else {
        // Si la souris est loin du bouton, il revient à sa position d'origine
        wellDoneButtonRef.current.style.transform = 'translate(0, 0)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Afficher et cacher le message après 7 secondes
  useEffect(() => {
    if (showBlockedMessage) {
      const timer = setTimeout(() => {
        setShowBlockedMessage(false);
      }, 3000); // 7 secondes

      return () => clearTimeout(timer); // Nettoyage du timer
    }
  }, [showBlockedMessage]);

  console.log("selectedPasta dans App:", selectedPasta);

  return (
    <div className="buttons-general buttons-cooking">
      <button
        onClick={() => {
          setSelectedCooking("alDente");
          startCooking(selectedPasta.alDente);
        }}
        className={selectedCooking === "alDente" ? "selected" : ""}
      >
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

      <button
        ref={wellDoneButtonRef}
        onClick={() => {
          setShowBlockedMessage(true);
          console.log("well done btn clicked");
          setSelectedCooking("wellDone");
        }}
        className="well-done disabled"
      >
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

      {/* Message bloqué */}
      <div
        className={`blocked-message ${showBlockedMessage ? "visible" : ""}`}
        style={{
          left: wellDoneButtonRef.current
            ? `${wellDoneButtonRef.current.getBoundingClientRect().right + 10}px`
            : "0",
        }}
      >
        Mais pq?? T'as jamais entendu parler du respect des traditions ?
      </div>
    </div>
  );
};

export default CookingButtons;
