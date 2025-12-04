"use client";

import { useState } from "react";
import { ChatButton } from "./ChatButton";
import { ChatPopup } from "./ChatPopup";
import { ChatPanel } from "./ChatPanel";

export function ChatWidget() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <>
      {/* Chat Button and Popup */}
      {!isPanelOpen && (
        <>
          <ChatButton onClick={handleOpenPanel} />
          <ChatPopup onButtonClick={handleOpenPanel} />
        </>
      )}

      {/* Chat Panel */}
      <ChatPanel isOpen={isPanelOpen} onClose={handleClosePanel} />
    </>
  );
}
