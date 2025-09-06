'use client';

// Reactのコンポーネントであることを示すために'React'をインポート
import React from 'react';

export default function ControlPanel() {
  // SVGアイコンはインラインで定義
  const MarkerEraserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m3.5 12.5 5 5"/><path d="m8.5 12.5-5 5"/></svg>
  );

  return (
    <div className="controls-wrapper">
      <h3>コントロール</h3>
      <div className="control-panel">
        <div className="tool-button-grid">
          <button title="視点操作" className="active">👁️</button>
          <button title="オブジェクト選択">👆</button>
          <button title="パーツ消去">🧽</button>
          <button title="マーカー消去"><MarkerEraserIcon /></button>
          <button title="連続線を描く">〰️</button>
          <button title="計測">📏</button>
          <button title="クリッピング">✂️</button>
          <button title="テキスト">T</button>
        </div>
        <div className="control-panel-row">
          <input type="color" defaultValue="#ff0000" title="色の選択" />
        </div>
        <div className="control-panel-row">
          <label htmlFor="text-size">Text:</label>
          <input type="range" id="text-size" min="0.05" max="2.0" defaultValue="1.0" step="0.05" />
        </div>
         <div className="control-panel-row">
          <label htmlFor="line-size">線:</label>
          <input type="range" id="line-size" min="0.2" max="5.0" defaultValue="1.0" step="0.1" />
        </div>
      </div>
      <div className="control-panel">
        <strong>手順:</strong>
        <select style={{width: '100%'}}>
          <option>Step 01</option>
          <option>Step 02</option>
        </select>
      </div>
    </div>
  );
}