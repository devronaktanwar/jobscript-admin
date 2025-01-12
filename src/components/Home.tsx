import { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import axios from "axios";
import { LuTrash2 } from "react-icons/lu";
import { FaLink } from "react-icons/fa6";
// import { FaCirclePlus } from "react-icons/fa6";
// import Loader from "./Loader";
interface lHomeProps {}
const Home: FC<lHomeProps> = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchJobs = async () => {
      // setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/all-jobs",
          {
            headers: {
              authkey: "8e92ab9c92b24b5fb5b6afaf92b7ef12",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
      } finally {
        // setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  const handleDelete = (jobId: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobId));
  };
  return (
    <div>
      <div className="pt-6 flex flex-col gap-4">
        {/* <div>
          <a
            href="/add-job"
            className="inline-flex items-center gap-2 rounded px-3 py-1 bg-primaryNew text-white text-sm"
          >
            Add <FaCirclePlus />
          </a>
        </div> */}
        {/* {loading ? (
          <div className="h-[40vh] w-full flex justify-center items-center">
            <Loader />
          </div>
        ) : ( */}
        <div
          className="flex gap-2 flex-wrap justify-center
          "
        >
          {jobs.map((job: lJobCardProps, index: number) => {
            const newDate = new Date(job.date);
            const formattedDate = new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).format(newDate);
            return (
              <JobCard
                jobTitle={job.jobTitle}
                companyName={job.companyName}
                jobId={job.jobId}
                image={job.image}
                link={job.link}
                date={formattedDate}
                key={index}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};
interface lJobCardProps {
  jobTitle: string;
  companyName: string;
  jobId: string;
  image: string;
  link: string;
  date: string;
  onDelete: (id: string) => void;
}
const JobCard: FC<lJobCardProps> = ({
  jobTitle,
  companyName,
  jobId,
  image,
  link,
  date,
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://stackjobs-live.onrender.com/api/job/${jobId}`,
        {
          headers: {
            authkey: "8e92ab9c92b24b5fb5b6afaf92b7ef12",
          },
        }
      );

      if (response.status === 200) {
        onDelete(jobId);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job.");
    }
  };
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="flex gap-3">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img src={image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-base font-semibold">{jobTitle}</h2>
            <p className="text-sm text-gray-600 font-medium">{companyName}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 font-semibold">{date}</p>
      </CardContent>
      <CardFooter className="flex justify-between w-full">
        <a href={link} className="text-primaryNew">
          <FaLink />
        </a>
        <button onClick={handleDelete} className="text-red-500">
          <LuTrash2 />
        </button>
      </CardFooter>
    </Card>
  );
};
export default Home;
