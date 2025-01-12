import axios from "axios";
import { FC, useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";

interface lCompanyProps {
  _id: string;
  name: string;
  website: string;
  image: string;
  desc: string;
}

const AllCompany = () => {
  const [companies, setCompanies] = useState<lCompanyProps[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<lCompanyProps | null>(
    null
  );

  const fetchAllCompanies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/get-all-companies"
      );
      setCompanies(response.data.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleEdit = (company: lCompanyProps) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/delete-company/${id}`);
      setCompanies((prev) => prev?.filter((comp) => comp._id !== id));
    } catch (err) {
      console.error("Error deleting company:", err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  return (
    <div className="pt-12">
      <div className="flex items-center gap-4 flex-wrap">
        {companies?.map((item) => (
          <div key={item._id}>
            <CompanyCard
              company={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>

      {isModalOpen && selectedCompany && (
        <EditModal
          company={selectedCompany}
          onClose={handleCloseModal}
          onSave={async (updatedCompany) => {
            try {
              const response = await axios.put(
                `http://localhost:3000/api/update-company/${updatedCompany._id}`,
                updatedCompany
              );
              setCompanies((prev) =>
                prev?.map((comp) =>
                  comp._id === updatedCompany._id ? response.data.data : comp
                )
              );
              handleCloseModal();
            } catch (err) {
              console.error("Error updating company:", err);
            }
          }}
        />
      )}
    </div>
  );
};

interface lCompanyCardProps {
  company: lCompanyProps;
  onEdit: (company: lCompanyProps) => void;
  onDelete: (id: string) => void;
}

const CompanyCard: FC<lCompanyCardProps> = ({ company, onEdit, onDelete }) => {
  return (
    <div className="border p-4 w-[320px] rounded flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-10 overflow-hidden rounded-full border">
          <img src={company.image} alt="company" className="w-full" />
        </div>
        <div>
          <h2 className="font-medium text-base">{company.name}</h2>
          <a href={company.website} className="text-xs text-primaryNew">{company.website}</a>
        </div>
      </div>
      <div>
        <p className="text-gray-600 text-xs">
          {company.desc.substring(0, 250)}.....
        </p>
      </div>
      <div className="flex justify-end gap-4">
        <button onClick={() => onEdit(company)}>
          <TbEdit />
        </button>
        <button onClick={() => onDelete(company._id)}>
          <TbTrash />
        </button>
      </div>
    </div>
  );
};

interface EditModalProps {
  company: lCompanyProps;
  onClose: () => void;
  onSave: (updatedCompany: lCompanyProps) => Promise<void>;
}

const EditModal: FC<EditModalProps> = ({ company, onClose, onSave }) => {
  const [formData, setFormData] = useState(company);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-[600px]">
        <h2 className="text-xl font-semibold mb-4">Edit company</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Company Name"
          />
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Website"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Image URL"
          />
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="border p-2 rounded h-[200px]"
            placeholder="Description"
          />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllCompany;
