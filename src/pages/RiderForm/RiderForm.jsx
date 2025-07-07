import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

import UseAuth from '../../hooks/UseAuth';

import riderImg from '../../assets/agent-pending.png'
import useAxiosSecure from '../../hooks/UseAxiosSecure';

const RiderForm = () => {
  /* ---------- hooks ---------- */
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const serviceCenters = useLoaderData() || [];

  /* ---------- region / district ---------- */
  const [selectedRegion, setSelectedRegion] = useState('');
  const regions = [...new Set(serviceCenters.map((c) => c.region))];
  const districts = serviceCenters
    .filter((c) => c.region === selectedRegion)
    .map((c) => c.district);

  /* ---------- react‑hook‑form ---------- */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* ---------- submit ---------- */
  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      name: user?.displayName || '',
      email: user?.email || '',
      status: 'pending',
      created_at: new Date().toISOString(),
    };
  //  console.log(riderData)
    try {
      const res = await axiosSecure.post('/riders', riderData);
      if (res.data.insertedId) {
        await Swal.fire({
          icon: 'success',
          title: 'Application Submitted!',
          text: 'Your application is pending approval.',
          confirmButtonColor: '#84cc16',
        });
        reset();
        navigate('/dashboard'); // redirect if desired
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Submit failed',
        text: err.response?.data?.message || err.message,
      });
    }
  };

  /* ---------- UI ---------- */
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-10 p-10">
        {/* -------- Left: Form -------- */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl font-bold text-green-900 mb-1">Be a Rider</h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Enjoy fast, reliable parcel delivery with real‑time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          {/* section subtitle */}
          <h3 className="font-semibold text-base text-gray-800 mb-4">
            Tell us about yourself
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ---------- GRID ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name (readonly) */}
              <input
                value={user?.displayName || ''}
                readOnly
                className="input input-bordered bg-gray-100 w-full"
              />

              {/* Age */}
              <div className="flex flex-col">
                <input
                  type="number"
                  placeholder="Your age"
                  {...register('age', { required: true, min: 18 })}
                  className="input input-bordered w-full"
                />
                {errors.age && (
                  <span className="text-xs text-red-600 mt-1">18 or above</span>
                )}
              </div>

              {/* Email (readonly) */}
              <input
                value={user?.email || ''}
                readOnly
                className="input input-bordered bg-gray-100 w-full"
              />

              {/* Region */}
              <select
                {...register('region', { required: true })}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select your region</option>
                {regions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>

              {/* NID */}
              <div className="flex flex-col">
                <input
                  placeholder="NID"
                  {...register('nid', { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.nid && (
                  <span className="text-xs text-red-600 mt-1">Required</span>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <input
                  placeholder="Contact"
                  {...register('phone', { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.phone && (
                  <span className="text-xs text-red-600 mt-1">Required</span>
                )}
              </div>

              {/* District */}
              <select
                {...register('district', { required: true })}
                disabled={!selectedRegion}
                className="select select-bordered w-full"
              >
                <option value="">
                  {selectedRegion ? 'Select district' : 'Select region first'}
                </option>
                {districts.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              {/* Warehouse (optional) */}
              <select
                {...register('warehouse')}
                className="select select-bordered w-full"
              >
                <option value="">Which warehouse you want to work?</option>
                {serviceCenters
                  .filter((s) => s.region === selectedRegion)
                  .map((s) => (
                    <option key={s.district}>{s.district}</option>
                  ))}
              </select>

              {/* Bike brand */}
              <input
                placeholder="Bike brand, e.g. Honda"
                {...register('bike_brand', { required: true })}
                className="input input-bordered w-full md:col-span-2"
              />

              {/* Bike reg */}
              <input
                placeholder="Bike registration no."
                {...register('bike_registration', { required: true })}
                className="input input-bordered w-full md:col-span-2"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>

        {/* -------- Right: Illustration -------- */}
        <div className="flex-1 hidden md:block">
          <img src={riderImg} alt="Rider Illustration" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default RiderForm;
