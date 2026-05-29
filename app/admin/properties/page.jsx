"use client";
import { useEffect, useState, useRef } from "react";
import AdminTable from "@/components/admin/AdminTable";
import Link from "next/link";
import api from "@/utils/api";

export default function AdminProperties() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const objectUrlsRef = useRef([]);

  const [formData, setFormData] = useState({
    status: "buy",
    title: "",
    city: "Gurgaon",
    location: "",
    price: "",
    bhk: ["2 BHK"],
    sqft: "",
    carpetArea: "",
    superBuiltUpArea: "",
    landmarks: [],
    description: "",
  });

  const [customBhk, setCustomBhk] = useState("");

  // store local files
  const [files, setFiles] = useState({
    image: null,
    image1: null,
    image2: null,
    image3: null,
  });

  // preview urls (local + existing cloud urls)
  const [previews, setPreviews] = useState({
    image: null,
    image1: null,
    image2: null,
    image3: null,
  });

  // final uploaded urls (cloudinary)
  const [uploadedUrls, setUploadedUrls] = useState({
    image: null,
    image1: null,
    image2: null,
    image3: null,
  });

  const [uploading, setUploading] = useState({
    image: false,
    image1: false,
    image2: false,
    image3: false,
  });

  const cities = ["Gurgaon", "Delhi", "Dehradun", "Haryana", "Uttar Pradesh"];
  const [citiesList, setCitiesList] = useState(cities);
  const [customCityInput, setCustomCityInput] = useState("");
  const bhkPresets = ["Studio", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "6 BHK"];

  const toTitleCase = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (ch) => ch.toUpperCase());

  const mergeUniqueCities = (...cityGroups) => {
    const merged = cityGroups.flat().filter(Boolean);
    const map = new Map();
    merged.forEach((city) => {
      const normalized = String(city).trim();
      if (!normalized) return;
      const key = normalized.toLowerCase();
      if (!map.has(key)) map.set(key, normalized);
    });
    return Array.from(map.values());
  };

  const normalizeBhkValues = (value) => {
    const values = Array.isArray(value)
      ? value
      : String(value || "")
          .split(/[,|]/)
          .map((item) => item.trim());

    return Array.from(new Set(values.filter(Boolean)));
  };

  const formatBhkValue = (value) => {
    const values = normalizeBhkValues(value);
    return values.length > 0 ? values.join(", ") : "";
  };

  const toggleBhk = (bhkValue) => {
    setFormData((prev) => {
      const current = normalizeBhkValues(prev.bhk);
      const next = current.includes(bhkValue)
        ? current.filter((item) => item !== bhkValue)
        : [...current, bhkValue];
      return { ...prev, bhk: next };
    });
  };

  const addCustomBhk = () => {
    const value = customBhk.trim();
    if (!value) return;

    setFormData((prev) => {
      const current = normalizeBhkValues(prev.bhk);
      if (current.includes(value)) return prev;
      return { ...prev, bhk: [...current, value] };
    });

    setCustomBhk("");
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "bhkDisplay", label: "BHK" },
    { key: "status", label: "Type" },
    { key: "city", label: "City" },
    { key: "location", label: "Location" },
    { key: "price", label: "Price" },
  ];

  // cleanup object URLs
  const cleanupPreviews = () => {
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
  };

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/properties");

      let propList = [];
      if (Array.isArray(data)) propList = data;
      else if (data?.items) propList = data.items;
      else propList = [];

      // Transform _id to id for consistency and prefer showing entered priceText
      propList = propList.map(prop => ({
        ...prop,
        id: prop._id || prop.id,
        bhkDisplay: formatBhkValue(prop.bhk),
        price: prop.priceText ?? (prop.price != null && typeof prop.price === 'number' ? `₹ ${prop.price.toLocaleString('en-IN')}` : (prop.price ?? "")),
      }));

      setItems(propList);
      setCitiesList((prev) => mergeUniqueCities(cities, prev, propList.map((p) => p.city)));
    } catch (err) {
      console.log("properties load fail", err);
      alert("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    return () => cleanupPreviews();
  }, []);

  // Images array for the viewing modal (deduped)
  const viewingImages = viewing
    ? Array.from(new Set([viewing.image, viewing.image1, viewing.image2, viewing.image3].filter(Boolean)))
    : [];

  const resetForm = () => {
    cleanupPreviews();

    setFormData({
      status: "buy",
      title: "",
      city: "Gurgaon",
      location: "",
      price: "",
      bhk: ["2 BHK"],
      sqft: "",
      carpetArea: "",
      superBuiltUpArea: "",
      landmarks: [],
      description: "",
    });

    setCustomBhk("");

    setFiles({
      image: null,
      image1: null,
      image2: null,
      image3: null,
    });

    setPreviews({
      image: null,
      image1: null,
      image2: null,
      image3: null,
    });

    setUploadedUrls({
      image: null,
      image1: null,
      image2: null,
      image3: null,
    });

    setUploading({
      image: false,
      image1: false,
      image2: false,
      image3: false,
    });
  };

  const openCreate = () => {
    resetForm();
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (item) => {
    cleanupPreviews();

    const existingBhk = normalizeBhkValues(item.bhk || "2 BHK");

    setFormData({
      status: item.status || "buy",
      title: item.title || "",
      city: item.city || "Gurgaon",
      location: item.location || "",
      price: item.priceText ?? (item.price != null ? String(item.price) : ""),
      bhk: existingBhk.length > 0 ? existingBhk : ["2 BHK"],
      sqft: item.sqft ?? "",
      carpetArea: item.carpetArea ?? "",
      superBuiltUpArea: item.superBuiltUpArea ?? "",
      landmarks: item.landmarks || [],
      description: item.description || "",
    });

    setFiles({
      image: null,
      image1: null,
      image2: null,
      image3: null,
    });

    // preview show existing urls
    setPreviews({
      image: item.image || null,
      image1: item.image1 || null,
      image2: item.image2 || null,
      image3: item.image3 || null,
    });

    // store already uploaded urls
    setUploadedUrls({
      image: item.image || null,
      image1: item.image1 || null,
      image2: item.image2 || null,
      image3: item.image3 || null,
    });

    setCitiesList((prev) => mergeUniqueCities(cities, prev, [item.city]));

    setEditing({ ...item, id: item.id || item._id });
    setOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["sqft", "carpetArea", "superBuiltUpArea"];

    if (numericFields.includes(name)) {
      const val = value === "" ? "" : Number(value);
      setFormData((prev) => ({ ...prev, [name]: val }));
      return;
    }

    if (name === "price") {
      // keep raw price string (allows values like "32 lakhs")
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // remove selected image
  const removeImage = (key) => {
    setFiles((prev) => ({ ...prev, [key]: null }));
    setPreviews((prev) => ({ ...prev, [key]: null }));
    setUploadedUrls((prev) => ({ ...prev, [key]: null }));
  };

  const handleFileChange = async (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFiles((prev) => ({ ...prev, [key]: file }));

    // preview url
    const previewUrl = URL.createObjectURL(file);
    objectUrlsRef.current.push(previewUrl);
    setPreviews((prev) => ({ ...prev, [key]: previewUrl }));

    // upload instantly to cloudinary API
    try {
      setUploading((prev) => ({ ...prev, [key]: true }));

      const fd = new FormData();
      fd.append("image", file);
      fd.append("folder", `properties/${formData.status}`);

      const { data } = await api.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!data?.url) throw new Error("Upload failed");

      setUploadedUrls((prev) => ({ ...prev, [key]: data.url }));
    } catch (err) {
      console.log("Upload Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Image upload failed");
      removeImage(key);
    } finally {
      setUploading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // main image required
    if (!uploadedUrls.image) {
      return alert("Main Image is required!");
    }

    const nextBhk = normalizeBhkValues(formData.bhk);
    if (nextBhk.length === 0) {
      return alert("Please add at least one BHK option");
    }

    // parse price: accept numeric or freeform strings like "32 lakhs" or "3.2 cr"
    const parsePriceText = (txt) => {
      if (txt === undefined || txt === null) return NaN;
      const s = String(txt).toLowerCase();
      const numMatch = s.match(/[0-9,\.]+/);
      if (!numMatch) return NaN;
      const num = Number(numMatch[0].replace(/,/g, ""));
      let multiplier = 1;
      if (/lakh|lac/.test(s)) multiplier = 100000;
      else if (/cr|crore/.test(s)) multiplier = 10000000;
      else if (/k\b/.test(s)) multiplier = 1000;
      return num * multiplier;
    };

    const rawPrice = formData.price;
    const priceNumFromRaw = Number(String(rawPrice || "").replace(/[^0-9.-]+/g, ""));
    const priceNum = Number.isFinite(priceNumFromRaw) && priceNumFromRaw !== 0 ? priceNumFromRaw : parsePriceText(rawPrice);
    const sqftNum = formData.sqft === "" || formData.sqft === null ? null : Number(formData.sqft);
    const carpetNum = formData.carpetArea === "" || formData.carpetArea === null ? null : Number(formData.carpetArea);
    const superNum = formData.superBuiltUpArea === "" || formData.superBuiltUpArea === null ? null : Number(formData.superBuiltUpArea);

    if (!Number.isFinite(priceNum) && !(rawPrice && String(rawPrice).trim())) return alert("Please enter a valid price or descriptive price text");

    const payload = {
      status: formData.status,
      title: formData.title,
      city: formData.city,
      location: formData.location,
      price: Number.isFinite(priceNum) ? priceNum : undefined,
      priceText: rawPrice ? String(rawPrice) : undefined,
      bhk: nextBhk,
      sqft: sqftNum,
      carpetArea: carpetNum,
      superBuiltUpArea: superNum,
      landmarks: formData.landmarks || [],
      description: formData.description,
      ...uploadedUrls,
    };

    try {
      setLoading(true);

      if (editing) {
        const id = editing.id || editing._id;
        if (!id) throw new Error("Missing property id for update");
        await api.put(`/properties/${id}`, payload);
      } else {
        await api.post("/properties", payload);
      }

      setOpen(false);
      resetForm();
      load();
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Save failed – check console");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
    setDeleteError(null);
  };

  const confirmDeleteAction = async () => {
    try {
      setLoading(true);
      setDeleteError(null);
      await api.delete(`/properties/${deleteId}`);
      load();
      setConfirmOpen(false);
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      setDeleteError(err.response?.data?.message || err.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // beautiful upload component
  const UploadBox = ({ label, name, required = false }) => {
    return (
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold text-gray-800">
            {label} {required && <span className="text-red-600">*</span>}
          </p>

          {uploadedUrls[name] && (
            <button
              type="button"
              onClick={() => removeImage(name)}
              className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
            >
              Remove
            </button>
          )}
        </div>

        {/* Preview */}
        {previews[name] ? (
          <div className="relative rounded-lg overflow-hidden border border-gray-200">
            <img
              src={previews[name]}
              alt="preview"
              className="w-full h-44 object-cover"
            />

            {uploading[name] && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                Uploading...
              </div>
            )}
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                Click to Upload
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG, WEBP allowed
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, name)}
              className="hidden"
            />
          </label>
        )}

        {/* Uploaded status */}
        {uploadedUrls[name] && (
          <p className="text-xs mt-2 text-green-600 font-medium">
            ✅ Uploaded Successfully
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Properties</h1>
          <p className="text-gray-600">Manage buy/sell listings</p>
        </div>

        {loading && (
          <span className="text-sm text-blue-600 font-medium">
            Loading...
          </span>
        )}
      </div>

      <AdminTable
        columns={columns}
        rows={items}
        onCreate={openCreate}
        onEdit={openEdit}
        onDelete={handleDelete}
        onView={setViewing}
      />

      {/* Create/Edit Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 border-b px-8 py-5 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editing ? "Edit Property" : "Add New Property"}
              </h2>
              <button
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                className="text-3xl text-gray-500 hover:text-black"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Property Type *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    required
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    required
                  >
                    {citiesList.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={customCityInput}
                      onChange={(e) => setCustomCityInput(e.target.value)}
                      placeholder="Add custom city (e.g. Koramangala)"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        const rawName = String(customCityInput || "").trim();
                        if (!rawName) return alert("Enter a city name");

                        const name = toTitleCase(rawName);
                        const existing = (citiesList || []).find(
                          (city) => String(city).trim().toLowerCase() === name.toLowerCase()
                        );
                        const selectedCity = existing || name;

                        setCitiesList((prev) => mergeUniqueCities(cities, prev, [selectedCity]));
                        setFormData((prev) => ({ ...prev, city: selectedCity }));
                        setCustomCityInput("");

                        // If communities API exists in this environment, trigger non-blocking refresh.
                        try {
                          window.dispatchEvent(new Event("admin:communities:changed"));
                        } catch (e) {
                          // ignore
                        }
                      }}
                      className="px-4 py-2.5 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Price (₹) *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Apartment Types (BHK) *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {bhkPresets.map((preset) => {
                      const active = normalizeBhkValues(formData.bhk).includes(preset);
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => toggleBhk(preset)}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${active ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"}`}
                        >
                          {preset}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      value={customBhk}
                      onChange={(e) => setCustomBhk(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCustomBhk();
                        }
                      }}
                      placeholder="Add custom type, e.g. 2.5 BHK or Duplex"
                      className="flex-1 w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    />
                    <button
                      type="button"
                      onClick={addCustomBhk}
                      className="px-4 py-2.5 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700"
                    >
                      Add
                    </button>
                  </div>

                  {normalizeBhkValues(formData.bhk).length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {normalizeBhkValues(formData.bhk).map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => toggleBhk(value)}
                          className="px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-semibold hover:bg-sky-100"
                        >
                          {value} ×
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Total Area *
                    </label>
                    <input
                      type="number"
                      name="sqft"
                      value={formData.sqft}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Carpet Area
                    </label>
                    <input
                      type="number"
                      name="carpetArea"
                      value={formData.carpetArea}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Super Built-up Area
                    </label>
                    <input
                      type="number"
                      name="superBuiltUpArea"
                      value={formData.superBuiltUpArea}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    />
                  </div>
                </div>
              </div>

              {/* Landmarks */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <label className="block text-sm font-bold text-blue-900 mb-4">
                  Add Nearby Landmarks
                </label>
                <div className="space-y-3">
                  {formData.landmarks?.map((landmark, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Landmark name"
                        value={landmark.name || ""}
                        onChange={(e) => {
                          const newLandmarks = [...formData.landmarks];
                          newLandmarks[idx].name = e.target.value;
                          setFormData((prev) => ({ ...prev, landmarks: newLandmarks }));
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                      />
                      <input
                        type="text"
                        placeholder="Distance (e.g., 500m)"
                        value={landmark.distance || ""}
                        onChange={(e) => {
                          const newLandmarks = [...formData.landmarks];
                          newLandmarks[idx].distance = e.target.value;
                          setFormData((prev) => ({ ...prev, landmarks: newLandmarks }));
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newLandmarks = formData.landmarks.filter((_, i) => i !== idx);
                          setFormData((prev) => ({ ...prev, landmarks: newLandmarks }));
                        }}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        landmarks: [...(prev.landmarks || []), { name: "", distance: "" }],
                      }));
                    }}
                    className="w-full py-2.5 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
                  >
                    + Add Landmark
                  </button>
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Images Upload
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                  <UploadBox label="Main Image" name="image" required />
                  <UploadBox label="Extra Image 1" name="image1" />
                  <UploadBox label="Extra Image 2" name="image2" />
                  <UploadBox label="Extra Image 3" name="image3" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    resetForm();
                  }}
                  className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-60"
                >
                  {loading
                    ? "Saving..."
                    : editing
                    ? "Update Property"
                    : "Save Property"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Property?</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this property? This action cannot be undone.</p>
            
            {deleteError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {deleteError}
              </div>
            )}
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setConfirmOpen(false);
                  setDeleteId(null);
                  setDeleteError(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAction}
                disabled={loading}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-60"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal (improved layout) */}
      {viewing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-6xl w-full max-h-[92vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-black"
              onClick={() => setViewing(null)}
            >
              ×
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Gallery */}
              <div>
                <div className="relative w-full h-72 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  {viewingImages[0] ? (
                    <img src={viewingImages[0]} alt={viewing.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                  )}
                </div>

                {viewingImages.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {viewingImages.slice(0, 4).map((img, i) => (
                      <div key={i} className="h-20 rounded-lg overflow-hidden border border-gray-200">
                        <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Details */}
              <div>
                <h2 className="text-2xl font-bold">{viewing.title}</h2>
                <div className="text-sm text-gray-500 mt-1">
                  {viewing.status} • {formatBhkValue(viewing.bhk) || "BHK N/A"} • {viewing.city} • {viewing.location}
                </div>

                <div className="mt-4">
                  <div className="text-xs text-gray-500">Price</div>
                  <div className="text-3xl font-bold text-green-700 mt-1">
                    {viewing.priceText ? (
                      viewing.priceText
                    ) : (viewing.price != null && typeof viewing.price === 'number' && Number.isFinite(viewing.price)) ? (
                      `₹ ${viewing.price.toLocaleString('en-IN')}`
                    ) : (
                      viewing.price || "Price on request"
                    )}
                  </div>
                </div>

                {viewing.description && (
                  <p className="mt-4 text-gray-700">{viewing.description}</p>
                )}

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-gray-50 border flex items-center justify-between">
                    <span className="text-sm text-gray-600">Carpet Area</span>
                    <span className="font-bold text-gray-900">{viewing.carpetArea || (viewing.sqft ? Math.round(parseInt(String(viewing.sqft).replace(/,/g, '')) * 0.7) : '—')} sqft</span>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 border flex items-center justify-between">
                    <span className="text-sm text-gray-600">Super Built-up</span>
                    <span className="font-bold text-gray-900">{viewing.superBuiltUpArea || (viewing.sqft || '—')} sqft</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link href="/explore/contact" className="flex-1">
                    <button className="w-full px-4 py-3 rounded-full border border-gray-300 text-sm font-bold hover:bg-gray-50 transition-colors">
                      Contact
                    </button>
                  </Link>
                  <Link href="/explore/contact" className="flex-1">
                    <button
                      className="w-full px-4 py-3 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors"
                    >
                      Request a tour
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
