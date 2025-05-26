import { useState, useRef, useEffect } from "react";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import "./styles/App.css";
import "./styles/character-list.css";
import "./styles/character-details.css";
import "./styles/utils.css";
import "./styles/colors.css";
import "./styles/theme-toggle.css";

function App() {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null,
  );

  const sidebarRef = useRef<HTMLElement>(null);

  const handleCharacterClick = (id: string) => {
    setSelectedCharacterId(id);
  };

  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-mode" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Ravn Rick and Morty Registry</h1>
        <button
          className="theme-toggle-button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <span role="img" aria-label="Dark icon">
              🌙
            </span>
          ) : (
            <span role="img" aria-label="Light icon">
              ☀️
            </span>
          )}
        </button>
      </header>

      <div className="content-area">
        <aside className="sidebar" ref={sidebarRef}>
          <CharacterList
            onCharacterClick={handleCharacterClick}
            selectedCharacterId={selectedCharacterId}
            scrollContainerRef={sidebarRef}
          />
        </aside>

        <main className="main-content">
          <CharacterDetail characterId={selectedCharacterId} />
        </main>
      </div>
    </div>
  );
}

export default App;
