
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface AddVolumeProps {
  selectedLocation: string;
  onClose: () => void;
  onError: () => void; // Add onError prop
}

export default function AddVolume({ selectedLocation, onClose, onError }: AddVolumeProps) {
  const formik = useFormik({
    initialValues: {
      name: '',
      size: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z]+$/, 'Name should not contain numbers')
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
      size: Yup.number()
        .typeError('Size must be a number')
        .required('Size is required'),
    }),
    onSubmit: async (values) => {
      const body = {
        block_size: 4096,
        location: selectedLocation === 'Any' ? '' : selectedLocation,
        name: values.name,
        size: values.size + "GiB",
        type: "persistent-ssd"
      };

      try {
        const response = await fetch('https://api.mkinf.io/v0/disks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
          },
          body: JSON.stringify(body),
        });

        const errorData = await response.json();
        if (errorData.message === "invalid request. size and location not provided") {
          onError(); // Trigger the error feedback
          onClose(); // Close the modal
        } else if (response.ok) {
          console.log('Disk created successfully');
          onClose();
        } else {
          console.error('Failed to create disk');
        }
      } catch (error) {
        console.error('Failed to create disk:', error);
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add Network Volume</h2>
        <form onSubmit={formik.handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              className="border p-2 w-full"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
          </label>
          <label className="block mb-4">
            Size:
            <input
              type="text"
              className="border p-2 w-full"
              name="size"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.size}
            />
            {formik.touched.size && formik.errors.size ? (
              <div className="text-red-500">{formik.errors.size}</div>
            ) : null}
          </label>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded"
              style={{ background: 'linear-gradient(to left, rgb(181, 44, 246), rgb(74, 145, 247))' }}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
