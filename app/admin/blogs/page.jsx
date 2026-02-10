"use client";
import { useEffect, useState, useRef } from "react";
import AdminTable from "@/components/admin/AdminTable";
import api from "@/utils/api";

export default function AdminBlogs() {
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
    title: "",
    author: "",
    excerpt: "",
    content: "",
  });

  const [files, setFiles] = useState({
    image: null,
    image1: null,
    image2: null,
    image3: null,
  });

  const [previews, setPreviews] = useState({
    image: null,
    image1: null,
    image2: null,
    image3: null,
  });

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

  const columns = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "excerpt", label: "Excerpt" },
  ];

  // Cleanup object URLs
  const cleanupPreviews = () => {
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
  };

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/blogs");

      let blogList = [];

      // Handle different possible response structures
      if (Array.isArray(data)) {
        blogList = data;
      } else if (data?.items) {
        blogList = data.items;
      } else if (data?.blogs) {           // ← This matches your actual response
        blogList = data.blogs;
      } else if (data?.data) {
        blogList = data.data;
      }

      // Transform _id to id for consistency
      blogList = blogList.map(blog => ({
        ...blog,
        id: blog._id || blog.id
      }));

      setItems(blogList || []);
    } catch (err) {
      console.error("blogs load fail", err);
      alert("Failed to load blogs");
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
      title: "",
      author: "",
      excerpt: "",
      content: "",
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
      title: item.title || "",
      author: item.author || "",
      excerpt: item.excerpt || "",
      content: item.content || "",
    });
    setFiles({
      image: null,
      image1: null,
      image2: null,
      image3: null,
    });
    setPreviews({
      image: item.image || null,
      image1: item.image1 || null,
      image2: item.image2 || null,
      image3: item.image3 || null,
    });
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

  const removeImage = (key) => {
    setFiles((prev) => ({ ...prev, [key]: null }));
    setPreviews((prev) => ({ ...prev, [key]: null }));
    setUploadedUrls((prev) => ({ ...prev, [key]: null }));
  };

  const handleFileChange = async (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFiles((prev) => ({ ...prev, [key]: file }));

    const previewUrl = URL.createObjectURL(file);
    objectUrlsRef.current.push(previewUrl);
    setPreviews((prev) => ({ ...prev, [key]: previewUrl }));

    try {
      setUploading((prev) => ({ ...prev, [key]: true }));
      const fd = new FormData();
      fd.append("image", file);
      fd.append("folder", "blogs");

      const { data } = await api.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!data?.url) throw new Error("Upload failed");
      setUploadedUrls((prev) => ({ ...prev, [key]: data.url }));
    } catch (err) {
      console.error("Upload Error:", err);
      alert(err.response?.data?.message || "Image upload failed");
      removeImage(key);
    } finally {
      setUploading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uploadedUrls.image) {
      return alert("Thumbnail Image is required!");
    }

    const payload = {
      ...formData,
      ...uploadedUrls,
    };

    try {
      setLoading(true);
      if (editing) {
        await api.put(`/blogs/${editing._id}`, payload);
      } else {
        await api.post("/blogs", payload);
      }
      setOpen(false);
      resetForm();
      load();
    } catch (err) {
      console.error("Save error:", err.response?.data || err);
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
      await api.delete(`/blogs/${deleteId}`);
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
              <p className="text-sm font-medium text-gray-700">Click to Upload</p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP allowed</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, name)}
              className="hidden"
            />
          </label>
        )}

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
          <h1 className="text-3xl font-bold">Blogs</h1>
          <p className="text-gray-600">Manage blog posts</p>
        </div>
        {loading && (
          <span className="text-sm text-blue-600 font-medium">Loading...</span>
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

      {/* Create / Edit Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 border-b px-8 py-5 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editing ? "Edit Blog" : "Add New Blog"}
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
                    Blog Title *
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
                    Author *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Blog Images
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                  <UploadBox label="Thumbnail (Main)" name="image" required />
                  <UploadBox label="Extra Image 1" name="image1" />
                  <UploadBox label="Extra Image 2" name="image2" />
                  <UploadBox label="Extra Image 3" name="image3" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Content (HTML allowed)
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                />
              </div>

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
                    ? "Update Blog"
                    : "Save Blog"}
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
            <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Blog?</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this blog? This action cannot be undone.</p>
            
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
            <p className="text-gray-600 mb-2">
              By <span className="font-medium">{viewing.author}</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-6">
              {[viewing.image, viewing.image1, viewing.image2, viewing.image3]
                .filter(Boolean)
                .map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Blog image ${i + 1}`}
                    className="w-full h-48 object-cover rounded-xl shadow-md"
                  />
                ))}
            </div>

            <div
              className="prose max-w-none text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: viewing.content || "" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}