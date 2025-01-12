import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import axios from "axios";

const AddCompany = () => {
  const [data, setData] = useState({
    name: "",
    image: "",
    desc: "",
    website: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/add-company",
        data
      );
      console.log("success");
      console.log(response);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  console.log(data);
  return (
    <div className="flex justify-center h-fit mt-24 w-full">
      <Card className="w-[600px]">
        <form className="space-y-2" onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Add Company
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="name">Company name:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="URL">Image URL:</Label>
              <Input
                type="text"
                name="image"
                id="image"
                value={data.image}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="website">Website link:</Label>
              <Input
                type="text"
                name="website"
                id="website"
                value={data.website}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="desc">Description:</Label>
              <Textarea
                name="desc"
                id="desc"
                value={data.desc}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="text-white bg-primaryNew hover:bg-primaryNew hover:opacity-90"
            >
              Add
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddCompany;
