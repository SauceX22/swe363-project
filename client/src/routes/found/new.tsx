import { createFileRoute } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { NotFoundComponent } from "@/components/not-found";

export const Route = createFileRoute("/found/new")({
  component: AddFoundItem,
  notFoundComponent: NotFoundComponent,
});

export default function AddFoundItem() {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!image) newErrors.image = "Photo is required";
    if (!name.trim()) newErrors.name = "Item name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!buildingName.trim())
      newErrors.buildingName = "Building name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      //TODO: sending data
      console.log({ image, name, description, buildingName });
      toast({
        title: "Success",
        description: "Item added successfully",
      });
      setImage(null);
      setName("");
      setDescription("");
      setBuildingName("");
      setErrors({});
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
      <Card className="w-full max-w-3xl scale-125 bg-slate-600/90">
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Add Your Item
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 md:grid-cols-[300px,1fr]"
          >
            <div className="flex flex-col gap-4">
              <div>
                <Label
                  htmlFor="image-upload"
                  className="mb-1 block text-sm font-medium text-slate-200"
                >
                  Photo
                </Label>
                <label
                  htmlFor="image-upload"
                  className={`flex aspect-square cursor-pointer items-center justify-center rounded-lg bg-slate-500 transition-colors hover:bg-slate-500/90 ${errors.image ? "border-2 border-red-500" : ""}`}
                >
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="h-full w-full rounded-lg object-cover"
                    />
                  ) : (
                    <Upload className="h-8 w-8 text-slate-300" />
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-slate-200"
                >
                  Item Name
                </Label>
                <Input
                  id="name"
                  placeholder="Item Name"
                  className={`border-slate-400 bg-slate-500 text-white placeholder:text-slate-300 ${errors.name ? "border-red-500" : ""}`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="description"
                  className="mb-1 block text-sm font-medium text-slate-200"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Item Description"
                  className={`min-h-[100px] border-slate-400 bg-slate-500 text-white placeholder:text-slate-300 ${errors.description ? "border-red-500" : ""}`}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors((prev) => ({ ...prev, description: "" }));
                  }}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="buildingName"
                  className="mb-1 block text-sm font-medium text-slate-200"
                >
                  Building Name
                </Label>
                <Input
                  id="buildingName"
                  placeholder="Building Name"
                  className={`border-slate-400 bg-slate-500 text-white placeholder:text-slate-300 ${errors.buildingName ? "border-red-500" : ""}`}
                  value={buildingName}
                  onChange={(e) => {
                    setBuildingName(e.target.value);
                    setErrors((prev) => ({ ...prev, buildingName: "" }));
                  }}
                />
                {errors.buildingName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.buildingName}
                  </p>
                )}
              </div>

              <Button type="submit" className="mt-2 w-full">
                Post Item
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
