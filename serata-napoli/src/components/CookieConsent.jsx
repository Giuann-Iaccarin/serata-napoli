/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';

const COOKIE_KEY = 'sn_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
    // Listener per riapertura da fuori
    const handler = () => setVisible(true);
    window.addEventListener('open-cookie-consent', handler);
    return () => window.removeEventListener('open-cookie-consent', handler);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-end">
      <div className="bg-[#18181b] text-white rounded-t-2xl shadow-lg p-6 max-w-xl w-full mx-2 mb-2 border border-white/10">
        <div className="mb-3 text-sm">
          Questo sito utilizza cookie tecnici e, con il tuo consenso, cookie di terze parti per migliorare l'esperienza utente e raccogliere dati statistici. Leggi la nostra{' '}
          <a href="/privacy" className="underline text-orange-400 hover:text-orange-500" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
          >
            Rifiuta
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
