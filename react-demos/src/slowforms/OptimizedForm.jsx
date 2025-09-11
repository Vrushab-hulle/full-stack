import { useCallback } from "react";
import { useForm } from "react-hook-form";

const OptimizedForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = useCallback((data) => {
    console.log("Form submitted:", data);
  }, []);

  return (
    <div className="p-4 border rounded mb-6">
      <h2 className="font-bold mb-2">⚡ Optimized Form (React Hook Form)</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="mb-2">
            <input
              className="border p-2 w-full"
              placeholder={`Field ${i + 1}`}
              {...register(`field${i + 1}`)}
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OptimizedForm;
