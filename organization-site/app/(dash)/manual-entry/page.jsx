"use client"

import axiosInstance from '@/modules/axios';
import { useUserData } from '@/modules/hooks/useUserData';
import { useForm, Controller } from 'react-hook-form';
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation'
const VisitForm = () => {
    
    const { handleSubmit, control, reset } = useForm();
    const router = useRouter()
    const {
        data: user,
        isLoading: isUserLoading,
        isError: isUserError
    } = useUserData()


    const onSubmit = async (data) => {

        if (!isUserLoading) {
            const res = await axiosInstance.post('organization/scan-organization/', 
            
            { ...data, organization: user.id },
            {headers: {
                Authorization: `Bearer ${
                  typeof window !== 'undefined' ? localStorage?.getItem('access') : ''
                }`}});
            console.log(res.data)
            if (res.status === 200 || res.status === 201) {
                toast.success(`Manual Entry For ${data.full_name} Successfull`);
router.push("/dash");
                reset()

            }
        } else {
            toast.error("Something went wrong!")
        }
    };

    return (
        <div className="max-w-full mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="mb-4 text-2xl font-semibold">Organization Manual Visit Form</h1>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="full_name">
                            Full Name
                        </label>
                        <Controller
                            name="full_name"
                            control={control}
                            defaultValue=""
                            
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="full_name"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="mobile_number">
                            Mobile Number
                        </label>
                        <Controller
                            name="mobile_number"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="mobile_number"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="purpose">
                            Purpose
                        </label>
                        <Controller
                            name="purpose"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="purpose"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="visiting_from">
                            Visiting From
                        </label>
                        <Controller
                            name="visiting_from"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="visiting_from"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="have_vehicle">
                            Have Vehicle
                        </label>
                        <Controller
                            name="have_vehicle"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                                <div>
                                    <label className="inline-flex items-center">
                                        <input
                                            {...field}
                                            id="have_vehicle"
                                            type="radio"
                                            value="yes"
                                            className="form-radio"
                                        />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input
                                            {...field}
                                            id="have_vehicle"
                                            type="radio"
                                            value="no"
                                            className="form-radio"
                                        />
                                        <span className="ml-2">No</span>
                                    </label>
                                </div>
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="vehicle_number">
                            Vehicle Number
                        </label>
                        <Controller
                            name="vehicle_number"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="vehicle_number"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="is_with_team">
                            Is with Team
                        </label>
                        <Controller
                            name="is_with_team"
                            control={control}
                            defaultValue="no"
                            render={({ field }) => (
                                <div>
                                    <label className="inline-flex items-center">
                                        <input
                                            {...field}
                                            id="is_with_team"
                                            type="radio"
                                            value="yes"
                                            className="form-radio"
                                        />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input
                                            {...field}
                                            id="is_with_team"
                                            type="radio"
                                            value="no"
                                            className="form-radio"
                                        />
                                        <span className="ml-2">No</span>
                                    </label>
                                </div>
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="number_of_team">
                            Number of Team
                        </label>
                        <Controller
                            name="number_of_team"
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="number_of_team"
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <button type="submit" className="p-2 text-white rounded bg-epassblue hover:bg-blue-900">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VisitForm;