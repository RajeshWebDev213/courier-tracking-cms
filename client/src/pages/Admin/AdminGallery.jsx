import { useRef, useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Image as ImageIcon,
  Upload,
} from "lucide-react";

const AdminGallery = () => {
  const fileInputRef = useRef(null);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [deleteImage, setDeleteImage] = useState(null);

  const [gallery, setGallery] = useState([
    {
      id: 1,
      title: "Fast Delivery",
      section: "Home",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    },
    {
      id: 2,
      title: "Courier Service",
      section: "Services",
      image:
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088",
    },
    {
      id: 3,
      title: "Package Delivery",
      section: "About",
      image:
        "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    section: "",
    image: "",
  });

  // =========================
  // SEARCH
  // =========================
  const filteredGallery = gallery.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(value) ||
      item.section.toLowerCase().includes(value)
    );
  });

  // =========================
  // ADD
  // =========================
  const handleAdd = () => {
    setEditingImage(null);

    setFormData({
      title: "",
      section: "",
      image: "",
    });

    setShowForm(true);
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (item) => {
    setEditingImage(item);

    setFormData({
      title: item.title,
      section: item.section,
      image: item.image,
    });

    setShowForm(true);
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // CHOOSE IMAGE
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imagePreview = URL.createObjectURL(file);

    setFormData({
      ...formData,
      image: imagePreview,
    });
  };

  // =========================
  // SAVE UI DATA
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingImage) {
      setGallery((prev) =>
        prev.map((item) =>
          item.id === editingImage.id
            ? {
                ...item,
                title: formData.title,
                section: formData.section,
                image: formData.image,
              }
            : item
        )
      );
    } else {
      setGallery((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: formData.title,
          section: formData.section,
          image: formData.image,
        },
      ]);
    }

    closeForm();
  };

  // =========================
  // DELETE UI DATA
  // =========================
  const handleDelete = () => {
    setGallery((prev) =>
      prev.filter((item) => item.id !== deleteImage.id)
    );

    setDeleteImage(null);
  };

  // =========================
  // CLOSE FORM
  // =========================
  const closeForm = () => {
    setShowForm(false);
    setEditingImage(null);

    setFormData({
      title: "",
      section: "",
      image: "",
    });
  };

  return (
    <div className="min-h-full space-y-6 bg-white">

      {/* ================= HEADER ================= */}
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

      {/* ================= SEARCH ================= */}
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
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[5px] border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-black outline-none transition focus:border-black"
          />
        </div>
      </div>

      {/* ================= GALLERY ================= */}
      {filteredGallery.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[5px] border border-gray-200 bg-white"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden bg-gray-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    <ImageIcon size={32} />
                  </div>
                )}
              </div>

              {/* Details */}
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

                {/* Actions */}
                <div className="mt-5 flex justify-end gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="rounded-[5px] p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                    title="Edit"
                  >
                    <Edit size={17} />
                  </button>

                  <button
                    onClick={() => setDeleteImage(item)}
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
        /* ================= EMPTY ================= */
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

      {/* ================= ADD / EDIT MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-6">
          <div className="my-auto w-full max-w-lg rounded-[5px] bg-white">

            {/* Modal Header */}
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
                onClick={closeForm}
                className="rounded-[5px] p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-5 p-5 sm:p-6">

                {/* Title */}
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

                {/* Section */}
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

                {/* Choose Image */}
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
                    {formData.image ? (
                      <>
                        <img
                          src={formData.image}
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
                </div>
              </div>

              {/* Footer */}
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
                  className="w-full rounded-[5px] bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
                >
                  {editingImage
                    ? "Update Image"
                    : "Add Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
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
                onClick={() => setDeleteImage(null)}
                className="rounded-[5px] p-1 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            {/* Selected Image */}
            <div className="mt-5 overflow-hidden rounded-[5px] border border-gray-200">
              <img
                src={deleteImage.image}
                alt={deleteImage.title}
                className="h-32 w-full object-cover"
              />

              <div className="bg-gray-50 p-4">
                <p className="font-semibold text-black">
                  {deleteImage.title}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Section: {deleteImage.section}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setDeleteImage(null)}
                className="w-full rounded-[5px] border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="w-full rounded-[5px] bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 sm:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;