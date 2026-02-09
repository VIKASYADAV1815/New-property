 "use client";
import { useRef, useState } from "react";
import { Image as ImageIcon, Upload } from "lucide-react";

export default function ImageUploader({ value, onChange }) {
  const [preview, setPreview] = useState(value || "");
  const [file, setFile] = useState(null);
  const [aspect, setAspect] = useState("1:1");
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const imgRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, panX: 0, panY: 0 });

  const onFileInput = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setModalOpen(true);
  };

  const uploadBlob = async (blob) => {
    const fd = new FormData();
    fd.append("file", blob, file?.name || "image.png");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (json.ok && json.url) onChange?.(json.url);
  };

  const applyCrop = async () => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const canvas = document.createElement("canvas");
    const [aw, ah] = aspect.split(":").map((n) => parseFloat(n) || 1);
    const targetW = 800;
    const targetH = Math.round((targetW * ah) / aw);
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(targetW / iw, targetH / ih) * zoom;
    const drawW = iw * scale;
    const drawH = ih * scale;
    let dx = (targetW - drawW) / 2 + panX;
    let dy = (targetH - drawH) / 2 + panY;
    ctx.drawImage(img, dx, dy, drawW, drawH);
    canvas.toBlob(async (blob) => {
      if (blob) await uploadBlob(blob);
    }, "image/jpeg", 0.92);
  };

  const onPointerDown = (e) => {
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    dragRef.current = { active: true, startX: x, startY: y, panX, panY };
  };
  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const dx = x - dragRef.current.startX;
    const dy = y - dragRef.current.startY;
    setPanX(dragRef.current.panX + dx);
    setPanY(dragRef.current.panY + dy);
  };
  const onPointerUp = () => {
    dragRef.current.active = false;
  };

  return (
    <div className="border border-gray-200 rounded-xl p-3 bg-white">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="rounded-lg border border-gray-200 bg-gray-50 overflow-hidden h-24 flex items-center justify-center">
            {preview || value ? (
              <img src={preview || value} alt="" className="h-full w-auto object-cover" />
            ) : (
              <ImageIcon className="w-6 h-6 text-gray-400" />
            )}
          </div>
          {(preview || value) && (
            <div className="mt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="px-3 py-2 rounded-full border border-gray-200 text-sm bg-gray-50 hover:bg-gray-100"
              >
                Edit image
              </button>
            </div>
          )}
        </div>
        <div className="flex-1">
          <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer w-fit">
            <Upload className="w-4 h-4 text-gray-700" />
            <span className="text-sm text-gray-700">Upload image</span>
            <input type="file" accept="image/*" className="hidden" onChange={onFileInput} />
          </label>
          <div className="text-xs text-gray-500 mt-2">JPEG/PNG/WebP up to 5MB</div>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setModalOpen(false)} />
          <div className="absolute inset-0 overflow-y-auto p-4 sm:p-6" onClick={() => setModalOpen(false)}>
            <div className="mx-auto my-6 w-full max-w-200 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="text-sm font-bold text-gray-900">Crop image</div>
              <div className="mt-3">
                <div
                  className="relative w-full rounded-lg border border-gray-200 bg-gray-50 overflow-hidden"
                  style={{
                    height: (() => {
                      const [aw, ah] = aspect.split(":").map((n) => parseFloat(n) || 1);
                      const base = 440;
                      return Math.round((base * ah) / aw);
                    })(),
                  }}
                >
                  <div
                    className="absolute inset-0 overflow-hidden flex items-center justify-center bg-gray-100 cursor-move"
                    onMouseDown={onPointerDown}
                    onMouseMove={onPointerMove}
                    onMouseUp={onPointerUp}
                    onMouseLeave={onPointerUp}
                    onTouchStart={onPointerDown}
                    onTouchMove={onPointerMove}
                    onTouchEnd={onPointerUp}
                  >
                    {(preview || value) && (
                      <img
                        ref={imgRef}
                        src={preview || value}
                        alt=""
                        className="max-w-none"
                        style={{
                          transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                          transformOrigin: "center center",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <select value={aspect} onChange={(e) => setAspect(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm">
                    <option value="16:9">16:9</option>
                    <option value="4:3">4:3</option>
                    <option value="1:1">1:1</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Zoom</span>
                    <input type="range" min="1" max="2" step="0.01" value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} />
                  </div>
                  <button
                    onClick={async () => {
                      await applyCrop();
                      setModalOpen(false);
                    }}
                    className="px-4 py-2 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800"
                  >
                    Apply crop
                  </button>
                  <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-gray-200 text-sm bg-gray-50 hover:bg-gray-100">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
