"use client";
import { useEffect, useState, useRef } from "react";
import AdminTable from "@/components/admin/AdminTable";
import api from "@/utils/api";

export default function AdminProperties() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [loading, setLoading] = useState(false);

  const objectUrlsRef = useRef([]);

  const [formData, setFormData] = useState({
    status: "buy",
    title: "",
    city: "Delhi",
    location: "",
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    description: "",
  });

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

  const cities = ["Delhi", "Gurgaon", "Dehradun"];

  const columns = [
    { key: "title", label: "Title" },
    { key: "status", label: "Type" },
    { key: "city", label: "City" },
    { key: "location", label: "Location" },
    { key: "price", label: "Price" },
    { key: "beds", label: "Beds" },
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

      if (Array.isArray(data)) setItems(data);
      else if (data?.items) setItems(data.items);
      else setItems([]);
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

  const resetForm = () => {
    cleanupPreviews();

    setFormData({
      status: "buy",
      title: "",
      city: "Delhi",
      location: "",
      price: "",
      beds: "",
      baths: "",
      sqft: "",
      description: "",
    });

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

    setFormData({
      status: item.status || "buy",
      title: item.title || "",
      city: item.city || "Delhi",
      location: item.location || "",
      price: item.price || "",
      beds: item.beds || "",
      baths: item.baths || "",
      sqft: item.sqft || "",
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

    setEditing(item);
    setOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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

    const payload = {
      ...formData,
      ...uploadedUrls, // attach urls
    };

    try {
      setLoading(true);

      if (editing) {
        await api.put(`/properties/${editing._id}`, payload);
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

  const handleDelete = async (ids) => {
    if (!window.confirm(`Delete ${ids.length} properties?`)) return;

    try {
      setLoading(true);
      await Promise.all(ids.map((id) => api.delete(`/properties/${id}`)));
      load();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
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
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
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

                <div className="md:col-span-2 grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Bedrooms *
                    </label>
                    <input
                      type="number"
                      name="beds"
                      value={formData.beds}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Bathrooms *
                    </label>
                    <input
                      type="number"
                      name="baths"
                      value={formData.baths}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Area (sqft) *
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

      {/* View Modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-6 right-6 text-3xl text-gray-600 hover:text-black"
              onClick={() => setViewing(null)}
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-3">{viewing.title}</h2>
            <p className="text-gray-600 mb-4 uppercase font-medium">
              {viewing.status} • {viewing.city} • {viewing.location}
            </p>

            <p className="text-4xl font-bold text-green-700 mb-8">
              ₹ {Number(viewing.price)?.toLocaleString() || viewing.price}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[viewing.image, viewing.image1, viewing.image2, viewing.image3]
                .filter(Boolean)
                .map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Property image ${i + 1}`}
                    className="w-full h-48 object-cover rounded-xl shadow-md"
                  />
                ))}
            </div>

            <p className="text-gray-800 whitespace-pre-line leading-relaxed">
              {viewing.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
