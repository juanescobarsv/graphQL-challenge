import { useState, useRef } from "react";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import "./styles/App.css";
import "./styles/character-list.css";
import "./styles/character-details.css";
import "./styles/utils.css";

function App() {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null,
  );

  const sidebarRef = useRef<HTMLElement>(null);

  const handleCharacterClick = (id: string) => {
    setSelectedCharacterId(id);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Ravn Rick and Morty Registry</h1>
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
