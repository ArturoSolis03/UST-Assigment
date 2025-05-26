
import { useForm } from 'react-hook-form';
import { projectAPI } from '../api/projectAPI';
 
export default function CreateProjectPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
 
  const onSubmit = async (data: any) => {
    await projectAPI.create(data);
    alert("Project Created");
    reset();
  };
 
  return (
<form onSubmit={handleSubmit(onSubmit)}>
<h2>Create Project</h2>
 
      <div>
<label>Project name:</label>
<input {...register('name', { required: true, maxLength: 100 })} />
        {errors.name && <span> Project name </span>}
</div>
 
      <div>
<label>Project description:</label>
<textarea {...register('description', { required: true, maxLength: 2000 })} />
        {errors.description && <span> Project description </span>}
</div>
 
      <div>
<label>Project budget:</label>
<input type="number" {...register('budget', { required: true, min: 1 })} />
        {errors.budget && <span> Project budget </span>}
</div>
 
      <div>
<label>
<input type="checkbox" {...register('isActive')} />
          Active?
</label>
</div>
 
      <button type="submit">Create</button>
</form>
  );
}



