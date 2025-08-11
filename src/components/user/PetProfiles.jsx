import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaPlus, FaArrowRight, FaCalendarAlt, FaWeight, FaBirthdayCake, FaVenus, FaMars } from 'react-icons/fa';
import { PetIcon } from '../layout/PetIcons';
import { useAuth } from '../../context/AuthContext';

const PetProfiles = () => {
  const { currentUser } = useAuth();
  const accessToken = currentUser?.tokens?.access?.token;
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    setError('');
    (async () => {
      try {
        const res = await fetch('/api/v1/user/profile', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.message || 'Failed to load pets');
        const mapped = (data?.pets || []).map((p) => ({
          id: Number(p.pet_id),
          name: p.pet_name || 'Pet',
          type: (p.pet_type || '').toLowerCase(),
          breed: p.pet_breed || '',
          age: '3 years',
          weight: '20 lbs',
          gender: 'female',
          birthday: new Date().toISOString().slice(0, 10),
          imagePath: p.pet_image || '',
          image: 'https://placehold.co/600x400?text=Pet',
          lastCheckup: new Date().toISOString().slice(0, 10),
          vaccinations: 'Unknown',
        }));
        // resolve signed URLs for private images
        const withUrls = await Promise.all(
          mapped.map(async (pet) => {
            if (!pet.imagePath) return pet;
            try {
              const qs = new URLSearchParams({ bucket: 'pets-photos', path: pet.imagePath }).toString();
              const urlRes = await fetch(`/api/v1/media/signed-url?${qs}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
              });
              const urlPayload = await urlRes.json().catch(() => ({}));
              if (urlRes.ok && urlPayload?.url) return { ...pet, image: urlPayload.url };
            } catch {}
            return pet;
          })
        );
        setPets(withUrls);
      } catch (e) {
        setError(e.message || 'Failed to load pets');
        setPets([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [accessToken]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-pink-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaPaw className="text-pink-600" />
          My Pets
        </h2>
        <div className="flex gap-2">
          <Link 
            to="/user/pets/add"
            className="text-sm font-medium text-pink-600 hover:text-pink-700 flex items-center gap-1 px-3 py-1 bg-pink-50 rounded-full"
          >
            <FaPlus size={12} /> Add Pet
          </Link>
          <Link 
            to="/user/pets"
            className="text-sm font-medium text-pink-600 hover:text-pink-700 flex items-center gap-1"
          >
            View All <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pets.map((pet) => (
          <div 
            key={pet.id}
            className="border border-pink-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={pet.image} 
                alt={pet.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{pet.name}</h3>
                  <p className="text-sm text-gray-600">{pet.breed}</p>
                </div>
                <div className={`rounded-full p-2 ${pet.type === 'cat' ? 'bg-purple-100' : 'bg-pink-100'}`}>
                  <PetIcon type={pet.type} className={pet.type === 'cat' ? 'text-purple-600' : 'text-pink-600'} />
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaBirthdayCake className="text-pink-500" />
                  <span>{pet.age}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaWeight className="text-pink-500" />
                  <span>{pet.weight}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {pet.gender === 'male' ? (
                    <FaMars className="text-blue-500" />
                  ) : (
                    <FaVenus className="text-pink-500" />
                  )}
                  <span>{pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCalendarAlt className="text-pink-500" />
                  <span>Last checkup: {new Date(pet.lastCheckup).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Link 
                  to={`/user/pets/${pet.id}`}
                  className="text-sm font-medium px-3 py-1 bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 transition-colors"
                >
                  View Profile
                </Link>
                <Link 
                  to={`/user/appointments/new?petId=${pet.id}`}
                  className="text-sm font-medium px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add Pet Card */}
        <Link 
          to="/user/pets/add"
          className="border border-dashed border-pink-300 rounded-lg flex flex-col items-center justify-center p-6 hover:bg-pink-50 transition-colors h-full"
        >
          <div className="bg-pink-100 rounded-full p-4 mb-4">
            <FaPlus className="text-pink-600 text-xl" />
          </div>
          <h3 className="font-semibold text-gray-800 text-lg">Add a New Pet</h3>
          <p className="text-sm text-gray-600 text-center mt-2">
            Add your pet's profile to manage their health records and appointments
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PetProfiles;