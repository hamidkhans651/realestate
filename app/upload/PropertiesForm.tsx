"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// Zod validation schema
const imageUploadSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(1, "Price must be greater than 0"),
    location: z.string().min(1, "Location is required"),
    bedrooms: z.number().min(1, "Bedrooms must be at least 1"),
    bathrooms: z.number().min(1, "Bathrooms must be at least 1"),
    sqft: z.number().min(1, "Square footage must be greater than 0"),
    propertyType: z.string().min(1, "Property type is required"),
    isForSale: z.boolean(),
    imageFiles: z
        .array(z.any())
        .min(1, "At least one image must be uploaded"),
    descriptions: z
        .array(z.string())
        .min(1, "Each image must have a description"),
});

// Type for the form data
type FormData = z.infer<typeof imageUploadSchema>;

const PropertiesForm = () => {
    const [previews, setPreviews] = useState<string[]>([]);

    // React Hook Form with Zod validation
    const {
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(imageUploadSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            location: "",
            bedrooms: 1,
            bathrooms: 1,
            sqft: 0,
            propertyType: "apartment",
            isForSale: true,
            imageFiles: [],
            descriptions: [],
        },
    });

    // Watch for image file changes
    const imageFiles = watch("imageFiles");
    const descriptions = watch("descriptions");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setValue("imageFiles", files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviews(previews);

        // Initialize empty descriptions
        const descArray = files.map(() => "");
        setValue("descriptions", descArray);
    };

    const handleDescriptionChange = (index: number, value: string) => {
        const updatedDescriptions = [...descriptions];
        updatedDescriptions[index] = value;
        setValue("descriptions", updatedDescriptions);
    };

    const onSubmit = async (data: FormData) => {
        const { imageFiles, descriptions, ...details } = data;

        try {
            // Convert images to Base64
            const filesBase64 = await Promise.all(
                imageFiles.map((file) => {
                    return new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                })
            );

            // Upload data to the backend
            const response = await axios.post("/api/upload-image", {
                files: filesBase64,
                descriptions,
                details,
            });

            alert("Property added successfully!");
            console.log("added property:", response.data.uploadedImages);
        } catch (error) {
            console.error("Error adding property:", error);
            alert("Failed to add property.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <div>
                        <input
                            {...field}
                            type="text"
                            placeholder="Title"
                            className="block w-full border rounded p-2"
                        />
                        {errors.title && (
                            <span className="text-red-500">{errors.title.message}</span>
                        )}
                    </div>
                )}
            />

            {/* Description */}
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <div>
                        <textarea
                            {...field}
                            placeholder="Description"
                            className="block w-full border rounded p-2"
                        />
                        {errors.description && (
                            <span className="text-red-500">{errors.description.message}</span>
                        )}
                    </div>
                )}
            />

            {/* Price */}
            <Controller
                name="price"
                control={control}
                render={({ field }) => (
                    <div>
                        <input
                            type="number"
                            value={field.value || ""}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            placeholder="Price"
                            className="block w-full border rounded p-2"
                        />
                        {errors.price && (
                            <span className="text-red-500">{errors.price.message}</span>
                        )}
                    </div>
                )}
            />

            {/* Location */}
            <Controller
                name="location"
                control={control}
                render={({ field }) => (
                    <div>
                        <input
                            {...field}
                            type="text"
                            placeholder="Location"
                            className="block w-full border rounded p-2"
                        />
                        {errors.location && (
                            <span className="text-red-500">{errors.location.message}</span>
                        )}
                    </div>
                )}
            />

            {/* Bedrooms, Bathrooms, and Sqft */}
            <Controller
                name="bedrooms"
                control={control}
                render={({ field }) => (
                    <div>
                        <input
                            type="number"
                            value={field.value || ""}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            placeholder="Bedrooms"
                            className="block w-full border rounded p-2"
                        />
                        {errors.bedrooms && (
                            <span className="text-red-500">{errors.bedrooms.message}</span>
                        )}
                    </div>
                )}
            />
            <Controller
                name="bathrooms"
                control={control}
                render={({ field }) => (
                    <div>
                        <input
                            type="number"
                            value={field.value || ""}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            placeholder="Bathrooms"
                            className="block w-full border rounded p-2"
                        />
                        {errors.bathrooms && (
                            <span className="text-red-500">{errors.bathrooms.message}</span>
                        )}
                    </div>
                )}
            />
            <Controller
                name="sqft"
                control={control}
                render={({ field }) => (
                    <div>
                        <input
                            type="number"
                            value={field.value || ""}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            placeholder="Square Footage"
                            className="block w-full border rounded p-2"
                        />
                        {errors.sqft && (
                            <span className="text-red-500">{errors.sqft.message}</span>
                        )}
                    </div>
                )}
            />

            {/* Property Type */}
            <Controller
                name="propertyType"
                control={control}
                render={({ field }) => (
                    <div>
                        <select {...field} className="block w-full border rounded p-2">
                            <option value="apartment">Apartment</option>
                            <option value="villa">Villa</option>
                            <option value="condo">Condo</option>
                            <option value="bungalow">Bungalow</option>
                        </select>
                        {errors.propertyType && (
                            <span className="text-red-500">{errors.propertyType.message}</span>
                        )}
                    </div>
                )}
            />

            {/* Is For Sale */}
            <Controller
                name="isForSale"
                control={control}
                render={({ field }) => (
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <span>For Sale</span>
                    </div>
                )}
            />


            {/* Image Upload */}
            <div>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                />
                {errors.imageFiles && (
                    <span className="text-red-500">{errors.imageFiles.message}</span>
                )}
            </div>

            {/* Descriptions */}
            {previews.map((preview, index) => (
                <div key={index} className="space-y-2">
                    <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-64 h-64 object-cover"
                    />
                   
                </div>
            ))}
            {errors.descriptions && (
                <span className="text-red-500">{errors.descriptions.message}</span>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Submit
            </button>
        </form>
    );
};

export default PropertiesForm;
