
import { useForm } from 'react-hook-form';
import { projectAPI } from '../api/projectAPI';
import { useNavigate } from 'react-router-dom';

type FormValues ={
      name: string;
      description: string;
      budget: number;
      isActive : boolean;
}
 
export default function CreateProjectPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();
  const imageUrls = [
      "/assets/placeimg_500_300_arch1.jpg",
      "/assets/placeimg_500_300_arch2.jpg",
      "/assets/placeimg_500_300_arch3.jpg",
      "/assets/placeimg_500_300_arch4.jpg",
      "/assets/placeimg_500_300_arch5.jpg",
      "/assets/placeimg_500_300_arch6.jpg",
      "/assets/placeimg_500_300_arch7.jpg",
      "/assets/placeimg_500_300_arch8.jpg",
      "/assets/placeimg_500_300_arch9.jpg",
      "/assets/placeimg_500_300_arch10.jpg",
      "/assets/placeimg_500_300_arch11.jpg",
      "/assets/placeimg_500_300_arch12.jpg",
  ];

  

  const onSubmit = async (data: any) => {
     
      const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)]

      const newProject = {
            ...data,
            imageUrl: randomImage,
            createdAt: new Date().toISOString(),
      };

    await projectAPI.create(newProject);
    alert("Project Created");
    reset();
    navigate('/projects');
  };
 
  return (
<form onSubmit={handleSubmit(onSubmit)}>
<h2>Create Project</h2>
 
<div>
<label>Project name:</label>
<input {...register('name', { required: 'Name is required', 
      maxLength: 100,
      validate: (value) =>
      value.trim().length > 0 || 'Name must not be just spaces' })} />
        {errors.name && <p style={{color: 'red'}}>{errors.name.message}</p>}
</div>
 
      <div>
<label>Project description:</label>
<input {...register('description', { required: true, 
maxLength: 2000,
validate: (value) => 
value.trim().length > 0 || 'Description must not be just spaces' })} />
        {errors.description && <p style={{color: 'red'}}>{errors.description.message}</p>}
</div>
 
      <div>
<label>Project budget:</label>
<input type="number" {...register('budget', { required: true, min: 1 })} />
        {errors.budget && <span> Project budget required </span>}
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

  //this new project
}



