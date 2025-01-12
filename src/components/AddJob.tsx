import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { BiLoaderCircle } from "react-icons/bi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import cities from "../data/cities.json";
interface JobDetails {
  jobTitle: string;
  companyName: string;
  tagsArray: string[];
  location: string;
  date: string;
  link: string;
  jobDescriptionHtml: string;
  jobDescriptionText: string;
  image: string;
  jobType: string;
  experienceRequired: string;
  domain: string;
  jobLocationType: string;
}

const AddJob: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [jobDetails, setJobDetails] = useState<JobDetails>({
    jobTitle: "",
    companyName: "",
    tagsArray: [],
    location: "",
    date: "",
    link: "",
    jobDescriptionHtml: "",
    jobDescriptionText: "",
    image: "",
    jobType: "",
    experienceRequired: "",
    domain: "",
    jobLocationType: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "tagsArray") {
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        tagsArray: value.split(",").map((tag) => tag.trim()),
      }));
    } else {
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };
  const handleEditorChange = (value: string) => {
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      jobDescriptionHtml: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/add-job",
        jobDetails,
        {
          headers: {
            authkey: "8e92ab9c92b24b5fb5b6afaf92b7ef12",
          },
        }
      );
      if (response.data.isSuccess) {
        toast.success("Job added successfully", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
          },
        });
      } else {
        toast.error("Something went wrong", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
          },
        });
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error("Something went wrong", {
        duration: 2000,
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
          padding: "6px 10px",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full m-auto flex justify-center">
      <Toaster position="bottom-center" />

      {/* <div className="absolute left-12">
        <button onClick={() => window.history.back()}>
          <IoArrowBackCircleOutline size={32} />
        </button>
      </div> */}
      <Card className="w-[600px]">
        <form onSubmit={handleSubmit} className="space-y-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Add Job
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div>
                <Label htmlFor="jobTitle">Job Title:</Label>
                <Input
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  value={jobDetails.jobTitle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="companyName">Company Name:</Label>
                <Input
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={jobDetails.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div>
                <Label htmlFor="tagsArray">Tags (comma-separated):</Label>
                <Input
                  type="text"
                  name="tagsArray"
                  id="tagsArray"
                  value={jobDetails.tagsArray.join(", ")}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="location">Location:</Label>
                <Select
                  name="location"
                  value={jobDetails.location}
                  onValueChange={(value) =>
                    setJobDetails({ ...jobDetails, location: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.label}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <div>
                <Label htmlFor="date">Date:</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={jobDetails.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="link">Job Link:</Label>
                <Input
                  type="url"
                  name="link"
                  id="link"
                  value={jobDetails.link}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="jobDescriptionHtml">
                Job Description (HTML):
              </Label>
              <ReactQuill
                value={jobDetails.jobDescriptionHtml}
                onChange={handleEditorChange}
                theme="snow"
              />
            </div>

            <div>
              <Label htmlFor="jobDescriptionText">
                Job Description (Text):
              </Label>
              <Textarea
                name="jobDescriptionText"
                id="jobDescriptionText"
                value={jobDetails.jobDescriptionText}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="image">Image URL:</Label>
              <Input
                type="url"
                name="image"
                id="image"
                value={jobDetails.image}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4 flex-wrap">
              <div>
                <Label>Job Type:</Label>
                <Select
                  name="jobType"
                  value={jobDetails.jobType}
                  onValueChange={(value) =>
                    setJobDetails({ ...jobDetails, jobType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Time">Full Time</SelectItem>
                    <SelectItem value="Part Time">Part Time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Domain::</Label>
                <Select
                  name="domain"
                  value={jobDetails.domain}
                  onValueChange={(value) =>
                    setJobDetails({ ...jobDetails, domain: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">
                      Web development
                    </SelectItem>
                    <SelectItem value="app-development">
                      App development
                    </SelectItem>
                    <SelectItem value="data-science">Data science</SelectItem>
                    <SelectItem value="ai-ml">AI & ML</SelectItem>
                    <SelectItem value="sales-marketing">
                      Sales & Marketing
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Experience Required:</Label>
                <Select
                  name="experienceRequired"
                  value={jobDetails.experienceRequired}
                  onValueChange={(value) =>
                    setJobDetails({ ...jobDetails, experienceRequired: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresher">Fresher</SelectItem>
                    <SelectItem value="0-1 years">0-1 years</SelectItem>
                    <SelectItem value="1-3 years">1-3 years</SelectItem>
                    <SelectItem value="3+ years">3+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Job Location Type</Label>
                <Select
                  name="jobLocationType"
                  value={jobDetails.jobLocationType}
                  onValueChange={(value) =>
                    setJobDetails({ ...jobDetails, jobLocationType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onsite">Onsite</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="text-white bg-primaryNew hover:bg-primaryNew hover:opacity-90 w-20"
            >
              {loading ? <BiLoaderCircle className="animate-spin" size={24}/> : "Add"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddJob;
