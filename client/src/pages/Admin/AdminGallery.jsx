import { useRef, useState, useEffect } from "react";

import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Image as ImageIcon,
  Upload,
} from "lucide-react";

import {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} from "../../services/GalleryService";

const AdminGallery = () => {
  const fileInputRef = useRef(null);

  // ============================================================
  // STATES
  // ============================================================

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingImage, setEditingImage] = useState(null);

  const [deleteImage, setDeleteImage] = useState(null);

  const [gallery, setGallery] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    section: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [preview, setPreview] = useState("");

  // ============================================================
  // FETCH GALLERY
  // ============================================================

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const response = await getGallery();

      setGallery(response.gallery || []);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);

      console.error(
        "Server response:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SEARCH
  // ============================================================

  const filteredGallery = gallery.filter((item) => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return true;
    }

    return (
      item.title?.toLowerCase().includes(value) ||
      item.section?.toLowerCase().includes(value)
    );
  });

  // ============================================================
  // RESET FORM
  // ============================================================

  const resetForm = () => {
    setFormData({
      title: "",
      section: "",
      image: null,
    });

    setPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ============================================================
  // ADD IMAGE
  // ============================================================

  const handleAdd = () => {
    setEditingImage(null);

    resetForm();

    setShowForm(true);
  };

  // ============================================================
  // EDIT IMAGE
  // ============================================================

  const handleEdit = (item) => {
    setEditingImage(item);

    setFormData({
      title: item.title || "",
      section: item.section || "",
      image: null,
    });

    // Show current image
    setPreview(item.image || "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setShowForm(true);
  };

  // ============================================================
  // TEXT INPUT CHANGE
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // IMAGE CHANGE
  // ============================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    // Create preview for newly selected image
    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);
  };

  // ============================================================
  // SAVE / UPDATE GALLERY
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // ========================================================
      // ADD
      // ========================================================

      if (!editingImage) {
        // Validate image for new gallery
        if (!formData.image) {
          alert("Please select an image.");

          setSaving(false);

          return;
        }

        const data = new FormData();

        data.append("title", formData.title);

        data.append("section", formData.section);

        data.append("image", formData.image);

        await createGallery(data);
      }

      // ========================================================
      // EDIT
      // ========================================================

      else {
        const data = new FormData();

        /*
          IMPORTANT:

          We send title and section.
          If the image is not changed, we DO NOT append image.

          Therefore:

          Title only
          -> title changes
          -> section remains same
          -> image remains same

          Section only
          -> section changes
          -> title remains same
          -> image remains same

          Image only
          -> image changes
          -> title remains same
          -> section remains same

          All
          -> all three change
        */

        data.append("title", formData.title);

        data.append("section", formData.section);

        // Only send image if user selected a new one
        if (formData.image instanceof File) {
          data.append("image", formData.image);
        }

        await updateGallery(
          editingImage._id,
          data
        );
      }

      // ========================================================
      // REFRESH GALLERY
      // ========================================================

      await fetchGallery();

      // ========================================================
      // CLOSE FORM
      // ========================================================

      closeForm();
    } catch (error) {
      console.error("Gallery save error:", error);

      console.error(
        "Server response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Failed to save gallery image."
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // DELETE IMAGE
  // ============================================================

  const handleDelete = async () => {
    if (!deleteImage?._id) {
      return;
    }

    try {
      setSaving(true);

      await deleteGallery(deleteImage._id);

      setDeleteImage(null);

      await fetchGallery();
    } catch (error) {
      console.error("Delete gallery error:", error);

      console.error(
        "Server response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete gallery image."
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // CLOSE FORM
  // ============================================================

  const closeForm = () => {
    setShowForm(false);

    setEditingImage(null);

    resetForm();
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-full space-y-6 bg-white">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-black">
            Gallery
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage images displayed on the website.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex w-full items-center justify-center gap-2 rounded-[5px] bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
        >
          <Plus size={18} />

          Add Image
        </button>
      </div>

      {/* ========================================================
          SEARCH
      ======================================================== */}

      <div className="rounded-[5px] border border-gray-200 bg-white p-4">

        <div className="relative w-full sm:max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by title or section..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-[5px] border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-black outline-none transition focus:border-black"
          />

        </div>
      </div>

      {/* ========================================================
          GALLERY
      ======================================================== */}

      {loading ? (
        <div className="rounded-[5px] border border-gray-200 py-14 text-center">
          <p className="text-sm text-gray-500">
            Loading gallery...
          </p>
        </div>
      ) : filteredGallery.length > 0 ? (

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filteredGallery.map((item) => (

            <div
              key={item._id}
              className="overflow-hidden rounded-[5px] border border-gray-200 bg-white"
            >

              {/* ==================================================
                  IMAGE
              ================================================== */}

              <div className="h-48 overflow-hidden bg-gray-100">

                {item.image ? (

                  <img
                    src={item.image}
                    alt={item.title || "Gallery image"}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />

                ) : (

                  <div className="flex h-full items-center justify-center text-gray-400">
                    <ImageIcon size={32} />
                  </div>

                )}

              </div>

              {/* ==================================================
                  DETAILS
              ================================================== */}

              <div className="p-5">

                <h2 className="font-semibold text-black">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Section:{" "}
                  <span className="font-medium text-gray-700">
                    {item.section}
                  </span>
                </p>

                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="mt-5 flex justify-end gap-2 border-t border-gray-100 pt-4">

                  {/* EDIT */}

                  <button
                    onClick={() =>
                      handleEdit(item)
                    }
                    className="rounded-[5px] p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                    title="Edit"
                  >
                    <Edit size={17} />
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      setDeleteImage(item)
                    }
                    className="rounded-[5px] p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      ) : (

        /* ========================================================
           EMPTY
        ======================================================== */

        <div className="rounded-[5px] border border-gray-200 py-14 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[5px] bg-gray-100 text-gray-500">
            <ImageIcon size={22} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-black">
            No gallery images found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Try searching with another title or section.
          </p>

        </div>

      )}

      {/* ========================================================
          ADD / EDIT MODAL
      ======================================================== */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-6">

          <div className="my-auto w-full max-w-lg rounded-[5px] bg-white">

            {/* ==================================================
                MODAL HEADER
            ================================================== */}

            <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4 sm:px-6">

              <div>

                <h2 className="text-lg font-semibold text-black">
                  {editingImage
                    ? "Edit Image"
                    : "Add Image"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editingImage
                    ? "Update the gallery image."
                    : "Add a new image to the gallery."}
                </p>

              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-[5px] p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <X size={20} />
              </button>

            </div>

            {/* ==================================================
                FORM
            ================================================== */}

            <form onSubmit={handleSubmit}>

              <div className="space-y-5 p-5 sm:p-6">

                {/* =================================================
                    TITLE
                ================================================= */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Fast Delivery"
                    required
                    className="w-full rounded-[5px] border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-black"
                  />

                </div>

                {/* =================================================
                    SECTION
                ================================================= */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Section
                  </label>

                  <input
                    type="text"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    placeholder="Home"
                    required
                    className="w-full rounded-[5px] border border-gray-200 px-4 py-2.5 text-sm text-black outline-none transition focus:border-black"
                  />

                </div>

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Image
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <div
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="cursor-pointer rounded-[5px] border border-dashed border-gray-300 p-5 text-center transition hover:border-black hover:bg-gray-50"
                  >

                    {preview ? (

                      <>
                        <img
                          src={preview}
                          alt="Preview"
                          className="h-40 w-full rounded-[5px] object-cover"
                        />

                        <p className="mt-3 text-sm font-medium text-black">
                          Click to change image
                        </p>
                      </>

                    ) : (

                      <>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[5px] bg-gray-100 text-gray-500">
                          <Upload size={22} />
                        </div>

                        <p className="mt-3 text-sm font-medium text-black">
                          Choose an image
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          PNG, JPG, JPEG or WEBP
                        </p>
                      </>

                    )}

                  </div>

                  {/* EDIT MESSAGE */}

                  {editingImage && (
                    <p className="mt-2 text-xs text-gray-500">
                      Leave the image unchanged if you
                      don't want to replace it.
                    </p>
                  )}

                </div>

              </div>

              {/* ==================================================
                  FOOTER
              ================================================== */}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

                <button
                  type="button"
                  onClick={closeForm}
                  className="w-full rounded-[5px] border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-[5px] bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {saving
                    ? "Saving..."
                    : editingImage
                    ? "Update Image"
                    : "Add Image"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ========================================================
          DELETE MODAL
      ======================================================== */}

      {deleteImage && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-sm rounded-[5px] bg-white p-5 sm:p-6">

            <div className="flex items-start justify-between">

              <div>

                <h3 className="text-lg font-semibold text-black">
                  Delete Image?
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  This action cannot be undone.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setDeleteImage(null)
                }
                className="rounded-[5px] p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <X size={20} />
              </button>

            </div>

            {/* ==================================================
                SELECTED IMAGE
            ================================================== */}

            <div className="mt-5 overflow-hidden rounded-[5px] border border-gray-200">

              {deleteImage.image && (
                <img
                  src={deleteImage.image}
                  alt={deleteImage.title}
                  className="h-32 w-full object-cover"
                />
              )}

              <div className="bg-gray-50 p-4">

                <p className="font-semibold text-black">
                  {deleteImage.title}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Section: {deleteImage.section}
                </p>

              </div>

            </div>

            {/* ==================================================
                ACTIONS
            ================================================== */}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  setDeleteImage(null)
                }
                className="w-full rounded-[5px] border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="w-full rounded-[5px] bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {saving
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminGallery;