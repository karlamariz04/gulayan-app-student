import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import InputPriceField from '../../components/InputPriceField'

function ModalEditRecord({ isOpen, onClose, onSubmit, data }) {
  const [formData, setFormData] = useState(data)
  const plantVarieties = [
    "Vegetables",
    "Leafy Greens",
    "Root Crops",
    "Herbs",
    "Fruits",
    "Legumes",
    "Spices",
    "Mushrooms",
    "Ornamentals",
    "Medicinal Plants",
    "Vines",
    "Fruit Trees",
    "Other",
    "Unknown",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      name: '',
      variety: '',
      notes: '',
      date_planted: '',
      seedling_count: '',
      batch_name: '',
      starting_fund: '',
      supplier: ''
    })
  }
  const handleClose = () => {
    // Reset form when closing
    setFormData({
      name: '',
      variety: '',
      notes: '',
      date_planted: '',
      quantity: '',
      batch_name: '',
      starting_fund: '',
      supplier: ''
    })
    onClose()
  }

  useEffect( () => {
    setFormData(data);
  }, [data])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Edit Plant</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition"
            aria-label="Close modal"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Plant Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter plant name"
                value={formData?.name || ''}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Variety */}
            <div className="flex flex-col">
              <label htmlFor="variety" className="text-sm font-semibold text-gray-700 mb-2">
                Variety
              </label>
              <select
                id="variety"
                name="variety"
                value={formData?.variety || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="">Select variety</option>
                {plantVarieties.map((variety) => (
                  <option key={variety} value={variety}>
                    {variety}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch Name */}
            <div className="flex flex-col">
              <label htmlFor="batch_name" className="text-sm font-semibold text-gray-700 mb-2">
                Batch Name
              </label>
              <input
                type="text"
                id="batch_name"
                name="batch_name"
                placeholder="Enter batch name"
                value={formData?.batch_name || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Seedling Count */}
            <div className="flex flex-col">
              <label htmlFor="seedling_count" className="text-sm font-semibold text-gray-700 mb-2">
                Seedling Count
              </label>
              <input
                type="number"
                id="seedling_count"
                name="seedling_count"
                placeholder="Enter seedling count"
                value={formData?.seedling_count || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Seedling Source */}
            <div className="flex flex-col">
              <label htmlFor="seedling_source" className="text-sm font-semibold text-gray-700 mb-2">
                Seedling Source
              </label>
              <input
                type="text"
                id="seedling_source"
                name="seedling_source"
                placeholder="Enter seedling source"
                value={formData?.seedling_source || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Starting Fund */}
            <div className="flex flex-col">
              <label htmlFor="starting_fund" className="text-sm font-semibold text-gray-700 mb-2">
                Starting Fund
              </label>
              <InputPriceField
                id="starting_fund"
                name="starting_fund"
                placeholder="Enter starting fund"
                formData={formData || {}}
                setFormData={setFormData}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Date Planted */}
            <div className="flex flex-col">
              <label htmlFor="date_planted" className="text-sm font-semibold text-gray-700 mb-2">
                Date Planted
              </label>
              <input
                type="date"
                id="date_planted"
                name="date_planted"
                value={formData?.date_planted || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Notes - Full Width */}
          <div className="flex flex-col mb-6">
            <label htmlFor="notes" className="text-sm font-semibold text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Enter any additional notes"
              value={formData?.notes || ''}
              onChange={handleChange}
              rows={4}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 justify-end border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            >
              Update Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalEditRecord;
