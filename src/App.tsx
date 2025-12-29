import { useRef, useState } from "react";
import "./App.scss";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import ControlTray from "./components/control-tray/ControlTray";
import cn from "classnames";
import { LiveClientOptions } from "./types";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const apiOptions: LiveClientOptions = {
  apiKey: API_KEY,
  model: "models/gemini-2.0-flash-exp",
};

// التعديل السحري: الإمضاء هنا في الأول عشان يشتغل 100%
export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return (
    <div className="App" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <LiveAPIProvider options={apiOptions}>
        
        {/* هيدر العربي جروب */}
        <div style={{ backgroundColor: '#0055a5', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Elaraby_Group_Logo.png" alt="Logo" style={{ height: '40px', backgroundColor: 'white', padding: '4px', borderRadius: '8px' }} />
            <div>
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'white' }}>El Araby AI</h1>
              <span style={{ fontSize: '12px', color: '#e0e0e0' }}>Sales Assistant</span>
            </div>
          </div>
        </div>

        {/* جسم التطبيق */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', position: 'relative' }}>
          
          {/* الكاميرا */}
          <div style={{ width: '100%', maxWidth: '500px', aspectRatio: '16/9', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #ddd' }}>
            <video
              className={cn("stream", { hidden: !videoRef.current || !videoStream })}
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {!videoStream && <div style={{ color: '#aaa', fontSize: '14px' }}>الكاميرا مغلقة</div>}
          </div>

          {/* الأزرار */}
          <div style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '10px 25px', borderRadius: '50px', boxShadow: '0 5px 25px rgba(0,0,0,0.2)', display: 'flex', gap: '15px', zIndex: 1000 }}>
             <ControlTray
               videoRef={videoRef}
               supportsVideo={true}
               onVideoStreamChange={setVideoStream}
             />
          </div>
          
        </div>
      </LiveAPIProvider>
    </div>
  );
}
